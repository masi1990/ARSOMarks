import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CbApplication } from '../entities/cb-application.entity';
import {
  CreateCbApplicationDto,
  CreateCbApplicationDraftDto,
  UpdateCbApplicationDto,
  UpdateCbStatusDto,
} from '../dtos';
import { CbApplicationStatus, CbDocumentType } from '../../../shared/enums';
import { CbApplicationDocument } from '../entities/cb-application-document.entity';
import { CbDocumentUploadService } from './cb-document-upload.service';
import { AccreditationBody } from '../../reference-data/entities/accreditation-body.entity';

@Injectable()
export class CbApplicationService {
  constructor(
    @InjectRepository(CbApplication)
    private readonly cbApplicationRepo: Repository<CbApplication>,
    @InjectRepository(CbApplicationDocument)
    private readonly cbDocumentRepo: Repository<CbApplicationDocument>,
    @InjectRepository(AccreditationBody)
    private readonly accreditationBodyRepo: Repository<AccreditationBody>,
    private readonly uploadService: CbDocumentUploadService,
  ) {}

  private removeUndefinedValues<T extends Record<string, any>>(obj: T): Partial<T> {
    const cleaned: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
        cleaned[key] = obj[key];
      }
    }
    return cleaned;
  }

  async createDraft(dto: CreateCbApplicationDraftDto, userId: string): Promise<CbApplication> {
    const cleanedDto = this.removeUndefinedValues(dto);

    const application = this.cbApplicationRepo.create({
      ...cleanedDto,
      status: CbApplicationStatus.DRAFT,
      createdBy: userId,
      updatedBy: userId,
    });

    return this.cbApplicationRepo.save(application);
  }

  async create(dto: CreateCbApplicationDto, userId: string): Promise<CbApplication> {
    const application = this.cbApplicationRepo.create({
      ...dto,
      status: CbApplicationStatus.DRAFT,
      createdBy: userId,
      updatedBy: userId,
    });

    return this.cbApplicationRepo.save(application);
  }

  async updateDraft(id: string, dto: UpdateCbApplicationDto, userId: string): Promise<CbApplication> {
    const application = await this.findById(id);
    if (application.status !== CbApplicationStatus.DRAFT) {
      throw new BadRequestException('Can only update draft applications');
    }

    Object.assign(application, dto, { updatedBy: userId });
    return this.cbApplicationRepo.save(application);
  }

  async submit(id: string, userId: string): Promise<CbApplication> {
    const application = await this.findById(id);
    if (application.status !== CbApplicationStatus.DRAFT) {
      throw new BadRequestException('Only draft applications can be submitted');
    }

    const missingFields: string[] = [];
    if (!application.legalName) missingFields.push('Legal name');
    if (!application.contactPersonName) missingFields.push('Contact person name');
    if (!application.contactEmail) missingFields.push('Contact email');
    if (!application.contactPhone) missingFields.push('Contact phone');
    if (!application.physicalAddress) missingFields.push('Physical address');
    if (!application.regionsOfOperation || application.regionsOfOperation.length === 0) {
      missingFields.push('Regions of operation');
    }

    if (missingFields.length > 0) {
      throw new BadRequestException(`Missing required fields: ${missingFields.join(', ')}`);
    }

    const requiredDocs = application.isAccredited
      ? [CbDocumentType.ACCREDITATION_CERTIFICATE, CbDocumentType.ACCREDITATION_SCOPE]
      : [CbDocumentType.ACKNOWLEDGEMENT_OF_APPLICATION];
    const documents = await this.cbDocumentRepo.find({ where: { applicationId: id } });
    const uploadedDocTypes = documents.map((doc) => doc.documentType);
    const missingDocs = requiredDocs.filter((type) => !uploadedDocTypes.includes(type));
    if (missingDocs.length > 0) {
      throw new BadRequestException(`Missing required documents: ${missingDocs.join(', ')}`);
    }

    if (application.accreditationBodyId) {
      const accreditationBody = await this.accreditationBodyRepo.findOne({ where: { id: application.accreditationBodyId } });
      if (!accreditationBody) {
        throw new BadRequestException('Accreditation body not found');
      }
      if (!accreditationBody.isFracMraSignatory) {
        throw new BadRequestException('Accreditation body must be an AFRAC MRA signatory');
      }
    }

    application.status = application.isAccredited
      ? CbApplicationStatus.SUBMITTED
      : CbApplicationStatus.PROVISIONAL;
    application.submittedAt = new Date();
    application.updatedBy = userId;
    application.applicationNumber = application.applicationNumber || (await this.generateApplicationNumber());
    if (!application.isAccredited) {
      const provisionalEnd = application.provisionalValidUntil || this.calculateProvisionalEnd();
      this.ensureProvisionalWindow(provisionalEnd);
      application.provisionalValidUntil = provisionalEnd;
    }

    return this.cbApplicationRepo.save(application);
  }

  async approve(id: string, userId: string): Promise<CbApplication> {
    const application = await this.findById(id);
    if (
      ![CbApplicationStatus.SUBMITTED, CbApplicationStatus.UNDER_REVIEW, CbApplicationStatus.PROVISIONAL].includes(
        application.status,
      )
    ) {
      throw new BadRequestException('Only submitted or provisional applications can be approved');
    }

    application.status = CbApplicationStatus.APPROVED;
    application.reviewedAt = new Date();
    application.approvedAt = new Date();
    application.updatedBy = userId;

    return this.cbApplicationRepo.save(application);
  }

  async reject(id: string, reason: string, userId: string): Promise<CbApplication> {
    const application = await this.findById(id);
    if (
      ![CbApplicationStatus.SUBMITTED, CbApplicationStatus.UNDER_REVIEW, CbApplicationStatus.PROVISIONAL].includes(
        application.status,
      )
    ) {
      throw new BadRequestException('Only submitted or provisional applications can be rejected');
    }

    application.status = CbApplicationStatus.REJECTED;
    application.reviewedAt = new Date();
    application.rejectedAt = new Date();
    application.rejectionReason = reason;
    application.updatedBy = userId;

    return this.cbApplicationRepo.save(application);
  }

  async list(filters?: { status?: CbApplicationStatus; search?: string; skip?: number; limit?: number }) {
    const query = this.cbApplicationRepo.createQueryBuilder('application');

    if (filters?.status) {
      query.andWhere('application.status = :status', { status: filters.status });
    }
    if (filters?.search) {
      query.andWhere(
        '(application.legalName ILIKE :search OR application.contactEmail ILIKE :search OR application.applicationNumber ILIKE :search)',
        { search: `%${filters.search}%` },
      );
    }

    const total = await query.getCount();
    if (filters?.skip !== undefined) query.skip(filters.skip);
    if (filters?.limit !== undefined) query.take(filters.limit);

    const data = await query
      .leftJoinAndSelect('application.country', 'country')
      .orderBy('application.createdAt', 'DESC')
      .getMany();

    return { data, total };
  }

  async findById(id: string): Promise<CbApplication> {
    const application = await this.cbApplicationRepo.findOne({
      where: { id },
      relations: ['country', 'accreditationBody', 'documents'],
    });
    if (!application) {
      throw new NotFoundException(`CB application with ID ${id} not found`);
    }
    return application;
  }

  async findByUserId(userId: string): Promise<CbApplication[]> {
    return this.cbApplicationRepo.find({
      where: { createdBy: userId },
      relations: ['country', 'accreditationBody'],
      order: { createdAt: 'DESC' },
    });
  }

  async uploadDocument(
    applicationId: string,
    file: Express.Multer.File,
    documentType: CbDocumentType,
    userId: string,
  ) {
    const application = await this.findById(applicationId);
    if (application.status !== CbApplicationStatus.DRAFT) {
      throw new BadRequestException('Documents can only be uploaded for draft applications');
    }

    const fileMetadata = await this.uploadService.uploadFile(file, applicationId, documentType);
    const document = this.cbDocumentRepo.create({
      applicationId,
      documentType,
      fileName: fileMetadata.fileName,
      filePath: fileMetadata.filePath,
      fileHash: fileMetadata.fileHash,
      fileSize: fileMetadata.fileSize,
      mimeType: fileMetadata.mimeType,
      uploadedBy: userId,
    });

    return this.cbDocumentRepo.save(document);
  }

  async listDocuments(applicationId: string) {
    await this.findById(applicationId);
    return this.cbDocumentRepo.find({
      where: { applicationId },
      order: { uploadedAt: 'DESC' },
    });
  }

  private async generateApplicationNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await this.cbApplicationRepo.count({
      where: {
        applicationNumber: Like(`CB-APP-${year}-%`),
      },
    });
    const sequence = String(count + 1).padStart(6, '0');
    return `CB-APP-${year}-${sequence}`;
  }

  async updateLifecycle(id: string, dto: UpdateCbStatusDto, userId: string) {
    const application = await this.findById(id);

    switch (dto.status) {
      case CbApplicationStatus.UNDER_REVIEW: {
        if (![CbApplicationStatus.SUBMITTED, CbApplicationStatus.PROVISIONAL].includes(application.status)) {
          throw new BadRequestException('Only submitted or provisional applications can move to under review');
        }
        application.status = CbApplicationStatus.UNDER_REVIEW;
        application.reviewedAt = application.reviewedAt || new Date();
        break;
      }
      case CbApplicationStatus.PROVISIONAL: {
        if (!dto.provisionalEnd) {
          throw new BadRequestException('provisionalEnd is required for provisional status');
        }
        this.ensureProvisionalWindow(dto.provisionalEnd);
        application.status = CbApplicationStatus.PROVISIONAL;
        application.provisionalValidUntil = dto.provisionalEnd;
        application.reviewedAt = application.reviewedAt || new Date();
        break;
      }
      case CbApplicationStatus.APPROVED: {
        if (!dto.licenseStart || !dto.licenseEnd) {
          throw new BadRequestException('licenseStart and licenseEnd are required for approval');
        }
        const startDate = new Date(dto.licenseStart);
        const endDate = new Date(dto.licenseEnd);
        if (endDate < startDate) {
          throw new BadRequestException('licenseEnd must be after licenseStart');
        }
        application.status = CbApplicationStatus.APPROVED;
        application.licenseStart = dto.licenseStart;
        application.licenseEnd = dto.licenseEnd;
        application.renewalDue = dto.renewalDue || dto.licenseEnd;
        application.reviewedAt = application.reviewedAt || new Date();
        application.approvedAt = new Date();
        break;
      }
      case CbApplicationStatus.SUSPENDED:
      case CbApplicationStatus.WITHDRAWN: {
        if (![CbApplicationStatus.APPROVED, CbApplicationStatus.PROVISIONAL].includes(application.status)) {
          throw new BadRequestException('Only active licenses can be suspended or withdrawn');
        }
        application.status = dto.status;
        break;
      }
      default:
        throw new BadRequestException('Unsupported status transition');
    }

    application.updatedBy = userId;
    return this.cbApplicationRepo.save(application);
  }

  private ensureProvisionalWindow(provisionalEnd: string) {
    const endDate = new Date(provisionalEnd);
    const now = new Date();
    const maxEnd = new Date(now);
    maxEnd.setFullYear(now.getFullYear() + 2);
    if (endDate > maxEnd) {
      throw new BadRequestException('Provisional approval cannot exceed two years');
    }
  }

  private calculateProvisionalEnd() {
    const end = new Date();
    end.setFullYear(end.getFullYear() + 2);
    return end.toISOString().slice(0, 10);
  }
}
