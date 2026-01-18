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
exports.NsbRegistrationRequestController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const nsb_registration_request_service_1 = require("../services/nsb-registration-request.service");
const dtos_1 = require("../dtos");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const enums_1 = require("../../../shared/enums");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const system_user_entity_1 = require("../../system-user/system-user.entity");
const enums_2 = require("../../../shared/enums");
let NsbRegistrationRequestController = class NsbRegistrationRequestController {
    constructor(requestService) {
        this.requestService = requestService;
    }
    create(dto, user) {
        return this.requestService.create(dto, user.id);
    }
    list(query, user) {
        const { countryId, status, search, skip = 0, limit = 25 } = query;
        const userRoles = user.roles && user.roles.length > 0 ? user.roles : user.role ? [user.role] : [];
        const isApprover = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.ARSO_SECRETARIAT);
        const filter = {
            countryId,
            status,
            search,
            skip: Number(skip),
            limit: Number(limit),
            createdBy: isApprover ? undefined : user.id,
        };
        return this.requestService.findAll(filter);
    }
    getMyRequest(user, countryId) {
        const targetCountryId = countryId || user.countryId;
        if (!targetCountryId) {
            throw new common_1.ForbiddenException('Country ID is required');
        }
        return this.requestService.findByCountry(targetCountryId);
    }
    getById(id, user) {
        return this.requestService.findById(id);
    }
    update(id, dto, user) {
        const userRole = user.roles && user.roles.length > 0 ? user.roles[0] : user.role;
        return this.requestService.update(id, dto, user.id, userRole);
    }
    submit(id, user) {
        return this.requestService.submit(id, user.id);
    }
    approve(id, body, user) {
        return this.requestService.approve(id, user.id, body.remarks);
    }
    reject(id, body, user) {
        if (!body.remarks) {
            throw new common_1.ForbiddenException('Remarks are required when rejecting a request');
        }
        return this.requestService.reject(id, user.id, body.remarks);
    }
    async uploadDocument(id, file, body, user) {
        if (!file) {
            throw new common_1.BadRequestException('File is required');
        }
        if (!body.documentType) {
            throw new common_1.BadRequestException('Document type is required');
        }
        if (!Object.values(enums_2.NsbDocumentType).includes(body.documentType)) {
            throw new common_1.BadRequestException('Invalid document type');
        }
        return this.requestService.uploadDocument(id, file, body.documentType, user.id);
    }
    async deleteDocument(id, documentId, user) {
        return this.requestService.deleteDocument(id, documentId, user.id);
    }
    async deleteRequest(id) {
        await this.requestService.deleteRequest(id);
        return { message: 'Registration request deleted successfully' };
    }
    async viewDocument(id, documentId, res, user) {
        const document = await this.requestService.getDocument(id, documentId);
        const fileBuffer = await this.requestService.getDocumentFile(document.filePath);
        res.setHeader('Content-Type', document.mimeType || 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="${document.fileName}"`);
        res.send(fileBuffer);
    }
};
exports.NsbRegistrationRequestController = NsbRegistrationRequestController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.PUBLIC, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateNsbRegistrationRequestDto, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], NsbRegistrationRequestController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], NsbRegistrationRequestController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('my-request'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.PUBLIC, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('countryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [system_user_entity_1.SystemUser, String]),
    __metadata("design:returntype", void 0)
], NsbRegistrationRequestController.prototype, "getMyRequest", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.PUBLIC, enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], NsbRegistrationRequestController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.PUBLIC, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateNsbRegistrationRequestDto, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], NsbRegistrationRequestController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/submit'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.PUBLIC, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], NsbRegistrationRequestController.prototype, "submit", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], NsbRegistrationRequestController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)(':id/reject'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], NsbRegistrationRequestController.prototype, "reject", null);
__decorate([
    (0, common_1.Post)(':id/documents'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.PUBLIC, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], NsbRegistrationRequestController.prototype, "uploadDocument", null);
__decorate([
    (0, common_1.Delete)(':id/documents/:documentId'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.PUBLIC, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('documentId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], NsbRegistrationRequestController.prototype, "deleteDocument", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NsbRegistrationRequestController.prototype, "deleteRequest", null);
__decorate([
    (0, common_1.Get)(':id/documents/:documentId/view'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER, enums_1.UserRole.PUBLIC),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('documentId')),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], NsbRegistrationRequestController.prototype, "viewDocument", null);
exports.NsbRegistrationRequestController = NsbRegistrationRequestController = __decorate([
    (0, common_1.Controller)('nsb-registration-requests'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [nsb_registration_request_service_1.NsbRegistrationRequestService])
], NsbRegistrationRequestController);
//# sourceMappingURL=nsb-registration-request.controller.js.map