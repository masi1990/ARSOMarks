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
exports.MarkLicenseApplication = void 0;
const typeorm_1 = require("typeorm");
const nsb_entity_1 = require("../../nsb-management/entities/nsb.entity");
const system_user_entity_1 = require("../../system-user/system-user.entity");
const enums_1 = require("../../../shared/enums");
const mark_license_placement_entity_1 = require("./mark-license-placement.entity");
const mark_license_agreement_entity_1 = require("./mark-license-agreement.entity");
let MarkLicenseApplication = class MarkLicenseApplication {
};
exports.MarkLicenseApplication = MarkLicenseApplication;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MarkLicenseApplication.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'application_number', unique: true }),
    __metadata("design:type", String)
], MarkLicenseApplication.prototype, "applicationNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nsb_id' }),
    __metadata("design:type", String)
], MarkLicenseApplication.prototype, "nsbId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nsb_entity_1.Nsb, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'nsb_id' }),
    __metadata("design:type", nsb_entity_1.Nsb)
], MarkLicenseApplication.prototype, "nsb", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nsb_applicant_name' }),
    __metadata("design:type", String)
], MarkLicenseApplication.prototype, "nsbApplicantName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'application_date', type: 'date', default: () => 'CURRENT_DATE' }),
    __metadata("design:type", Date)
], MarkLicenseApplication.prototype, "applicationDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'application_reference', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseApplication.prototype, "applicationReference", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'license_types', type: 'text', array: true }),
    __metadata("design:type", Array)
], MarkLicenseApplication.prototype, "licenseTypes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'license_duration', type: 'enum', enum: enums_1.LicenseDurationType }),
    __metadata("design:type", String)
], MarkLicenseApplication.prototype, "licenseDuration", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'license_duration_other', type: 'text', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseApplication.prototype, "licenseDurationOther", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'promotional_license_details', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], MarkLicenseApplication.prototype, "promotionalLicenseDetails", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'certification_body_details', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], MarkLicenseApplication.prototype, "certificationBodyDetails", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'special_project_details', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], MarkLicenseApplication.prototype, "specialProjectDetails", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'media_usage', type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], MarkLicenseApplication.prototype, "mediaUsage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'campaign_timeline', type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], MarkLicenseApplication.prototype, "campaignTimeline", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expected_impact_metrics', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], MarkLicenseApplication.prototype, "expectedImpactMetrics", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'marks_requested', type: 'enum', enum: enums_1.MarkType, array: true }),
    __metadata("design:type", Array)
], MarkLicenseApplication.prototype, "marksRequested", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mark_colors_needed', type: 'text', array: true, nullable: true }),
    __metadata("design:type", Array)
], MarkLicenseApplication.prototype, "markColorsNeeded", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mark_sizes_needed', type: 'text', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseApplication.prototype, "markSizesNeeded", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mark_languages', type: 'text', array: true, nullable: true }),
    __metadata("design:type", Array)
], MarkLicenseApplication.prototype, "markLanguages", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'annex_b_compliance', default: false }),
    __metadata("design:type", Boolean)
], MarkLicenseApplication.prototype, "annexBCompliance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'brand_guidelines_ack', default: false }),
    __metadata("design:type", Boolean)
], MarkLicenseApplication.prototype, "brandGuidelinesAck", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'modification_policy_acceptance', default: false }),
    __metadata("design:type", Boolean)
], MarkLicenseApplication.prototype, "modificationPolicyAcceptance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'supporting_documents', type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], MarkLicenseApplication.prototype, "supportingDocuments", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'declaration_signatory' }),
    __metadata("design:type", String)
], MarkLicenseApplication.prototype, "declarationSignatory", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'signatory_title' }),
    __metadata("design:type", String)
], MarkLicenseApplication.prototype, "signatoryTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'signatory_email' }),
    __metadata("design:type", String)
], MarkLicenseApplication.prototype, "signatoryEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'audit_rights_acceptance', default: false }),
    __metadata("design:type", Boolean)
], MarkLicenseApplication.prototype, "auditRightsAcceptance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'annual_reporting_commitment', default: false }),
    __metadata("design:type", Boolean)
], MarkLicenseApplication.prototype, "annualReportingCommitment", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'data_sharing_consent', default: false }),
    __metadata("design:type", Boolean)
], MarkLicenseApplication.prototype, "dataSharingConsent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.MarkLicenseStatus, default: enums_1.MarkLicenseStatus.DRAFT }),
    __metadata("design:type", String)
], MarkLicenseApplication.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'submitted_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], MarkLicenseApplication.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reviewed_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], MarkLicenseApplication.prototype, "reviewedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approved_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], MarkLicenseApplication.prototype, "approvedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rejected_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], MarkLicenseApplication.prototype, "rejectedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rejection_reason', type: 'text', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseApplication.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], MarkLicenseApplication.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], MarkLicenseApplication.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseApplication.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], MarkLicenseApplication.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseApplication.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'updated_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], MarkLicenseApplication.prototype, "updatedByUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mark_license_placement_entity_1.MarkLicensePlacement, (placement) => placement.application, { cascade: true }),
    __metadata("design:type", Array)
], MarkLicenseApplication.prototype, "placements", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => mark_license_agreement_entity_1.MarkLicenseAgreement, (agreement) => agreement.application),
    __metadata("design:type", mark_license_agreement_entity_1.MarkLicenseAgreement)
], MarkLicenseApplication.prototype, "agreement", void 0);
exports.MarkLicenseApplication = MarkLicenseApplication = __decorate([
    (0, typeorm_1.Entity)('mark_license_applications')
], MarkLicenseApplication);
//# sourceMappingURL=mark-license-application.entity.js.map