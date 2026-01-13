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
exports.MarkLicenseCompliance = void 0;
const typeorm_1 = require("typeorm");
const mark_license_agreement_entity_1 = require("./mark-license-agreement.entity");
const system_user_entity_1 = require("../../system-user/system-user.entity");
let MarkLicenseCompliance = class MarkLicenseCompliance {
};
exports.MarkLicenseCompliance = MarkLicenseCompliance;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MarkLicenseCompliance.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'license_id' }),
    __metadata("design:type", String)
], MarkLicenseCompliance.prototype, "licenseId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mark_license_agreement_entity_1.MarkLicenseAgreement, (agreement) => agreement.complianceRecords, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'license_id' }),
    __metadata("design:type", mark_license_agreement_entity_1.MarkLicenseAgreement)
], MarkLicenseCompliance.prototype, "license", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'compliance_type' }),
    __metadata("design:type", String)
], MarkLicenseCompliance.prototype, "complianceType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'check_date', type: 'date' }),
    __metadata("design:type", Date)
], MarkLicenseCompliance.prototype, "checkDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'checked_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseCompliance.prototype, "checkedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'checked_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], MarkLicenseCompliance.prototype, "checkedByUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_compliant', default: true }),
    __metadata("design:type", Boolean)
], MarkLicenseCompliance.prototype, "isCompliant", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'findings', type: 'text', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseCompliance.prototype, "findings", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'violations', type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], MarkLicenseCompliance.prototype, "violations", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'corrective_actions_required', type: 'text', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseCompliance.prototype, "correctiveActionsRequired", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'corrective_actions_taken', type: 'text', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseCompliance.prototype, "correctiveActionsTaken", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'next_check_date', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], MarkLicenseCompliance.prototype, "nextCheckDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'resolved_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], MarkLicenseCompliance.prototype, "resolvedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], MarkLicenseCompliance.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], MarkLicenseCompliance.prototype, "updatedAt", void 0);
exports.MarkLicenseCompliance = MarkLicenseCompliance = __decorate([
    (0, typeorm_1.Entity)('mark_license_compliance')
], MarkLicenseCompliance);
//# sourceMappingURL=mark-license-compliance.entity.js.map