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
exports.ProductCertificationController = void 0;
const common_1 = require("@nestjs/common");
const product_certification_service_1 = require("../services/product-certification.service");
const dtos_1 = require("../dtos");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const enums_1 = require("../../../shared/enums");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const public_decorator_1 = require("../../../common/decorators/public.decorator");
const system_user_entity_1 = require("../../system-user/system-user.entity");
const operator_service_1 = require("../../operator/services/operator.service");
const platform_express_1 = require("@nestjs/platform-express");
const common_2 = require("@nestjs/common");
let ProductCertificationController = class ProductCertificationController {
    constructor(productCertificationService, operatorService) {
        this.productCertificationService = productCertificationService;
        this.operatorService = operatorService;
    }
    async publicDirectory() {
        return this.productCertificationService.publicDirectory();
    }
    async create(dto, user) {
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.ARSO_SECRETARIAT);
        if (!isAdmin && userRoles.includes(enums_1.UserRole.OPERATOR)) {
            const myOperator = await this.operatorService.findByUserId(user.id);
            if (!myOperator) {
                throw new common_1.ForbiddenException('You must have an approved operator registration first');
            }
            if (dto.operatorId !== myOperator.id) {
                throw new common_1.ForbiddenException('You can only create applications for your own operator');
            }
        }
        return this.productCertificationService.createApplication(dto, user.id);
    }
    async list(query, user) {
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.ARSO_SECRETARIAT);
        const isCB = userRoles.includes(enums_1.UserRole.CB_ADMIN) || userRoles.includes(enums_1.UserRole.CB_USER);
        if (!isAdmin && !isCB && userRoles.includes(enums_1.UserRole.OPERATOR)) {
            const myOperator = await this.operatorService.findByUserId(user.id);
            if (myOperator) {
                const applications = await this.productCertificationService.findByOperatorId(myOperator.id);
                return { data: applications, total: applications.length };
            }
            return { data: [], total: 0 };
        }
        const { operatorId, status, skip = 0, limit = 25 } = query;
        const filters = {
            skip: Number(skip),
            limit: Number(limit),
        };
        if (operatorId) {
            filters.operatorId = operatorId;
        }
        if (status) {
            filters.status = status;
        }
        return this.productCertificationService.findAll(filters);
    }
    async getById(id, user) {
        const application = await this.productCertificationService.findById(id);
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.ARSO_SECRETARIAT);
        const isCB = userRoles.includes(enums_1.UserRole.CB_ADMIN) || userRoles.includes(enums_1.UserRole.CB_USER);
        if (!isAdmin && !isCB && userRoles.includes(enums_1.UserRole.OPERATOR)) {
            const myOperator = await this.operatorService.findByUserId(user.id);
            if (!myOperator || application.operatorId !== myOperator.id) {
                throw new common_1.ForbiddenException('You can only access your own applications');
            }
        }
        return application;
    }
    async update(id, dto, user) {
        const application = await this.productCertificationService.findById(id);
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.ARSO_SECRETARIAT);
        if (!isAdmin && userRoles.includes(enums_1.UserRole.OPERATOR)) {
            const myOperator = await this.operatorService.findByUserId(user.id);
            if (!myOperator || application.operatorId !== myOperator.id) {
                throw new common_1.ForbiddenException('You can only update your own applications');
            }
        }
        return this.productCertificationService.updateApplication(id, dto, user.id);
    }
    async submit(id, user) {
        const application = await this.productCertificationService.findById(id);
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.ARSO_SECRETARIAT);
        if (!isAdmin && userRoles.includes(enums_1.UserRole.OPERATOR)) {
            const myOperator = await this.operatorService.findByUserId(user.id);
            if (!myOperator || application.operatorId !== myOperator.id) {
                throw new common_1.ForbiddenException('You can only submit your own applications');
            }
        }
        return this.productCertificationService.submitApplication(id, user.id);
    }
    async uploadAgreement(id, agreementType, file, dto, user) {
        const application = await this.productCertificationService.findById(id);
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.ARSO_SECRETARIAT);
        if (!isAdmin && userRoles.includes(enums_1.UserRole.OPERATOR)) {
            const myOperator = await this.operatorService.findByUserId(user.id);
            if (!myOperator || application.operatorId !== myOperator.id) {
                throw new common_1.ForbiddenException('You can only upload agreements for your own applications');
            }
        }
        if (!file) {
            throw new common_2.BadRequestException('File is required');
        }
        if (!Object.values(enums_1.CertificationAgreementType).includes(agreementType)) {
            throw new common_2.BadRequestException('Invalid agreement type');
        }
        return this.productCertificationService.uploadAgreement(id, agreementType, file, dto, user.id);
    }
    async listAgreements(id) {
        return this.productCertificationService.listAgreements(id);
    }
    async approveAgreement(agreementId, user) {
        return this.productCertificationService.approveAgreement(agreementId, user.id);
    }
    async rejectAgreement(agreementId, body, user) {
        if (!(body === null || body === void 0 ? void 0 : body.reason)) {
            throw new common_2.BadRequestException('Rejection reason is required');
        }
        return this.productCertificationService.rejectAgreement(agreementId, body.reason, user.id);
    }
    async createCbChangeRequest(id, dto, user) {
        const application = await this.productCertificationService.findById(id);
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.ARSO_SECRETARIAT);
        if (!isAdmin && userRoles.includes(enums_1.UserRole.OPERATOR)) {
            const myOperator = await this.operatorService.findByUserId(user.id);
            if (!myOperator || application.operatorId !== myOperator.id) {
                throw new common_1.ForbiddenException('You can only request CB changes for your own applications');
            }
        }
        return this.productCertificationService.createCbChangeRequest(id, dto, user.id);
    }
    async approveCbChangeRequest(requestId, dto, user) {
        return this.productCertificationService.reviewCbChangeRequest(requestId, enums_1.CbChangeRequestStatus.APPROVED, dto.decisionReason, user.id);
    }
    async rejectCbChangeRequest(requestId, dto, user) {
        return this.productCertificationService.reviewCbChangeRequest(requestId, enums_1.CbChangeRequestStatus.REJECTED, dto.decisionReason, user.id);
    }
    async delete(id, user) {
        const application = await this.productCertificationService.findById(id);
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.ARSO_SECRETARIAT);
        if (!isAdmin && userRoles.includes(enums_1.UserRole.OPERATOR)) {
            const myOperator = await this.operatorService.findByUserId(user.id);
            if (!myOperator || application.operatorId !== myOperator.id) {
                throw new common_1.ForbiddenException('You can only delete your own applications');
            }
        }
        await this.productCertificationService.deleteApplication(id, user.id);
        return { message: 'Product certification application deleted successfully' };
    }
};
exports.ProductCertificationController = ProductCertificationController;
__decorate([
    (0, common_1.Get)('directory'),
    (0, public_decorator_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductCertificationController.prototype, "publicDirectory", null);
__decorate([
    (0, common_1.Post)('applications'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.OPERATOR, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateProductCertificationApplicationDto, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], ProductCertificationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('applications'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.OPERATOR, enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], ProductCertificationController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('applications/:id'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.OPERATOR, enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], ProductCertificationController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)('applications/:id'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.OPERATOR, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateProductCertificationApplicationDto,
        system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], ProductCertificationController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('applications/:id/submit'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.OPERATOR, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], ProductCertificationController.prototype, "submit", null);
__decorate([
    (0, common_1.Post)('applications/:id/agreements/:agreementType/upload'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.OPERATOR, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    (0, common_2.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('agreementType')),
    __param(2, (0, common_2.UploadedFile)()),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, dtos_1.UploadCertificationAgreementDto,
        system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], ProductCertificationController.prototype, "uploadAgreement", null);
__decorate([
    (0, common_1.Get)('applications/:id/agreements'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.OPERATOR, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductCertificationController.prototype, "listAgreements", null);
__decorate([
    (0, common_1.Post)('agreements/:agreementId/approve'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Param)('agreementId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], ProductCertificationController.prototype, "approveAgreement", null);
__decorate([
    (0, common_1.Post)('agreements/:agreementId/reject'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Param)('agreementId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], ProductCertificationController.prototype, "rejectAgreement", null);
__decorate([
    (0, common_1.Post)('applications/:id/cb-change-requests'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.OPERATOR, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.CreateCbChangeRequestDto,
        system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], ProductCertificationController.prototype, "createCbChangeRequest", null);
__decorate([
    (0, common_1.Post)('cb-change-requests/:requestId/approve'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Param)('requestId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.ReviewCbChangeRequestDto,
        system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], ProductCertificationController.prototype, "approveCbChangeRequest", null);
__decorate([
    (0, common_1.Post)('cb-change-requests/:requestId/reject'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Param)('requestId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.ReviewCbChangeRequestDto,
        system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], ProductCertificationController.prototype, "rejectCbChangeRequest", null);
__decorate([
    (0, common_1.Delete)('applications/:id'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.OPERATOR, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], ProductCertificationController.prototype, "delete", null);
exports.ProductCertificationController = ProductCertificationController = __decorate([
    (0, common_1.Controller)('product-certifications'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [product_certification_service_1.ProductCertificationService,
        operator_service_1.OperatorService])
], ProductCertificationController);
//# sourceMappingURL=product-certification.controller.js.map