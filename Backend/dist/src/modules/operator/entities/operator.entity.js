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
exports.Operator = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../shared/enums");
const country_entity_1 = require("../../reference-data/entities/country.entity");
const system_user_entity_1 = require("../../system-user/system-user.entity");
const operator_contact_entity_1 = require("./operator-contact.entity");
const operator_location_entity_1 = require("./operator-location.entity");
const operator_business_sector_entity_1 = require("./operator-business-sector.entity");
const operator_market_entity_1 = require("./operator-market.entity");
const operator_production_capacity_entity_1 = require("./operator-production-capacity.entity");
const operator_preference_entity_1 = require("./operator-preference.entity");
const operator_accessibility_entity_1 = require("./operator-accessibility.entity");
const operator_consent_entity_1 = require("./operator-consent.entity");
let Operator = class Operator {
};
exports.Operator = Operator;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Operator.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'registration_number', unique: true, nullable: true }),
    __metadata("design:type", String)
], Operator.prototype, "registrationNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'operator_type', type: 'enum', enum: enums_1.OperatorType, nullable: true }),
    __metadata("design:type", String)
], Operator.prototype, "operatorType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'company_legal_name', length: 200, nullable: true }),
    __metadata("design:type", String)
], Operator.prototype, "companyLegalName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'trading_name', length: 150, nullable: true }),
    __metadata("design:type", String)
], Operator.prototype, "tradingName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'registration_number_business', length: 50, nullable: true }),
    __metadata("design:type", String)
], Operator.prototype, "registrationNumberBusiness", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'legal_registration_number_type', type: 'enum', enum: enums_1.LegalRegistrationNumberType, nullable: true }),
    __metadata("design:type", String)
], Operator.prototype, "legalRegistrationNumberType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'legal_registration_number', length: 100, nullable: true }),
    __metadata("design:type", String)
], Operator.prototype, "legalRegistrationNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tax_id', length: 30, nullable: true }),
    __metadata("design:type", String)
], Operator.prototype, "taxId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vat_number', length: 30, nullable: true }),
    __metadata("design:type", String)
], Operator.prototype, "vatNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'year_established', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Operator.prototype, "yearEstablished", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'company_age', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Operator.prototype, "companyAge", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'legal_structure', type: 'enum', enum: enums_1.LegalStructure, nullable: true }),
    __metadata("design:type", String)
], Operator.prototype, "legalStructure", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'business_activity', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Operator.prototype, "businessActivity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_count', type: 'enum', enum: enums_1.EmployeeCountRange, nullable: true }),
    __metadata("design:type", String)
], Operator.prototype, "employeeCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'annual_turnover', type: 'enum', enum: enums_1.AnnualTurnoverRange, nullable: true }),
    __metadata("design:type", String)
], Operator.prototype, "annualTurnover", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'annual_revenue', type: 'decimal', precision: 15, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Operator.prototype, "annualRevenue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'export_percentage', type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Operator.prototype, "exportPercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'import_percentage', type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Operator.prototype, "importPercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'capital_investment', type: 'decimal', precision: 15, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Operator.prototype, "capitalInvestment", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ownership_type', type: 'enum', enum: enums_1.OwnershipType, nullable: true }),
    __metadata("design:type", String)
], Operator.prototype, "ownershipType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'majority_owner_nationality', length: 50, nullable: true }),
    __metadata("design:type", String)
], Operator.prototype, "majorityOwnerNationality", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'women_owned', type: 'enum', enum: enums_1.OwnershipStatus, nullable: true }),
    __metadata("design:type", String)
], Operator.prototype, "womenOwned", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'youth_owned', type: 'enum', enum: enums_1.OwnershipStatus, nullable: true }),
    __metadata("design:type", String)
], Operator.prototype, "youthOwned", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'black_owned_percentage', type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Operator.prototype, "blackOwnedPercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sme_category', type: 'enum', enum: enums_1.SMECategory, nullable: true }),
    __metadata("design:type", String)
], Operator.prototype, "smeCategory", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'beneficial_owners_count', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Operator.prototype, "beneficialOwnersCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pep_involved', type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], Operator.prototype, "pepInvolved", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pep_details', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Operator.prototype, "pepDetails", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_group', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Operator.prototype, "isGroup", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'group_manager_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Operator.prototype, "groupManagerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'group_members', type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], Operator.prototype, "groupMembers", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'scheme_type', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Operator.prototype, "schemeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'scheme_payload', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Operator.prototype, "schemePayload", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.OperatorStatus, default: enums_1.OperatorStatus.DRAFT }),
    __metadata("design:type", String)
], Operator.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'submitted_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Operator.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approved_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Operator.prototype, "approvedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rejected_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Operator.prototype, "rejectedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rejection_reason', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Operator.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Operator.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], Operator.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Operator.prototype, "countryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.Country, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'country_id' }),
    __metadata("design:type", country_entity_1.Country)
], Operator.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Operator.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Operator.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Operator.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], Operator.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Operator.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'updated_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], Operator.prototype, "updatedByUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => operator_contact_entity_1.OperatorContact, (contact) => contact.operator, { cascade: true }),
    __metadata("design:type", Array)
], Operator.prototype, "contacts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => operator_location_entity_1.OperatorLocation, (location) => location.operator, { cascade: true }),
    __metadata("design:type", Array)
], Operator.prototype, "locations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => operator_business_sector_entity_1.OperatorBusinessSector, (sector) => sector.operator, { cascade: true }),
    __metadata("design:type", Array)
], Operator.prototype, "businessSectors", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => operator_market_entity_1.OperatorMarket, (market) => market.operator, { cascade: true }),
    __metadata("design:type", operator_market_entity_1.OperatorMarket)
], Operator.prototype, "markets", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => operator_production_capacity_entity_1.OperatorProductionCapacity, (capacity) => capacity.operator, { cascade: true }),
    __metadata("design:type", operator_production_capacity_entity_1.OperatorProductionCapacity)
], Operator.prototype, "productionCapacity", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => operator_preference_entity_1.OperatorPreference, (preference) => preference.operator, { cascade: true }),
    __metadata("design:type", operator_preference_entity_1.OperatorPreference)
], Operator.prototype, "preferences", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => operator_accessibility_entity_1.OperatorAccessibility, (accessibility) => accessibility.operator, { cascade: true }),
    __metadata("design:type", operator_accessibility_entity_1.OperatorAccessibility)
], Operator.prototype, "accessibility", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => operator_consent_entity_1.OperatorConsent, (consent) => consent.operator, { cascade: true }),
    __metadata("design:type", operator_consent_entity_1.OperatorConsent)
], Operator.prototype, "consents", void 0);
exports.Operator = Operator = __decorate([
    (0, typeorm_1.Entity)('operators')
], Operator);
//# sourceMappingURL=operator.entity.js.map