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
exports.NsbRegistrationRequest = void 0;
const typeorm_1 = require("typeorm");
const country_entity_1 = require("../../reference-data/entities/country.entity");
const system_user_entity_1 = require("../../system-user/system-user.entity");
const enums_1 = require("../../../shared/enums");
const nsb_registration_request_document_entity_1 = require("./nsb-registration-request-document.entity");
let NsbRegistrationRequest = class NsbRegistrationRequest {
};
exports.NsbRegistrationRequest = NsbRegistrationRequest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_id', nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "countryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.Country, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'country_id' }),
    __metadata("design:type", country_entity_1.Country)
], NsbRegistrationRequest.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_name', length: 255, nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "countryName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nsb_official_name', length: 255, nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "nsbOfficialName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nsb_acronym', length: 50, nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "nsbAcronym", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'iso_code', length: 2, nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "isoCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'legal_status', type: 'text', nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "legalStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'establishment_act_name', type: 'text', nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "establishmentActName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'establishment_act_number', type: 'text', nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "establishmentActNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'establishment_act_date', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], NsbRegistrationRequest.prototype, "establishmentActDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'registration_number', type: 'text', nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "registrationNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'registration_authority', type: 'text', nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "registrationAuthority", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tax_identification_number', type: 'text', nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "taxIdentificationNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vat_number', type: 'text', nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "vatNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'year_established', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], NsbRegistrationRequest.prototype, "yearEstablished", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'website', length: 500, nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_person_name', length: 255, nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "contactPersonName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_person_title', length: 255, nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "contactPersonTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_email', length: 255, nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "contactEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_phone', length: 50, nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "contactPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_mobile', length: 50, nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "contactMobile", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'director_general_name', length: 255, nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "directorGeneralName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'director_general_title', length: 255, nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "directorGeneralTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'director_general_email', length: 255, nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "directorGeneralEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'director_general_phone', length: 50, nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "directorGeneralPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'board_chair_name', length: 255, nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "boardChairName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'board_chair_email', length: 255, nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "boardChairEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'board_chair_phone', length: 50, nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "boardChairPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'headquarters_address', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], NsbRegistrationRequest.prototype, "headquartersAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'postal_address', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], NsbRegistrationRequest.prototype, "postalAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'additional_addresses', type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], NsbRegistrationRequest.prototype, "additionalAddresses", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'additional_contacts', type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], NsbRegistrationRequest.prototype, "additionalContacts", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'key_officials', type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], NsbRegistrationRequest.prototype, "keyOfficials", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'international_memberships', type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], NsbRegistrationRequest.prototype, "internationalMemberships", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mandate_areas', type: 'text', array: true, nullable: true }),
    __metadata("design:type", Array)
], NsbRegistrationRequest.prototype, "mandateAreas", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'additional_user_slots_requested', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], NsbRegistrationRequest.prototype, "additionalUserSlotsRequested", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'requested_roles', type: 'text', array: true, default: [] }),
    __metadata("design:type", Array)
], NsbRegistrationRequest.prototype, "requestedRoles", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', array: true, nullable: true }),
    __metadata("design:type", Array)
], NsbRegistrationRequest.prototype, "sectors", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.NsbRegistrationRequestStatus, default: enums_1.NsbRegistrationRequestStatus.DRAFT }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "remarks", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reviewed_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "reviewedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'reviewed_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], NsbRegistrationRequest.prototype, "reviewedByUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reviewed_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], NsbRegistrationRequest.prototype, "reviewedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], NsbRegistrationRequest.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], NsbRegistrationRequest.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], NsbRegistrationRequest.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nsb_registration_request_document_entity_1.NsbRegistrationRequestDocument, (doc) => doc.registrationRequest, { cascade: false }),
    __metadata("design:type", Array)
], NsbRegistrationRequest.prototype, "documents", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nsb_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequest.prototype, "nsbId", void 0);
exports.NsbRegistrationRequest = NsbRegistrationRequest = __decorate([
    (0, typeorm_1.Entity)('nsb_registration_requests')
], NsbRegistrationRequest);
//# sourceMappingURL=nsb-registration-request.entity.js.map