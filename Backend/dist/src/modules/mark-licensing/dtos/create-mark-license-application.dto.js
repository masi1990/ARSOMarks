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
exports.CreateMarkLicenseApplicationDto = exports.SupportingDocumentDto = exports.PlacementExampleDto = exports.ExpectedImpactMetricsDto = exports.CampaignTimelineDto = exports.MediaUsageDto = exports.SpecialProjectLicenseDetailsDto = exports.CertificationBodyLicenseDetailsDto = exports.PromotionalLicenseDetailsDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const enums_1 = require("../../../shared/enums");
class PromotionalLicenseDetailsDto {
}
exports.PromotionalLicenseDetailsDto = PromotionalLicenseDetailsDto;
__decorate([
    (0, class_validator_1.IsEnum)({
        NATIONAL_AWARENESS_CAMPAIGN: 'NATIONAL_AWARENESS_CAMPAIGN',
        GOVERNMENT_PUBLICATIONS: 'GOVERNMENT_PUBLICATIONS',
        TRAINING_MATERIALS: 'TRAINING_MATERIALS',
        WEBSITE_PROMOTION: 'WEBSITE_PROMOTION',
        EVENT_MATERIALS: 'EVENT_MATERIALS',
        OTHER: 'OTHER',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PromotionalLicenseDetailsDto.prototype, "primaryPurpose", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)((o) => o.primaryPurpose === 'OTHER'),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PromotionalLicenseDetailsDto.prototype, "promoPurposeOther", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], PromotionalLicenseDetailsDto.prototype, "targetAudience", void 0);
__decorate([
    (0, class_validator_1.IsEnum)({
        NATIONAL: 'NATIONAL',
        REGIONAL: 'REGIONAL',
        SPECIFIC_STATES_PROVINCES: 'SPECIFIC_STATES_PROVINCES',
        LOCAL_CAMPAIGN: 'LOCAL_CAMPAIGN',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PromotionalLicenseDetailsDto.prototype, "geographicScope", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PromotionalLicenseDetailsDto.prototype, "budgetEstimate", void 0);
class CertificationBodyLicenseDetailsDto {
}
exports.CertificationBodyLicenseDetailsDto = CertificationBodyLicenseDetailsDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CertificationBodyLicenseDetailsDto.prototype, "cbUnitName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CertificationBodyLicenseDetailsDto.prototype, "cbAccreditationNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CertificationBodyLicenseDetailsDto.prototype, "cbAccreditationBody", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CertificationBodyLicenseDetailsDto.prototype, "cbAccreditationScope", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CertificationBodyLicenseDetailsDto.prototype, "cbAccreditationExpiry", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CertificationBodyLicenseDetailsDto.prototype, "cbSchemesApplying", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CertificationBodyLicenseDetailsDto.prototype, "cbExpectedVolume", void 0);
class SpecialProjectLicenseDetailsDto {
}
exports.SpecialProjectLicenseDetailsDto = SpecialProjectLicenseDetailsDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SpecialProjectLicenseDetailsDto.prototype, "projectName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SpecialProjectLicenseDetailsDto.prototype, "projectFunder", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SpecialProjectLicenseDetailsDto.prototype, "projectDurationStart", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SpecialProjectLicenseDetailsDto.prototype, "projectDurationEnd", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SpecialProjectLicenseDetailsDto.prototype, "projectDescription", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], SpecialProjectLicenseDetailsDto.prototype, "projectDeliverables", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SpecialProjectLicenseDetailsDto.prototype, "projectBudget", void 0);
class MediaUsageDto {
}
exports.MediaUsageDto = MediaUsageDto;
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.MediaType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MediaUsageDto.prototype, "mediaType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MediaUsageDto.prototype, "mediaSpecific", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], MediaUsageDto.prototype, "mediaLanguage", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MediaUsageDto.prototype, "mediaAudienceSize", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MediaUsageDto.prototype, "mediaDuration", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MediaUsageDto.prototype, "mediaBudgetAllocation", void 0);
class CampaignTimelineDto {
}
exports.CampaignTimelineDto = CampaignTimelineDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CampaignTimelineDto.prototype, "timelinePhase", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CampaignTimelineDto.prototype, "timelineStart", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CampaignTimelineDto.prototype, "timelineEnd", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CampaignTimelineDto.prototype, "timelineMetrics", void 0);
class ExpectedImpactMetricsDto {
}
exports.ExpectedImpactMetricsDto = ExpectedImpactMetricsDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ExpectedImpactMetricsDto.prototype, "expectedIndustryAwareness", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ExpectedImpactMetricsDto.prototype, "expectedConsumerAwareness", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ExpectedImpactMetricsDto.prototype, "expectedCbApplications", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ExpectedImpactMetricsDto.prototype, "expectedCertifications", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ExpectedImpactMetricsDto.prototype, "expectedMediaCoverage", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ExpectedImpactMetricsDto.prototype, "kpiMeasurementMethod", void 0);
class PlacementExampleDto {
}
exports.PlacementExampleDto = PlacementExampleDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PlacementExampleDto.prototype, "fileName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PlacementExampleDto.prototype, "description", void 0);
class SupportingDocumentDto {
}
exports.SupportingDocumentDto = SupportingDocumentDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SupportingDocumentDto.prototype, "documentType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SupportingDocumentDto.prototype, "fileName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SupportingDocumentDto.prototype, "filePath", void 0);
class CreateMarkLicenseApplicationDto {
}
exports.CreateMarkLicenseApplicationDto = CreateMarkLicenseApplicationDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMarkLicenseApplicationDto.prototype, "nsbId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMarkLicenseApplicationDto.prototype, "applicationReference", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(enums_1.MarkLicenseType, { each: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CreateMarkLicenseApplicationDto.prototype, "licenseTypes", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.LicenseDurationType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMarkLicenseApplicationDto.prototype, "licenseDuration", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)((o) => o.licenseDuration === enums_1.LicenseDurationType.OTHER),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMarkLicenseApplicationDto.prototype, "licenseDurationOther", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PromotionalLicenseDetailsDto),
    (0, class_validator_1.ValidateIf)((o) => { var _a; return (_a = o.licenseTypes) === null || _a === void 0 ? void 0 : _a.includes(enums_1.MarkLicenseType.PROMOTIONAL_INSTITUTIONAL); }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", PromotionalLicenseDetailsDto)
], CreateMarkLicenseApplicationDto.prototype, "promotionalLicenseDetails", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CertificationBodyLicenseDetailsDto),
    (0, class_validator_1.ValidateIf)((o) => { var _a; return (_a = o.licenseTypes) === null || _a === void 0 ? void 0 : _a.includes(enums_1.MarkLicenseType.CERTIFICATION_BODY); }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", CertificationBodyLicenseDetailsDto)
], CreateMarkLicenseApplicationDto.prototype, "certificationBodyDetails", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SpecialProjectLicenseDetailsDto),
    (0, class_validator_1.ValidateIf)((o) => { var _a; return (_a = o.licenseTypes) === null || _a === void 0 ? void 0 : _a.includes(enums_1.MarkLicenseType.SPECIAL_PROJECT); }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", SpecialProjectLicenseDetailsDto)
], CreateMarkLicenseApplicationDto.prototype, "specialProjectDetails", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => MediaUsageDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateMarkLicenseApplicationDto.prototype, "mediaUsage", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CampaignTimelineDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateMarkLicenseApplicationDto.prototype, "campaignTimeline", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ExpectedImpactMetricsDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ExpectedImpactMetricsDto)
], CreateMarkLicenseApplicationDto.prototype, "expectedImpactMetrics", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(enums_1.MarkType, { each: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CreateMarkLicenseApplicationDto.prototype, "marksRequested", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateMarkLicenseApplicationDto.prototype, "markColorsNeeded", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMarkLicenseApplicationDto.prototype, "markSizesNeeded", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateMarkLicenseApplicationDto.prototype, "markLanguages", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], CreateMarkLicenseApplicationDto.prototype, "annexBCompliance", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], CreateMarkLicenseApplicationDto.prototype, "brandGuidelinesAck", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], CreateMarkLicenseApplicationDto.prototype, "modificationPolicyAcceptance", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SupportingDocumentDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateMarkLicenseApplicationDto.prototype, "supportingDocuments", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMarkLicenseApplicationDto.prototype, "declarationSignatory", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMarkLicenseApplicationDto.prototype, "signatoryTitle", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMarkLicenseApplicationDto.prototype, "signatoryEmail", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], CreateMarkLicenseApplicationDto.prototype, "auditRightsAcceptance", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], CreateMarkLicenseApplicationDto.prototype, "annualReportingCommitment", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], CreateMarkLicenseApplicationDto.prototype, "dataSharingConsent", void 0);
//# sourceMappingURL=create-mark-license-application.dto.js.map