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
exports.ProductCertificationDeclaration = void 0;
const typeorm_1 = require("typeorm");
const product_certification_application_entity_1 = require("./product-certification-application.entity");
let ProductCertificationDeclaration = class ProductCertificationDeclaration {
};
exports.ProductCertificationDeclaration = ProductCertificationDeclaration;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProductCertificationDeclaration.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'application_id', type: 'uuid', unique: true }),
    __metadata("design:type", String)
], ProductCertificationDeclaration.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => product_certification_application_entity_1.ProductCertificationApplication, (application) => application.declaration, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'application_id' }),
    __metadata("design:type", product_certification_application_entity_1.ProductCertificationApplication)
], ProductCertificationDeclaration.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'truth_declaration', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ProductCertificationDeclaration.prototype, "truthDeclaration", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'compliance_commitment', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ProductCertificationDeclaration.prototype, "complianceCommitment", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'surveillance_acceptance', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ProductCertificationDeclaration.prototype, "surveillanceAcceptance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'corrective_action_commitment', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ProductCertificationDeclaration.prototype, "correctiveActionCommitment", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'market_surveillance_acceptance', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ProductCertificationDeclaration.prototype, "marketSurveillanceAcceptance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mark_usage_commitment', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ProductCertificationDeclaration.prototype, "markUsageCommitment", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fees_acceptance', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ProductCertificationDeclaration.prototype, "feesAcceptance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fee_breakdown_acknowledged', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ProductCertificationDeclaration.prototype, "feeBreakdownAcknowledged", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_terms_accepted', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ProductCertificationDeclaration.prototype, "paymentTermsAccepted", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'additional_costs_understood', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ProductCertificationDeclaration.prototype, "additionalCostsUnderstood", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'applicant_name', length: 100 }),
    __metadata("design:type", String)
], ProductCertificationDeclaration.prototype, "applicantName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'applicant_position', length: 100 }),
    __metadata("design:type", String)
], ProductCertificationDeclaration.prototype, "applicantPosition", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'applicant_signature', type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProductCertificationDeclaration.prototype, "applicantSignature", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'submission_date', type: 'date', default: () => 'CURRENT_DATE' }),
    __metadata("design:type", Date)
], ProductCertificationDeclaration.prototype, "submissionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'submission_time', type: 'time', default: () => 'CURRENT_TIME' }),
    __metadata("design:type", String)
], ProductCertificationDeclaration.prototype, "submissionTime", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ProductCertificationDeclaration.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ProductCertificationDeclaration.prototype, "updatedAt", void 0);
exports.ProductCertificationDeclaration = ProductCertificationDeclaration = __decorate([
    (0, typeorm_1.Entity)('product_certification_declarations')
], ProductCertificationDeclaration);
//# sourceMappingURL=product-certification-declaration.entity.js.map