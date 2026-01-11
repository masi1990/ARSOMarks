import { ConflictException, Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { NsbRegistrationRequest } from '../entities/nsb-registration-request.entity';
import { NsbRegistrationRequestDocument } from '../entities/nsb-registration-request-document.entity';
import {
  CreateNsbRegistrationRequestDto,
  UpdateNsbRegistrationRequestDto,
} from '../dtos';
import { NsbRegistrationRequestStatus, NsbDocumentType, NsbClassification } from '../../../shared/enums';
import { NsbService } from './nsb.service';
import { NsbDocumentUploadService } from './nsb-document-upload.service';
import { EmailService } from '../../auth/services/email.service';

@Injectable()
export class NsbRegistrationRequestService {
  private readonly logger = new Logger(NsbRegistrationRequestService.name);

  constructor(
    @InjectRepository(NsbRegistrationRequest)
    private readonly requestRepo: Repository<NsbRegistrationRequest>,
    @InjectRepository(NsbRegistrationRequestDocument)
    private readonly documentRepo: Repository<NsbRegistrationRequestDocument>,
    private readonly nsbService: NsbService,
    private readonly dataSource: DataSource,
    private readonly uploadService: NsbDocumentUploadService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  async create(dto: CreateNsbRegistrationRequestDto, userId: string): Promise<NsbRegistrationRequest> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Check if there's already a pending/submitted request for this country (only if countryId is provided)
      if (dto.countryId) {
        const existingRequest = await this.requestRepo.findOne({
          where: {
            countryId: dto.countryId,
            status: In([NsbRegistrationRequestStatus.DRAFT, NsbRegistrationRequestStatus.SUBMITTED, NsbRegistrationRequestStatus.UNDER_REVIEW]),
          },
        });

        if (existingRequest) {
          throw new ConflictException('A registration request already exists for this country');
        }
      }

      const request = this.requestRepo.create({
        ...dto,
        status: NsbRegistrationRequestStatus.DRAFT,
        createdBy: userId,
      });

      const savedRequest = await queryRunner.manager.save(request);

      if (dto.documents && dto.documents.length > 0) {
        const documents = dto.documents.map((doc) =>
          this.documentRepo.create({
            ...doc,
            registrationRequestId: savedRequest.id,
            uploadedBy: userId,
          }),
        );
        await queryRunner.manager.save(documents);
      }

      await queryRunner.commitTransaction();
      return this.findById(savedRequest.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async update(id: string, dto: UpdateNsbRegistrationRequestDto, userId: string, userRole?: string): Promise<NsbRegistrationRequest> {
    const request = await this.requestRepo.findOne({ 
      where: { id },
      relations: ['documents'], // Load documents to prevent cascade issues
    });

    if (!request) {
      throw new NotFoundException(`Registration request with ID ${id} not found`);
    }

    // Allow SUPER_ADMIN and ARSO_SECRETARIAT to update status regardless of current status
    const isAdminOrSecretariat = userRole === 'SUPER_ADMIN' || userRole === 'ARSO_SECRETARIAT';
    const isStatusUpdate = dto.status !== undefined && dto.status !== request.status;
    const oldStatus = request.status;

    // Don't allow updates to submitted/under review requests (except status updates by reviewers)
    if (!isAdminOrSecretariat && (request.status === NsbRegistrationRequestStatus.SUBMITTED || request.status === NsbRegistrationRequestStatus.UNDER_REVIEW)) {
      if (!isStatusUpdate) {
        throw new ConflictException('Cannot update a submitted or under-review request');
      }
    }

    // Exclude documents from update - they are handled separately via file upload
    const { documents, ...updateData } = dto;

    Object.assign(request, {
      ...updateData,
      updatedAt: new Date(),
    });

    // Update reviewedBy and reviewedAt if status is being changed by admin/secretariat
    if (isStatusUpdate && isAdminOrSecretariat) {
      request.reviewedBy = userId;
      request.reviewedAt = new Date();
    }

    // Save without cascading documents
    const savedRequest = await this.requestRepo.save(request);

    // Send email notification if status changed
    if (isStatusUpdate && oldStatus !== savedRequest.status) {
      try {
        await this.emailService.sendNsbRegistrationRequestStatusChanged(
          request.contactEmail,
          request.contactPersonName,
          request.nsbOfficialName,
          request.countryName,
          oldStatus,
          savedRequest.status,
          dto.remarks,
        );
      } catch (error) {
        // Log error but don't fail the update
        this.logger.error(`Failed to send status change email: ${error}`);
      }
    }

    return savedRequest;
  }

  async submit(id: string, userId: string): Promise<NsbRegistrationRequest> {
    const request = await this.findById(id);

    if (request.status !== NsbRegistrationRequestStatus.DRAFT) {
      throw new ConflictException('Only draft requests can be submitted');
    }

    // Validate required fields before submission
    const missingFields: string[] = [];
    if (!request.countryId) missingFields.push('Country');
    if (!request.countryName) missingFields.push('Country Name');
    if (!request.nsbOfficialName) missingFields.push('NSB Official Name');
    if (!request.isoCode || request.isoCode.length !== 2) missingFields.push('ISO Alpha-2 Code');
    if (!request.contactPersonName) missingFields.push('Contact Person Name');
    if (!request.contactEmail || !request.contactEmail.includes('@')) missingFields.push('Contact Email');

    if (missingFields.length > 0) {
      throw new BadRequestException(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Validate that required documents are uploaded
    const documents = await this.documentRepo.find({ where: { registrationRequestId: id } });
    const requiredDocTypes = [
      'NSB_ESTABLISHMENT_CHARTER',
      'ARSO_MEMBERSHIP_CERTIFICATE',
      'GOVERNMENT_GAZETTE_NOTICE',
      'DECLARATION_OF_AUTHORITY',
    ];
    const uploadedDocTypes = documents.map((d) => d.documentType);
    const missingDocs = requiredDocTypes.filter((type) => !uploadedDocTypes.includes(type as any));

    if (missingDocs.length > 0) {
      throw new ConflictException(`Missing required documents: ${missingDocs.join(', ')}`);
    }

    request.status = NsbRegistrationRequestStatus.SUBMITTED;
    request.updatedAt = new Date();

    return this.requestRepo.save(request);
  }

  async approve(id: string, reviewerId: string, remarks?: string): Promise<NsbRegistrationRequest> {
    const request = await this.findById(id);

    if (request.status !== NsbRegistrationRequestStatus.SUBMITTED && request.status !== NsbRegistrationRequestStatus.UNDER_REVIEW) {
      throw new ConflictException('Only submitted or under-review requests can be approved');
    }

    // Create NSB from the request
    const createNsbDto = {
      name: request.nsbOfficialName,
      shortName: request.nsbAcronym,
      countryId: request.countryId,
      classification: NsbClassification.GOVERNMENT_AGENCY, // Default, can be updated later
      contacts: [
        {
          contactType: 'PRIMARY' as any,
          name: request.contactPersonName,
          designation: request.contactPersonTitle,
          email: request.contactEmail,
          phone: request.contactPhone,
          mobile: request.contactMobile,
        },
      ],
    };

    const nsb = await this.nsbService.createNsb(createNsbDto as any, reviewerId);

    // Update request status and link to NSB
    request.status = NsbRegistrationRequestStatus.APPROVED;
    request.reviewedBy = reviewerId;
    request.reviewedAt = new Date();
    request.remarks = remarks;
    request.nsbId = nsb.id;

    const savedRequest = await this.requestRepo.save(request);

    // Send email notification
    try {
      const frontendUrl = this.configService.get<string>('FRONTEND_URL', 'http://localhost:4200');
      const profileSetupUrl = `${frontendUrl}/nsb/profile-setup`;
      await this.emailService.sendNsbRegistrationRequestApproved(
        request.contactEmail,
        request.contactPersonName,
        request.nsbOfficialName,
        request.countryName,
        profileSetupUrl,
      );
    } catch (error) {
      // Log error but don't fail the approval
    }

    return savedRequest;
  }

  async reject(id: string, reviewerId: string, remarks: string): Promise<NsbRegistrationRequest> {
    const request = await this.findById(id);

    if (request.status !== NsbRegistrationRequestStatus.SUBMITTED && request.status !== NsbRegistrationRequestStatus.UNDER_REVIEW) {
      throw new ConflictException('Only submitted or under-review requests can be rejected');
    }

    request.status = NsbRegistrationRequestStatus.REJECTED;
    request.reviewedBy = reviewerId;
    request.reviewedAt = new Date();
    request.remarks = remarks;

    const savedRequest = await this.requestRepo.save(request);

    // Send email notification
    try {
      await this.emailService.sendNsbRegistrationRequestRejected(
        request.contactEmail,
        request.contactPersonName,
        request.nsbOfficialName,
        request.countryName,
        remarks,
      );
    } catch (error) {
      // Log error but don't fail the rejection
    }

    return savedRequest;
  }

  async findById(id: string): Promise<NsbRegistrationRequest> {
    const request = await this.requestRepo.findOne({
      where: { id },
      relations: ['documents', 'country', 'createdByUser', 'reviewedByUser'],
    });

    if (!request) {
      throw new NotFoundException(`Registration request with ID ${id} not found`);
    }

    return request;
  }

  async findAll(filter: any = {}): Promise<{ data: NsbRegistrationRequest[]; total: number }> {
    const query = this.requestRepo.createQueryBuilder('request').leftJoinAndSelect('request.country', 'country');

    if (filter.countryId) {
      query.andWhere('request.countryId = :countryId', { countryId: filter.countryId });
    }

    if (filter.status) {
      query.andWhere('request.status = :status', { status: filter.status });
    }

    if (filter.search) {
      query.andWhere(
        '(request.nsbOfficialName ILIKE :search OR request.nsbAcronym ILIKE :search OR request.contactEmail ILIKE :search)',
        { search: `%${filter.search}%` },
      );
    }

    const [data, total] = await query
      .orderBy('request.createdAt', 'DESC')
      .skip(filter.skip || 0)
      .take(filter.limit || 25)
      .getManyAndCount();

    return { data, total };
  }

  async findByCountry(countryId: string): Promise<NsbRegistrationRequest | null> {
    return this.requestRepo.findOne({
      where: { countryId },
      relations: ['documents', 'country'],
      order: { createdAt: 'DESC' },
    });
  }

  async uploadDocument(
    requestId: string,
    file: Express.Multer.File,
    documentType: NsbDocumentType,
    userId: string,
  ): Promise<NsbRegistrationRequestDocument> {
    const request = await this.findById(requestId);

    // Only allow uploads for draft requests
    if (request.status !== NsbRegistrationRequestStatus.DRAFT) {
      throw new ConflictException('Documents can only be uploaded for draft requests');
    }

    // Upload file and get metadata
    const fileMetadata = await this.uploadService.uploadFile(file, requestId, documentType);

    // Check if document of this type already exists and delete it
    const existingDoc = await this.documentRepo.findOne({
      where: { registrationRequestId: requestId, documentType },
    });

    if (existingDoc) {
      // Delete old file
      await this.uploadService.deleteFile(existingDoc.filePath);
      await this.documentRepo.remove(existingDoc);
    }

    // Create document record
    const document = this.documentRepo.create({
      registrationRequestId: requestId,
      documentType,
      fileName: fileMetadata.fileName,
      filePath: fileMetadata.filePath,
      fileHash: fileMetadata.fileHash,
      fileSize: fileMetadata.fileSize,
      mimeType: fileMetadata.mimeType,
      uploadedBy: userId,
    });

    return this.documentRepo.save(document);
  }

  async deleteDocument(requestId: string, documentId: string, userId: string): Promise<void> {
    const request = await this.findById(requestId);

    // Only allow deletions for draft requests
    if (request.status !== NsbRegistrationRequestStatus.DRAFT) {
      throw new ConflictException('Documents can only be deleted from draft requests');
    }

    const document = await this.documentRepo.findOne({
      where: { id: documentId, registrationRequestId: requestId },
    });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    // Delete file from disk
    await this.uploadService.deleteFile(document.filePath);

    // Delete document record
    await this.documentRepo.remove(document);
  }

  async getDocument(requestId: string, documentId: string): Promise<NsbRegistrationRequestDocument> {
    await this.findById(requestId); // Verify request exists
    
    const document = await this.documentRepo.findOne({
      where: { id: documentId, registrationRequestId: requestId },
    });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async getDocumentFile(filePath: string): Promise<Buffer> {
    return this.uploadService.getFile(filePath);
  }
}

