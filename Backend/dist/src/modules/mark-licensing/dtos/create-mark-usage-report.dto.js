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
exports.UpdateMarkUsageReportDto = exports.CreateMarkUsageReportDto = exports.TestimonialDto = exports.SampleMaterialDto = exports.SupportingEvidenceDto = exports.ComplianceChecksDto = exports.ImpactAssessmentDto = exports.CertificationUsageMetricsDto = exports.PromotionalUsageMetricsDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const enums_1 = require("../../../shared/enums");
class PromotionalUsageMetricsDto {
}
exports.PromotionalUsageMetricsDto = PromotionalUsageMetricsDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PromotionalUsageMetricsDto.prototype, "mediaCampaignName", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.MediaType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PromotionalUsageMetricsDto.prototype, "mediaTypeReported", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.MarkType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PromotionalUsageMetricsDto.prototype, "markUsed", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PromotionalUsageMetricsDto.prototype, "usagePeriodStart", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PromotionalUsageMetricsDto.prototype, "usagePeriodEnd", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PromotionalUsageMetricsDto.prototype, "audienceReached", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PromotionalUsageMetricsDto.prototype, "impressions", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PromotionalUsageMetricsDto.prototype, "engagementMetrics", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PromotionalUsageMetricsDto.prototype, "campaignCost", void 0);
class CertificationUsageMetricsDto {
}
exports.CertificationUsageMetricsDto = CertificationUsageMetricsDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CertificationUsageMetricsDto.prototype, "sector", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CertificationUsageMetricsDto.prototype, "certificationsIssued", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CertificationUsageMetricsDto.prototype, "markAppearances", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CertificationUsageMetricsDto.prototype, "clientFeedback", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CertificationUsageMetricsDto.prototype, "nonConformities", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)((o) => parseInt(o.nonConformities) > 0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CertificationUsageMetricsDto.prototype, "correctiveActions", void 0);
class ImpactAssessmentDto {
}
exports.ImpactAssessmentDto = ImpactAssessmentDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ImpactAssessmentDto.prototype, "awarenessIncrease", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ImpactAssessmentDto.prototype, "inquiriesReceived", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ImpactAssessmentDto.prototype, "partnershipsFormed", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ImpactAssessmentDto.prototype, "mediaCoverage", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ImpactAssessmentDto.prototype, "successStories", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ImpactAssessmentDto.prototype, "challengesFaced", void 0);
class ComplianceChecksDto {
}
exports.ComplianceChecksDto = ComplianceChecksDto;
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], ComplianceChecksDto.prototype, "usedMarksOnlyAsAuthorized", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], ComplianceChecksDto.prototype, "followedBrandGuidelines", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], ComplianceChecksDto.prototype, "didNotModifyMarks", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], ComplianceChecksDto.prototype, "usedCurrentVersionOfMarks", void 0);
class SupportingEvidenceDto {
}
exports.SupportingEvidenceDto = SupportingEvidenceDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SupportingEvidenceDto.prototype, "fileName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SupportingEvidenceDto.prototype, "evidenceType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SupportingEvidenceDto.prototype, "filePath", void 0);
class SampleMaterialDto {
}
exports.SampleMaterialDto = SampleMaterialDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SampleMaterialDto.prototype, "fileName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SampleMaterialDto.prototype, "materialType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SampleMaterialDto.prototype, "filePath", void 0);
class TestimonialDto {
}
exports.TestimonialDto = TestimonialDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TestimonialDto.prototype, "fileName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TestimonialDto.prototype, "filePath", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TestimonialDto.prototype, "source", void 0);
class CreateMarkUsageReportDto {
}
exports.CreateMarkUsageReportDto = CreateMarkUsageReportDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMarkUsageReportDto.prototype, "licenseId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMarkUsageReportDto.prototype, "reportPeriodStart", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMarkUsageReportDto.prototype, "reportPeriodEnd", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMarkUsageReportDto.prototype, "nsbContactName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMarkUsageReportDto.prototype, "nsbContactEmail", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PromotionalUsageMetricsDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateMarkUsageReportDto.prototype, "promotionalUsageMetrics", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CertificationUsageMetricsDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateMarkUsageReportDto.prototype, "certificationUsageMetrics", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ImpactAssessmentDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ImpactAssessmentDto)
], CreateMarkUsageReportDto.prototype, "impactAssessment", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ComplianceChecksDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ComplianceChecksDto)
], CreateMarkUsageReportDto.prototype, "complianceChecks", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMarkUsageReportDto.prototype, "nonComplianceIssues", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMarkUsageReportDto.prototype, "correctiveActionsTaken", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMarkUsageReportDto.prototype, "plannedUsageNextYear", void 0);
__decorate([
    (0, class_validator_1.IsEnum)({
        YES: 'YES',
        NO: 'NO',
        UNDECIDED: 'UNDECIDED',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMarkUsageReportDto.prototype, "renewalIntention", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SupportingEvidenceDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateMarkUsageReportDto.prototype, "supportingEvidence", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SampleMaterialDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateMarkUsageReportDto.prototype, "samples", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TestimonialDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateMarkUsageReportDto.prototype, "testimonials", void 0);
class UpdateMarkUsageReportDto {
}
exports.UpdateMarkUsageReportDto = UpdateMarkUsageReportDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMarkUsageReportDto.prototype, "reportPeriodStart", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMarkUsageReportDto.prototype, "reportPeriodEnd", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMarkUsageReportDto.prototype, "nsbContactName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMarkUsageReportDto.prototype, "nsbContactEmail", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PromotionalUsageMetricsDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateMarkUsageReportDto.prototype, "promotionalUsageMetrics", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CertificationUsageMetricsDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateMarkUsageReportDto.prototype, "certificationUsageMetrics", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ImpactAssessmentDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ImpactAssessmentDto)
], UpdateMarkUsageReportDto.prototype, "impactAssessment", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ComplianceChecksDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ComplianceChecksDto)
], UpdateMarkUsageReportDto.prototype, "complianceChecks", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMarkUsageReportDto.prototype, "nonComplianceIssues", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMarkUsageReportDto.prototype, "correctiveActionsTaken", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMarkUsageReportDto.prototype, "plannedUsageNextYear", void 0);
__decorate([
    (0, class_validator_1.IsEnum)({
        YES: 'YES',
        NO: 'NO',
        UNDECIDED: 'UNDECIDED',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMarkUsageReportDto.prototype, "renewalIntention", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SupportingEvidenceDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateMarkUsageReportDto.prototype, "supportingEvidence", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SampleMaterialDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateMarkUsageReportDto.prototype, "samples", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TestimonialDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateMarkUsageReportDto.prototype, "testimonials", void 0);
//# sourceMappingURL=create-mark-usage-report.dto.js.map