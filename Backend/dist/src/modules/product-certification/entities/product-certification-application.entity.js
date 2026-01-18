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
exports.ProductCertificationApplication = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../shared/enums");
const operator_entity_1 = require("../../operator/entities/operator.entity");
const system_user_entity_1 = require("../../system-user/system-user.entity");
const product_entity_1 = require("./product.entity");
const product_certification_cb_selection_entity_1 = require("./product-certification-cb-selection.entity");
const product_certification_declaration_entity_1 = require("./product-certification-declaration.entity");
const product_certification_agreement_entity_1 = require("./product-certification-agreement.entity");
const product_certification_cb_change_request_entity_1 = require("./product-certification-cb-change-request.entity");
let ProductCertificationApplication = class ProductCertificationApplication {
};
exports.ProductCertificationApplication = ProductCertificationApplication;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProductCertificationApplication.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'application_number', unique: true, nullable: true }),
    __metadata("design:type", String)
], ProductCertificationApplication.prototype, "applicationNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'operator_id', type: 'uuid' }),
    __metadata("design:type", String)
], ProductCertificationApplication.prototype, "operatorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => operator_entity_1.Operator, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'operator_id' }),
    __metadata("design:type", operator_entity_1.Operator)
], ProductCertificationApplication.prototype, "operator", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mark_requested', type: 'enum', enum: enums_1.MarkRequestedType, array: true }),
    __metadata("design:type", Array)
], ProductCertificationApplication.prototype, "markRequested", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'arso_quality_mark', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ProductCertificationApplication.prototype, "arsoQualityMark", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'eco_mark_africa', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ProductCertificationApplication.prototype, "ecoMarkAfrica", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mark_combination', type: 'enum', enum: enums_1.MarkCombinationPreference, nullable: true }),
    __metadata("design:type", String)
], ProductCertificationApplication.prototype, "markCombination", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'scheme_type', type: 'enum', enum: enums_1.CertificationSchemeType }),
    __metadata("design:type", String)
], ProductCertificationApplication.prototype, "schemeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'scheme_description', type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProductCertificationApplication.prototype, "schemeDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'scheme_payload', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ProductCertificationApplication.prototype, "schemePayload", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'application_scope', type: 'enum', enum: enums_1.ApplicationScope }),
    __metadata("design:type", String)
], ProductCertificationApplication.prototype, "applicationScope", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'certification_type', type: 'enum', enum: enums_1.ProductCertificationType }),
    __metadata("design:type", String)
], ProductCertificationApplication.prototype, "certificationType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'estimated_volume', type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], ProductCertificationApplication.prototype, "estimatedVolume", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'volume_unit', type: 'enum', enum: enums_1.VolumeUnit }),
    __metadata("design:type", String)
], ProductCertificationApplication.prototype, "volumeUnit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'peak_month', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], ProductCertificationApplication.prototype, "peakMonth", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'priority_processing', type: 'enum', enum: enums_1.PriorityProcessing, default: enums_1.PriorityProcessing.NO }),
    __metadata("design:type", String)
], ProductCertificationApplication.prototype, "priorityProcessing", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'priority_reason', type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProductCertificationApplication.prototype, "priorityReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expected_timeline', type: 'enum', enum: enums_1.ExpectedTimeline }),
    __metadata("design:type", String)
], ProductCertificationApplication.prototype, "expectedTimeline", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.ProductCertificationStatus, default: enums_1.ProductCertificationStatus.DRAFT }),
    __metadata("design:type", String)
], ProductCertificationApplication.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'submitted_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ProductCertificationApplication.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approved_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ProductCertificationApplication.prototype, "approvedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rejected_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ProductCertificationApplication.prototype, "rejectedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rejection_reason', type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProductCertificationApplication.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'certified_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ProductCertificationApplication.prototype, "certifiedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'certificate_number', length: 50, nullable: true }),
    __metadata("design:type", String)
], ProductCertificationApplication.prototype, "certificateNumber", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ProductCertificationApplication.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ProductCertificationApplication.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ProductCertificationApplication.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], ProductCertificationApplication.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ProductCertificationApplication.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'updated_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], ProductCertificationApplication.prototype, "updatedByUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.Product, (product) => product.application, { cascade: true }),
    __metadata("design:type", Array)
], ProductCertificationApplication.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => product_certification_cb_selection_entity_1.ProductCertificationCbSelection, (cbSelection) => cbSelection.application, { cascade: true }),
    __metadata("design:type", product_certification_cb_selection_entity_1.ProductCertificationCbSelection)
], ProductCertificationApplication.prototype, "cbSelection", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => product_certification_declaration_entity_1.ProductCertificationDeclaration, (declaration) => declaration.application, { cascade: true }),
    __metadata("design:type", product_certification_declaration_entity_1.ProductCertificationDeclaration)
], ProductCertificationApplication.prototype, "declaration", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_certification_agreement_entity_1.ProductCertificationAgreement, (agreement) => agreement.application, { cascade: true }),
    __metadata("design:type", Array)
], ProductCertificationApplication.prototype, "agreements", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_certification_cb_change_request_entity_1.ProductCertificationCbChangeRequest, (request) => request.application, { cascade: true }),
    __metadata("design:type", Array)
], ProductCertificationApplication.prototype, "cbChangeRequests", void 0);
exports.ProductCertificationApplication = ProductCertificationApplication = __decorate([
    (0, typeorm_1.Entity)('product_certification_applications')
], ProductCertificationApplication);
//# sourceMappingURL=product-certification-application.entity.js.map