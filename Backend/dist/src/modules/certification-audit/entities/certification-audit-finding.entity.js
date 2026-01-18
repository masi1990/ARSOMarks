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
exports.CertificationAuditFinding = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../shared/enums");
const certification_audit_entity_1 = require("./certification-audit.entity");
const corrective_action_entity_1 = require("./corrective-action.entity");
const system_user_entity_1 = require("../../system-user/system-user.entity");
let CertificationAuditFinding = class CertificationAuditFinding {
};
exports.CertificationAuditFinding = CertificationAuditFinding;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CertificationAuditFinding.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'audit_id', type: 'uuid' }),
    __metadata("design:type", String)
], CertificationAuditFinding.prototype, "auditId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => certification_audit_entity_1.CertificationAudit, (audit) => audit.findings, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'audit_id' }),
    __metadata("design:type", certification_audit_entity_1.CertificationAudit)
], CertificationAuditFinding.prototype, "audit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'finding_type', type: 'enum', enum: enums_1.AuditFindingType }),
    __metadata("design:type", String)
], CertificationAuditFinding.prototype, "findingType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], CertificationAuditFinding.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'deadline_date', type: 'date', nullable: true }),
    __metadata("design:type", String)
], CertificationAuditFinding.prototype, "deadlineDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.AuditFindingStatus, default: enums_1.AuditFindingStatus.OPEN }),
    __metadata("design:type", String)
], CertificationAuditFinding.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'closed_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], CertificationAuditFinding.prototype, "closedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], CertificationAuditFinding.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], CertificationAuditFinding.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], CertificationAuditFinding.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], CertificationAuditFinding.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => corrective_action_entity_1.CorrectiveAction, (action) => action.finding, { cascade: true }),
    __metadata("design:type", Array)
], CertificationAuditFinding.prototype, "correctiveActions", void 0);
exports.CertificationAuditFinding = CertificationAuditFinding = __decorate([
    (0, typeorm_1.Entity)('certification_audit_findings')
], CertificationAuditFinding);
//# sourceMappingURL=certification-audit-finding.entity.js.map