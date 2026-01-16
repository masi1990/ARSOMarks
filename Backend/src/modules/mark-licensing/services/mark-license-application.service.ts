import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Like, Repository } from 'typeorm';
import { MarkLicenseApplication } from '../entities/mark-license-application.entity';
import { MarkLicensePlacement } from '../entities/mark-license-placement.entity';
import {
  CreateMarkLicenseApplicationDto,
  UpdateMarkLicenseApplicationDto,
  SubmitMarkLicenseApplicationDto,
} from '../dtos';
import { MarkLicenseStatus, MarkLicenseType, MarkMisuseStatus, MarkSanctionStatus, MarkSanctionType } from '../../../shared/enums';
import { Nsb } from '../../nsb-management/entities/nsb.entity';
import { MarkMisuseIncident } from '../entities/mark-misuse-incident.entity';
import { MarkSanction } from '../entities/mark-sanction.entity';
import { MarkMisuseUploadService } from './mark-misuse-upload.service';

@Injectable()
export class MarkLicenseApplicationService {
  constructor(
    @InjectRepository(MarkLicenseApplication)
    private readonly applicationRepository: Repository<MarkLicenseApplication>,
    @InjectRepository(MarkLicensePlacement)
    private readonly placementRepository: Repository<MarkLicensePlacement>,
    @InjectRepository(Nsb)
    private readonly nsbRepository: Repository<Nsb>,
    @InjectRepository(MarkMisuseIncident)
    private readonly misuseRepository: Repository<MarkMisuseIncident>,
    @InjectRepository(MarkSanction)
    private readonly sanctionRepository: Repository<MarkSanction>,
    private readonly misuseUploadService: MarkMisuseUploadService,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Create a new mark license application
   */
  async createApplication(
    createDto: CreateMarkLicenseApplicationDto,
    userId: string,
  ): Promise<MarkLicenseApplication> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const nsbId = createDto.nsbId?.trim();
      if (!nsbId) {
        throw new BadRequestException('NSB is required');
      }

      // Verify NSB exists
      const nsb = await this.nsbRepository.findOne({ where: { id: nsbId } });
      if (!nsb) {
        throw new NotFoundException(`NSB with ID ${nsbId} not found`);
      }

      // Generate application number
      const applicationNumber = await this.generateApplicationNumber();

      // Prepare application data
      const applicationData: Partial<MarkLicenseApplication> = {
        applicationNumber,
        nsbId,
        nsbApplicantName: nsb.name, // Auto-fill from NSB profile
        applicationDate: new Date(),
        applicationReference: createDto.applicationReference,
        licenseTypes: createDto.licenseTypes,
        licenseDuration: createDto.licenseDuration,
        licenseDurationOther: createDto.licenseDurationOther,
        promotionalLicenseDetails: createDto.promotionalLicenseDetails
          ? JSON.parse(JSON.stringify(createDto.promotionalLicenseDetails))
          : null,
        certificationBodyDetails: createDto.certificationBodyDetails
          ? JSON.parse(JSON.stringify(createDto.certificationBodyDetails))
          : null,
        specialProjectDetails: createDto.specialProjectDetails
          ? JSON.parse(JSON.stringify(createDto.specialProjectDetails))
          : null,
        mediaUsage: createDto.mediaUsage ? JSON.parse(JSON.stringify(createDto.mediaUsage)) : null,
        campaignTimeline: createDto.campaignTimeline
          ? JSON.parse(JSON.stringify(createDto.campaignTimeline))
          : null,
        expectedImpactMetrics: createDto.expectedImpactMetrics
          ? JSON.parse(JSON.stringify(createDto.expectedImpactMetrics))
          : null,
        marksRequested: createDto.marksRequested,
        markColorsNeeded: createDto.markColorsNeeded,
        markSizesNeeded: createDto.markSizesNeeded,
        markLanguages: createDto.markLanguages,
        annexBCompliance: createDto.annexBCompliance,
        brandGuidelinesAck: createDto.brandGuidelinesAck,
        modificationPolicyAcceptance: createDto.modificationPolicyAcceptance,
        supportingDocuments: createDto.supportingDocuments
          ? JSON.parse(JSON.stringify(createDto.supportingDocuments))
          : null,
        declarationSignatory: createDto.declarationSignatory,
        signatoryTitle: createDto.signatoryTitle,
        signatoryEmail: createDto.signatoryEmail,
        auditRightsAcceptance: createDto.auditRightsAcceptance,
        annualReportingCommitment: createDto.annualReportingCommitment,
        dataSharingConsent: createDto.dataSharingConsent,
        status: MarkLicenseStatus.DRAFT,
        createdBy: userId,
        updatedBy: userId,
      };

      const application = this.applicationRepository.create(applicationData);
      const savedApplication = await queryRunner.manager.save(application);

      await queryRunner.commitTransaction();
      return this.findById(savedApplication.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Update a draft application
   */
  async updateApplication(
    id: string,
    updateDto: UpdateMarkLicenseApplicationDto,
    userId: string,
  ): Promise<MarkLicenseApplication> {
    const application = await this.applicationRepository.findOne({
      where: { id, status: MarkLicenseStatus.DRAFT },
    });

    if (!application) {
      throw new NotFoundException('Draft application not found or already submitted');
    }

    // Update fields
    if (updateDto.nsbId !== undefined) {
      const nsb = await this.nsbRepository.findOne({ where: { id: updateDto.nsbId } });
      if (!nsb) {
        throw new NotFoundException(`NSB with ID ${updateDto.nsbId} not found`);
      }
      application.nsbId = updateDto.nsbId;
      application.nsbApplicantName = nsb.name;
    }
    if (updateDto.applicationReference !== undefined) {
      application.applicationReference = updateDto.applicationReference;
    }
    if (updateDto.licenseTypes !== undefined) {
      application.licenseTypes = updateDto.licenseTypes;
    }
    if (updateDto.licenseDuration !== undefined) {
      application.licenseDuration = updateDto.licenseDuration;
    }
    if (updateDto.licenseDurationOther !== undefined) {
      application.licenseDurationOther = updateDto.licenseDurationOther;
    }
    if (updateDto.promotionalLicenseDetails !== undefined) {
      application.promotionalLicenseDetails = JSON.parse(
        JSON.stringify(updateDto.promotionalLicenseDetails),
      );
    }
    if (updateDto.certificationBodyDetails !== undefined) {
      application.certificationBodyDetails = JSON.parse(
        JSON.stringify(updateDto.certificationBodyDetails),
      );
    }
    if (updateDto.specialProjectDetails !== undefined) {
      application.specialProjectDetails = JSON.parse(JSON.stringify(updateDto.specialProjectDetails));
    }
    if (updateDto.mediaUsage !== undefined) {
      application.mediaUsage = JSON.parse(JSON.stringify(updateDto.mediaUsage));
    }
    if (updateDto.campaignTimeline !== undefined) {
      application.campaignTimeline = JSON.parse(JSON.stringify(updateDto.campaignTimeline));
    }
    if (updateDto.expectedImpactMetrics !== undefined) {
      application.expectedImpactMetrics = JSON.parse(JSON.stringify(updateDto.expectedImpactMetrics));
    }
    if (updateDto.marksRequested !== undefined) {
      application.marksRequested = updateDto.marksRequested;
    }
    if (updateDto.markColorsNeeded !== undefined) {
      application.markColorsNeeded = updateDto.markColorsNeeded;
    }
    if (updateDto.markSizesNeeded !== undefined) {
      application.markSizesNeeded = updateDto.markSizesNeeded;
    }
    if (updateDto.markLanguages !== undefined) {
      application.markLanguages = updateDto.markLanguages;
    }
    if (updateDto.annexBCompliance !== undefined) {
      application.annexBCompliance = updateDto.annexBCompliance;
    }
    if (updateDto.brandGuidelinesAck !== undefined) {
      application.brandGuidelinesAck = updateDto.brandGuidelinesAck;
    }
    if (updateDto.modificationPolicyAcceptance !== undefined) {
      application.modificationPolicyAcceptance = updateDto.modificationPolicyAcceptance;
    }
    if (updateDto.supportingDocuments !== undefined) {
      application.supportingDocuments = JSON.parse(JSON.stringify(updateDto.supportingDocuments));
    }
    if (updateDto.declarationSignatory !== undefined) {
      application.declarationSignatory = updateDto.declarationSignatory;
    }
    if (updateDto.signatoryTitle !== undefined) {
      application.signatoryTitle = updateDto.signatoryTitle;
    }
    if (updateDto.signatoryEmail !== undefined) {
      application.signatoryEmail = updateDto.signatoryEmail;
    }
    if (updateDto.auditRightsAcceptance !== undefined) {
      application.auditRightsAcceptance = updateDto.auditRightsAcceptance;
    }
    if (updateDto.annualReportingCommitment !== undefined) {
      application.annualReportingCommitment = updateDto.annualReportingCommitment;
    }
    if (updateDto.dataSharingConsent !== undefined) {
      application.dataSharingConsent = updateDto.dataSharingConsent;
    }

    application.updatedBy = userId;
    application.updatedAt = new Date();

    return this.applicationRepository.save(application);
  }

  /**
   * Submit application for review
   */
  async submitApplication(
    id: string,
    submitDto: SubmitMarkLicenseApplicationDto,
    userId: string,
  ): Promise<MarkLicenseApplication> {
    const application = await this.applicationRepository.findOne({
      where: { id, status: MarkLicenseStatus.DRAFT },
      relations: ['placements'],
    });

    if (!application) {
      throw new NotFoundException('Draft application not found');
    }

    // Validate application before submission
    const validationErrors = await this.validateApplication(application);
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
      application.status = MarkLicenseStatus.SUBMITTED;
      application.submittedAt = new Date();
      application.updatedBy = userId;

      await queryRunner.manager.save(application);
      await queryRunner.commitTransaction();

      return this.findById(application.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Validate application completeness
   */
  private async validateApplication(application: MarkLicenseApplication): Promise<string[]> {
    const errors: string[] = [];

    // Check required fields
    if (!application.licenseTypes || application.licenseTypes.length === 0) {
      errors.push('At least one license type must be selected');
    }

    // Validate license type specific details
    if (application.licenseTypes.includes(MarkLicenseType.PROMOTIONAL_INSTITUTIONAL)) {
      if (!application.promotionalLicenseDetails) {
        errors.push('Promotional license details are required');
      }
    }

    if (application.licenseTypes.includes(MarkLicenseType.CERTIFICATION_BODY)) {
      if (!application.certificationBodyDetails) {
        errors.push('Certification body details are required');
      }
    }

    if (application.licenseTypes.includes(MarkLicenseType.SPECIAL_PROJECT)) {
      if (!application.specialProjectDetails) {
        errors.push('Special project details are required');
      }
    }

    // Check compliance declarations
    if (!application.annexBCompliance) {
      errors.push('Annex B compliance acknowledgment is required');
    }
    if (!application.brandGuidelinesAck) {
      errors.push('Brand guidelines acknowledgment is required');
    }
    if (!application.modificationPolicyAcceptance) {
      errors.push('Modification policy acceptance is required');
    }

    // Check declarations
    if (!application.auditRightsAcceptance) {
      errors.push('Audit rights acceptance is required');
    }
    if (!application.annualReportingCommitment) {
      errors.push('Annual reporting commitment is required');
    }
    if (!application.dataSharingConsent) {
      errors.push('Data sharing consent is required');
    }

    // Check marks requested
    if (!application.marksRequested || application.marksRequested.length === 0) {
      errors.push('At least one mark must be requested');
    }

    return errors;
  }

  /**
   * Get application by ID
   */
  async findById(id: string): Promise<MarkLicenseApplication> {
    const application = await this.applicationRepository.findOne({
      where: { id },
      relations: ['nsb', 'placements', 'agreement'],
    });

    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }

    return application;
  }

  /**
   * Get all applications for an NSB
   */
  async getApplicationsByNsb(nsbId: string, includeDrafts = true): Promise<MarkLicenseApplication[]> {
    const where: any = { nsbId };
    if (!includeDrafts) {
      where.status = MarkLicenseStatus.SUBMITTED;
    }

    return this.applicationRepository.find({
      where,
      relations: ['placements'],
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Get all applications (admin)
   */
  async getAllApplications(includeDrafts = true): Promise<MarkLicenseApplication[]> {
    const where: any = {};
    if (!includeDrafts) {
      where.status = MarkLicenseStatus.SUBMITTED;
    }

    return this.applicationRepository.find({
      where,
      relations: ['placements', 'nsb'],
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Delete a draft application
   */
  async deleteDraft(id: string, userId: string): Promise<void> {
    const application = await this.applicationRepository.findOne({
      where: { id, status: MarkLicenseStatus.DRAFT },
    });

    if (!application) {
      throw new NotFoundException('Draft application not found');
    }

    await this.applicationRepository.remove(application);
  }

  /**
   * Add a supporting document to a draft application
   */
  async addSupportingDocument(
    id: string,
    document: { documentType: string; fileName: string; filePath?: string; otherDocumentName?: string },
    userId: string,
  ) {
    const application = await this.applicationRepository.findOne({
      where: { id, status: MarkLicenseStatus.DRAFT },
    });

    if (!application) {
      throw new NotFoundException('Draft application not found');
    }

    const documentEntry = {
      id: `doc-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      documentType: document.documentType,
      fileName: document.fileName,
      filePath: document.filePath,
      otherDocumentName: document.otherDocumentName,
    };

    const existing = (application.supportingDocuments || []) as any[];
    application.supportingDocuments = [...existing, documentEntry];
    application.updatedBy = userId;
    application.updatedAt = new Date();

    await this.applicationRepository.save(application);
    return documentEntry;
  }

  /**
   * List supporting documents for a draft application
   */
  async listSupportingDocuments(id: string) {
    const application = await this.applicationRepository.findOne({
      where: { id },
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    return application.supportingDocuments || [];
  }

  /**
   * Remove a supporting document from a draft application
   */
  async removeSupportingDocument(id: string, documentId: string, userId: string): Promise<void> {
    const application = await this.applicationRepository.findOne({
      where: { id, status: MarkLicenseStatus.DRAFT },
    });

    if (!application) {
      throw new NotFoundException('Draft application not found');
    }

    const existing = (application.supportingDocuments || []) as any[];
    application.supportingDocuments = existing.filter((doc) => doc?.id !== documentId);
    application.updatedBy = userId;
    application.updatedAt = new Date();

    await this.applicationRepository.save(application);
  }

  /**
   * Approve a submitted application
   */
  async approveApplication(id: string, userId: string): Promise<MarkLicenseApplication> {
    const application = await this.applicationRepository.findOne({ where: { id } });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    if (![MarkLicenseStatus.SUBMITTED, MarkLicenseStatus.UNDER_REVIEW].includes(application.status)) {
      throw new BadRequestException('Only submitted applications can be approved');
    }

    application.status = MarkLicenseStatus.APPROVED_PENDING_AGREEMENT;
    application.reviewedAt = new Date();
    application.approvedAt = new Date();
    application.updatedBy = userId;

    return this.applicationRepository.save(application);
  }

  async reportMisuse(payload: { licenseId?: string; description: string }, userId: string) {
    const incident = this.misuseRepository.create({
      licenseId: payload.licenseId,
      description: payload.description,
      status: MarkMisuseStatus.OPEN,
      reportedBy: userId,
    });
    return this.misuseRepository.save(incident);
  }

  async listMisuseIncidents() {
    return this.misuseRepository.find({
      relations: ['license', 'sanctions'],
      order: { reportedAt: 'DESC' },
    });
  }

  async reviewMisuseIncident(
    id: string,
    status: MarkMisuseStatus,
    decisionNotes: string | undefined,
    userId: string,
  ) {
    const incident = await this.misuseRepository.findOne({ where: { id } });
    if (!incident) {
      throw new NotFoundException('Misuse incident not found');
    }
    incident.status = status;
    incident.reviewedBy = userId;
    incident.decisionNotes = decisionNotes;
    return this.misuseRepository.save(incident);
  }

  async addSanction(
    incidentId: string,
    payload: { sanctionType: MarkSanctionType; startDate?: string; endDate?: string; notes?: string },
    userId: string,
  ) {
    const incident = await this.misuseRepository.findOne({ where: { id: incidentId } });
    if (!incident) {
      throw new NotFoundException('Misuse incident not found');
    }
    const sanction = this.sanctionRepository.create({
      incidentId,
      sanctionType: payload.sanctionType,
      startDate: payload.startDate,
      endDate: payload.endDate,
      notes: payload.notes,
      status: MarkSanctionStatus.ACTIVE,
      createdBy: userId,
    });
    return this.sanctionRepository.save(sanction);
  }

  async addMisuseEvidence(incidentId: string, file: Express.Multer.File) {
    const incident = await this.misuseRepository.findOne({ where: { id: incidentId } });
    if (!incident) {
      throw new NotFoundException('Misuse incident not found');
    }

    const upload = await this.misuseUploadService.uploadFile(file, incidentId);
    const evidenceEntry = {
      id: `evidence-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      ...upload,
      uploadedAt: new Date().toISOString(),
    };

    const existing = (incident.evidenceFiles || []) as any[];
    incident.evidenceFiles = [...existing, evidenceEntry];

    await this.misuseRepository.save(incident);
    return evidenceEntry;
  }

  /**
   * Reject a submitted application
   */
  async rejectApplication(
    id: string,
    reason: string | undefined,
    userId: string,
  ): Promise<MarkLicenseApplication> {
    const application = await this.applicationRepository.findOne({ where: { id } });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    if (![MarkLicenseStatus.SUBMITTED, MarkLicenseStatus.UNDER_REVIEW].includes(application.status)) {
      throw new BadRequestException('Only submitted applications can be rejected');
    }

    application.status = MarkLicenseStatus.REJECTED;
    application.reviewedAt = new Date();
    application.rejectedAt = new Date();
    application.rejectionReason = reason || null;
    application.updatedBy = userId;

    return this.applicationRepository.save(application);
  }

  /**
   * Generate application number
   */
  private async generateApplicationNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await this.applicationRepository.count({
      where: {
        applicationNumber: Like(`NSB-004-1-${year}-%`),
      },
    });
    const sequence = String(count + 1).padStart(6, '0');
    return `NSB-004-1-${year}-${sequence}`;
  }
}

