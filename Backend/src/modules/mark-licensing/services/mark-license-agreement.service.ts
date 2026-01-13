import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, DataSource, LessThanOrEqual, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { MarkLicenseAgreement } from '../entities/mark-license-agreement.entity';
import { MarkLicenseApplication } from '../entities/mark-license-application.entity';
import { CreateMarkLicenseAgreementDto, SignAgreementDto } from '../dtos';
import { AgreementStatus, MarkLicenseStatus } from '../../../shared/enums';

@Injectable()
export class MarkLicenseAgreementService {
  constructor(
    @InjectRepository(MarkLicenseAgreement)
    private readonly agreementRepository: Repository<MarkLicenseAgreement>,
    @InjectRepository(MarkLicenseApplication)
    private readonly applicationRepository: Repository<MarkLicenseApplication>,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Generate agreement from approved application
   */
  async generateAgreement(
    createDto: CreateMarkLicenseAgreementDto,
    userId: string,
  ): Promise<MarkLicenseAgreement> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Verify application exists and is approved
      const application = await this.applicationRepository.findOne({
        where: { id: createDto.applicationId },
        relations: ['nsb'],
      });

      if (!application) {
        throw new NotFoundException(`Application with ID ${createDto.applicationId} not found`);
      }

      if (application.status !== MarkLicenseStatus.APPROVED_PENDING_AGREEMENT) {
        throw new BadRequestException(
          'Application must be in APPROVED_PENDING_AGREEMENT status to generate agreement',
        );
      }

      // Check if agreement already exists
      const existingAgreement = await this.agreementRepository.findOne({
        where: { applicationId: createDto.applicationId },
      });

      if (existingAgreement) {
        throw new BadRequestException('Agreement already exists for this application');
      }

      // Generate agreement ID
      const agreementId = await this.generateAgreementId();

      // Prepare license type display
      const licenseTypeDisplay = application.licenseTypes.join(', ');

      // Generate terms (can be enhanced with template system)
      const licenseTermsDisplay =
        createDto.licenseTermsDisplay || this.generateDefaultTerms(application);

      // Create agreement
      const agreement = this.agreementRepository.create({
        agreementId,
        applicationId: createDto.applicationId,
        nsbId: application.nsbId,
        licenseTypeDisplay,
        licenseStartDate: createDto.licenseStartDate,
        licenseEndDate: createDto.licenseEndDate,
        licenseTermsDisplay,
        royaltyFeeStructure: createDto.royaltyFeeStructure || this.getDefaultFeeStructure(),
        paymentSchedule: createDto.paymentSchedule || this.getDefaultPaymentSchedule(),
        usageRestrictions: createDto.usageRestrictions || this.getDefaultUsageRestrictions(),
        terminationClauses: createDto.terminationClauses || this.getDefaultTerminationClauses(),
        nsbSignerName: application.declarationSignatory,
        nsbSignerTitle: application.signatoryTitle,
        nsbSignerEmail: application.signatoryEmail,
        agreementStatus: AgreementStatus.PENDING_NSB,
        createdBy: userId,
        updatedBy: userId,
      });

      const savedAgreement = await queryRunner.manager.save(agreement);

      // Update application status
      application.status = MarkLicenseStatus.PENDING_NSB_SIGNATURE;
      application.updatedBy = userId;
      await queryRunner.manager.save(application);

      await queryRunner.commitTransaction();
      return this.findById(savedAgreement.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Sign agreement (NSB side)
   */
  async signAgreement(signDto: SignAgreementDto, userId: string, ipAddress?: string): Promise<MarkLicenseAgreement> {
    const agreement = await this.agreementRepository.findOne({
      where: { id: signDto.agreementId },
      relations: ['application'],
    });

    if (!agreement) {
      throw new NotFoundException(`Agreement with ID ${signDto.agreementId} not found`);
    }

    if (agreement.agreementStatus !== AgreementStatus.PENDING_NSB) {
      throw new BadRequestException('Agreement is not pending NSB signature');
    }

    if (!signDto.nsbSignerConsent) {
      throw new BadRequestException('Electronic signature consent is required');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      agreement.nsbSignerName = signDto.nsbSignerName;
      agreement.nsbSignerTitle = signDto.nsbSignerTitle;
      agreement.nsbSignerEmail = signDto.nsbSignerEmail;
      agreement.nsbSignerConsent = signDto.nsbSignerConsent;
      agreement.nsbSignerTimestamp = new Date();
      agreement.nsbSignerIp = ipAddress;
      agreement.nsbSignatureImagePath = signDto.nsbSignatureImagePath;
      agreement.agreementStatus = AgreementStatus.PENDING_ARSO;
      agreement.updatedBy = userId;

      // Update application status
      if (agreement.application) {
        agreement.application.status = MarkLicenseStatus.PENDING_ARSO_SIGNATURE;
        agreement.application.updatedBy = userId;
        await queryRunner.manager.save(agreement.application);
      }

      await queryRunner.manager.save(agreement);
      await queryRunner.commitTransaction();

      return this.findById(agreement.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * ARSO signs agreement
   */
  async arsoSignAgreement(
    agreementId: string,
    arsoSignerName: string,
    arsoSignerTitle: string,
    userId: string,
  ): Promise<MarkLicenseAgreement> {
    const agreement = await this.agreementRepository.findOne({
      where: { id: agreementId },
      relations: ['application'],
    });

    if (!agreement) {
      throw new NotFoundException(`Agreement with ID ${agreementId} not found`);
    }

    if (agreement.agreementStatus !== AgreementStatus.PENDING_ARSO) {
      throw new BadRequestException('Agreement is not pending ARSO signature');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      agreement.arsoSignerName = arsoSignerName;
      agreement.arsoSignerTitle = arsoSignerTitle;
      agreement.arsoSignerTimestamp = new Date();
      agreement.agreementStatus = AgreementStatus.EXECUTED;
      agreement.updatedBy = userId;

      // Update application status
      if (agreement.application) {
        agreement.application.status = MarkLicenseStatus.EXECUTED;
        agreement.application.updatedBy = userId;
        await queryRunner.manager.save(agreement.application);
      }

      await queryRunner.manager.save(agreement);
      await queryRunner.commitTransaction();

      return this.findById(agreement.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Get agreement by ID
   */
  async findById(id: string): Promise<MarkLicenseAgreement> {
    const agreement = await this.agreementRepository.findOne({
      where: { id },
      relations: ['application', 'nsb', 'assets', 'usageReports'],
    });

    if (!agreement) {
      throw new NotFoundException(`Agreement with ID ${id} not found`);
    }

    return agreement;
  }

  /**
   * Get agreement by agreement ID
   */
  async findByAgreementId(agreementId: string): Promise<MarkLicenseAgreement> {
    const agreement = await this.agreementRepository.findOne({
      where: { agreementId },
      relations: ['application', 'nsb'],
    });

    if (!agreement) {
      throw new NotFoundException(`Agreement with ID ${agreementId} not found`);
    }

    return agreement;
  }

  /**
   * Get active agreements for NSB
   */
  async getActiveAgreementsByNsb(nsbId: string): Promise<MarkLicenseAgreement[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.agreementRepository.find({
      where: {
        nsbId,
        agreementStatus: AgreementStatus.EXECUTED,
        licenseStartDate: LessThanOrEqual(today),
        licenseEndDate: MoreThanOrEqual(today),
      },
      relations: ['application'],
      order: { licenseEndDate: 'ASC' },
    });
  }

  /**
   * Check for expiring agreements
   */
  async checkExpiringAgreements(daysBeforeExpiry = 30): Promise<MarkLicenseAgreement[]> {
    const today = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(today.getDate() + daysBeforeExpiry);

    return this.agreementRepository.find({
      where: {
        agreementStatus: AgreementStatus.EXECUTED,
        licenseEndDate: Between(today, expiryDate),
      },
      relations: ['nsb', 'application'],
    });
  }

  /**
   * Generate agreement ID
   */
  private async generateAgreementId(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await this.agreementRepository.count({
      where: {
        agreementId: Like(`LIC-NSB%-${year}-%`),
      },
    });
    const sequence = String(count + 1).padStart(6, '0');
    const subSequence = String(Math.floor(count / 1000) + 1).padStart(3, '0');
    return `LIC-NSB${sequence}-${year}-${subSequence}`;
  }

  /**
   * Generate default terms
   */
  private generateDefaultTerms(application: MarkLicenseApplication): string {
    return `This license agreement governs the use of ARSO marks by ${application.nsbApplicantName} for the purposes specified in application ${application.applicationNumber}.`;
  }

  /**
   * Get default fee structure
   */
  private getDefaultFeeStructure(): Record<string, any> {
    return {
      annualFee: 0,
      royaltyPercentage: 0,
      paymentTerms: 'As specified in agreement',
    };
  }

  /**
   * Get default payment schedule
   */
  private getDefaultPaymentSchedule(): Record<string, any> {
    return {
      frequency: 'ANNUAL',
      dueDate: 'First day of license year',
    };
  }

  /**
   * Get default usage restrictions
   */
  private getDefaultUsageRestrictions(): string {
    return 'Marks must be used in accordance with ACAP 1-1 Annex B requirements and ARSO brand guidelines.';
  }

  /**
   * Get default termination clauses
   */
  private getDefaultTerminationClauses(): string {
    return 'This agreement may be terminated by either party with 30 days written notice, or immediately in case of breach.';
  }
}

