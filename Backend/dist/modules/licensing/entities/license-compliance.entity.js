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
exports.LicenseCompliance = void 0;
const typeorm_1 = require("typeorm");
const license_entity_1 = require("./license.entity");
const enums_1 = require("../../../shared/enums");
const system_user_entity_1 = require("../../system-user/system-user.entity");
let LicenseCompliance = class LicenseCompliance {
};
exports.LicenseCompliance = LicenseCompliance;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], LicenseCompliance.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'license_id' }),
    __metadata("design:type", String)
], LicenseCompliance.prototype, "licenseId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => license_entity_1.License, (license) => license.complianceItems, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'license_id' }),
    __metadata("design:type", license_entity_1.License)
], LicenseCompliance.prototype, "license", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'compliance_type', type: 'enum', enum: enums_1.ComplianceType }),
    __metadata("design:type", String)
], LicenseCompliance.prototype, "complianceType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'scheduled_date', type: 'date' }),
    __metadata("design:type", String)
], LicenseCompliance.prototype, "scheduledDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'actual_date', type: 'date', nullable: true }),
    __metadata("design:type", String)
], LicenseCompliance.prototype, "actualDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.ComplianceStatus, default: enums_1.ComplianceStatus.SCHEDULED }),
    __metadata("design:type", String)
], LicenseCompliance.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], LicenseCompliance.prototype, "findings", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'corrective_actions', type: 'text', nullable: true }),
    __metadata("design:type", String)
], LicenseCompliance.prototype, "correctiveActions", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'next_due_date', type: 'date', nullable: true }),
    __metadata("design:type", String)
], LicenseCompliance.prototype, "nextDueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'conducted_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], LicenseCompliance.prototype, "conductedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'conducted_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], LicenseCompliance.prototype, "conductedByUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'report_url', length: 500, nullable: true }),
    __metadata("design:type", String)
], LicenseCompliance.prototype, "reportUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], LicenseCompliance.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], LicenseCompliance.prototype, "updatedAt", void 0);
exports.LicenseCompliance = LicenseCompliance = __decorate([
    (0, typeorm_1.Entity)('license_compliance')
], LicenseCompliance);
//# sourceMappingURL=license-compliance.entity.js.map