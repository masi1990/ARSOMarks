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
exports.CreateOperatorRegistrationDraftDto = exports.ConsentDraftDto = exports.AccessibilityDraftDto = exports.PreferencesDraftDto = exports.ProductionCapacityDraftDto = exports.MarketInfoDraftDto = exports.BusinessSectorDraftDto = exports.OperatorLocationDraftDto = exports.OperatorContactDraftDto = exports.OwnershipInfoDraftDto = exports.CompanySizeDraftDto = exports.CompanyInfoDraftDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const enums_1 = require("../../../shared/enums");
const transform_empty_to_undefined_decorator_1 = require("../../../shared/decorators/transform-empty-to-undefined.decorator");
class CompanyInfoDraftDto {
}
exports.CompanyInfoDraftDto = CompanyInfoDraftDto;
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.OperatorType),
    __metadata("design:type", String)
], CompanyInfoDraftDto.prototype, "operatorType", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CompanyInfoDraftDto.prototype, "companyLegalName", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], CompanyInfoDraftDto.prototype, "tradingName", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CompanyInfoDraftDto.prototype, "registrationNumberBusiness", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], CompanyInfoDraftDto.prototype, "taxId", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], CompanyInfoDraftDto.prototype, "vatNumber", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1900),
    (0, class_validator_1.Max)(new Date().getFullYear()),
    __metadata("design:type", Number)
], CompanyInfoDraftDto.prototype, "yearEstablished", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.LegalStructure),
    __metadata("design:type", String)
], CompanyInfoDraftDto.prototype, "legalStructure", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CompanyInfoDraftDto.prototype, "businessActivity", void 0);
class CompanySizeDraftDto {
}
exports.CompanySizeDraftDto = CompanySizeDraftDto;
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.EmployeeCountRange),
    __metadata("design:type", String)
], CompanySizeDraftDto.prototype, "employeeCount", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.AnnualTurnoverRange),
    __metadata("design:type", String)
], CompanySizeDraftDto.prototype, "annualTurnover", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CompanySizeDraftDto.prototype, "annualRevenue", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CompanySizeDraftDto.prototype, "exportPercentage", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CompanySizeDraftDto.prototype, "importPercentage", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CompanySizeDraftDto.prototype, "capitalInvestment", void 0);
class OwnershipInfoDraftDto {
}
exports.OwnershipInfoDraftDto = OwnershipInfoDraftDto;
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.OwnershipType),
    __metadata("design:type", String)
], OwnershipInfoDraftDto.prototype, "ownershipType", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], OwnershipInfoDraftDto.prototype, "majorityOwnerNationality", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.OwnershipStatus),
    __metadata("design:type", String)
], OwnershipInfoDraftDto.prototype, "womenOwned", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.OwnershipStatus),
    __metadata("design:type", String)
], OwnershipInfoDraftDto.prototype, "youthOwned", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], OwnershipInfoDraftDto.prototype, "blackOwnedPercentage", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], OwnershipInfoDraftDto.prototype, "beneficialOwnersCount", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], OwnershipInfoDraftDto.prototype, "pepInvolved", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], OwnershipInfoDraftDto.prototype, "pepDetails", void 0);
class OperatorContactDraftDto {
}
exports.OperatorContactDraftDto = OperatorContactDraftDto;
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['PRIMARY', 'ALTERNATIVE', 'TECHNICAL', 'FINANCIAL', 'LEGAL']),
    __metadata("design:type", String)
], OperatorContactDraftDto.prototype, "contactType", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], OperatorContactDraftDto.prototype, "primaryContact", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], OperatorContactDraftDto.prototype, "contactPosition", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], OperatorContactDraftDto.prototype, "contactEmail", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], OperatorContactDraftDto.prototype, "contactPhone", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], OperatorContactDraftDto.prototype, "altContact", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], OperatorContactDraftDto.prototype, "altEmail", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], OperatorContactDraftDto.prototype, "altPhone", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], OperatorContactDraftDto.prototype, "isPrimary", void 0);
class OperatorLocationDraftDto {
}
exports.OperatorLocationDraftDto = OperatorLocationDraftDto;
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['REGISTERED_ADDRESS', 'FACTORY', 'PRODUCTION_FACILITY', 'WAREHOUSE', 'OFFICE', 'OTHER']),
    __metadata("design:type", String)
], OperatorLocationDraftDto.prototype, "locationType", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], OperatorLocationDraftDto.prototype, "physicalAddress", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], OperatorLocationDraftDto.prototype, "addressLine1", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], OperatorLocationDraftDto.prototype, "addressLine2", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], OperatorLocationDraftDto.prototype, "postalCode", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], OperatorLocationDraftDto.prototype, "cityTown", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], OperatorLocationDraftDto.prototype, "regionState", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], OperatorLocationDraftDto.prototype, "countryId", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], OperatorLocationDraftDto.prototype, "gpsCoordinates", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], OperatorLocationDraftDto.prototype, "factoryLocationSame", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], OperatorLocationDraftDto.prototype, "factoryName", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['MANUFACTURING_PLANT', 'PROCESSING_UNIT', 'ASSEMBLY_LINE', 'WORKSHOP', 'PACKAGING_FACILITY', 'OTHER']),
    __metadata("design:type", String)
], OperatorLocationDraftDto.prototype, "factoryType", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OperatorLocationDraftDto.prototype, "factorySize", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], OperatorLocationDraftDto.prototype, "isPrimary", void 0);
class BusinessSectorDraftDto {
}
exports.BusinessSectorDraftDto = BusinessSectorDraftDto;
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['AGRICULTURE', 'MANUFACTURING', 'SERVICES', 'CONSTRUCTION', 'MINING', 'RETAIL', 'WHOLESALE', 'TRANSPORT', 'ENERGY', 'TELECOMMUNICATIONS', 'OTHER']),
    __metadata("design:type", String)
], BusinessSectorDraftDto.prototype, "mainSector", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], BusinessSectorDraftDto.prototype, "subSector", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], BusinessSectorDraftDto.prototype, "isicCode", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], BusinessSectorDraftDto.prototype, "productCategories", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], BusinessSectorDraftDto.prototype, "percentageRevenue", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1900),
    (0, class_validator_1.Max)(new Date().getFullYear()),
    __metadata("design:type", Number)
], BusinessSectorDraftDto.prototype, "sectorStartYear", void 0);
class MarketInfoDraftDto {
}
exports.MarketInfoDraftDto = MarketInfoDraftDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(['NATIONAL', 'REGIONAL', 'LOCAL'], { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], MarketInfoDraftDto.prototype, "domesticMarkets", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)(undefined, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], MarketInfoDraftDto.prototype, "exportMarkets", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], MarketInfoDraftDto.prototype, "primaryExportMarket", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1900),
    (0, class_validator_1.Max)(new Date().getFullYear()),
    __metadata("design:type", Number)
], MarketInfoDraftDto.prototype, "exportStartYear", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)(undefined, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], MarketInfoDraftDto.prototype, "importSources", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['HIGH', 'MEDIUM', 'LOW', 'NONE']),
    __metadata("design:type", String)
], MarketInfoDraftDto.prototype, "afcftaAwareness", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], MarketInfoDraftDto.prototype, "tradeChallenges", void 0);
class ProductionCapacityDraftDto {
}
exports.ProductionCapacityDraftDto = ProductionCapacityDraftDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ProductionCapacityDraftDto.prototype, "productionCapacity", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], ProductionCapacityDraftDto.prototype, "capacityUnit", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], ProductionCapacityDraftDto.prototype, "capacityUtilization", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['YES', 'NO', 'IN_PROGRESS']),
    __metadata("design:type", String)
], ProductionCapacityDraftDto.prototype, "qualityManagement", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['ISO_9001', 'HACCP', 'GMP', 'INTERNAL_SYSTEM', 'NONE', 'IN_PROGRESS']),
    __metadata("design:type", String)
], ProductionCapacityDraftDto.prototype, "qmsType", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ProductionCapacityDraftDto.prototype, "certificationCount", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], ProductionCapacityDraftDto.prototype, "existingCertifications", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ProductionCapacityDraftDto.prototype, "technicalStaff", void 0);
class PreferencesDraftDto {
}
exports.PreferencesDraftDto = PreferencesDraftDto;
__decorate([
    (0, class_validator_1.IsEnum)(['ENGLISH', 'FRENCH', 'PORTUGUESE', 'ARABIC', 'SWAHILI', 'OTHER']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PreferencesDraftDto.prototype, "preferredLanguage", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(['EMAIL', 'SMS', 'PHONE', 'WHATSAPP', 'POSTAL_MAIL', 'IN_PERSON'], { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], PreferencesDraftDto.prototype, "communicationPreferences", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['REAL_TIME', 'DAILY_DIGEST', 'WEEKLY_SUMMARY', 'MONTHLY_SUMMARY']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PreferencesDraftDto.prototype, "notificationFrequency", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], PreferencesDraftDto.prototype, "timezone", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], PreferencesDraftDto.prototype, "currency", void 0);
class AccessibilityDraftDto {
}
exports.AccessibilityDraftDto = AccessibilityDraftDto;
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AccessibilityDraftDto.prototype, "assistiveTech", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(['SCREEN_READER', 'HIGH_CONTRAST', 'LARGE_TEXT', 'TEXT_TO_SPEECH', 'KEYBOARD_NAVIGATION', 'OTHER'], { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AccessibilityDraftDto.prototype, "disabilityTypes", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], AccessibilityDraftDto.prototype, "specialAssistance", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['BASIC', 'INTERMEDIATE', 'ADVANCED']),
    __metadata("design:type", String)
], AccessibilityDraftDto.prototype, "literacyLevel", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['HIGH_SPEED', 'MOBILE_DATA', 'LIMITED', 'INTERMITTENT']),
    __metadata("design:type", String)
], AccessibilityDraftDto.prototype, "internetAccess", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['DESKTOP', 'LAPTOP', 'SMARTPHONE', 'TABLET', 'FEATURE_PHONE']),
    __metadata("design:type", String)
], AccessibilityDraftDto.prototype, "deviceType", void 0);
class ConsentDraftDto {
}
exports.ConsentDraftDto = ConsentDraftDto;
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ConsentDraftDto.prototype, "dataConsent", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ConsentDraftDto.prototype, "dataSharingConsent", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ConsentDraftDto.prototype, "crossBorderData", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ConsentDraftDto.prototype, "marketingConsent", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ConsentDraftDto.prototype, "smsConsent", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ConsentDraftDto.prototype, "whatsappConsent", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ConsentDraftDto.prototype, "termsAcceptance", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], ConsentDraftDto.prototype, "declarationSignature", void 0);
class CreateOperatorRegistrationDraftDto {
}
exports.CreateOperatorRegistrationDraftDto = CreateOperatorRegistrationDraftDto;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CompanyInfoDraftDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", CompanyInfoDraftDto)
], CreateOperatorRegistrationDraftDto.prototype, "companyInfo", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CompanySizeDraftDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", CompanySizeDraftDto)
], CreateOperatorRegistrationDraftDto.prototype, "companySize", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => OwnershipInfoDraftDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", OwnershipInfoDraftDto)
], CreateOperatorRegistrationDraftDto.prototype, "ownershipInfo", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => OperatorContactDraftDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", OperatorContactDraftDto)
], CreateOperatorRegistrationDraftDto.prototype, "primaryContact", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OperatorLocationDraftDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateOperatorRegistrationDraftDto.prototype, "locations", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BusinessSectorDraftDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateOperatorRegistrationDraftDto.prototype, "businessSectors", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MarketInfoDraftDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", MarketInfoDraftDto)
], CreateOperatorRegistrationDraftDto.prototype, "marketInfo", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ProductionCapacityDraftDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ProductionCapacityDraftDto)
], CreateOperatorRegistrationDraftDto.prototype, "productionCapacity", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PreferencesDraftDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", PreferencesDraftDto)
], CreateOperatorRegistrationDraftDto.prototype, "preferences", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AccessibilityDraftDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", AccessibilityDraftDto)
], CreateOperatorRegistrationDraftDto.prototype, "accessibility", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ConsentDraftDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ConsentDraftDto)
], CreateOperatorRegistrationDraftDto.prototype, "consents", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOperatorRegistrationDraftDto.prototype, "userId", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOperatorRegistrationDraftDto.prototype, "countryId", void 0);
//# sourceMappingURL=create-operator-registration-draft.dto.js.map