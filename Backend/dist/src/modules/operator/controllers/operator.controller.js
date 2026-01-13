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
exports.OperatorController = void 0;
const common_1 = require("@nestjs/common");
const operator_service_1 = require("../services/operator.service");
const dtos_1 = require("../dtos");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const enums_1 = require("../../../shared/enums");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const system_user_entity_1 = require("../../system-user/system-user.entity");
let OperatorController = class OperatorController {
    constructor(operatorService) {
        this.operatorService = operatorService;
        console.log('✓ OperatorController initialized');
    }
    async create(dto, user) {
        const existingOperator = await this.operatorService.findByUserId(user.id);
        if (existingOperator) {
            throw new common_1.ForbiddenException('You already have an operator registration');
        }
        dto.userId = user.id;
        return this.operatorService.createOperatorRegistration(dto, user.id);
    }
    async getMyOperator(user) {
        const operator = await this.operatorService.findByUserId(user.id);
        if (!operator) {
            return null;
        }
        return operator;
    }
    async list(query, user) {
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.NSB_ADMIN);
        if (!isAdmin && userRoles.includes(enums_1.UserRole.OPERATOR)) {
            const myOperator = await this.operatorService.findByUserId(user.id);
            if (myOperator) {
                return { data: [myOperator], total: 1 };
            }
            return { data: [], total: 0 };
        }
        const { status, countryId, skip = 0, limit = 25 } = query;
        const filters = {
            skip: Number(skip),
            limit: Number(limit),
        };
        if (status) {
            filters.status = status;
        }
        if (countryId) {
            filters.countryId = countryId;
        }
        return this.operatorService.findAll(filters);
    }
    async getById(id, user) {
        const operator = await this.operatorService.findById(id);
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.NSB_ADMIN);
        if (!isAdmin && userRoles.includes(enums_1.UserRole.OPERATOR)) {
            if (operator.userId !== user.id) {
                throw new common_1.ForbiddenException('You can only access your own operator registration');
            }
        }
        return operator;
    }
    async update(id, dto, user) {
        const operator = await this.operatorService.findById(id);
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.NSB_ADMIN);
        if (!isAdmin && userRoles.includes(enums_1.UserRole.OPERATOR)) {
            if (operator.userId !== user.id) {
                throw new common_1.ForbiddenException('You can only update your own operator registration');
            }
        }
        return this.operatorService.updateOperatorRegistration(id, dto, user.id);
    }
    async submit(id, user) {
        const operator = await this.operatorService.findById(id);
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.NSB_ADMIN);
        if (!isAdmin && userRoles.includes(enums_1.UserRole.OPERATOR)) {
            if (operator.userId !== user.id) {
                throw new common_1.ForbiddenException('You can only submit your own operator registration');
            }
        }
        return this.operatorService.submitOperatorRegistration(id, user.id);
    }
    async delete(id, user) {
        const operator = await this.operatorService.findById(id);
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.NSB_ADMIN);
        if (!isAdmin && userRoles.includes(enums_1.UserRole.OPERATOR)) {
            if (operator.userId !== user.id) {
                throw new common_1.ForbiddenException('You can only delete your own operator registration');
            }
        }
        await this.operatorService.deleteOperator(id, user.id);
        return { message: 'Operator registration deleted successfully' };
    }
};
exports.OperatorController = OperatorController;
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateOperatorRegistrationDraftDto, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], OperatorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('my-operator'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], OperatorController.prototype, "getMyOperator", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.OPERATOR),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], OperatorController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.OPERATOR),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], OperatorController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.OPERATOR, enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateOperatorRegistrationDto, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], OperatorController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/submit'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.OPERATOR, enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], OperatorController.prototype, "submit", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.OPERATOR, enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], OperatorController.prototype, "delete", null);
exports.OperatorController = OperatorController = __decorate([
    (0, common_1.Controller)('operators'),
    __metadata("design:paramtypes", [operator_service_1.OperatorService])
], OperatorController);
//# sourceMappingURL=operator.controller.js.map