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
exports.ProductCertificationCbSelection = void 0;
const typeorm_1 = require("typeorm");
const product_certification_application_entity_1 = require("./product-certification-application.entity");
const enums_1 = require("../../../shared/enums");
let ProductCertificationCbSelection = class ProductCertificationCbSelection {
};
exports.ProductCertificationCbSelection = ProductCertificationCbSelection;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProductCertificationCbSelection.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'application_id', type: 'uuid', unique: true }),
    __metadata("design:type", String)
], ProductCertificationCbSelection.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => product_certification_application_entity_1.ProductCertificationApplication, (application) => application.cbSelection, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'application_id' }),
    __metadata("design:type", product_certification_application_entity_1.ProductCertificationApplication)
], ProductCertificationCbSelection.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'preferred_cb', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ProductCertificationCbSelection.prototype, "preferredCbId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cb_selection_reason', type: 'text' }),
    __metadata("design:type", String)
], ProductCertificationCbSelection.prototype, "cbSelectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'previous_cb', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ProductCertificationCbSelection.prototype, "previousCb", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'previous_cb_name', length: 200, nullable: true }),
    __metadata("design:type", String)
], ProductCertificationCbSelection.prototype, "previousCbName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'previous_certificate_number', length: 50, nullable: true }),
    __metadata("design:type", String)
], ProductCertificationCbSelection.prototype, "previousCertificateNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'audit_language', type: 'enum', enum: enums_1.AuditLanguage }),
    __metadata("design:type", String)
], ProductCertificationCbSelection.prototype, "auditLanguage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'audit_timing', type: 'text' }),
    __metadata("design:type", String)
], ProductCertificationCbSelection.prototype, "auditTiming", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'peak_periods', type: 'text' }),
    __metadata("design:type", String)
], ProductCertificationCbSelection.prototype, "peakPeriods", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'special_requirements', type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProductCertificationCbSelection.prototype, "specialRequirements", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'audit_team_size', type: 'enum', enum: enums_1.AuditTeamSize }),
    __metadata("design:type", String)
], ProductCertificationCbSelection.prototype, "auditTeamSize", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ProductCertificationCbSelection.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ProductCertificationCbSelection.prototype, "updatedAt", void 0);
exports.ProductCertificationCbSelection = ProductCertificationCbSelection = __decorate([
    (0, typeorm_1.Entity)('product_certification_cb_selection')
], ProductCertificationCbSelection);
//# sourceMappingURL=product-certification-cb-selection.entity.js.map