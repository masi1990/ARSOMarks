"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCertificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
const enums_1 = require("../../../shared/enums");
const operator_entity_1 = require("../../operator/entities/operator.entity");
const product_certification_agreement_upload_service_1 = require("./product-certification-agreement-upload.service");
let ProductCertificationService = class ProductCertificationService {
    constructor(applicationRepository, productRepository, technicalSpecRepository, environmentalClaimRepository, cbSelectionRepository, declarationRepository, agreementRepository, cbChangeRequestRepository, operatorRepository, dataSource, agreementUploadService) {
        this.applicationRepository = applicationRepository;
        this.productRepository = productRepository;
        this.technicalSpecRepository = technicalSpecRepository;
        this.environmentalClaimRepository = environmentalClaimRepository;
        this.cbSelectionRepository = cbSelectionRepository;
        this.declarationRepository = declarationRepository;
        this.agreementRepository = agreementRepository;
        this.cbChangeRequestRepository = cbChangeRequestRepository;
        this.operatorRepository = operatorRepository;
        this.dataSource = dataSource;
        this.agreementUploadService = agreementUploadService;
    }
    async createApplication(dto, userId) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const operator = await this.operatorRepository.findOne({ where: { id: dto.operatorId } });
            if (!operator) {
                throw new common_1.NotFoundException(`Operator with ID ${dto.operatorId} not found`);
            }
            if (operator.status !== 'APPROVED' && operator.status !== 'ACTIVE') {
                throw new common_1.BadRequestException('Operator must be approved before applying for product certification');
            }
            const application = this.applicationRepository.create({
                operatorId: dto.operatorId,
                markRequested: dto.markSelection.markRequested,
                arsoQualityMark: dto.markSelection.arsoQualityMark || dto.markSelection.markRequested.includes(enums_1.MarkRequestedType.ARSO_QUALITY_MARK),
                ecoMarkAfrica: dto.markSelection.ecoMarkAfrica || dto.markSelection.markRequested.includes(enums_1.MarkRequestedType.ECO_MARK_AFRICA),
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
                status: enums_1.ProductCertificationStatus.DRAFT,
                createdBy: userId,
                updatedBy: userId,
            });
            const savedApplication = await queryRunner.manager.save(application);
            if (dto.products && dto.products.length > 0) {
                const products = dto.products.map((productDto, index) => this.productRepository.create(Object.assign(Object.assign({}, productDto), { applicationId: savedApplication.id, displayOrder: index })));
                const savedProducts = await queryRunner.manager.save(products);
                if (dto.technicalSpecs && dto.technicalSpecs.length > 0) {
                    for (let i = 0; i < savedProducts.length && i < dto.technicalSpecs.length; i++) {
                        const technicalSpec = this.technicalSpecRepository.create(Object.assign(Object.assign({}, dto.technicalSpecs[i]), { productId: savedProducts[i].id }));
                        await queryRunner.manager.save(technicalSpec);
                    }
                }
                if (dto.environmentalClaims && dto.environmentalClaims.length > 0) {
                    const hasEmaMark = dto.markSelection.markRequested.includes(enums_1.MarkRequestedType.ECO_MARK_AFRICA) ||
                        dto.markSelection.markRequested.includes(enums_1.MarkRequestedType.BOTH);
                    if (hasEmaMark) {
                        for (let i = 0; i < savedProducts.length && i < dto.environmentalClaims.length; i++) {
                            const environmentalClaim = this.environmentalClaimRepository.create(Object.assign(Object.assign({}, dto.environmentalClaims[i]), { productId: savedProducts[i].id }));
                            await queryRunner.manager.save(environmentalClaim);
                        }
                    }
                }
            }
            const cbSelection = this.cbSelectionRepository.create(Object.assign(Object.assign({}, dto.cbSelection), { applicationId: savedApplication.id }));
            await queryRunner.manager.save(cbSelection);
            const declaration = this.declarationRepository.create(Object.assign(Object.assign({}, dto.declaration), { applicationId: savedApplication.id }));
            await queryRunner.manager.save(declaration);
            await queryRunner.commitTransaction();
            return this.findById(savedApplication.id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async updateApplication(id, dto, userId) {
        const application = await this.findById(id);
        if (application.status !== enums_1.ProductCertificationStatus.DRAFT) {
            throw new common_1.BadRequestException('Can only update draft applications');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
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
            if (dto.products) {
                const existingProducts = await this.productRepository.find({ where: { applicationId: id } });
                for (const product of existingProducts) {
                    await queryRunner.manager.delete(entities_1.ProductTechnicalSpec, { productId: product.id });
                    await queryRunner.manager.delete(entities_1.ProductEnvironmentalClaim, { productId: product.id });
                }
                await queryRunner.manager.delete(entities_1.Product, { applicationId: id });
                const products = dto.products.map((productDto, index) => this.productRepository.create(Object.assign(Object.assign({}, productDto), { applicationId: id, displayOrder: index })));
                const savedProducts = await queryRunner.manager.save(products);
                if (dto.technicalSpecs) {
                    for (let i = 0; i < savedProducts.length && i < dto.technicalSpecs.length; i++) {
                        const technicalSpec = this.technicalSpecRepository.create(Object.assign(Object.assign({}, dto.technicalSpecs[i]), { productId: savedProducts[i].id }));
                        await queryRunner.manager.save(technicalSpec);
                    }
                }
                if (dto.environmentalClaims) {
                    const hasEmaMark = application.markRequested.includes(enums_1.MarkRequestedType.ECO_MARK_AFRICA) ||
                        application.markRequested.includes(enums_1.MarkRequestedType.BOTH);
                    if (hasEmaMark) {
                        for (let i = 0; i < savedProducts.length && i < dto.environmentalClaims.length; i++) {
                            const environmentalClaim = this.environmentalClaimRepository.create(Object.assign(Object.assign({}, dto.environmentalClaims[i]), { productId: savedProducts[i].id }));
                            await queryRunner.manager.save(environmentalClaim);
                        }
                    }
                }
            }
            if (dto.cbSelection) {
                await queryRunner.manager.delete(entities_1.ProductCertificationCbSelection, { applicationId: id });
                const cbSelection = this.cbSelectionRepository.create(Object.assign(Object.assign({}, dto.cbSelection), { applicationId: id }));
                await queryRunner.manager.save(cbSelection);
            }
            if (dto.declaration) {
                await queryRunner.manager.delete(entities_1.ProductCertificationDeclaration, { applicationId: id });
                const declaration = this.declarationRepository.create(Object.assign(Object.assign({}, dto.declaration), { applicationId: id }));
                await queryRunner.manager.save(declaration);
            }
            await queryRunner.commitTransaction();
            return this.findById(id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async submitApplication(id, userId) {
        const application = await this.findById(id);
        if (application.status !== enums_1.ProductCertificationStatus.DRAFT) {
            throw new common_1.BadRequestException('Only draft applications can be submitted');
        }
        if (!application.products || application.products.length === 0) {
            throw new common_1.BadRequestException('At least one product is required');
        }
        if (!application.declaration) {
            throw new common_1.BadRequestException('Declarations are required');
        }
        if (!application.declaration.truthDeclaration ||
            !application.declaration.complianceCommitment ||
            !application.declaration.surveillanceAcceptance ||
            !application.declaration.correctiveActionCommitment ||
            !application.declaration.marketSurveillanceAcceptance ||
            !application.declaration.markUsageCommitment) {
            throw new common_1.BadRequestException('All required declarations must be accepted');
        }
        if (!application.declaration.feesAcceptance ||
            !application.declaration.feeBreakdownAcknowledged ||
            !application.declaration.paymentTermsAccepted ||
            !application.declaration.additionalCostsUnderstood) {
            throw new common_1.BadRequestException('All fee acceptance declarations must be accepted');
        }
        application.status = enums_1.ProductCertificationStatus.SUBMITTED;
        application.submittedAt = new Date();
        application.updatedBy = userId;
        return this.applicationRepository.save(application);
    }
    async findById(id) {
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
            throw new common_1.NotFoundException(`Product certification application with ID ${id} not found`);
        }
        return application;
    }
    async findByOperatorId(operatorId) {
        return this.applicationRepository.find({
            where: { operatorId },
            relations: ['products', 'cbSelection', 'declaration'],
            order: { createdAt: 'DESC' },
        });
    }
    async findAll(filters) {
        const queryBuilder = this.applicationRepository.createQueryBuilder('application');
        if (filters === null || filters === void 0 ? void 0 : filters.operatorId) {
            queryBuilder.andWhere('application.operatorId = :operatorId', { operatorId: filters.operatorId });
        }
        if (filters === null || filters === void 0 ? void 0 : filters.status) {
            queryBuilder.andWhere('application.status = :status', { status: filters.status });
        }
        const total = await queryBuilder.getCount();
        if ((filters === null || filters === void 0 ? void 0 : filters.skip) !== undefined) {
            queryBuilder.skip(filters.skip);
        }
        if ((filters === null || filters === void 0 ? void 0 : filters.limit) !== undefined) {
            queryBuilder.limit(filters.limit);
        }
        queryBuilder
            .leftJoinAndSelect('application.operator', 'operator')
            .leftJoinAndSelect('application.products', 'products')
            .orderBy('application.createdAt', 'DESC');
        const data = await queryBuilder.getMany();
        return { data, total };
    }
    async deleteApplication(id, userId) {
        const application = await this.findById(id);
        if (application.status !== enums_1.ProductCertificationStatus.DRAFT) {
            throw new common_1.BadRequestException('Can only delete draft applications');
        }
        await this.applicationRepository.remove(application);
    }
    async uploadAgreement(applicationId, agreementType, file, payload, userId) {
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
            status: enums_1.CertificationAgreementStatus.PENDING_CB_APPROVAL,
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
    async listAgreements(applicationId) {
        await this.findById(applicationId);
        return this.agreementRepository.find({
            where: { applicationId },
            order: { createdAt: 'DESC' },
        });
    }
    async approveAgreement(id, userId) {
        const agreement = await this.agreementRepository.findOne({ where: { id } });
        if (!agreement) {
            throw new common_1.NotFoundException('Agreement not found');
        }
        agreement.status = enums_1.CertificationAgreementStatus.APPROVED;
        agreement.cbApprovedBy = userId;
        agreement.cbApprovedAt = new Date();
        agreement.rejectionReason = undefined;
        return this.agreementRepository.save(agreement);
    }
    async rejectAgreement(id, reason, userId) {
        const agreement = await this.agreementRepository.findOne({ where: { id } });
        if (!agreement) {
            throw new common_1.NotFoundException('Agreement not found');
        }
        agreement.status = enums_1.CertificationAgreementStatus.REJECTED;
        agreement.cbApprovedBy = userId;
        agreement.cbApprovedAt = new Date();
        agreement.rejectionReason = reason;
        return this.agreementRepository.save(agreement);
    }
    async createCbChangeRequest(applicationId, payload, userId) {
        await this.findById(applicationId);
        const request = this.cbChangeRequestRepository.create({
            applicationId,
            currentCbId: payload.currentCbId,
            requestedCbId: payload.requestedCbId,
            justification: payload.justification,
            penaltyPolicy: payload.penaltyPolicy,
            status: enums_1.CbChangeRequestStatus.PENDING,
            requestedBy: userId,
        });
        return this.cbChangeRequestRepository.save(request);
    }
    async reviewCbChangeRequest(id, status, decisionReason, userId) {
        const request = await this.cbChangeRequestRepository.findOne({ where: { id } });
        if (!request) {
            throw new common_1.NotFoundException('CB change request not found');
        }
        request.status = status;
        request.reviewedBy = userId;
        request.reviewedAt = new Date();
        request.decisionReason = decisionReason;
        return this.cbChangeRequestRepository.save(request);
    }
    async publicDirectory() {
        return this.applicationRepository
            .createQueryBuilder('application')
            .leftJoinAndSelect('application.operator', 'operator')
            .where('application.status = :status', { status: enums_1.ProductCertificationStatus.CERTIFIED })
            .select([
            'application.id',
            'application.applicationNumber',
            'application.certifiedAt',
            'application.certificateNumber',
            'application.schemeType',
            'application.schemePayload',
            'operator.id',
            'operator.companyLegalName',
            'operator.tradingName',
        ])
            .orderBy('application.certifiedAt', 'DESC')
            .getMany();
    }
};
exports.ProductCertificationService = ProductCertificationService;
exports.ProductCertificationService = ProductCertificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.ProductCertificationApplication)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.Product)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.ProductTechnicalSpec)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_1.ProductEnvironmentalClaim)),
    __param(4, (0, typeorm_1.InjectRepository)(entities_1.ProductCertificationCbSelection)),
    __param(5, (0, typeorm_1.InjectRepository)(entities_1.ProductCertificationDeclaration)),
    __param(6, (0, typeorm_1.InjectRepository)(entities_1.ProductCertificationAgreement)),
    __param(7, (0, typeorm_1.InjectRepository)(entities_1.ProductCertificationCbChangeRequest)),
    __param(8, (0, typeorm_1.InjectRepository)(operator_entity_1.Operator)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        product_certification_agreement_upload_service_1.ProductCertificationAgreementUploadService])
], ProductCertificationService);
//# sourceMappingURL=product-certification.service.js.map