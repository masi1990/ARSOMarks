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
exports.CbApplication = void 0;
const typeorm_1 = require("typeorm");
const country_entity_1 = require("../../reference-data/entities/country.entity");
const system_user_entity_1 = require("../../system-user/system-user.entity");
const enums_1 = require("../../../shared/enums");
const cb_application_document_entity_1 = require("./cb-application-document.entity");
const accreditation_body_entity_1 = require("../../reference-data/entities/accreditation-body.entity");
let CbApplication = class CbApplication {
};
exports.CbApplication = CbApplication;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CbApplication.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'application_number', unique: true, nullable: true }),
    __metadata("design:type", String)
], CbApplication.prototype, "applicationNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'legal_name', length: 255 }),
    __metadata("design:type", String)
], CbApplication.prototype, "legalName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'short_name', length: 100, nullable: true }),
    __metadata("design:type", String)
], CbApplication.prototype, "shortName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_person_name', length: 150 }),
    __metadata("design:type", String)
], CbApplication.prototype, "contactPersonName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_person_title', length: 150, nullable: true }),
    __metadata("design:type", String)
], CbApplication.prototype, "contactPersonTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_email', length: 150 }),
    __metadata("design:type", String)
], CbApplication.prototype, "contactEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_phone', length: 50 }),
    __metadata("design:type", String)
], CbApplication.prototype, "contactPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], CbApplication.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'physical_address', type: 'text' }),
    __metadata("design:type", String)
], CbApplication.prototype, "physicalAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'postal_address', type: 'text', nullable: true }),
    __metadata("design:type", String)
], CbApplication.prototype, "postalAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], CbApplication.prototype, "countryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.Country, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'country_id' }),
    __metadata("design:type", country_entity_1.Country)
], CbApplication.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'regions_of_operation', type: 'text', array: true, default: [] }),
    __metadata("design:type", Array)
], CbApplication.prototype, "regionsOfOperation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'regions_other', type: 'text', nullable: true }),
    __metadata("design:type", String)
], CbApplication.prototype, "regionsOther", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_accredited', default: false }),
    __metadata("design:type", Boolean)
], CbApplication.prototype, "isAccredited", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'accreditation_standard', type: 'enum', enum: enums_1.CbAccreditationStandard, nullable: true }),
    __metadata("design:type", String)
], CbApplication.prototype, "accreditationStandard", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'accreditation_body_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], CbApplication.prototype, "accreditationBodyId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => accreditation_body_entity_1.AccreditationBody, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'accreditation_body_id' }),
    __metadata("design:type", accreditation_body_entity_1.AccreditationBody)
], CbApplication.prototype, "accreditationBody", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'accreditation_body_name', length: 255, nullable: true }),
    __metadata("design:type", String)
], CbApplication.prototype, "accreditationBodyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'accreditation_certificate_number', length: 100, nullable: true }),
    __metadata("design:type", String)
], CbApplication.prototype, "accreditationCertificateNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'accreditation_scope', type: 'text', nullable: true }),
    __metadata("design:type", String)
], CbApplication.prototype, "accreditationScope", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'accreditation_valid_until', type: 'date', nullable: true }),
    __metadata("design:type", String)
], CbApplication.prototype, "accreditationValidUntil", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'accreditation_application_date', type: 'date', nullable: true }),
    __metadata("design:type", String)
], CbApplication.prototype, "accreditationApplicationDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'accreditation_progress_notes', type: 'text', nullable: true }),
    __metadata("design:type", String)
], CbApplication.prototype, "accreditationProgressNotes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'previous_license_held', default: false }),
    __metadata("design:type", Boolean)
], CbApplication.prototype, "previousLicenseHeld", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'previous_license_granted_at', type: 'date', nullable: true }),
    __metadata("design:type", String)
], CbApplication.prototype, "previousLicenseGrantedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'previous_license_terminated_at', type: 'date', nullable: true }),
    __metadata("design:type", String)
], CbApplication.prototype, "previousLicenseTerminatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'previous_license_termination_reason', type: 'text', nullable: true }),
    __metadata("design:type", String)
], CbApplication.prototype, "previousLicenseTerminationReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'applied_schemes', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], CbApplication.prototype, "appliedSchemes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], CbApplication.prototype, "declarations", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.CbApplicationStatus, default: enums_1.CbApplicationStatus.DRAFT }),
    __metadata("design:type", String)
], CbApplication.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'submitted_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], CbApplication.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reviewed_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], CbApplication.prototype, "reviewedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approved_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], CbApplication.prototype, "approvedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rejected_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], CbApplication.prototype, "rejectedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rejection_reason', type: 'text', nullable: true }),
    __metadata("design:type", String)
], CbApplication.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'provisional_valid_until', type: 'date', nullable: true }),
    __metadata("design:type", String)
], CbApplication.prototype, "provisionalValidUntil", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'license_start', type: 'date', nullable: true }),
    __metadata("design:type", String)
], CbApplication.prototype, "licenseStart", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'license_end', type: 'date', nullable: true }),
    __metadata("design:type", String)
], CbApplication.prototype, "licenseEnd", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'renewal_due', type: 'date', nullable: true }),
    __metadata("design:type", String)
], CbApplication.prototype, "renewalDue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], CbApplication.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], CbApplication.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], CbApplication.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'updated_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], CbApplication.prototype, "updatedByUser", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], CbApplication.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], CbApplication.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cb_application_document_entity_1.CbApplicationDocument, (doc) => doc.application, { cascade: true }),
    __metadata("design:type", Array)
], CbApplication.prototype, "documents", void 0);
exports.CbApplication = CbApplication = __decorate([
    (0, typeorm_1.Entity)('cb_applications')
], CbApplication);
//# sourceMappingURL=cb-application.entity.js.map