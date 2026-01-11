import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { LicenseApplication } from '../entities/license-application.entity';
import { ApplicationDocument } from '../entities/application-document.entity';
import { WorkflowHistory } from '../entities/workflow-history.entity';
import { CreateLicenseApplicationDto, SubmitApplicationDto } from '../dtos';
import { ApplicationStatus, DocumentType } from '../../../shared/enums';
import { WorkflowService } from './workflow.service';

@Injectable()
export class LicenseApplicationService {
  constructor(
    @InjectRepository(LicenseApplication)
    private readonly applicationRepository: Repository<LicenseApplication>,
    @InjectRepository(ApplicationDocument)
    private readonly documentRepository: Repository<ApplicationDocument>,
    @InjectRepository(WorkflowHistory)
    private readonly workflowRepository: Repository<WorkflowHistory>,
    private readonly dataSource: DataSource,
    private readonly workflowService: WorkflowService,
  ) {}

  async createApplication(createDto: CreateLicenseApplicationDto, userId: string): Promise<LicenseApplication> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existingDraft = await this.applicationRepository.findOne({
        where: {
          nsbId: createDto.nsbId,
          status: ApplicationStatus.DRAFT,
        },
      });

      if (existingDraft && !createDto.saveAsDraft) {
        throw new BadRequestException('A draft application already exists. Please update or delete it first.');
      }

      const application = this.applicationRepository.create({
        ...createDto,
        status: createDto.saveAsDraft ? ApplicationStatus.DRAFT : ApplicationStatus.SUBMITTED,
        submittedAt: createDto.saveAsDraft ? null : new Date(),
        createdBy: userId,
        updatedBy: userId,
      });

      const savedApplication = await queryRunner.manager.save(application);

      await this.workflowService.createHistoryEntry({
        applicationId: savedApplication.id,
        fromStatus: null,
        toStatus: savedApplication.status,
        actionPerformed: createDto.saveAsDraft ? 'DRAFT_CREATED' : 'APPLICATION_SUBMITTED',
        performedBy: userId,
        notes: createDto.saveAsDraft ? 'Draft application created' : 'Application submitted',
      });

      await queryRunner.commitTransaction();
      return this.findById(savedApplication.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateDraftApplication(id: string, updateDto: CreateLicenseApplicationDto, userId: string): Promise<LicenseApplication> {
    const application = await this.applicationRepository.findOne({
      where: { id, status: ApplicationStatus.DRAFT },
    });

    if (!application) {
      throw new NotFoundException('Draft application not found or already submitted');
    }

    Object.assign(application, {
      ...updateDto,
      updatedBy: userId,
      updatedAt: new Date(),
    });

    await this.workflowService.createHistoryEntry({
      applicationId: application.id,
      fromStatus: application.status,
      toStatus: application.status,
      actionPerformed: 'DRAFT_UPDATED',
      performedBy: userId,
      notes: 'Draft application updated',
    });

    return this.applicationRepository.save(application);
  }

  async submitApplication(id: string, submitDto: SubmitApplicationDto, userId: string): Promise<LicenseApplication> {
    const application = await this.applicationRepository.findOne({
      where: { id, status: ApplicationStatus.DRAFT },
      relations: ['documents'],
    });

    if (!application) {
      throw new NotFoundException('Draft application not found');
    }

    const validationErrors = await this.validateForSubmission(application);
    if (validationErrors.length > 0) {
      throw new BadRequestException({
        message: 'Application validation failed',
        errors: validationErrors,
      });
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      application.status = ApplicationStatus.SUBMITTED;
      application.submittedAt = new Date();
      application.submissionData = { ...application };
      application.updatedBy = userId;

      await queryRunner.manager.save(application);

      await this.workflowService.createHistoryEntry({
        applicationId: application.id,
        fromStatus: ApplicationStatus.DRAFT,
        toStatus: ApplicationStatus.SUBMITTED,
        actionPerformed: 'APPLICATION_SUBMITTED',
        performedBy: userId,
        notes: submitDto?.notes || 'Application submitted for review',
      });

      await queryRunner.commitTransaction();
      return this.findById(application.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async validateForSubmission(application: LicenseApplication): Promise<string[]> {
    const errors: string[] = [];

    const requiredDocumentTypes: DocumentType[] = [
      DocumentType.LEGAL_REGISTRATION,
      DocumentType.ACCREDITATION_CERTIFICATE,
      DocumentType.QUALITY_MANUAL,
      DocumentType.AUDITOR_COMPETENCE_MATRIX,
    ];

    const existingDocuments: DocumentType[] =
      application.documents?.map((doc) => doc.documentType as DocumentType) ?? [];
    const missingDocuments = requiredDocumentTypes.filter((type) => !existingDocuments.includes(type));

    if (missingDocuments.length > 0) {
      errors.push(`Missing required documents: ${missingDocuments.join(', ')}`);
    }

    if (!application.accreditationDetails?.['accreditationBody']) {
      errors.push('Accreditation body is required');
    }

    if (!application.appliedSchemes || (Array.isArray(application.appliedSchemes) && application.appliedSchemes.length === 0)) {
      errors.push('At least one ACAP scheme must be selected');
    }

    if (!application.organizationalDetails) {
      errors.push('Organizational details are required');
    }

    return errors;
  }

  async findById(id: string): Promise<LicenseApplication> {
    const application = await this.applicationRepository.findOne({
      where: { id },
      relations: ['nsb', 'nsb.contacts', 'nsb.locations', 'documents', 'workflowHistory', 'license'],
    });

    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }

    return application;
  }

  async getApplicationsByNsb(nsbId: string, includeDrafts = true): Promise<LicenseApplication[]> {
    const where: any = { nsbId };
    if (!includeDrafts) {
      where.status = ApplicationStatus.SUBMITTED;
    }

    return this.applicationRepository.find({
      where,
      relations: ['documents', 'workflowHistory'],
      order: { createdAt: 'DESC' },
    });
  }
}

