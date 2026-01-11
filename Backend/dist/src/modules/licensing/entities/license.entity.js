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
exports.License = void 0;
const typeorm_1 = require("typeorm");
const license_application_entity_1 = require("./license-application.entity");
const nsb_entity_1 = require("../../nsb-management/entities/nsb.entity");
const enums_1 = require("../../../shared/enums");
const license_compliance_entity_1 = require("./license-compliance.entity");
const system_user_entity_1 = require("../../system-user/system-user.entity");
let License = class License {
};
exports.License = License;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], License.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'license_number', unique: true }),
    __metadata("design:type", String)
], License.prototype, "licenseNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'application_id', unique: true }),
    __metadata("design:type", String)
], License.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => license_application_entity_1.LicenseApplication, (app) => app.license, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'application_id' }),
    __metadata("design:type", license_application_entity_1.LicenseApplication)
], License.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nsb_id' }),
    __metadata("design:type", String)
], License.prototype, "nsbId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nsb_entity_1.Nsb, (nsb) => nsb.licenses, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'nsb_id' }),
    __metadata("design:type", nsb_entity_1.Nsb)
], License.prototype, "nsb", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'license_type', type: 'enum', enum: enums_1.LicenseType, default: enums_1.LicenseType.FULL }),
    __metadata("design:type", String)
], License.prototype, "licenseType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.LicenseStatus, default: enums_1.LicenseStatus.ACTIVE }),
    __metadata("design:type", String)
], License.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'valid_from', type: 'date' }),
    __metadata("design:type", String)
], License.prototype, "validFrom", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'valid_until', type: 'date' }),
    __metadata("design:type", String)
], License.prototype, "validUntil", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'authorized_schemes', type: 'jsonb' }),
    __metadata("design:type", Object)
], License.prototype, "authorizedSchemes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'authorized_marks', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], License.prototype, "authorizedMarks", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'scope_description', type: 'text', nullable: true }),
    __metadata("design:type", String)
], License.prototype, "scopeDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], License.prototype, "conditions", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'annual_fee', type: 'decimal', precision: 15, scale: 2, nullable: true }),
    __metadata("design:type", String)
], License.prototype, "annualFee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'royalty_percentage', type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", String)
], License.prototype, "royaltyPercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'certificate_url', length: 500, nullable: true }),
    __metadata("design:type", String)
], License.prototype, "certificateUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'qr_code_hash', length: 64, nullable: true }),
    __metadata("design:type", String)
], License.prototype, "qrCodeHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'issued_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], License.prototype, "issuedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'issued_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], License.prototype, "issuedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'issued_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], License.prototype, "issuedByUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'renewed_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], License.prototype, "renewedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'suspended_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], License.prototype, "suspendedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'suspension_reason', type: 'text', nullable: true }),
    __metadata("design:type", String)
], License.prototype, "suspensionReason", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], License.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], License.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => license_compliance_entity_1.LicenseCompliance, (c) => c.license),
    __metadata("design:type", Array)
], License.prototype, "complianceItems", void 0);
exports.License = License = __decorate([
    (0, typeorm_1.Entity)('licenses')
], License);
//# sourceMappingURL=license.entity.js.map