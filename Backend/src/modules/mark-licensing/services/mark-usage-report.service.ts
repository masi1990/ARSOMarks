import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Like, Repository } from 'typeorm';
import { MarkLicenseUsageReport } from '../entities/mark-license-usage-report.entity';
import { MarkLicenseAgreement } from '../entities/mark-license-agreement.entity';
import { CreateMarkUsageReportDto, UpdateMarkUsageReportDto } from '../dtos';
import { ReportStatus } from '../../../shared/enums';

@Injectable()
export class MarkUsageReportService {
  constructor(
    @InjectRepository(MarkLicenseUsageReport)
    private readonly reportRepository: Repository<MarkLicenseUsageReport>,
    @InjectRepository(MarkLicenseAgreement)
    private readonly agreementRepository: Repository<MarkLicenseAgreement>,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Create a new usage report
   */
  async createReport(createDto: CreateMarkUsageReportDto, userId: string): Promise<MarkLicenseUsageReport> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Verify license exists
      const license = await this.agreementRepository.findOne({
        where: { id: createDto.licenseId },
      });

      if (!license) {
        throw new NotFoundException(`License with ID ${createDto.licenseId} not found`);
      }

      // Check for existing draft report for the same period
      const existingDraft = await this.reportRepository.findOne({
        where: {
          licenseId: createDto.licenseId,
          status: ReportStatus.DRAFT,
          reportYear: new Date(createDto.reportPeriodStart).getFullYear(),
        },
      });

      if (existingDraft) {
        throw new BadRequestException(
          'A draft report already exists for this period. Please update or delete it first.',
        );
      }

      // Generate report number
      const reportNumber = await this.generateReportNumber();

      // Calculate report year
      const reportYear = new Date(createDto.reportPeriodStart).getFullYear();

      // Create report
      const report = this.reportRepository.create({
        reportNumber,
        licenseId: createDto.licenseId,
        agreementId: license.agreementId,
        reportPeriodStart: new Date(createDto.reportPeriodStart),
        reportPeriodEnd: new Date(createDto.reportPeriodEnd),
        reportYear,
        nsbContactName: createDto.nsbContactName,
        nsbContactEmail: createDto.nsbContactEmail,
        promotionalUsageMetrics: createDto.promotionalUsageMetrics
          ? JSON.parse(JSON.stringify(createDto.promotionalUsageMetrics))
          : null,
        certificationUsageMetrics: createDto.certificationUsageMetrics
          ? JSON.parse(JSON.stringify(createDto.certificationUsageMetrics))
          : null,
        impactAssessment: createDto.impactAssessment
          ? JSON.parse(JSON.stringify(createDto.impactAssessment))
          : null,
        complianceChecks: createDto.complianceChecks
          ? JSON.parse(JSON.stringify(createDto.complianceChecks))
          : null,
        nonComplianceIssues: createDto.nonComplianceIssues,
        correctiveActionsTaken: createDto.correctiveActionsTaken,
        plannedUsageNextYear: createDto.plannedUsageNextYear,
        renewalIntention: createDto.renewalIntention,
        supportingEvidence: createDto.supportingEvidence
          ? JSON.parse(JSON.stringify(createDto.supportingEvidence))
          : null,
        samples: createDto.samples ? JSON.parse(JSON.stringify(createDto.samples)) : null,
        testimonials: createDto.testimonials ? JSON.parse(JSON.stringify(createDto.testimonials)) : null,
        status: ReportStatus.DRAFT,
        createdBy: userId,
        updatedBy: userId,
      });

      const savedReport = await queryRunner.manager.save(report);
      await queryRunner.commitTransaction();

      return this.findById(savedReport.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Update a draft report
   */
  async updateReport(
    id: string,
    updateDto: UpdateMarkUsageReportDto,
    userId: string,
  ): Promise<MarkLicenseUsageReport> {
    const report = await this.reportRepository.findOne({
      where: { id, status: ReportStatus.DRAFT },
    });

    if (!report) {
      throw new NotFoundException('Draft report not found or already submitted');
    }

    // Update fields
    if (updateDto.reportPeriodStart !== undefined) {
      report.reportPeriodStart = new Date(updateDto.reportPeriodStart);
      report.reportYear = new Date(updateDto.reportPeriodStart).getFullYear();
    }
    if (updateDto.reportPeriodEnd !== undefined) {
      report.reportPeriodEnd = new Date(updateDto.reportPeriodEnd);
    }
    if (updateDto.nsbContactName !== undefined) {
      report.nsbContactName = updateDto.nsbContactName;
    }
    if (updateDto.nsbContactEmail !== undefined) {
      report.nsbContactEmail = updateDto.nsbContactEmail;
    }
    if (updateDto.promotionalUsageMetrics !== undefined) {
      report.promotionalUsageMetrics = JSON.parse(JSON.stringify(updateDto.promotionalUsageMetrics));
    }
    if (updateDto.certificationUsageMetrics !== undefined) {
      report.certificationUsageMetrics = JSON.parse(JSON.stringify(updateDto.certificationUsageMetrics));
    }
    if (updateDto.impactAssessment !== undefined) {
      report.impactAssessment = JSON.parse(JSON.stringify(updateDto.impactAssessment));
    }
    if (updateDto.complianceChecks !== undefined) {
      report.complianceChecks = JSON.parse(JSON.stringify(updateDto.complianceChecks));
    }
    if (updateDto.nonComplianceIssues !== undefined) {
      report.nonComplianceIssues = updateDto.nonComplianceIssues;
    }
    if (updateDto.correctiveActionsTaken !== undefined) {
      report.correctiveActionsTaken = updateDto.correctiveActionsTaken;
    }
    if (updateDto.plannedUsageNextYear !== undefined) {
      report.plannedUsageNextYear = updateDto.plannedUsageNextYear;
    }
    if (updateDto.renewalIntention !== undefined) {
      report.renewalIntention = updateDto.renewalIntention;
    }
    if (updateDto.supportingEvidence !== undefined) {
      report.supportingEvidence = JSON.parse(JSON.stringify(updateDto.supportingEvidence));
    }
    if (updateDto.samples !== undefined) {
      report.samples = JSON.parse(JSON.stringify(updateDto.samples));
    }
    if (updateDto.testimonials !== undefined) {
      report.testimonials = JSON.parse(JSON.stringify(updateDto.testimonials));
    }

    report.updatedBy = userId;
    report.updatedAt = new Date();

    return this.reportRepository.save(report);
  }

  /**
   * Submit report for review
   */
  async submitReport(id: string, userId: string): Promise<MarkLicenseUsageReport> {
    const report = await this.reportRepository.findOne({
      where: { id, status: ReportStatus.DRAFT },
    });

    if (!report) {
      throw new NotFoundException('Draft report not found');
    }

    // Validate report completeness
    const validationErrors = this.validateReportCompleteness(report);
    if (validationErrors.length > 0) {
      throw new BadRequestException({
        message: 'Report validation failed',
        errors: validationErrors,
      });
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      report.status = ReportStatus.SUBMITTED;
      report.submittedAt = new Date();
      report.updatedBy = userId;

      await queryRunner.manager.save(report);
      await queryRunner.commitTransaction();

      return this.findById(report.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Validate report completeness
   */
  private validateReportCompleteness(report: MarkLicenseUsageReport): string[] {
    const errors: string[] = [];

    if (!report.plannedUsageNextYear || report.plannedUsageNextYear.trim() === '') {
      errors.push('Planned usage for next year is required');
    }

    if (!report.renewalIntention) {
      errors.push('Renewal intention is required');
    }

    if (!report.complianceChecks) {
      errors.push('Compliance checks are required');
    }

    return errors;
  }

  /**
   * Get report by ID
   */
  async findById(id: string): Promise<MarkLicenseUsageReport> {
    const report = await this.reportRepository.findOne({
      where: { id },
      relations: ['license', 'license.application'],
    });

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    return report;
  }

  /**
   * Get all reports for a license
   */
  async getReportsByLicense(licenseId: string): Promise<MarkLicenseUsageReport[]> {
    return this.reportRepository.find({
      where: { licenseId },
      relations: ['license'],
      order: { reportYear: 'DESC', createdAt: 'DESC' },
    });
  }

  /**
   * Generate report number
   */
  private async generateReportNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await this.reportRepository.count({
      where: {
        reportNumber: Like(`NSB-004-3-${year}-%`),
      },
    });
    const sequence = String(count + 1).padStart(6, '0');
    return `NSB-004-3-${year}-${sequence}`;
  }
}

