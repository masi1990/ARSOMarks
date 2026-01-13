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
exports.MarkLicenseModification = void 0;
const typeorm_1 = require("typeorm");
const mark_license_agreement_entity_1 = require("./mark-license-agreement.entity");
const system_user_entity_1 = require("../../system-user/system-user.entity");
const enums_1 = require("../../../shared/enums");
let MarkLicenseModification = class MarkLicenseModification {
};
exports.MarkLicenseModification = MarkLicenseModification;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MarkLicenseModification.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'original_license_id' }),
    __metadata("design:type", String)
], MarkLicenseModification.prototype, "originalLicenseId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mark_license_agreement_entity_1.MarkLicenseAgreement, (agreement) => agreement.modifications, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'original_license_id' }),
    __metadata("design:type", mark_license_agreement_entity_1.MarkLicenseAgreement)
], MarkLicenseModification.prototype, "originalLicense", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'agreement_id' }),
    __metadata("design:type", String)
], MarkLicenseModification.prototype, "agreementId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'modification_types', type: 'text', array: true }),
    __metadata("design:type", Array)
], MarkLicenseModification.prototype, "modificationTypes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'modification_reason', type: 'text' }),
    __metadata("design:type", String)
], MarkLicenseModification.prototype, "modificationReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'proposed_changes', type: 'text' }),
    __metadata("design:type", String)
], MarkLicenseModification.prototype, "proposedChanges", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'effective_date_request', type: 'date' }),
    __metadata("design:type", Date)
], MarkLicenseModification.prototype, "effectiveDateRequest", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'supporting_justification_path', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseModification.prototype, "supportingJustificationPath", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'impact_assessment', type: 'text', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseModification.prototype, "impactAssessment", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fee_adjustment_needed', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseModification.prototype, "feeAdjustmentNeeded", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.ModificationStatus, default: enums_1.ModificationStatus.PENDING }),
    __metadata("design:type", String)
], MarkLicenseModification.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'submitted_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], MarkLicenseModification.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reviewed_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], MarkLicenseModification.prototype, "reviewedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approved_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], MarkLicenseModification.prototype, "approvedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rejected_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], MarkLicenseModification.prototype, "rejectedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rejection_reason', type: 'text', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseModification.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'implemented_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], MarkLicenseModification.prototype, "implementedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'implemented_changes', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], MarkLicenseModification.prototype, "implementedChanges", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], MarkLicenseModification.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], MarkLicenseModification.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseModification.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], MarkLicenseModification.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseModification.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'updated_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], MarkLicenseModification.prototype, "updatedByUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reviewed_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseModification.prototype, "reviewedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'reviewed_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], MarkLicenseModification.prototype, "reviewedByUser", void 0);
exports.MarkLicenseModification = MarkLicenseModification = __decorate([
    (0, typeorm_1.Entity)('mark_license_modifications')
], MarkLicenseModification);
//# sourceMappingURL=mark-license-modification.entity.js.map