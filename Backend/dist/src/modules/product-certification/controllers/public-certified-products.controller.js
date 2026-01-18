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
exports.PublicCertifiedProductsController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const public_decorator_1 = require("../../../common/decorators/public.decorator");
const product_certification_application_entity_1 = require("../entities/product-certification-application.entity");
const product_entity_1 = require("../entities/product.entity");
const product_technical_spec_entity_1 = require("../entities/product-technical-spec.entity");
const enums_1 = require("../../../shared/enums");
const operator_entity_1 = require("../../operator/entities/operator.entity");
const traceability_service_1 = require("../../traceability/services/traceability.service");
let PublicCertifiedProductsController = class PublicCertifiedProductsController {
    constructor(applicationRepository, productRepository, technicalSpecRepository, operatorRepository, traceabilityService) {
        this.applicationRepository = applicationRepository;
        this.productRepository = productRepository;
        this.technicalSpecRepository = technicalSpecRepository;
        this.operatorRepository = operatorRepository;
        this.traceabilityService = traceabilityService;
    }
    async getCertifiedProducts(search, category, country, skip, limit) {
        var _a, _b;
        const queryBuilder = this.applicationRepository
            .createQueryBuilder('application')
            .leftJoinAndSelect('application.products', 'products')
            .leftJoinAndSelect('products.technicalSpec', 'technicalSpec')
            .leftJoinAndSelect('application.operator', 'operator')
            .where('application.status = :status', { status: enums_1.ProductCertificationStatus.CERTIFIED })
            .andWhere('application.certificateNumber IS NOT NULL')
            .andWhere('application.certifiedAt IS NOT NULL');
        if (search) {
            queryBuilder.andWhere('(products.productName ILIKE :search OR products.brandName ILIKE :search OR application.certificateNumber ILIKE :search OR operator.companyLegalName ILIKE :search OR operator.tradingName ILIKE :search)', { search: `%${search}%` });
        }
        if (category) {
            queryBuilder.andWhere('products.productCategory = :category', { category });
        }
        if (country) {
            queryBuilder.andWhere('operator.countryId = :countryId', { countryId: country });
        }
        const total = await queryBuilder.getCount();
        const skipNum = skip ? parseInt(skip, 10) : undefined;
        const limitNum = limit ? parseInt(limit, 10) : undefined;
        if (skipNum !== undefined && !isNaN(skipNum)) {
            queryBuilder.skip(skipNum);
        }
        if (limitNum !== undefined && !isNaN(limitNum)) {
            queryBuilder.limit(limitNum);
        }
        queryBuilder.orderBy('application.certifiedAt', 'DESC');
        const applications = await queryBuilder.getMany();
        const certifiedProducts = [];
        for (const application of applications) {
            if (application.products && application.products.length > 0) {
                for (const product of application.products) {
                    const cocPayload = {
                        applicationId: application.id,
                        productId: product.id,
                        originCountryId: product.originCountryId || ((_a = application.operator) === null || _a === void 0 ? void 0 : _a.countryId),
                    };
                    await this.traceabilityService.issueCoc(cocPayload);
                    const operator = application.operator || await this.operatorRepository.findOne({ where: { id: application.operatorId } });
                    const standards = [];
                    if (product.technicalSpec) {
                        if (product.technicalSpec.applicableStandards) {
                            standards.push(...product.technicalSpec.applicableStandards);
                        }
                        if (product.technicalSpec.mandatoryStandards) {
                            standards.push(...product.technicalSpec.mandatoryStandards);
                        }
                        if (product.technicalSpec.voluntaryStandards) {
                            standards.push(...product.technicalSpec.voluntaryStandards);
                        }
                    }
                    certifiedProducts.push({
                        id: product.id,
                        cocNumber: application.certificateNumber || '',
                        productName: product.productName,
                        brand: product.brandName,
                        countryOfOrigin: (operator === null || operator === void 0 ? void 0 : operator.countryId) || '',
                        company: (operator === null || operator === void 0 ? void 0 : operator.companyLegalName) || (operator === null || operator === void 0 ? void 0 : operator.tradingName) || '',
                        standards: standards,
                        issueDate: ((_b = application.certifiedAt) === null || _b === void 0 ? void 0 : _b.toISOString()) || application.createdAt.toISOString(),
                        expiryDate: application.certifiedAt ? this.calculateExpiryDate(application.certifiedAt).toISOString() : null,
                        category: product.productCategory,
                        operatorId: application.operatorId,
                        operatorName: (operator === null || operator === void 0 ? void 0 : operator.companyLegalName) || (operator === null || operator === void 0 ? void 0 : operator.tradingName),
                        applicationId: application.id,
                    });
                }
            }
        }
        return certifiedProducts;
    }
    async getCertifiedProductByCoc(cocNumber) {
        var _a;
        const application = await this.applicationRepository.findOne({
            where: {
                certificateNumber: cocNumber,
                status: enums_1.ProductCertificationStatus.CERTIFIED,
            },
            relations: ['products', 'products.technicalSpec', 'operator'],
        });
        if (!application || !application.products || application.products.length === 0) {
            return null;
        }
        const product = application.products[0];
        const operator = application.operator;
        const standards = [];
        if (product.technicalSpec) {
            if (product.technicalSpec.applicableStandards) {
                standards.push(...product.technicalSpec.applicableStandards);
            }
            if (product.technicalSpec.mandatoryStandards) {
                standards.push(...product.technicalSpec.mandatoryStandards);
            }
            if (product.technicalSpec.voluntaryStandards) {
                standards.push(...product.technicalSpec.voluntaryStandards);
            }
        }
        return {
            id: product.id,
            cocNumber: application.certificateNumber || '',
            productName: product.productName,
            brand: product.brandName,
            countryOfOrigin: (operator === null || operator === void 0 ? void 0 : operator.countryId) || '',
            company: (operator === null || operator === void 0 ? void 0 : operator.companyLegalName) || (operator === null || operator === void 0 ? void 0 : operator.tradingName) || '',
            standards: standards,
            issueDate: ((_a = application.certifiedAt) === null || _a === void 0 ? void 0 : _a.toISOString()) || application.createdAt.toISOString(),
            expiryDate: application.certifiedAt ? this.calculateExpiryDate(application.certifiedAt).toISOString() : null,
            category: product.productCategory,
            operatorId: application.operatorId,
            operatorName: (operator === null || operator === void 0 ? void 0 : operator.companyLegalName) || (operator === null || operator === void 0 ? void 0 : operator.tradingName),
            applicationId: application.id,
        };
    }
    calculateExpiryDate(certifiedAt) {
        const expiryDate = new Date(certifiedAt);
        expiryDate.setFullYear(expiryDate.getFullYear() + 3);
        return expiryDate;
    }
};
exports.PublicCertifiedProductsController = PublicCertifiedProductsController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('category')),
    __param(2, (0, common_1.Query)('country')),
    __param(3, (0, common_1.Query)('skip')),
    __param(4, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], PublicCertifiedProductsController.prototype, "getCertifiedProducts", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':cocNumber'),
    __param(0, (0, common_1.Param)('cocNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicCertifiedProductsController.prototype, "getCertifiedProductByCoc", null);
exports.PublicCertifiedProductsController = PublicCertifiedProductsController = __decorate([
    (0, common_1.Controller)('public/certified-products'),
    __param(0, (0, typeorm_1.InjectRepository)(product_certification_application_entity_1.ProductCertificationApplication)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(2, (0, typeorm_1.InjectRepository)(product_technical_spec_entity_1.ProductTechnicalSpec)),
    __param(3, (0, typeorm_1.InjectRepository)(operator_entity_1.Operator)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        traceability_service_1.TraceabilityService])
], PublicCertifiedProductsController);
//# sourceMappingURL=public-certified-products.controller.js.map