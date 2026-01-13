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
exports.ApplicationRegistration = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../shared/enums");
const country_entity_1 = require("../../reference-data/entities/country.entity");
const system_user_entity_1 = require("../../system-user/system-user.entity");
let ApplicationRegistration = class ApplicationRegistration {
};
exports.ApplicationRegistration = ApplicationRegistration;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ApplicationRegistration.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'application_number', unique: true, nullable: true }),
    __metadata("design:type", String)
], ApplicationRegistration.prototype, "applicationNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'applicant_name', length: 200, nullable: true }),
    __metadata("design:type", String)
], ApplicationRegistration.prototype, "applicantName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'applicant_type', length: 50, nullable: true }),
    __metadata("design:type", String)
], ApplicationRegistration.prototype, "applicantType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'registration_number', length: 50, nullable: true }),
    __metadata("design:type", String)
], ApplicationRegistration.prototype, "registrationNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tax_id', length: 30, nullable: true }),
    __metadata("design:type", String)
], ApplicationRegistration.prototype, "taxId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_person', length: 100, nullable: true }),
    __metadata("design:type", String)
], ApplicationRegistration.prototype, "contactPerson", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_email', length: 150, nullable: true }),
    __metadata("design:type", String)
], ApplicationRegistration.prototype, "contactEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_phone', length: 20, nullable: true }),
    __metadata("design:type", String)
], ApplicationRegistration.prototype, "contactPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'physical_address', type: 'text', nullable: true }),
    __metadata("design:type", String)
], ApplicationRegistration.prototype, "physicalAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'city', length: 100, nullable: true }),
    __metadata("design:type", String)
], ApplicationRegistration.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'region_state', length: 100, nullable: true }),
    __metadata("design:type", String)
], ApplicationRegistration.prototype, "regionState", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'postal_code', length: 20, nullable: true }),
    __metadata("design:type", String)
], ApplicationRegistration.prototype, "postalCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ApplicationRegistration.prototype, "countryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.Country, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'country_id' }),
    __metadata("design:type", country_entity_1.Country)
], ApplicationRegistration.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'business_activity', type: 'text', nullable: true }),
    __metadata("design:type", String)
], ApplicationRegistration.prototype, "businessActivity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'year_established', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], ApplicationRegistration.prototype, "yearEstablished", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_count', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], ApplicationRegistration.prototype, "employeeCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'annual_revenue', type: 'decimal', precision: 15, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], ApplicationRegistration.prototype, "annualRevenue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'company_info', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ApplicationRegistration.prototype, "companyInfo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'company_size', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ApplicationRegistration.prototype, "companySize", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ownership_info', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ApplicationRegistration.prototype, "ownershipInfo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'primary_contact', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ApplicationRegistration.prototype, "primaryContact", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'locations', type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], ApplicationRegistration.prototype, "locations", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'business_sectors', type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], ApplicationRegistration.prototype, "businessSectors", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'market_info', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ApplicationRegistration.prototype, "marketInfo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'production_capacity', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ApplicationRegistration.prototype, "productionCapacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'preferences', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ApplicationRegistration.prototype, "preferences", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'accessibility', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ApplicationRegistration.prototype, "accessibility", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'consents', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ApplicationRegistration.prototype, "consents", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_certification', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ApplicationRegistration.prototype, "productCertification", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'manufacturer_info', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ApplicationRegistration.prototype, "manufacturerInfo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'conformity_evidence', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ApplicationRegistration.prototype, "conformityEvidence", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'post_certification', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ApplicationRegistration.prototype, "postCertification", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cb_selection', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ApplicationRegistration.prototype, "cbSelection", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'enum',
        enum: enums_1.ApplicationRegistrationStatus,
        default: enums_1.ApplicationRegistrationStatus.DRAFT,
    }),
    __metadata("design:type", String)
], ApplicationRegistration.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'submitted_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ApplicationRegistration.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ApplicationRegistration.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], ApplicationRegistration.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ApplicationRegistration.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ApplicationRegistration.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ApplicationRegistration.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ApplicationRegistration.prototype, "updatedAt", void 0);
exports.ApplicationRegistration = ApplicationRegistration = __decorate([
    (0, typeorm_1.Entity)('application_registrations')
], ApplicationRegistration);
//# sourceMappingURL=application-registration.entity.js.map