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
exports.ProductCertificationAgreement = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../shared/enums");
const product_certification_application_entity_1 = require("./product-certification-application.entity");
const system_user_entity_1 = require("../../system-user/system-user.entity");
let ProductCertificationAgreement = class ProductCertificationAgreement {
};
exports.ProductCertificationAgreement = ProductCertificationAgreement;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProductCertificationAgreement.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'application_id', type: 'uuid' }),
    __metadata("design:type", String)
], ProductCertificationAgreement.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_certification_application_entity_1.ProductCertificationApplication, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'application_id' }),
    __metadata("design:type", product_certification_application_entity_1.ProductCertificationApplication)
], ProductCertificationAgreement.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'agreement_type', type: 'enum', enum: enums_1.CertificationAgreementType }),
    __metadata("design:type", String)
], ProductCertificationAgreement.prototype, "agreementType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'enum',
        enum: enums_1.CertificationAgreementStatus,
        default: enums_1.CertificationAgreementStatus.PENDING_CB_APPROVAL,
    }),
    __metadata("design:type", String)
], ProductCertificationAgreement.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contract_start', type: 'date', nullable: true }),
    __metadata("design:type", String)
], ProductCertificationAgreement.prototype, "contractStart", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contract_end', type: 'date', nullable: true }),
    __metadata("design:type", String)
], ProductCertificationAgreement.prototype, "contractEnd", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'signed_by_name', length: 150, nullable: true }),
    __metadata("design:type", String)
], ProductCertificationAgreement.prototype, "signedByName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'signed_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ProductCertificationAgreement.prototype, "signedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_name', length: 255 }),
    __metadata("design:type", String)
], ProductCertificationAgreement.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_path', length: 500 }),
    __metadata("design:type", String)
], ProductCertificationAgreement.prototype, "filePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_hash', length: 64 }),
    __metadata("design:type", String)
], ProductCertificationAgreement.prototype, "fileHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_size', type: 'bigint' }),
    __metadata("design:type", Number)
], ProductCertificationAgreement.prototype, "fileSize", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mime_type', length: 100, nullable: true }),
    __metadata("design:type", String)
], ProductCertificationAgreement.prototype, "mimeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'uploaded_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ProductCertificationAgreement.prototype, "uploadedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'uploaded_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], ProductCertificationAgreement.prototype, "uploadedByUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cb_approved_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ProductCertificationAgreement.prototype, "cbApprovedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'cb_approved_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], ProductCertificationAgreement.prototype, "cbApprovedByUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cb_approved_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ProductCertificationAgreement.prototype, "cbApprovedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rejection_reason', type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProductCertificationAgreement.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ProductCertificationAgreement.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ProductCertificationAgreement.prototype, "updatedAt", void 0);
exports.ProductCertificationAgreement = ProductCertificationAgreement = __decorate([
    (0, typeorm_1.Entity)('product_certification_agreements')
], ProductCertificationAgreement);
//# sourceMappingURL=product-certification-agreement.entity.js.map