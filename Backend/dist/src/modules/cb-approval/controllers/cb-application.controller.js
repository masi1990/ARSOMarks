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
exports.CbApplicationController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const cb_application_service_1 = require("../services/cb-application.service");
const dtos_1 = require("../dtos");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const system_user_entity_1 = require("../../system-user/system-user.entity");
const enums_1 = require("../../../shared/enums");
let CbApplicationController = class CbApplicationController {
    constructor(cbApplicationService) {
        this.cbApplicationService = cbApplicationService;
    }
    createDraft(dto, user) {
        return this.cbApplicationService.createDraft(dto, user.id);
    }
    create(dto, user) {
        return this.cbApplicationService.create(dto, user.id);
    }
    update(id, dto, user) {
        return this.cbApplicationService.updateDraft(id, dto, user.id);
    }
    submit(id, user) {
        return this.cbApplicationService.submit(id, user.id);
    }
    approve(id, user) {
        return this.cbApplicationService.approve(id, user.id);
    }
    reject(id, body, user) {
        if (!(body === null || body === void 0 ? void 0 : body.reason)) {
            throw new common_1.BadRequestException('Rejection reason is required');
        }
        return this.cbApplicationService.reject(id, body.reason, user.id);
    }
    updateStatus(id, dto, user) {
        return this.cbApplicationService.updateLifecycle(id, dto, user.id);
    }
    getMyApplications(user) {
        return this.cbApplicationService.findByUserId(user.id);
    }
    list(query) {
        const { status, search, skip = 0, limit = 25 } = query;
        const filters = {
            status: status,
            search,
            skip: Number(skip),
            limit: Number(limit),
        };
        return this.cbApplicationService.list(filters);
    }
    getById(id) {
        return this.cbApplicationService.findById(id);
    }
    uploadDocument(id, file, body, user) {
        if (!file) {
            throw new common_1.BadRequestException('File is required');
        }
        if (!(body === null || body === void 0 ? void 0 : body.documentType)) {
            throw new common_1.BadRequestException('Document type is required');
        }
        if (!Object.values(enums_1.CbDocumentType).includes(body.documentType)) {
            throw new common_1.BadRequestException('Invalid document type');
        }
        return this.cbApplicationService.uploadDocument(id, file, body.documentType, user.id);
    }
    listDocuments(id) {
        return this.cbApplicationService.listDocuments(id);
    }
};
exports.CbApplicationController = CbApplicationController;
__decorate([
    (0, common_1.Post)('draft'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER, enums_1.UserRole.PUBLIC),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateCbApplicationDraftDto, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], CbApplicationController.prototype, "createDraft", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER, enums_1.UserRole.PUBLIC),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateCbApplicationDto, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], CbApplicationController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER, enums_1.UserRole.PUBLIC),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateCbApplicationDto, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], CbApplicationController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/submit'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER, enums_1.UserRole.PUBLIC),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], CbApplicationController.prototype, "submit", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], CbApplicationController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)(':id/reject'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], CbApplicationController.prototype, "reject", null);
__decorate([
    (0, common_1.Post)(':id/status'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateCbStatusDto, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], CbApplicationController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)('my-applications'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER, enums_1.UserRole.PUBLIC),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], CbApplicationController.prototype, "getMyApplications", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CbApplicationController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER, enums_1.UserRole.PUBLIC),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CbApplicationController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(':id/documents'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER, enums_1.UserRole.PUBLIC),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, dtos_1.UploadCbApplicationDocumentDto,
        system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], CbApplicationController.prototype, "uploadDocument", null);
__decorate([
    (0, common_1.Get)(':id/documents'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER, enums_1.UserRole.PUBLIC),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CbApplicationController.prototype, "listDocuments", null);
exports.CbApplicationController = CbApplicationController = __decorate([
    (0, common_1.Controller)('cb-applications'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [cb_application_service_1.CbApplicationService])
], CbApplicationController);
//# sourceMappingURL=cb-application.controller.js.map