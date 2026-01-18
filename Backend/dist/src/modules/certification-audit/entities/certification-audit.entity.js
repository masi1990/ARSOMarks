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
exports.CertificationAudit = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../shared/enums");
const product_certification_application_entity_1 = require("../../product-certification/entities/product-certification-application.entity");
const system_user_entity_1 = require("../../system-user/system-user.entity");
const certification_audit_finding_entity_1 = require("./certification-audit-finding.entity");
const sampling_record_entity_1 = require("./sampling-record.entity");
let CertificationAudit = class CertificationAudit {
};
exports.CertificationAudit = CertificationAudit;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CertificationAudit.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'application_id', type: 'uuid' }),
    __metadata("design:type", String)
], CertificationAudit.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_certification_application_entity_1.ProductCertificationApplication, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'application_id' }),
    __metadata("design:type", product_certification_application_entity_1.ProductCertificationApplication)
], CertificationAudit.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'audit_type', type: 'enum', enum: enums_1.CertificationAuditType }),
    __metadata("design:type", String)
], CertificationAudit.prototype, "auditType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.ComplianceStatus, default: enums_1.ComplianceStatus.SCHEDULED }),
    __metadata("design:type", String)
], CertificationAudit.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'planned_date', type: 'date', nullable: true }),
    __metadata("design:type", String)
], CertificationAudit.prototype, "plannedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'actual_date', type: 'date', nullable: true }),
    __metadata("design:type", String)
], CertificationAudit.prototype, "actualDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'window_start', type: 'date', nullable: true }),
    __metadata("design:type", String)
], CertificationAudit.prototype, "windowStart", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'window_end', type: 'date', nullable: true }),
    __metadata("design:type", String)
], CertificationAudit.prototype, "windowEnd", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_unannounced', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], CertificationAudit.prototype, "isUnannounced", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], CertificationAudit.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], CertificationAudit.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], CertificationAudit.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], CertificationAudit.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'updated_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], CertificationAudit.prototype, "updatedByUser", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], CertificationAudit.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], CertificationAudit.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => certification_audit_finding_entity_1.CertificationAuditFinding, (finding) => finding.audit, { cascade: true }),
    __metadata("design:type", Array)
], CertificationAudit.prototype, "findings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sampling_record_entity_1.SamplingRecord, (sampling) => sampling.audit, { cascade: true }),
    __metadata("design:type", Array)
], CertificationAudit.prototype, "samplingRecords", void 0);
exports.CertificationAudit = CertificationAudit = __decorate([
    (0, typeorm_1.Entity)('certification_audits')
], CertificationAudit);
//# sourceMappingURL=certification-audit.entity.js.map