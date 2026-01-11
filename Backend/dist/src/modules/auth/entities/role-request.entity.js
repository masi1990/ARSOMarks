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
exports.RoleRequest = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../shared/enums");
const system_user_entity_1 = require("../../system-user/system-user.entity");
let RoleRequest = class RoleRequest {
};
exports.RoleRequest = RoleRequest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RoleRequest.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], RoleRequest.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'uuid' }),
    __metadata("design:type", String)
], RoleRequest.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'requested_roles',
        type: 'enum',
        enum: enums_1.UserRole,
        array: true,
    }),
    __metadata("design:type", Array)
], RoleRequest.prototype, "requestedRoles", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.RoleRequestStatus,
        default: enums_1.RoleRequestStatus.PENDING,
    }),
    __metadata("design:type", String)
], RoleRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'decision_note', type: 'text', nullable: true }),
    __metadata("design:type", String)
], RoleRequest.prototype, "decisionNote", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reviewed_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], RoleRequest.prototype, "reviewedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reviewed_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], RoleRequest.prototype, "reviewedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], RoleRequest.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], RoleRequest.prototype, "updatedAt", void 0);
exports.RoleRequest = RoleRequest = __decorate([
    (0, typeorm_1.Entity)('role_requests')
], RoleRequest);
//# sourceMappingURL=role-request.entity.js.map