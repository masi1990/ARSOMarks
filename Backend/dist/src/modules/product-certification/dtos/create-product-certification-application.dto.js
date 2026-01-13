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
exports.CreateProductCertificationApplicationDto = exports.DeclarationDto = exports.CbSelectionDto = exports.EnvironmentalClaimDto = exports.TechnicalSpecDto = exports.ProductDto = exports.VolumePriorityDto = exports.CertificationSchemeDto = exports.MarkSelectionDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const enums_1 = require("../../../shared/enums");
class MarkSelectionDto {
}
exports.MarkSelectionDto = MarkSelectionDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(enums_1.MarkRequestedType, { each: true }),
    __metadata("design:type", Array)
], MarkSelectionDto.prototype, "markRequested", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], MarkSelectionDto.prototype, "arsoQualityMark", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], MarkSelectionDto.prototype, "ecoMarkAfrica", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.MarkCombinationPreference),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MarkSelectionDto.prototype, "markCombination", void 0);
class CertificationSchemeDto {
}
exports.CertificationSchemeDto = CertificationSchemeDto;
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.CertificationSchemeType),
    __metadata("design:type", String)
], CertificationSchemeDto.prototype, "schemeType", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.ApplicationScope),
    __metadata("design:type", String)
], CertificationSchemeDto.prototype, "applicationScope", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.ProductCertificationType),
    __metadata("design:type", String)
], CertificationSchemeDto.prototype, "certificationType", void 0);
class VolumePriorityDto {
}
exports.VolumePriorityDto = VolumePriorityDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], VolumePriorityDto.prototype, "estimatedVolume", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.VolumeUnit),
    __metadata("design:type", String)
], VolumePriorityDto.prototype, "volumeUnit", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    __metadata("design:type", Number)
], VolumePriorityDto.prototype, "peakMonth", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.PriorityProcessing),
    __metadata("design:type", String)
], VolumePriorityDto.prototype, "priorityProcessing", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], VolumePriorityDto.prototype, "priorityReason", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.ExpectedTimeline),
    __metadata("design:type", String)
], VolumePriorityDto.prototype, "expectedTimeline", void 0);
class ProductDto {
}
exports.ProductDto = ProductDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], ProductDto.prototype, "productName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], ProductDto.prototype, "productScientificName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], ProductDto.prototype, "brandName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], ProductDto.prototype, "modelVariant", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], ProductDto.prototype, "productCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.MaxLength)(12),
    __metadata("design:type", String)
], ProductDto.prototype, "hsCode", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.ProductCategory),
    __metadata("design:type", String)
], ProductDto.prototype, "productCategory", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(50),
    (0, class_validator_1.MaxLength)(2000),
    __metadata("design:type", String)
], ProductDto.prototype, "productDescription", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], ProductDto.prototype, "intendedUse", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ProductDto.prototype, "keyFeatures", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], ProductDto.prototype, "uniqueSellingPoint", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)(undefined, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ProductDto.prototype, "intendedMarkets", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ProductDto.prototype, "primaryTargetMarket", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(enums_1.TargetConsumerGroup, { each: true }),
    __metadata("design:type", Array)
], ProductDto.prototype, "targetConsumers", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], ProductDto.prototype, "consumerWarnings", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], ProductDto.prototype, "shelfLife", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], ProductDto.prototype, "storageConditions", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], ProductDto.prototype, "unitWeight", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], ProductDto.prototype, "dimensions", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ProductDto.prototype, "color", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], ProductDto.prototype, "materialComposition", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.PackagingType),
    __metadata("design:type", String)
], ProductDto.prototype, "packagingType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], ProductDto.prototype, "packagingMaterial", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], ProductDto.prototype, "packagingWeight", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ProductDto.prototype, "unitsPerPackage", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ProductDto.prototype, "displayOrder", void 0);
class TechnicalSpecDto {
}
exports.TechnicalSpecDto = TechnicalSpecDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.MinLength)(1, { each: true }),
    __metadata("design:type", Array)
], TechnicalSpecDto.prototype, "applicableStandards", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], TechnicalSpecDto.prototype, "mandatoryStandards", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], TechnicalSpecDto.prototype, "voluntaryStandards", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], TechnicalSpecDto.prototype, "regulatoryBody", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], TechnicalSpecDto.prototype, "regulatoryApproval", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.TechnicalDocsStatus),
    __metadata("design:type", String)
], TechnicalSpecDto.prototype, "technicalDocsAvailable", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], TechnicalSpecDto.prototype, "missingDocuments", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.TestReportsAvailability),
    __metadata("design:type", String)
], TechnicalSpecDto.prototype, "testReportsAvailable", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], TechnicalSpecDto.prototype, "testCoverage", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(50),
    (0, class_validator_1.MaxLength)(2000),
    __metadata("design:type", String)
], TechnicalSpecDto.prototype, "manufacturingProcess", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TechnicalSpecDto.prototype, "processFlowDiagram", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(2000),
    __metadata("design:type", String)
], TechnicalSpecDto.prototype, "keyComponents", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], TechnicalSpecDto.prototype, "criticalComponents", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], TechnicalSpecDto.prototype, "componentSources", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['YES', 'PARTIAL', 'NO']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TechnicalSpecDto.prototype, "supplierListAvailable", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.TraceabilityStatus),
    __metadata("design:type", String)
], TechnicalSpecDto.prototype, "traceabilitySystem", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.TraceabilityStatus),
    __metadata("design:type", String)
], TechnicalSpecDto.prototype, "batchTraceability", void 0);
class EnvironmentalClaimDto {
}
exports.EnvironmentalClaimDto = EnvironmentalClaimDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(enums_1.EnvironmentalBenefit, { each: true }),
    __metadata("design:type", Array)
], EnvironmentalClaimDto.prototype, "environmentalBenefits", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(50),
    (0, class_validator_1.MaxLength)(2000),
    __metadata("design:type", String)
], EnvironmentalClaimDto.prototype, "ecoClaimsSupporting", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.ThirdPartyVerificationStatus),
    __metadata("design:type", String)
], EnvironmentalClaimDto.prototype, "thirdPartyVerification", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], EnvironmentalClaimDto.prototype, "verifierName", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(enums_1.LifecycleAspect, { each: true }),
    __metadata("design:type", Array)
], EnvironmentalClaimDto.prototype, "lifecycleAspects", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.LifecycleAssessmentType),
    __metadata("design:type", String)
], EnvironmentalClaimDto.prototype, "lifecycleAssessment", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], EnvironmentalClaimDto.prototype, "carbonFootprint", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], EnvironmentalClaimDto.prototype, "carbonValue", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.EnvironmentalManagementSystem),
    __metadata("design:type", String)
], EnvironmentalClaimDto.prototype, "environmentalManagement", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], EnvironmentalClaimDto.prototype, "environmentalPolicy", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], EnvironmentalClaimDto.prototype, "wasteManagement", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], EnvironmentalClaimDto.prototype, "recyclingInfo", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.TakeBackProgramStatus),
    __metadata("design:type", String)
], EnvironmentalClaimDto.prototype, "takeBackProgram", void 0);
class CbSelectionDto {
}
exports.CbSelectionDto = CbSelectionDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CbSelectionDto.prototype, "preferredCb", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], CbSelectionDto.prototype, "cbSelectionReason", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CbSelectionDto.prototype, "previousCb", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CbSelectionDto.prototype, "previousCbName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CbSelectionDto.prototype, "previousCertificateNumber", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.AuditLanguage),
    __metadata("design:type", String)
], CbSelectionDto.prototype, "auditLanguage", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CbSelectionDto.prototype, "auditTiming", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CbSelectionDto.prototype, "peakPeriods", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CbSelectionDto.prototype, "specialRequirements", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.AuditTeamSize),
    __metadata("design:type", String)
], CbSelectionDto.prototype, "auditTeamSize", void 0);
class DeclarationDto {
}
exports.DeclarationDto = DeclarationDto;
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DeclarationDto.prototype, "truthDeclaration", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DeclarationDto.prototype, "complianceCommitment", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DeclarationDto.prototype, "surveillanceAcceptance", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DeclarationDto.prototype, "correctiveActionCommitment", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DeclarationDto.prototype, "marketSurveillanceAcceptance", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DeclarationDto.prototype, "markUsageCommitment", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DeclarationDto.prototype, "feesAcceptance", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DeclarationDto.prototype, "feeBreakdownAcknowledged", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DeclarationDto.prototype, "paymentTermsAccepted", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DeclarationDto.prototype, "additionalCostsUnderstood", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], DeclarationDto.prototype, "applicantName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], DeclarationDto.prototype, "applicantPosition", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DeclarationDto.prototype, "applicantSignature", void 0);
class CreateProductCertificationApplicationDto {
}
exports.CreateProductCertificationApplicationDto = CreateProductCertificationApplicationDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateProductCertificationApplicationDto.prototype, "operatorId", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MarkSelectionDto),
    __metadata("design:type", MarkSelectionDto)
], CreateProductCertificationApplicationDto.prototype, "markSelection", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CertificationSchemeDto),
    __metadata("design:type", CertificationSchemeDto)
], CreateProductCertificationApplicationDto.prototype, "certificationScheme", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => VolumePriorityDto),
    __metadata("design:type", VolumePriorityDto)
], CreateProductCertificationApplicationDto.prototype, "volumePriority", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ProductDto),
    __metadata("design:type", Array)
], CreateProductCertificationApplicationDto.prototype, "products", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TechnicalSpecDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateProductCertificationApplicationDto.prototype, "technicalSpecs", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => EnvironmentalClaimDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateProductCertificationApplicationDto.prototype, "environmentalClaims", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CbSelectionDto),
    __metadata("design:type", CbSelectionDto)
], CreateProductCertificationApplicationDto.prototype, "cbSelection", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DeclarationDto),
    __metadata("design:type", DeclarationDto)
], CreateProductCertificationApplicationDto.prototype, "declaration", void 0);
//# sourceMappingURL=create-product-certification-application.dto.js.map