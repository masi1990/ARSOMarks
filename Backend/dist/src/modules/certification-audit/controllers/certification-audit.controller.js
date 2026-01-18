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
exports.CertificationAuditController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const system_user_entity_1 = require("../../system-user/system-user.entity");
const enums_1 = require("../../../shared/enums");
const certification_audit_service_1 = require("../services/certification-audit.service");
const dtos_1 = require("../dtos");
let CertificationAuditController = class CertificationAuditController {
    constructor(auditService) {
        this.auditService = auditService;
    }
    createAudit(dto, user) {
        return this.auditService.createAudit(dto, user.id);
    }
    updateAudit(id, dto, user) {
        return this.auditService.updateAudit(id, dto, user.id);
    }
    completeAudit(id, user) {
        return this.auditService.markAuditComplete(id, user.id);
    }
    listAudits(applicationId) {
        return this.auditService.listAudits({ applicationId });
    }
    getAudit(id) {
        return this.auditService.getAudit(id);
    }
    addFinding(dto, user) {
        return this.auditService.addFinding(dto, user.id);
    }
    closeFinding(id, user) {
        return this.auditService.closeFinding(id, user.id);
    }
    addCorrectiveAction(dto, user) {
        return this.auditService.addCorrectiveAction(dto, user.id);
    }
    updateCorrectiveActionStatus(id, dto, user) {
        return this.auditService.updateCorrectiveActionStatus(id, dto, user.id);
    }
    addSampling(dto, user) {
        return this.auditService.addSamplingRecord(dto, user.id);
    }
    addTestResult(dto) {
        return this.auditService.addTestResult(dto);
    }
    createLaboratory(dto) {
        return this.auditService.createLaboratory(dto);
    }
    listLaboratories() {
        return this.auditService.listLaboratories();
    }
};
exports.CertificationAuditController = CertificationAuditController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateCertificationAuditDto, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], CertificationAuditController.prototype, "createAudit", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateCertificationAuditDto, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], CertificationAuditController.prototype, "updateAudit", null);
__decorate([
    (0, common_1.Post)(':id/complete'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], CertificationAuditController.prototype, "completeAudit", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Query)('applicationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CertificationAuditController.prototype, "listAudits", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CertificationAuditController.prototype, "getAudit", null);
__decorate([
    (0, common_1.Post)('findings'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateAuditFindingDto, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], CertificationAuditController.prototype, "addFinding", null);
__decorate([
    (0, common_1.Post)('findings/:id/close'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], CertificationAuditController.prototype, "closeFinding", null);
__decorate([
    (0, common_1.Post)('corrective-actions'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateCorrectiveActionDto, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], CertificationAuditController.prototype, "addCorrectiveAction", null);
__decorate([
    (0, common_1.Post)('corrective-actions/:id/status'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateCorrectiveActionStatusDto,
        system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], CertificationAuditController.prototype, "updateCorrectiveActionStatus", null);
__decorate([
    (0, common_1.Post)('sampling'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateSamplingRecordDto, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], CertificationAuditController.prototype, "addSampling", null);
__decorate([
    (0, common_1.Post)('test-results'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateTestResultDto]),
    __metadata("design:returntype", void 0)
], CertificationAuditController.prototype, "addTestResult", null);
__decorate([
    (0, common_1.Post)('laboratories'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateLaboratoryDto]),
    __metadata("design:returntype", void 0)
], CertificationAuditController.prototype, "createLaboratory", null);
__decorate([
    (0, common_1.Get)('laboratories/list'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CertificationAuditController.prototype, "listLaboratories", null);
exports.CertificationAuditController = CertificationAuditController = __decorate([
    (0, common_1.Controller)('certification-audits'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [certification_audit_service_1.CertificationAuditService])
], CertificationAuditController);
//# sourceMappingURL=certification-audit.controller.js.map