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
exports.MarkLicenseApplicationController = void 0;
const common_1 = require("@nestjs/common");
const mark_license_application_service_1 = require("../services/mark-license-application.service");
const dtos_1 = require("../dtos");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const enums_1 = require("../../../shared/enums");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const system_user_entity_1 = require("../../system-user/system-user.entity");
let MarkLicenseApplicationController = class MarkLicenseApplicationController {
    constructor(applicationService) {
        this.applicationService = applicationService;
    }
    create(dto, user) {
        return this.applicationService.createApplication(dto, user.id);
    }
    getById(id) {
        return this.applicationService.findById(id);
    }
    update(id, dto, user) {
        return this.applicationService.updateApplication(id, dto, user.id);
    }
    submit(id, dto, user) {
        return this.applicationService.submitApplication(id, dto, user.id);
    }
    getApplications(nsbId, includeDrafts = 'true', user) {
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.ARSO_SECRETARIAT);
        if (!isAdmin && (userRoles.includes(enums_1.UserRole.NSB_ADMIN) || userRoles.includes(enums_1.UserRole.NSB_USER))) {
            if (!nsbId) {
                throw new Error('nsbId parameter is required for NSB users');
            }
        }
        return this.applicationService.getApplicationsByNsb(nsbId, includeDrafts === 'true');
    }
    delete(id, user) {
        return this.applicationService.deleteDraft(id, user.id);
    }
};
exports.MarkLicenseApplicationController = MarkLicenseApplicationController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateMarkLicenseApplicationDto,
        system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], MarkLicenseApplicationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarkLicenseApplicationController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateMarkLicenseApplicationDto,
        system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], MarkLicenseApplicationController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/submit'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.SubmitMarkLicenseApplicationDto,
        system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], MarkLicenseApplicationController.prototype, "submit", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Query)('nsbId')),
    __param(1, (0, common_1.Query)('includeDrafts')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], MarkLicenseApplicationController.prototype, "getApplications", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], MarkLicenseApplicationController.prototype, "delete", null);
exports.MarkLicenseApplicationController = MarkLicenseApplicationController = __decorate([
    (0, common_1.Controller)('mark-licenses/applications'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __metadata("design:paramtypes", [mark_license_application_service_1.MarkLicenseApplicationService])
], MarkLicenseApplicationController);
//# sourceMappingURL=mark-license-application.controller.js.map