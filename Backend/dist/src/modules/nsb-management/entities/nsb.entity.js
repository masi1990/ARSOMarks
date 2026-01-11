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
exports.Nsb = void 0;
const typeorm_1 = require("typeorm");
const country_entity_1 = require("../../reference-data/entities/country.entity");
const nsb_contact_entity_1 = require("./nsb-contact.entity");
const nsb_location_entity_1 = require("./nsb-location.entity");
const nsb_document_entity_1 = require("./nsb-document.entity");
const enums_1 = require("../../../shared/enums");
const license_application_entity_1 = require("../../licensing/entities/license-application.entity");
const license_entity_1 = require("../../licensing/entities/license.entity");
const system_user_entity_1 = require("../../system-user/system-user.entity");
let Nsb = class Nsb {
};
exports.Nsb = Nsb;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Nsb.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Nsb.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'short_name', length: 100, nullable: true }),
    __metadata("design:type", String)
], Nsb.prototype, "shortName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_id' }),
    __metadata("design:type", String)
], Nsb.prototype, "countryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.Country, (country) => country.nsbs, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'country_id' }),
    __metadata("design:type", country_entity_1.Country)
], Nsb.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.NsbClassification }),
    __metadata("design:type", String)
], Nsb.prototype, "classification", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'registration_number', length: 100, nullable: true }),
    __metadata("design:type", String)
], Nsb.prototype, "registrationNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Nsb.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.NsbStatus, default: enums_1.NsbStatus.ACTIVE }),
    __metadata("design:type", String)
], Nsb.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'website_url', length: 500, nullable: true }),
    __metadata("design:type", String)
], Nsb.prototype, "websiteUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'social_media_handles', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Nsb.prototype, "socialMediaHandles", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_staff', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Nsb.prototype, "totalStaff", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'key_departments', type: 'text', array: true, nullable: true }),
    __metadata("design:type", Array)
], Nsb.prototype, "keyDepartments", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'national_standards_act_link', length: 500, nullable: true }),
    __metadata("design:type", String)
], Nsb.prototype, "nationalStandardsActLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'national_conformity_assessment_policy_link', length: 500, nullable: true }),
    __metadata("design:type", String)
], Nsb.prototype, "nationalConformityAssessmentPolicyLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'national_quality_policy_link', length: 500, nullable: true }),
    __metadata("design:type", String)
], Nsb.prototype, "nationalQualityPolicyLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'acap_coordinator_name', length: 255, nullable: true }),
    __metadata("design:type", String)
], Nsb.prototype, "acapCoordinatorName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'acap_coordinator_contact', length: 255, nullable: true }),
    __metadata("design:type", String)
], Nsb.prototype, "acapCoordinatorContact", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'market_surveillance_focal_point_name', length: 255, nullable: true }),
    __metadata("design:type", String)
], Nsb.prototype, "marketSurveillanceFocalPointName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'market_surveillance_focal_point_contact', length: 255, nullable: true }),
    __metadata("design:type", String)
], Nsb.prototype, "marketSurveillanceFocalPointContact", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'customs_trade_focal_point_name', length: 255, nullable: true }),
    __metadata("design:type", String)
], Nsb.prototype, "customsTradeFocalPointName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'customs_trade_focal_point_contact', length: 255, nullable: true }),
    __metadata("design:type", String)
], Nsb.prototype, "customsTradeFocalPointContact", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'consumer_affairs_focal_point_name', length: 255, nullable: true }),
    __metadata("design:type", String)
], Nsb.prototype, "consumerAffairsFocalPointName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'consumer_affairs_focal_point_contact', length: 255, nullable: true }),
    __metadata("design:type", String)
], Nsb.prototype, "consumerAffairsFocalPointContact", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Nsb.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Nsb.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Nsb.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], Nsb.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Nsb.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'updated_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], Nsb.prototype, "updatedByUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nsb_contact_entity_1.NsbContact, (contact) => contact.nsb, { cascade: true }),
    __metadata("design:type", Array)
], Nsb.prototype, "contacts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nsb_location_entity_1.NsbLocation, (location) => location.nsb, { cascade: true }),
    __metadata("design:type", Array)
], Nsb.prototype, "locations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => license_application_entity_1.LicenseApplication, (app) => app.nsb),
    __metadata("design:type", Array)
], Nsb.prototype, "licenseApplications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => license_entity_1.License, (license) => license.nsb),
    __metadata("design:type", Array)
], Nsb.prototype, "licenses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nsb_document_entity_1.NsbDocument, (doc) => doc.nsb, { cascade: false }),
    __metadata("design:type", Array)
], Nsb.prototype, "documents", void 0);
exports.Nsb = Nsb = __decorate([
    (0, typeorm_1.Entity)('nsb')
], Nsb);
//# sourceMappingURL=nsb.entity.js.map