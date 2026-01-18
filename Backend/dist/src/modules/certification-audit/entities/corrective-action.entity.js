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
exports.CorrectiveAction = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../shared/enums");
const certification_audit_finding_entity_1 = require("./certification-audit-finding.entity");
const system_user_entity_1 = require("../../system-user/system-user.entity");
let CorrectiveAction = class CorrectiveAction {
};
exports.CorrectiveAction = CorrectiveAction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CorrectiveAction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'finding_id', type: 'uuid' }),
    __metadata("design:type", String)
], CorrectiveAction.prototype, "findingId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => certification_audit_finding_entity_1.CertificationAuditFinding, (finding) => finding.correctiveActions, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'finding_id' }),
    __metadata("design:type", certification_audit_finding_entity_1.CertificationAuditFinding)
], CorrectiveAction.prototype, "finding", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], CorrectiveAction.prototype, "actionPlan", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'evidence_notes', type: 'text', nullable: true }),
    __metadata("design:type", String)
], CorrectiveAction.prototype, "evidenceNotes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'evidence_files', type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], CorrectiveAction.prototype, "evidenceFiles", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.CorrectiveActionStatus, default: enums_1.CorrectiveActionStatus.PENDING }),
    __metadata("design:type", String)
], CorrectiveAction.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'verified_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], CorrectiveAction.prototype, "verifiedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'verified_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], CorrectiveAction.prototype, "verifiedByUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'verified_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], CorrectiveAction.prototype, "verifiedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'decision_notes', type: 'text', nullable: true }),
    __metadata("design:type", String)
], CorrectiveAction.prototype, "decisionNotes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], CorrectiveAction.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], CorrectiveAction.prototype, "updatedAt", void 0);
exports.CorrectiveAction = CorrectiveAction = __decorate([
    (0, typeorm_1.Entity)('corrective_actions')
], CorrectiveAction);
//# sourceMappingURL=corrective-action.entity.js.map