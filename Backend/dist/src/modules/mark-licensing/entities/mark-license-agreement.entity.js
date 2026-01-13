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
exports.MarkLicenseAgreement = void 0;
const typeorm_1 = require("typeorm");
const nsb_entity_1 = require("../../nsb-management/entities/nsb.entity");
const system_user_entity_1 = require("../../system-user/system-user.entity");
const enums_1 = require("../../../shared/enums");
const mark_license_application_entity_1 = require("./mark-license-application.entity");
const mark_license_asset_entity_1 = require("./mark-license-asset.entity");
const mark_license_usage_report_entity_1 = require("./mark-license-usage-report.entity");
const mark_license_modification_entity_1 = require("./mark-license-modification.entity");
const mark_license_compliance_entity_1 = require("./mark-license-compliance.entity");
let MarkLicenseAgreement = class MarkLicenseAgreement {
};
exports.MarkLicenseAgreement = MarkLicenseAgreement;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MarkLicenseAgreement.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'agreement_id', unique: true }),
    __metadata("design:type", String)
], MarkLicenseAgreement.prototype, "agreementId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'application_id', unique: true }),
    __metadata("design:type", String)
], MarkLicenseAgreement.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => mark_license_application_entity_1.MarkLicenseApplication, (application) => application.agreement, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'application_id' }),
    __metadata("design:type", mark_license_application_entity_1.MarkLicenseApplication)
], MarkLicenseAgreement.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nsb_id' }),
    __metadata("design:type", String)
], MarkLicenseAgreement.prototype, "nsbId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nsb_entity_1.Nsb, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'nsb_id' }),
    __metadata("design:type", nsb_entity_1.Nsb)
], MarkLicenseAgreement.prototype, "nsb", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'license_type_display' }),
    __metadata("design:type", String)
], MarkLicenseAgreement.prototype, "licenseTypeDisplay", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'license_start_date', type: 'date' }),
    __metadata("design:type", Date)
], MarkLicenseAgreement.prototype, "licenseStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'license_end_date', type: 'date' }),
    __metadata("design:type", Date)
], MarkLicenseAgreement.prototype, "licenseEndDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'license_terms_display', type: 'text', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseAgreement.prototype, "licenseTermsDisplay", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'royalty_fee_structure', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], MarkLicenseAgreement.prototype, "royaltyFeeStructure", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_schedule', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], MarkLicenseAgreement.prototype, "paymentSchedule", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'usage_restrictions', type: 'text', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseAgreement.prototype, "usageRestrictions", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'termination_clauses', type: 'text', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseAgreement.prototype, "terminationClauses", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nsb_signer_name' }),
    __metadata("design:type", String)
], MarkLicenseAgreement.prototype, "nsbSignerName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nsb_signer_title' }),
    __metadata("design:type", String)
], MarkLicenseAgreement.prototype, "nsbSignerTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nsb_signer_email' }),
    __metadata("design:type", String)
], MarkLicenseAgreement.prototype, "nsbSignerEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nsb_signer_ip', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseAgreement.prototype, "nsbSignerIp", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nsb_signer_timestamp', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], MarkLicenseAgreement.prototype, "nsbSignerTimestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nsb_signer_consent', default: false }),
    __metadata("design:type", Boolean)
], MarkLicenseAgreement.prototype, "nsbSignerConsent", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nsb_signature_image_path', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseAgreement.prototype, "nsbSignatureImagePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'arso_signer_name', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseAgreement.prototype, "arsoSignerName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'arso_signer_title', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseAgreement.prototype, "arsoSignerTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'arso_signer_timestamp', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], MarkLicenseAgreement.prototype, "arsoSignerTimestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'agreement_status',
        type: 'enum',
        enum: enums_1.AgreementStatus,
        default: enums_1.AgreementStatus.DRAFT,
    }),
    __metadata("design:type", String)
], MarkLicenseAgreement.prototype, "agreementStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'agreement_document_path', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseAgreement.prototype, "agreementDocumentPath", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], MarkLicenseAgreement.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], MarkLicenseAgreement.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseAgreement.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], MarkLicenseAgreement.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseAgreement.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'updated_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], MarkLicenseAgreement.prototype, "updatedByUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mark_license_asset_entity_1.MarkLicenseAsset, (asset) => asset.agreement, { cascade: true }),
    __metadata("design:type", Array)
], MarkLicenseAgreement.prototype, "assets", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mark_license_usage_report_entity_1.MarkLicenseUsageReport, (report) => report.license, { cascade: true }),
    __metadata("design:type", Array)
], MarkLicenseAgreement.prototype, "usageReports", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mark_license_modification_entity_1.MarkLicenseModification, (modification) => modification.originalLicense, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], MarkLicenseAgreement.prototype, "modifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mark_license_compliance_entity_1.MarkLicenseCompliance, (compliance) => compliance.license, { cascade: true }),
    __metadata("design:type", Array)
], MarkLicenseAgreement.prototype, "complianceRecords", void 0);
exports.MarkLicenseAgreement = MarkLicenseAgreement = __decorate([
    (0, typeorm_1.Entity)('mark_license_agreements')
], MarkLicenseAgreement);
//# sourceMappingURL=mark-license-agreement.entity.js.map