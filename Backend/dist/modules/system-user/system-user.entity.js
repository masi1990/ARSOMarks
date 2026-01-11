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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemUser = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../shared/enums");
let SystemUser = class SystemUser {
};
exports.SystemUser = SystemUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SystemUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 255 }),
    __metadata("design:type", String)
], SystemUser.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'full_name', length: 255 }),
    __metadata("design:type", String)
], SystemUser.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.UserRole,
        nullable: true,
    }),
    __metadata("design:type", String)
], SystemUser.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], SystemUser.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password_hash', nullable: true, length: 255 }),
    __metadata("design:type", String)
], SystemUser.prototype, "passwordHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password_reset_token', nullable: true, length: 255 }),
    __metadata("design:type", String)
], SystemUser.prototype, "passwordResetToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password_reset_expires', nullable: true, type: 'timestamp' }),
    __metadata("design:type", Date)
], SystemUser.prototype, "passwordResetExpires", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email_verified', default: false }),
    __metadata("design:type", Boolean)
], SystemUser.prototype, "emailVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email_verification_token', nullable: true, length: 255 }),
    __metadata("design:type", String)
], SystemUser.prototype, "emailVerificationToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_login', nullable: true, type: 'timestamp' }),
    __metadata("design:type", Date)
], SystemUser.prototype, "lastLogin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'failed_login_attempts', default: 0 }),
    __metadata("design:type", Number)
], SystemUser.prototype, "failedLoginAttempts", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'locked_until', nullable: true, type: 'timestamp' }),
    __metadata("design:type", Date)
], SystemUser.prototype, "lockedUntil", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 50 }),
    __metadata("design:type", String)
], SystemUser.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organization_id', nullable: true, type: 'uuid' }),
    __metadata("design:type", String)
], SystemUser.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organization_type', nullable: true, length: 50 }),
    __metadata("design:type", String)
], SystemUser.prototype, "organizationType", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], SystemUser.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], SystemUser.prototype, "updatedAt", void 0);
exports.SystemUser = SystemUser = __decorate([
    (0, typeorm_1.Entity)('system_users')
], SystemUser);
//# sourceMappingURL=system-user.entity.js.map