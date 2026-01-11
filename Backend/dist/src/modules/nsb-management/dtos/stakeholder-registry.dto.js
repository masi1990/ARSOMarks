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
exports.StakeholderRegistryDto = exports.TestingLaboratoryDto = exports.IndustryAssociationDto = exports.RegulatoryAgencyDto = exports.CustomsBorderAgencyDto = exports.MarketSurveillanceAuthorityDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const enums_1 = require("../../../shared/enums");
class MarketSurveillanceAuthorityDto {
    constructor() {
        this.isActive = true;
    }
}
exports.MarketSurveillanceAuthorityDto = MarketSurveillanceAuthorityDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MarketSurveillanceAuthorityDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], MarketSurveillanceAuthorityDto.prototype, "agencyName", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.MsaJurisdiction),
    __metadata("design:type", String)
], MarketSurveillanceAuthorityDto.prototype, "jurisdiction", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], MarketSurveillanceAuthorityDto.prototype, "contactPersonName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MarketSurveillanceAuthorityDto.prototype, "contactPersonEmail", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], MarketSurveillanceAuthorityDto.prototype, "contactPersonPhone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MarketSurveillanceAuthorityDto.prototype, "scopeOfAuthority", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.MouStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MarketSurveillanceAuthorityDto.prototype, "mouStatus", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], MarketSurveillanceAuthorityDto.prototype, "mouDocumentPath", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(64),
    __metadata("design:type", String)
], MarketSurveillanceAuthorityDto.prototype, "mouDocumentHash", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.SystemAccessLevel),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MarketSurveillanceAuthorityDto.prototype, "systemAccessLevelRequested", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], MarketSurveillanceAuthorityDto.prototype, "isActive", void 0);
class CustomsBorderAgencyDto {
    constructor() {
        this.integrationWithNationalSingleWindow = false;
        this.isActive = true;
    }
}
exports.CustomsBorderAgencyDto = CustomsBorderAgencyDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CustomsBorderAgencyDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CustomsBorderAgencyDto.prototype, "agencyName", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CustomsBorderAgencyDto.prototype, "keyBorderPosts", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CustomsBorderAgencyDto.prototype, "acapVerificationContactName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CustomsBorderAgencyDto.prototype, "acapVerificationContactEmail", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CustomsBorderAgencyDto.prototype, "acapVerificationContactPhone", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CustomsBorderAgencyDto.prototype, "integrationWithNationalSingleWindow", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CustomsBorderAgencyDto.prototype, "isActive", void 0);
class RegulatoryAgencyDto {
    constructor() {
        this.isActive = true;
    }
}
exports.RegulatoryAgencyDto = RegulatoryAgencyDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RegulatoryAgencyDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], RegulatoryAgencyDto.prototype, "agencyName", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.RegulatoryAgencyType),
    __metadata("design:type", String)
], RegulatoryAgencyDto.prototype, "agencyType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], RegulatoryAgencyDto.prototype, "otherTypeDescription", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], RegulatoryAgencyDto.prototype, "contactPersonName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RegulatoryAgencyDto.prototype, "contactPersonEmail", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], RegulatoryAgencyDto.prototype, "contactPersonPhone", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], RegulatoryAgencyDto.prototype, "isActive", void 0);
class IndustryAssociationDto {
    constructor() {
        this.willingnessToPromoteAcap = false;
        this.isActive = true;
    }
}
exports.IndustryAssociationDto = IndustryAssociationDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], IndustryAssociationDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], IndustryAssociationDto.prototype, "associationName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], IndustryAssociationDto.prototype, "sectorIndustry", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], IndustryAssociationDto.prototype, "numberOfMembers", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], IndustryAssociationDto.prototype, "contactPersonName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], IndustryAssociationDto.prototype, "contactPersonEmail", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], IndustryAssociationDto.prototype, "contactPersonPhone", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], IndustryAssociationDto.prototype, "willingnessToPromoteAcap", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], IndustryAssociationDto.prototype, "isActive", void 0);
class TestingLaboratoryDto {
    constructor() {
        this.isActive = true;
    }
}
exports.TestingLaboratoryDto = TestingLaboratoryDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TestingLaboratoryDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], TestingLaboratoryDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.AccreditationStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TestingLaboratoryDto.prototype, "accreditationStatus", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], TestingLaboratoryDto.prototype, "otherAccreditationDescription", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TestingLaboratoryDto.prototype, "scopeOfAccreditation", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], TestingLaboratoryDto.prototype, "contactForAcapReferralsName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TestingLaboratoryDto.prototype, "contactForAcapReferralsEmail", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], TestingLaboratoryDto.prototype, "contactForAcapReferralsPhone", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], TestingLaboratoryDto.prototype, "isActive", void 0);
class StakeholderRegistryDto {
}
exports.StakeholderRegistryDto = StakeholderRegistryDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => MarketSurveillanceAuthorityDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], StakeholderRegistryDto.prototype, "marketSurveillanceAuthorities", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CustomsBorderAgencyDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], StakeholderRegistryDto.prototype, "customsBorderAgencies", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => RegulatoryAgencyDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], StakeholderRegistryDto.prototype, "regulatoryAgencies", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => IndustryAssociationDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], StakeholderRegistryDto.prototype, "industryAssociations", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TestingLaboratoryDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], StakeholderRegistryDto.prototype, "testingLaboratories", void 0);
//# sourceMappingURL=stakeholder-registry.dto.js.map