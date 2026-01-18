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
exports.CbComplianceProfile = void 0;
const typeorm_1 = require("typeorm");
const cb_application_entity_1 = require("../../cb-approval/entities/cb-application.entity");
let CbComplianceProfile = class CbComplianceProfile {
};
exports.CbComplianceProfile = CbComplianceProfile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CbComplianceProfile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cb_application_id', type: 'uuid', unique: true }),
    __metadata("design:type", String)
], CbComplianceProfile.prototype, "cbApplicationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cb_application_entity_1.CbApplication, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'cb_application_id' }),
    __metadata("design:type", cb_application_entity_1.CbApplication)
], CbComplianceProfile.prototype, "cbApplication", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'responsible_persons', type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], CbComplianceProfile.prototype, "responsiblePersons", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'auditor_qualifications', type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], CbComplianceProfile.prototype, "auditorQualifications", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'countries_of_certification', type: 'text', array: true, nullable: true }),
    __metadata("design:type", Array)
], CbComplianceProfile.prototype, "countriesOfCertification", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'local_offices', type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], CbComplianceProfile.prototype, "localOffices", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], CbComplianceProfile.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], CbComplianceProfile.prototype, "updatedAt", void 0);
exports.CbComplianceProfile = CbComplianceProfile = __decorate([
    (0, typeorm_1.Entity)('cb_compliance_profiles')
], CbComplianceProfile);
//# sourceMappingURL=cb-compliance-profile.entity.js.map