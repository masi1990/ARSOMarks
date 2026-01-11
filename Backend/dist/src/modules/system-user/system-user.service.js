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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var SystemUserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemUserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const system_user_entity_1 = require("./system-user.entity");
const enums_1 = require("../../shared/enums");
const email_service_1 = require("../auth/services/email.service");
let SystemUserService = SystemUserService_1 = class SystemUserService {
    constructor(userRepository, emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.logger = new common_1.Logger(SystemUserService_1.name);
    }
    async findAll() {
        return this.userRepository.find({
            order: { createdAt: 'DESC' },
            select: [
                'id',
                'email',
                'fullName',
                'role',
                'roles',
                'organizationType',
                'organizationId',
                'countryId',
                'isActive',
                'emailVerified',
                'createdAt',
                'lastLogin',
            ],
        });
    }
    async assignRoles(userId, dto) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (dto.roles.length === 0) {
            throw new common_1.BadRequestException('At least one role is required');
        }
        const currentRoles = Array.isArray(user.roles) ? user.roles : [];
        const uniqueRoles = Array.from(new Set([...currentRoles, ...dto.roles]));
        user.roles = uniqueRoles;
        if (!user.role || user.role === enums_1.UserRole.PUBLIC) {
            user.role = dto.roles[0];
        }
        else if (!uniqueRoles.includes(user.role)) {
            user.role = dto.roles[0];
        }
        await this.userRepository.save(user);
        try {
            const assignedRolesNames = dto.roles.map(role => role.toString());
            await this.emailService.sendRoleAssignmentNotification(user.email, user.fullName, assignedRolesNames, dto.note);
        }
        catch (error) {
            this.logger.warn(`Failed to send role assignment notification email to ${user.email}: ${error.message}`);
        }
        const { passwordHash, passwordResetToken, passwordResetExpires } = user, userWithoutSensitive = __rest(user, ["passwordHash", "passwordResetToken", "passwordResetExpires"]);
        return userWithoutSensitive;
    }
    async removeRoles(userId, rolesToRemove) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const currentRoles = Array.isArray(user.roles) ? user.roles : [];
        user.roles = currentRoles.filter(role => !rolesToRemove.includes(role));
        if (user.roles.length === 0) {
            user.roles = [enums_1.UserRole.PUBLIC];
        }
        if (rolesToRemove.includes(user.role)) {
            user.role = user.roles[0] || enums_1.UserRole.PUBLIC;
        }
        await this.userRepository.save(user);
        const { passwordHash, passwordResetToken, passwordResetExpires } = user, userWithoutSensitive = __rest(user, ["passwordHash", "passwordResetToken", "passwordResetExpires"]);
        return userWithoutSensitive;
    }
};
exports.SystemUserService = SystemUserService;
exports.SystemUserService = SystemUserService = SystemUserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(system_user_entity_1.SystemUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        email_service_1.EmailService])
], SystemUserService);
//# sourceMappingURL=system-user.service.js.map