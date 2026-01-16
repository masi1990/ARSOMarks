import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  ProductCertificationApplication,
  Product,
  ProductTechnicalSpec,
  ProductEnvironmentalClaim,
  ProductCertificationCbSelection,
  ProductCertificationDeclaration,
  ProductCertificationAgreement,
  ProductCertificationCbChangeRequest,
} from '../entities';
import { CreateProductCertificationApplicationDto, UpdateProductCertificationApplicationDto } from '../dtos';
import {
  ProductCertificationStatus,
  MarkRequestedType,
  CertificationAgreementType,
  CertificationAgreementStatus,
  CbChangeRequestStatus,
} from '../../../shared/enums';
import { Operator } from '../../operator/entities/operator.entity';
import { ProductCertificationAgreementUploadService } from './product-certification-agreement-upload.service';

@Injectable()
export class ProductCertificationService {
  constructor(
    @InjectRepository(ProductCertificationApplication)
    private readonly applicationRepository: Repository<ProductCertificationApplication>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductTechnicalSpec)
    private readonly technicalSpecRepository: Repository<ProductTechnicalSpec>,
    @InjectRepository(ProductEnvironmentalClaim)
    private readonly environmentalClaimRepository: Repository<ProductEnvironmentalClaim>,
    @InjectRepository(ProductCertificationCbSelection)
    private readonly cbSelectionRepository: Repository<ProductCertificationCbSelection>,
    @InjectRepository(ProductCertificationDeclaration)
    private readonly declarationRepository: Repository<ProductCertificationDeclaration>,
    @InjectRepository(ProductCertificationAgreement)
    private readonly agreementRepository: Repository<ProductCertificationAgreement>,
    @InjectRepository(ProductCertificationCbChangeRequest)
    private readonly cbChangeRequestRepository: Repository<ProductCertificationCbChangeRequest>,
    @InjectRepository(Operator)
    private readonly operatorRepository: Repository<Operator>,
    private readonly dataSource: DataSource,
    private readonly agreementUploadService: ProductCertificationAgreementUploadService,
  ) {}

  async createApplication(dto: CreateProductCertificationApplicationDto, userId: string): Promise<ProductCertificationApplication> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Verify operator exists
      const operator = await this.operatorRepository.findOne({ where: { id: dto.operatorId } });
      if (!operator) {
        throw new NotFoundException(`Operator with ID ${dto.operatorId} not found`);
      }

      // Validate that operator is approved/active
      if (operator.status !== 'APPROVED' && operator.status !== 'ACTIVE') {
        throw new BadRequestException('Operator must be approved before applying for product certification');
      }

      // Create main application
      const application = this.applicationRepository.create({
        operatorId: dto.operatorId,
        markRequested: dto.markSelection.markRequested,
        arsoQualityMark: dto.markSelection.arsoQualityMark || dto.markSelection.markRequested.includes(MarkRequestedType.ARSO_QUALITY_MARK),
        ecoMarkAfrica: dto.markSelection.ecoMarkAfrica || dto.markSelection.markRequested.includes(MarkRequestedType.ECO_MARK_AFRICA),
        markCombination: dto.markSelection.markCombination,
        schemeType: dto.certificationScheme.schemeType,
        applicationScope: dto.certificationScheme.applicationScope,
        certificationType: dto.certificationScheme.certificationType,
        schemePayload: dto.certificationScheme.schemePayload,
        estimatedVolume: dto.volumePriority.estimatedVolume,
        volumeUnit: dto.volumePriority.volumeUnit,
        peakMonth: dto.volumePriority.peakMonth,
        priorityProcessing: dto.volumePriority.priorityProcessing,
        priorityReason: dto.volumePriority.priorityReason,
        expectedTimeline: dto.volumePriority.expectedTimeline,
        status: ProductCertificationStatus.DRAFT,
        createdBy: userId,
        updatedBy: userId,
      });

      const savedApplication = await queryRunner.manager.save(application);

      // Create products
      if (dto.products && dto.products.length > 0) {
        const products = dto.products.map((productDto, index) =>
          this.productRepository.create({
            ...productDto,
            applicationId: savedApplication.id,
            displayOrder: index,
          }),
        );
        const savedProducts = await queryRunner.manager.save(products);

        // Create technical specs for each product
        if (dto.technicalSpecs && dto.technicalSpecs.length > 0) {
          for (let i = 0; i < savedProducts.length && i < dto.technicalSpecs.length; i++) {
            const technicalSpec = this.technicalSpecRepository.create({
              ...dto.technicalSpecs[i],
              productId: savedProducts[i].id,
            });
            await queryRunner.manager.save(technicalSpec);
          }
        }

        // Create environmental claims if EMA mark is requested
        if (dto.environmentalClaims && dto.environmentalClaims.length > 0) {
          const hasEmaMark = dto.markSelection.markRequested.includes(MarkRequestedType.ECO_MARK_AFRICA) ||
                            dto.markSelection.markRequested.includes(MarkRequestedType.BOTH);

          if (hasEmaMark) {
            for (let i = 0; i < savedProducts.length && i < dto.environmentalClaims.length; i++) {
              const environmentalClaim = this.environmentalClaimRepository.create({
                ...dto.environmentalClaims[i],
                productId: savedProducts[i].id,
              });
              await queryRunner.manager.save(environmentalClaim);
            }
          }
        }
      }

      // Create CB selection
      const cbSelection = this.cbSelectionRepository.create({
        ...dto.cbSelection,
        applicationId: savedApplication.id,
      });
      await queryRunner.manager.save(cbSelection);

      // Create declarations
      const declaration = this.declarationRepository.create({
        ...dto.declaration,
        applicationId: savedApplication.id,
      });
      await queryRunner.manager.save(declaration);

      await queryRunner.commitTransaction();
      return this.findById(savedApplication.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateApplication(id: string, dto: UpdateProductCertificationApplicationDto, userId: string): Promise<ProductCertificationApplication> {
    const application = await this.findById(id);

    if (application.status !== ProductCertificationStatus.DRAFT) {
      throw new BadRequestException('Can only update draft applications');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Update main application
      if (dto.markSelection) {
        Object.assign(application, {
          markRequested: dto.markSelection.markRequested,
          arsoQualityMark: dto.markSelection.arsoQualityMark,
          ecoMarkAfrica: dto.markSelection.ecoMarkAfrica,
          markCombination: dto.markSelection.markCombination,
        });
      }

      if (dto.certificationScheme) {
        Object.assign(application, {
          schemeType: dto.certificationScheme.schemeType,
          applicationScope: dto.certificationScheme.applicationScope,
          certificationType: dto.certificationScheme.certificationType,
          schemePayload: dto.certificationScheme.schemePayload,
        });
      }

      if (dto.volumePriority) {
        Object.assign(application, {
          estimatedVolume: dto.volumePriority.estimatedVolume,
          volumeUnit: dto.volumePriority.volumeUnit,
          peakMonth: dto.volumePriority.peakMonth,
          priorityProcessing: dto.volumePriority.priorityProcessing,
          priorityReason: dto.volumePriority.priorityReason,
          expectedTimeline: dto.volumePriority.expectedTimeline,
        });
      }

      application.updatedBy = userId;
      await queryRunner.manager.save(application);

      // Update products if provided
      if (dto.products) {
        // Delete existing products and related data
        const existingProducts = await this.productRepository.find({ where: { applicationId: id } });
        for (const product of existingProducts) {
          await queryRunner.manager.delete(ProductTechnicalSpec, { productId: product.id });
          await queryRunner.manager.delete(ProductEnvironmentalClaim, { productId: product.id });
        }
        await queryRunner.manager.delete(Product, { applicationId: id });

        // Create new products
        const products = dto.products.map((productDto, index) =>
          this.productRepository.create({
            ...productDto,
            applicationId: id,
            displayOrder: index,
          }),
        );
        const savedProducts = await queryRunner.manager.save(products);

        // Update technical specs if provided
        if (dto.technicalSpecs) {
          for (let i = 0; i < savedProducts.length && i < dto.technicalSpecs.length; i++) {
            const technicalSpec = this.technicalSpecRepository.create({
              ...dto.technicalSpecs[i],
              productId: savedProducts[i].id,
            });
            await queryRunner.manager.save(technicalSpec);
          }
        }

        // Update environmental claims if provided
        if (dto.environmentalClaims) {
          const hasEmaMark = application.markRequested.includes(MarkRequestedType.ECO_MARK_AFRICA) ||
                            application.markRequested.includes(MarkRequestedType.BOTH);

          if (hasEmaMark) {
            for (let i = 0; i < savedProducts.length && i < dto.environmentalClaims.length; i++) {
              const environmentalClaim = this.environmentalClaimRepository.create({
                ...dto.environmentalClaims[i],
                productId: savedProducts[i].id,
              });
              await queryRunner.manager.save(environmentalClaim);
            }
          }
        }
      }

      // Update CB selection if provided
      if (dto.cbSelection) {
        await queryRunner.manager.delete(ProductCertificationCbSelection, { applicationId: id });
        const cbSelection = this.cbSelectionRepository.create({
          ...dto.cbSelection,
          applicationId: id,
        });
        await queryRunner.manager.save(cbSelection);
      }

      // Update declarations if provided
      if (dto.declaration) {
        await queryRunner.manager.delete(ProductCertificationDeclaration, { applicationId: id });
        const declaration = this.declarationRepository.create({
          ...dto.declaration,
          applicationId: id,
        });
        await queryRunner.manager.save(declaration);
      }

      await queryRunner.commitTransaction();
      return this.findById(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async submitApplication(id: string, userId: string): Promise<ProductCertificationApplication> {
    const application = await this.findById(id);

    if (application.status !== ProductCertificationStatus.DRAFT) {
      throw new BadRequestException('Only draft applications can be submitted');
    }

    // Validate required fields
    if (!application.products || application.products.length === 0) {
      throw new BadRequestException('At least one product is required');
    }

    if (!application.declaration) {
      throw new BadRequestException('Declarations are required');
    }

    // Validate all required declarations
    if (!application.declaration.truthDeclaration ||
        !application.declaration.complianceCommitment ||
        !application.declaration.surveillanceAcceptance ||
        !application.declaration.correctiveActionCommitment ||
        !application.declaration.marketSurveillanceAcceptance ||
        !application.declaration.markUsageCommitment) {
      throw new BadRequestException('All required declarations must be accepted');
    }

    // Validate fee acceptance
    if (!application.declaration.feesAcceptance ||
        !application.declaration.feeBreakdownAcknowledged ||
        !application.declaration.paymentTermsAccepted ||
        !application.declaration.additionalCostsUnderstood) {
      throw new BadRequestException('All fee acceptance declarations must be accepted');
    }

    application.status = ProductCertificationStatus.SUBMITTED;
    application.submittedAt = new Date();
    application.updatedBy = userId;

    return this.applicationRepository.save(application);
  }

  async findById(id: string): Promise<ProductCertificationApplication> {
    const application = await this.applicationRepository.findOne({
      where: { id },
      relations: [
        'operator',
        'products',
        'products.technicalSpec',
        'products.environmentalClaim',
        'cbSelection',
        'declaration',
        'agreements',
        'cbChangeRequests',
        'createdByUser',
        'updatedByUser',
      ],
    });

    if (!application) {
      throw new NotFoundException(`Product certification application with ID ${id} not found`);
    }

    return application;
  }

  async findByOperatorId(operatorId: string): Promise<ProductCertificationApplication[]> {
    return this.applicationRepository.find({
      where: { operatorId },
      relations: ['products', 'cbSelection', 'declaration'],
      order: { createdAt: 'DESC' },
    });
  }

  async findAll(filters?: {
    operatorId?: string;
    status?: ProductCertificationStatus;
    skip?: number;
    limit?: number;
  }): Promise<{ data: ProductCertificationApplication[]; total: number }> {
    const queryBuilder = this.applicationRepository.createQueryBuilder('application');

    if (filters?.operatorId) {
      queryBuilder.andWhere('application.operatorId = :operatorId', { operatorId: filters.operatorId });
    }

    if (filters?.status) {
      queryBuilder.andWhere('application.status = :status', { status: filters.status });
    }

    const total = await queryBuilder.getCount();

    if (filters?.skip !== undefined) {
      queryBuilder.skip(filters.skip);
    }

    if (filters?.limit !== undefined) {
      queryBuilder.limit(filters.limit);
    }

    queryBuilder
      .leftJoinAndSelect('application.operator', 'operator')
      .leftJoinAndSelect('application.products', 'products')
      .orderBy('application.createdAt', 'DESC');

    const data = await queryBuilder.getMany();

    return { data, total };
  }

  async deleteApplication(id: string, userId: string): Promise<void> {
    const application = await this.findById(id);

    if (application.status !== ProductCertificationStatus.DRAFT) {
      throw new BadRequestException('Can only delete draft applications');
    }

    await this.applicationRepository.remove(application);
  }

  async uploadAgreement(
    applicationId: string,
    agreementType: CertificationAgreementType,
    file: Express.Multer.File,
    payload: { signedByName?: string; contractStart?: string; contractEnd?: string },
    userId: string,
  ) {
    await this.findById(applicationId);

    const fileMetadata = await this.agreementUploadService.uploadFile(file, applicationId, agreementType);

    const contractStart = payload.contractStart;
    let contractEnd = payload.contractEnd;
    if (contractStart && !contractEnd) {
      const startDate = new Date(contractStart);
      const endDate = new Date(startDate);
      endDate.setFullYear(endDate.getFullYear() + 3);
      contractEnd = endDate.toISOString().slice(0, 10);
    }

    const agreement = this.agreementRepository.create({
      applicationId,
      agreementType,
      status: CertificationAgreementStatus.PENDING_CB_APPROVAL,
      contractStart,
      contractEnd,
      signedByName: payload.signedByName,
      signedAt: payload.signedByName ? new Date() : undefined,
      fileName: fileMetadata.fileName,
      filePath: fileMetadata.filePath,
      fileHash: fileMetadata.fileHash,
      fileSize: fileMetadata.fileSize,
      mimeType: fileMetadata.mimeType,
      uploadedBy: userId,
    });

    return this.agreementRepository.save(agreement);
  }

  async listAgreements(applicationId: string) {
    await this.findById(applicationId);
    return this.agreementRepository.find({
      where: { applicationId },
      order: { createdAt: 'DESC' },
    });
  }

  async approveAgreement(id: string, userId: string) {
    const agreement = await this.agreementRepository.findOne({ where: { id } });
    if (!agreement) {
      throw new NotFoundException('Agreement not found');
    }
    agreement.status = CertificationAgreementStatus.APPROVED;
    agreement.cbApprovedBy = userId;
    agreement.cbApprovedAt = new Date();
    agreement.rejectionReason = undefined;
    return this.agreementRepository.save(agreement);
  }

  async rejectAgreement(id: string, reason: string, userId: string) {
    const agreement = await this.agreementRepository.findOne({ where: { id } });
    if (!agreement) {
      throw new NotFoundException('Agreement not found');
    }
    agreement.status = CertificationAgreementStatus.REJECTED;
    agreement.cbApprovedBy = userId;
    agreement.cbApprovedAt = new Date();
    agreement.rejectionReason = reason;
    return this.agreementRepository.save(agreement);
  }

  async createCbChangeRequest(
    applicationId: string,
    payload: { currentCbId?: string; requestedCbId?: string; justification: string; penaltyPolicy?: string },
    userId: string,
  ) {
    await this.findById(applicationId);

    const request = this.cbChangeRequestRepository.create({
      applicationId,
      currentCbId: payload.currentCbId,
      requestedCbId: payload.requestedCbId,
      justification: payload.justification,
      penaltyPolicy: payload.penaltyPolicy,
      status: CbChangeRequestStatus.PENDING,
      requestedBy: userId,
    });

    return this.cbChangeRequestRepository.save(request);
  }

  async reviewCbChangeRequest(
    id: string,
    status: CbChangeRequestStatus.APPROVED | CbChangeRequestStatus.REJECTED,
    decisionReason: string | undefined,
    userId: string,
  ) {
    const request = await this.cbChangeRequestRepository.findOne({ where: { id } });
    if (!request) {
      throw new NotFoundException('CB change request not found');
    }
    request.status = status;
    request.reviewedBy = userId;
    request.reviewedAt = new Date();
    request.decisionReason = decisionReason;
    return this.cbChangeRequestRepository.save(request);
  }
}

