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
exports.RoleRequestController = void 0;
const common_1 = require("@nestjs/common");
const role_request_service_1 = require("../services/role-request.service");
const dtos_1 = require("../dtos");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const enums_1 = require("../../../shared/enums");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const system_user_entity_1 = require("../../system-user/system-user.entity");
let RoleRequestController = class RoleRequestController {
    constructor(roleRequestService) {
        this.roleRequestService = roleRequestService;
    }
    async create(user, dto) {
        return this.roleRequestService.create(user, dto);
    }
    async listMine(user) {
        return this.roleRequestService.listMine(user);
    }
    async listAll() {
        return this.roleRequestService.listAll();
    }
    async decide(id, reviewer, dto) {
        return this.roleRequestService.decide(id, reviewer, dto);
    }
};
exports.RoleRequestController = RoleRequestController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [system_user_entity_1.SystemUser, dtos_1.CreateRoleRequestDto]),
    __metadata("design:returntype", Promise)
], RoleRequestController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], RoleRequestController.prototype, "listMine", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoleRequestController.prototype, "listAll", null);
__decorate([
    (0, common_1.Post)(':id/decision'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, system_user_entity_1.SystemUser, dtos_1.DecideRoleRequestDto]),
    __metadata("design:returntype", Promise)
], RoleRequestController.prototype, "decide", null);
exports.RoleRequestController = RoleRequestController = __decorate([
    (0, common_1.Controller)('auth/role-requests'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [role_request_service_1.RoleRequestService])
], RoleRequestController);
//# sourceMappingURL=role-request.controller.js.map