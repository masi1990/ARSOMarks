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
exports.MarkLicenseModificationController = void 0;
const common_1 = require("@nestjs/common");
const mark_license_modification_service_1 = require("../services/mark-license-modification.service");
const dtos_1 = require("../dtos");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const enums_1 = require("../../../shared/enums");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const system_user_entity_1 = require("../../system-user/system-user.entity");
let MarkLicenseModificationController = class MarkLicenseModificationController {
    constructor(modificationService) {
        this.modificationService = modificationService;
    }
    requestModification(dto, user) {
        return this.modificationService.requestModification(dto, user.id);
    }
    getById(id) {
        return this.modificationService.findById(id);
    }
    approve(id, dto, user) {
        return this.modificationService.approveModification(id, dto, user.id);
    }
    reject(id, dto, user) {
        return this.modificationService.rejectModification(id, dto, user.id);
    }
    getModificationHistory(licenseId) {
        if (!licenseId) {
            throw new Error('licenseId parameter is required');
        }
        return this.modificationService.getModificationHistory(licenseId);
    }
};
exports.MarkLicenseModificationController = MarkLicenseModificationController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateLicenseModificationDto,
        system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], MarkLicenseModificationController.prototype, "requestModification", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarkLicenseModificationController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.ApproveModificationDto,
        system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], MarkLicenseModificationController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)(':id/reject'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.RejectModificationDto,
        system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], MarkLicenseModificationController.prototype, "reject", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Query)('licenseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarkLicenseModificationController.prototype, "getModificationHistory", null);
exports.MarkLicenseModificationController = MarkLicenseModificationController = __decorate([
    (0, common_1.Controller)('mark-licenses/modifications'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __metadata("design:paramtypes", [mark_license_modification_service_1.MarkLicenseModificationService])
], MarkLicenseModificationController);
//# sourceMappingURL=mark-license-modification.controller.js.map