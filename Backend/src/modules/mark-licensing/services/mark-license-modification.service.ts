import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { MarkLicenseModification } from '../entities/mark-license-modification.entity';
import { MarkLicenseAgreement } from '../entities/mark-license-agreement.entity';
import {
  CreateLicenseModificationDto,
  ApproveModificationDto,
  RejectModificationDto,
} from '../dtos';
import { ModificationStatus } from '../../../shared/enums';

@Injectable()
export class MarkLicenseModificationService {
  constructor(
    @InjectRepository(MarkLicenseModification)
    private readonly modificationRepository: Repository<MarkLicenseModification>,
    @InjectRepository(MarkLicenseAgreement)
    private readonly agreementRepository: Repository<MarkLicenseAgreement>,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Create a modification request
   */
  async requestModification(
    createDto: CreateLicenseModificationDto,
    userId: string,
  ): Promise<MarkLicenseModification> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Verify license exists
      const license = await this.agreementRepository.findOne({
        where: { id: createDto.originalLicenseId },
      });

      if (!license) {
        throw new NotFoundException(`License with ID ${createDto.originalLicenseId} not found`);
      }

      // Check for pending modification
      const pendingModification = await this.modificationRepository.findOne({
        where: {
          originalLicenseId: createDto.originalLicenseId,
          status: ModificationStatus.PENDING,
        },
      });

      if (pendingModification) {
        throw new BadRequestException(
          'A pending modification request already exists. Please wait for it to be processed.',
        );
      }

      // Create modification request
      const modification = this.modificationRepository.create({
        originalLicenseId: createDto.originalLicenseId,
        agreementId: license.agreementId,
        modificationTypes: createDto.modificationTypes,
        modificationReason: createDto.modificationReason,
        proposedChanges: createDto.proposedChanges,
        effectiveDateRequest: createDto.effectiveDateRequest,
        supportingJustificationPath: createDto.supportingJustificationPath,
        impactAssessment: createDto.impactAssessment,
        feeAdjustmentNeeded: createDto.feeAdjustmentNeeded,
        status: ModificationStatus.PENDING,
        createdBy: userId,
        updatedBy: userId,
      });

      const savedModification = await queryRunner.manager.save(modification);
      await queryRunner.commitTransaction();

      return this.findById(savedModification.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Approve modification request
   */
  async approveModification(
    modificationId: string,
    approveDto: ApproveModificationDto,
    userId: string,
  ): Promise<MarkLicenseModification> {
    const modification = await this.modificationRepository.findOne({
      where: { id: modificationId },
      relations: ['originalLicense'],
    });

    if (!modification) {
      throw new NotFoundException(`Modification with ID ${modificationId} not found`);
    }

    if (modification.status !== ModificationStatus.PENDING) {
      throw new BadRequestException('Modification is not in pending status');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      modification.status = ModificationStatus.APPROVED;
      modification.approvedAt = new Date();
      modification.reviewedBy = userId;
      modification.implementedChanges = approveDto.implementedChanges || {};

      // Apply changes to license if needed
      if (modification.originalLicense) {
        // This is where you would apply the actual changes to the license
        // For now, we'll just mark it as approved
        await queryRunner.manager.save(modification.originalLicense);
      }

      await queryRunner.manager.save(modification);
      await queryRunner.commitTransaction();

      return this.findById(modification.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Reject modification request
   */
  async rejectModification(
    modificationId: string,
    rejectDto: RejectModificationDto,
    userId: string,
  ): Promise<MarkLicenseModification> {
    const modification = await this.modificationRepository.findOne({
      where: { id: modificationId },
    });

    if (!modification) {
      throw new NotFoundException(`Modification with ID ${modificationId} not found`);
    }

    if (modification.status !== ModificationStatus.PENDING) {
      throw new BadRequestException('Modification is not in pending status');
    }

    modification.status = ModificationStatus.REJECTED;
    modification.rejectedAt = new Date();
    modification.rejectionReason = rejectDto.rejectionReason;
    modification.reviewedBy = userId;
    modification.updatedBy = userId;

    return this.modificationRepository.save(modification);
  }

  /**
   * Get modification by ID
   */
  async findById(id: string): Promise<MarkLicenseModification> {
    const modification = await this.modificationRepository.findOne({
      where: { id },
      relations: ['originalLicense', 'originalLicense.application'],
    });

    if (!modification) {
      throw new NotFoundException(`Modification with ID ${id} not found`);
    }

    return modification;
  }

  /**
   * Get modification history for a license
   */
  async getModificationHistory(licenseId: string): Promise<MarkLicenseModification[]> {
    return this.modificationRepository.find({
      where: { originalLicenseId: licenseId },
      relations: ['originalLicense'],
      order: { createdAt: 'DESC' },
    });
  }
}

