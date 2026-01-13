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
exports.MarkLicenseAgreementController = void 0;
const common_1 = require("@nestjs/common");
const mark_license_agreement_service_1 = require("../services/mark-license-agreement.service");
const dtos_1 = require("../dtos");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const enums_1 = require("../../../shared/enums");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const system_user_entity_1 = require("../../system-user/system-user.entity");
let MarkLicenseAgreementController = class MarkLicenseAgreementController {
    constructor(agreementService) {
        this.agreementService = agreementService;
    }
    generateAgreement(dto, user) {
        return this.agreementService.generateAgreement(dto, user.id);
    }
    getById(id) {
        return this.agreementService.findById(id);
    }
    getByAgreementId(agreementId) {
        return this.agreementService.findByAgreementId(agreementId);
    }
    signAgreement(id, dto, user, req) {
        const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        return this.agreementService.signAgreement(Object.assign(Object.assign({}, dto), { agreementId: id }), user.id, typeof ipAddress === 'string' ? ipAddress : ipAddress === null || ipAddress === void 0 ? void 0 : ipAddress[0]);
    }
    arsoSignAgreement(id, body, user) {
        return this.agreementService.arsoSignAgreement(id, body.arsoSignerName, body.arsoSignerTitle, user.id);
    }
    getActiveAgreements(nsbId) {
        if (!nsbId) {
            throw new Error('nsbId parameter is required');
        }
        return this.agreementService.getActiveAgreementsByNsb(nsbId);
    }
    getExpiringAgreements(daysBeforeExpiry = '30') {
        return this.agreementService.checkExpiringAgreements(parseInt(daysBeforeExpiry, 10));
    }
};
exports.MarkLicenseAgreementController = MarkLicenseAgreementController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateMarkLicenseAgreementDto,
        system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], MarkLicenseAgreementController.prototype, "generateAgreement", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarkLicenseAgreementController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)('by-agreement-id/:agreementId'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('agreementId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarkLicenseAgreementController.prototype, "getByAgreementId", null);
__decorate([
    (0, common_1.Post)(':id/sign'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.SignAgreementDto,
        system_user_entity_1.SystemUser, Object]),
    __metadata("design:returntype", void 0)
], MarkLicenseAgreementController.prototype, "signAgreement", null);
__decorate([
    (0, common_1.Post)(':id/arso-sign'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], MarkLicenseAgreementController.prototype, "arsoSignAgreement", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Query)('nsbId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarkLicenseAgreementController.prototype, "getActiveAgreements", null);
__decorate([
    (0, common_1.Get)('expiring'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Query)('daysBeforeExpiry')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarkLicenseAgreementController.prototype, "getExpiringAgreements", null);
exports.MarkLicenseAgreementController = MarkLicenseAgreementController = __decorate([
    (0, common_1.Controller)('mark-licenses/agreements'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __metadata("design:paramtypes", [mark_license_agreement_service_1.MarkLicenseAgreementService])
], MarkLicenseAgreementController);
//# sourceMappingURL=mark-license-agreement.controller.js.map