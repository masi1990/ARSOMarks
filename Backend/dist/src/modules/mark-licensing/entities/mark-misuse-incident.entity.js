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
exports.MarkMisuseIncident = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../shared/enums");
const mark_license_agreement_entity_1 = require("./mark-license-agreement.entity");
const system_user_entity_1 = require("../../system-user/system-user.entity");
const mark_sanction_entity_1 = require("./mark-sanction.entity");
let MarkMisuseIncident = class MarkMisuseIncident {
};
exports.MarkMisuseIncident = MarkMisuseIncident;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MarkMisuseIncident.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'license_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], MarkMisuseIncident.prototype, "licenseId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mark_license_agreement_entity_1.MarkLicenseAgreement, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'license_id' }),
    __metadata("design:type", mark_license_agreement_entity_1.MarkLicenseAgreement)
], MarkMisuseIncident.prototype, "license", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], MarkMisuseIncident.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'evidence_files', type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], MarkMisuseIncident.prototype, "evidenceFiles", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.MarkMisuseStatus, default: enums_1.MarkMisuseStatus.OPEN }),
    __metadata("design:type", String)
], MarkMisuseIncident.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reported_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], MarkMisuseIncident.prototype, "reportedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'reported_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], MarkMisuseIncident.prototype, "reportedByUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reviewed_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], MarkMisuseIncident.prototype, "reviewedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'reviewed_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], MarkMisuseIncident.prototype, "reviewedByUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'decision_notes', type: 'text', nullable: true }),
    __metadata("design:type", String)
], MarkMisuseIncident.prototype, "decisionNotes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'reported_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], MarkMisuseIncident.prototype, "reportedAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], MarkMisuseIncident.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mark_sanction_entity_1.MarkSanction, (sanction) => sanction.incident, { cascade: true }),
    __metadata("design:type", Array)
], MarkMisuseIncident.prototype, "sanctions", void 0);
exports.MarkMisuseIncident = MarkMisuseIncident = __decorate([
    (0, typeorm_1.Entity)('mark_misuse_incidents')
], MarkMisuseIncident);
//# sourceMappingURL=mark-misuse-incident.entity.js.map