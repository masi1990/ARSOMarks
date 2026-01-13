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
exports.MarkLicenseUsageReport = void 0;
const typeorm_1 = require("typeorm");
const mark_license_agreement_entity_1 = require("./mark-license-agreement.entity");
const system_user_entity_1 = require("../../system-user/system-user.entity");
const enums_1 = require("../../../shared/enums");
let MarkLicenseUsageReport = class MarkLicenseUsageReport {
};
exports.MarkLicenseUsageReport = MarkLicenseUsageReport;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MarkLicenseUsageReport.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'report_number', unique: true }),
    __metadata("design:type", String)
], MarkLicenseUsageReport.prototype, "reportNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'license_id' }),
    __metadata("design:type", String)
], MarkLicenseUsageReport.prototype, "licenseId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mark_license_agreement_entity_1.MarkLicenseAgreement, (agreement) => agreement.usageReports, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'license_id' }),
    __metadata("design:type", mark_license_agreement_entity_1.MarkLicenseAgreement)
], MarkLicenseUsageReport.prototype, "license", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'agreement_id' }),
    __metadata("design:type", String)
], MarkLicenseUsageReport.prototype, "agreementId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'report_period_start', type: 'date' }),
    __metadata("design:type", Date)
], MarkLicenseUsageReport.prototype, "reportPeriodStart", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'report_period_end', type: 'date' }),
    __metadata("design:type", Date)
], MarkLicenseUsageReport.prototype, "reportPeriodEnd", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'report_year', type: 'integer' }),
    __metadata("design:type", Number)
], MarkLicenseUsageReport.prototype, "reportYear", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nsb_contact_name' }),
    __metadata("design:type", String)
], MarkLicenseUsageReport.prototype, "nsbContactName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nsb_contact_email' }),
    __metadata("design:type", String)
], MarkLicenseUsageReport.prototype, "nsbContactEmail", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'report_submission_date', type: 'timestamp' }),
    __metadata("design:type", Date)
], MarkLicenseUsageReport.prototype, "reportSubmissionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'promotional_usage_metrics', type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], MarkLicenseUsageReport.prototype, "promotionalUsageMetrics", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'certification_usage_metrics', type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], MarkLicenseUsageReport.prototype, "certificationUsageMetrics", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'impact_assessment', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], MarkLicenseUsageReport.prototype, "impactAssessment", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'compliance_checks', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], MarkLicenseUsageReport.prototype, "complianceChecks", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'non_compliance_issues', type: 'text', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseUsageReport.prototype, "nonComplianceIssues", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'corrective_actions_taken', type: 'text', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseUsageReport.prototype, "correctiveActionsTaken", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'planned_usage_next_year', type: 'text' }),
    __metadata("design:type", String)
], MarkLicenseUsageReport.prototype, "plannedUsageNextYear", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'renewal_intention', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseUsageReport.prototype, "renewalIntention", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'supporting_evidence', type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], MarkLicenseUsageReport.prototype, "supportingEvidence", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'samples', type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], MarkLicenseUsageReport.prototype, "samples", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'testimonials', type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], MarkLicenseUsageReport.prototype, "testimonials", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.ReportStatus, default: enums_1.ReportStatus.DRAFT }),
    __metadata("design:type", String)
], MarkLicenseUsageReport.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'submitted_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], MarkLicenseUsageReport.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reviewed_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], MarkLicenseUsageReport.prototype, "reviewedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approved_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], MarkLicenseUsageReport.prototype, "approvedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rejected_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], MarkLicenseUsageReport.prototype, "rejectedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rejection_reason', type: 'text', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseUsageReport.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], MarkLicenseUsageReport.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], MarkLicenseUsageReport.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseUsageReport.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], MarkLicenseUsageReport.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseUsageReport.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'updated_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], MarkLicenseUsageReport.prototype, "updatedByUser", void 0);
exports.MarkLicenseUsageReport = MarkLicenseUsageReport = __decorate([
    (0, typeorm_1.Entity)('mark_license_usage_reports')
], MarkLicenseUsageReport);
//# sourceMappingURL=mark-license-usage-report.entity.js.map