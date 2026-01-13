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
exports.CreateOperatorRegistrationDto = exports.ConsentDto = exports.AccessibilityDto = exports.PreferencesDto = exports.ProductionCapacityDto = exports.MarketInfoDto = exports.BusinessSectorDto = exports.OperatorLocationDto = exports.OperatorContactDto = exports.OwnershipInfoDto = exports.CompanySizeDto = exports.CompanyInfoDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const enums_1 = require("../../../shared/enums");
const transform_empty_to_undefined_decorator_1 = require("../../../shared/decorators/transform-empty-to-undefined.decorator");
class CompanyInfoDto {
}
exports.CompanyInfoDto = CompanyInfoDto;
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Operator type is required' }),
    (0, class_validator_1.IsEnum)(enums_1.OperatorType),
    __metadata("design:type", String)
], CompanyInfoDto.prototype, "operatorType", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CompanyInfoDto.prototype, "companyLegalName", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], CompanyInfoDto.prototype, "tradingName", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Registration number is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CompanyInfoDto.prototype, "registrationNumberBusiness", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], CompanyInfoDto.prototype, "taxId", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], CompanyInfoDto.prototype, "vatNumber", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1900),
    (0, class_validator_1.Max)(new Date().getFullYear()),
    __metadata("design:type", Number)
], CompanyInfoDto.prototype, "yearEstablished", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Legal structure is required' }),
    (0, class_validator_1.IsEnum)(enums_1.LegalStructure),
    __metadata("design:type", String)
], CompanyInfoDto.prototype, "legalStructure", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Business activity is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CompanyInfoDto.prototype, "businessActivity", void 0);
class CompanySizeDto {
}
exports.CompanySizeDto = CompanySizeDto;
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Employee count is required' }),
    (0, class_validator_1.IsEnum)(enums_1.EmployeeCountRange),
    __metadata("design:type", String)
], CompanySizeDto.prototype, "employeeCount", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Annual turnover is required' }),
    (0, class_validator_1.IsEnum)(enums_1.AnnualTurnoverRange),
    __metadata("design:type", String)
], CompanySizeDto.prototype, "annualTurnover", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CompanySizeDto.prototype, "annualRevenue", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CompanySizeDto.prototype, "exportPercentage", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CompanySizeDto.prototype, "importPercentage", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CompanySizeDto.prototype, "capitalInvestment", void 0);
class OwnershipInfoDto {
}
exports.OwnershipInfoDto = OwnershipInfoDto;
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Ownership type is required' }),
    (0, class_validator_1.IsEnum)(enums_1.OwnershipType),
    __metadata("design:type", String)
], OwnershipInfoDto.prototype, "ownershipType", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], OwnershipInfoDto.prototype, "majorityOwnerNationality", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Women owned status is required' }),
    (0, class_validator_1.IsEnum)(enums_1.OwnershipStatus),
    __metadata("design:type", String)
], OwnershipInfoDto.prototype, "womenOwned", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Youth owned status is required' }),
    (0, class_validator_1.IsEnum)(enums_1.OwnershipStatus),
    __metadata("design:type", String)
], OwnershipInfoDto.prototype, "youthOwned", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], OwnershipInfoDto.prototype, "blackOwnedPercentage", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], OwnershipInfoDto.prototype, "beneficialOwnersCount", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], OwnershipInfoDto.prototype, "pepInvolved", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], OwnershipInfoDto.prototype, "pepDetails", void 0);
class OperatorContactDto {
}
exports.OperatorContactDto = OperatorContactDto;
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['PRIMARY', 'ALTERNATIVE', 'TECHNICAL', 'FINANCIAL', 'LEGAL']),
    __metadata("design:type", String)
], OperatorContactDto.prototype, "contactType", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Primary contact name is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], OperatorContactDto.prototype, "primaryContact", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Contact position is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], OperatorContactDto.prototype, "contactPosition", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Contact email is required' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], OperatorContactDto.prototype, "contactEmail", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], OperatorContactDto.prototype, "contactPhone", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], OperatorContactDto.prototype, "altContact", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], OperatorContactDto.prototype, "altEmail", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], OperatorContactDto.prototype, "altPhone", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], OperatorContactDto.prototype, "isPrimary", void 0);
class OperatorLocationDto {
}
exports.OperatorLocationDto = OperatorLocationDto;
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['REGISTERED_ADDRESS', 'FACTORY', 'PRODUCTION_FACILITY', 'WAREHOUSE', 'OFFICE', 'OTHER']),
    __metadata("design:type", String)
], OperatorLocationDto.prototype, "locationType", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Physical address is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], OperatorLocationDto.prototype, "physicalAddress", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Address line 1 is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], OperatorLocationDto.prototype, "addressLine1", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], OperatorLocationDto.prototype, "addressLine2", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Postal code is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], OperatorLocationDto.prototype, "postalCode", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'City/Town is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], OperatorLocationDto.prototype, "cityTown", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Region/State is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], OperatorLocationDto.prototype, "regionState", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Country is required' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], OperatorLocationDto.prototype, "countryId", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], OperatorLocationDto.prototype, "gpsCoordinates", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], OperatorLocationDto.prototype, "factoryLocationSame", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], OperatorLocationDto.prototype, "factoryName", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['MANUFACTURING_PLANT', 'PROCESSING_UNIT', 'ASSEMBLY_LINE', 'WORKSHOP', 'PACKAGING_FACILITY', 'OTHER']),
    __metadata("design:type", String)
], OperatorLocationDto.prototype, "factoryType", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OperatorLocationDto.prototype, "factorySize", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], OperatorLocationDto.prototype, "isPrimary", void 0);
class BusinessSectorDto {
}
exports.BusinessSectorDto = BusinessSectorDto;
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Main business sector is required' }),
    (0, class_validator_1.IsEnum)(['AGRICULTURE', 'MANUFACTURING', 'SERVICES', 'CONSTRUCTION', 'MINING', 'RETAIL', 'WHOLESALE', 'TRANSPORT', 'ENERGY', 'TELECOMMUNICATIONS', 'OTHER']),
    __metadata("design:type", String)
], BusinessSectorDto.prototype, "mainSector", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], BusinessSectorDto.prototype, "subSector", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], BusinessSectorDto.prototype, "isicCode", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], BusinessSectorDto.prototype, "productCategories", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], BusinessSectorDto.prototype, "percentageRevenue", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1900),
    (0, class_validator_1.Max)(new Date().getFullYear()),
    __metadata("design:type", Number)
], BusinessSectorDto.prototype, "sectorStartYear", void 0);
class MarketInfoDto {
}
exports.MarketInfoDto = MarketInfoDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(['NATIONAL', 'REGIONAL', 'LOCAL'], { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], MarketInfoDto.prototype, "domesticMarkets", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)(undefined, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], MarketInfoDto.prototype, "exportMarkets", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Primary export market is required' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], MarketInfoDto.prototype, "primaryExportMarket", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1900),
    (0, class_validator_1.Max)(new Date().getFullYear()),
    __metadata("design:type", Number)
], MarketInfoDto.prototype, "exportStartYear", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)(undefined, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], MarketInfoDto.prototype, "importSources", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'AFCFTA awareness is required' }),
    (0, class_validator_1.IsEnum)(['HIGH', 'MEDIUM', 'LOW', 'NONE']),
    __metadata("design:type", String)
], MarketInfoDto.prototype, "afcftaAwareness", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], MarketInfoDto.prototype, "tradeChallenges", void 0);
class ProductionCapacityDto {
}
exports.ProductionCapacityDto = ProductionCapacityDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ProductionCapacityDto.prototype, "productionCapacity", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], ProductionCapacityDto.prototype, "capacityUnit", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], ProductionCapacityDto.prototype, "capacityUtilization", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Quality management status is required' }),
    (0, class_validator_1.IsEnum)(['YES', 'NO', 'IN_PROGRESS']),
    __metadata("design:type", String)
], ProductionCapacityDto.prototype, "qualityManagement", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'QMS type is required' }),
    (0, class_validator_1.IsEnum)(['ISO_9001', 'HACCP', 'GMP', 'INTERNAL_SYSTEM', 'NONE', 'IN_PROGRESS']),
    __metadata("design:type", String)
], ProductionCapacityDto.prototype, "qmsType", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ProductionCapacityDto.prototype, "certificationCount", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], ProductionCapacityDto.prototype, "existingCertifications", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ProductionCapacityDto.prototype, "technicalStaff", void 0);
class PreferencesDto {
}
exports.PreferencesDto = PreferencesDto;
__decorate([
    (0, class_validator_1.IsEnum)(['ENGLISH', 'FRENCH', 'PORTUGUESE', 'ARABIC', 'SWAHILI', 'OTHER']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PreferencesDto.prototype, "preferredLanguage", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(['EMAIL', 'SMS', 'PHONE', 'WHATSAPP', 'POSTAL_MAIL', 'IN_PERSON'], { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], PreferencesDto.prototype, "communicationPreferences", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['REAL_TIME', 'DAILY_DIGEST', 'WEEKLY_SUMMARY', 'MONTHLY_SUMMARY']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PreferencesDto.prototype, "notificationFrequency", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], PreferencesDto.prototype, "timezone", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], PreferencesDto.prototype, "currency", void 0);
class AccessibilityDto {
}
exports.AccessibilityDto = AccessibilityDto;
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AccessibilityDto.prototype, "assistiveTech", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(['SCREEN_READER', 'HIGH_CONTRAST', 'LARGE_TEXT', 'TEXT_TO_SPEECH', 'KEYBOARD_NAVIGATION', 'OTHER'], { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AccessibilityDto.prototype, "disabilityTypes", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], AccessibilityDto.prototype, "specialAssistance", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['BASIC', 'INTERMEDIATE', 'ADVANCED']),
    __metadata("design:type", String)
], AccessibilityDto.prototype, "literacyLevel", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Internet access type is required' }),
    (0, class_validator_1.IsEnum)(['HIGH_SPEED', 'MOBILE_DATA', 'LIMITED', 'INTERMITTENT']),
    __metadata("design:type", String)
], AccessibilityDto.prototype, "internetAccess", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Device type is required' }),
    (0, class_validator_1.IsEnum)(['DESKTOP', 'LAPTOP', 'SMARTPHONE', 'TABLET', 'FEATURE_PHONE']),
    __metadata("design:type", String)
], AccessibilityDto.prototype, "deviceType", void 0);
class ConsentDto {
}
exports.ConsentDto = ConsentDto;
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ConsentDto.prototype, "dataConsent", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ConsentDto.prototype, "dataSharingConsent", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ConsentDto.prototype, "crossBorderData", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ConsentDto.prototype, "marketingConsent", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ConsentDto.prototype, "smsConsent", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ConsentDto.prototype, "whatsappConsent", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ConsentDto.prototype, "termsAcceptance", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Declaration signature is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], ConsentDto.prototype, "declarationSignature", void 0);
class CreateOperatorRegistrationDto {
}
exports.CreateOperatorRegistrationDto = CreateOperatorRegistrationDto;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CompanyInfoDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", CompanyInfoDto)
], CreateOperatorRegistrationDto.prototype, "companyInfo", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CompanySizeDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", CompanySizeDto)
], CreateOperatorRegistrationDto.prototype, "companySize", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => OwnershipInfoDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", OwnershipInfoDto)
], CreateOperatorRegistrationDto.prototype, "ownershipInfo", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => OperatorContactDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", OperatorContactDto)
], CreateOperatorRegistrationDto.prototype, "primaryContact", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OperatorLocationDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateOperatorRegistrationDto.prototype, "locations", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BusinessSectorDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateOperatorRegistrationDto.prototype, "businessSectors", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MarketInfoDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", MarketInfoDto)
], CreateOperatorRegistrationDto.prototype, "marketInfo", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ProductionCapacityDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ProductionCapacityDto)
], CreateOperatorRegistrationDto.prototype, "productionCapacity", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PreferencesDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", PreferencesDto)
], CreateOperatorRegistrationDto.prototype, "preferences", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AccessibilityDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", AccessibilityDto)
], CreateOperatorRegistrationDto.prototype, "accessibility", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ConsentDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ConsentDto)
], CreateOperatorRegistrationDto.prototype, "consents", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOperatorRegistrationDto.prototype, "userId", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Country is required' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateOperatorRegistrationDto.prototype, "countryId", void 0);
//# sourceMappingURL=create-operator-registration.dto.js.map