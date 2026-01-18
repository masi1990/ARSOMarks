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
exports.CbComplianceController = void 0;
const common_1 = require("@nestjs/common");
const cb_compliance_service_1 = require("../services/cb-compliance.service");
const dtos_1 = require("../dtos");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const enums_1 = require("../../../shared/enums");
let CbComplianceController = class CbComplianceController {
    constructor(complianceService) {
        this.complianceService = complianceService;
    }
    getProfile(cbApplicationId) {
        return this.complianceService.getProfile(cbApplicationId);
    }
    upsertProfile(cbApplicationId, dto) {
        return this.complianceService.upsertProfile(cbApplicationId, dto);
    }
};
exports.CbComplianceController = CbComplianceController;
__decorate([
    (0, common_1.Get)(':cbApplicationId'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('cbApplicationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CbComplianceController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)(':cbApplicationId'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CB_ADMIN, enums_1.UserRole.CB_USER, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('cbApplicationId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpsertCbComplianceProfileDto]),
    __metadata("design:returntype", void 0)
], CbComplianceController.prototype, "upsertProfile", null);
exports.CbComplianceController = CbComplianceController = __decorate([
    (0, common_1.Controller)('cb-compliance'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __metadata("design:paramtypes", [cb_compliance_service_1.CbComplianceService])
], CbComplianceController);
//# sourceMappingURL=cb-compliance.controller.js.map