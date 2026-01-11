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
exports.LicenseApplication = void 0;
const typeorm_1 = require("typeorm");
const nsb_entity_1 = require("../../nsb-management/entities/nsb.entity");
const enums_1 = require("../../../shared/enums");
const application_document_entity_1 = require("./application-document.entity");
const workflow_history_entity_1 = require("./workflow-history.entity");
const license_entity_1 = require("./license.entity");
const system_user_entity_1 = require("../../system-user/system-user.entity");
let LicenseApplication = class LicenseApplication {
};
exports.LicenseApplication = LicenseApplication;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], LicenseApplication.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'application_number', unique: true }),
    __metadata("design:type", String)
], LicenseApplication.prototype, "applicationNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nsb_id' }),
    __metadata("design:type", String)
], LicenseApplication.prototype, "nsbId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nsb_entity_1.Nsb, (nsb) => nsb.licenseApplications, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'nsb_id' }),
    __metadata("design:type", nsb_entity_1.Nsb)
], LicenseApplication.prototype, "nsb", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'application_type', type: 'enum', enum: enums_1.ApplicationType, default: enums_1.ApplicationType.FULL }),
    __metadata("design:type", String)
], LicenseApplication.prototype, "applicationType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.ApplicationStatus, default: enums_1.ApplicationStatus.DRAFT }),
    __metadata("design:type", String)
], LicenseApplication.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'applied_schemes', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], LicenseApplication.prototype, "appliedSchemes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'accreditation_details', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], LicenseApplication.prototype, "accreditationDetails", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organizational_details', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], LicenseApplication.prototype, "organizationalDetails", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'financial_details', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], LicenseApplication.prototype, "financialDetails", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'technical_competence_details', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], LicenseApplication.prototype, "technicalCompetenceDetails", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'qms_details', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], LicenseApplication.prototype, "qmsDetails", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], LicenseApplication.prototype, "declarations", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'submission_data', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], LicenseApplication.prototype, "submissionData", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_provisional', default: false }),
    __metadata("design:type", Boolean)
], LicenseApplication.prototype, "isProvisional", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'provisional_valid_until', type: 'date', nullable: true }),
    __metadata("design:type", String)
], LicenseApplication.prototype, "provisionalValidUntil", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'submitted_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], LicenseApplication.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reviewed_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], LicenseApplication.prototype, "reviewedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approved_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], LicenseApplication.prototype, "approvedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rejected_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], LicenseApplication.prototype, "rejectedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rejection_reason', type: 'text', nullable: true }),
    __metadata("design:type", String)
], LicenseApplication.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], LicenseApplication.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], LicenseApplication.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], LicenseApplication.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], LicenseApplication.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], LicenseApplication.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'updated_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], LicenseApplication.prototype, "updatedByUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => application_document_entity_1.ApplicationDocument, (doc) => doc.application, { cascade: true }),
    __metadata("design:type", Array)
], LicenseApplication.prototype, "documents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => workflow_history_entity_1.WorkflowHistory, (history) => history.application, { cascade: true }),
    __metadata("design:type", Array)
], LicenseApplication.prototype, "workflowHistory", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => license_entity_1.License, (license) => license.application),
    __metadata("design:type", license_entity_1.License)
], LicenseApplication.prototype, "license", void 0);
exports.LicenseApplication = LicenseApplication = __decorate([
    (0, typeorm_1.Entity)('license_applications')
], LicenseApplication);
//# sourceMappingURL=license-application.entity.js.map