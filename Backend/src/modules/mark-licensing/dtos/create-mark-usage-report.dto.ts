import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ReportStatus, MediaType, MarkType } from '../../../shared/enums';

// ============================================================================
// Promotional Usage Metrics
// ============================================================================

export class PromotionalUsageMetricsDto {
  @IsString()
  @IsNotEmpty()
  mediaCampaignName: string;

  @IsEnum(MediaType)
  @IsNotEmpty()
  mediaTypeReported: MediaType;

  @IsEnum(MarkType)
  @IsNotEmpty()
  markUsed: MarkType;

  @IsString()
  @IsNotEmpty()
  usagePeriodStart: string; // Date as string

  @IsString()
  @IsNotEmpty()
  usagePeriodEnd: string; // Date as string

  @IsString()
  @IsOptional()
  audienceReached?: string; // Number as string

  @IsString()
  @IsOptional()
  impressions?: string; // Number as string

  @IsString()
  @IsOptional()
  engagementMetrics?: string; // e.g., clicks, shares, inquiries

  @IsString()
  @IsOptional()
  campaignCost?: string; // Currency as string
}

// ============================================================================
// Certification Usage Metrics
// ============================================================================

export class CertificationUsageMetricsDto {
  @IsString()
  @IsNotEmpty()
  sector: string;

  @IsString()
  @IsNotEmpty()
  certificationsIssued: string; // Number as string

  @IsString()
  @IsNotEmpty()
  markAppearances: string; // Number as string

  @IsString()
  @IsOptional()
  clientFeedback?: string;

  @IsString()
  @IsNotEmpty()
  nonConformities: string; // Number as string

  @IsString()
  @ValidateIf((o) => parseInt(o.nonConformities) > 0)
  @IsOptional()
  correctiveActions?: string;
}

// ============================================================================
// Impact Assessment
// ============================================================================

export class ImpactAssessmentDto {
  @IsString()
  @IsOptional()
  awarenessIncrease?: string; // Percentage as string

  @IsString()
  @IsNotEmpty()
  inquiriesReceived: string; // Number as string

  @IsString()
  @IsOptional()
  partnershipsFormed?: string; // Number as string

  @IsString()
  @IsOptional()
  mediaCoverage?: string; // Number as string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  successStories?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  challengesFaced?: string[];
}

// ============================================================================
// Compliance Declaration
// ============================================================================

export class ComplianceChecksDto {
  @IsBoolean()
  @IsNotEmpty()
  usedMarksOnlyAsAuthorized: boolean;

  @IsBoolean()
  @IsNotEmpty()
  followedBrandGuidelines: boolean;

  @IsBoolean()
  @IsNotEmpty()
  didNotModifyMarks: boolean;

  @IsBoolean()
  @IsNotEmpty()
  usedCurrentVersionOfMarks: boolean;
}

// ============================================================================
// Supporting Evidence
// ============================================================================

export class SupportingEvidenceDto {
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  evidenceType: string; // 'CAMPAIGN_PHOTOS', 'MEDIA_CLIPPINGS', 'SCREENSHOTS', 'ANALYTICS_REPORTS'

  @IsString()
  @IsOptional()
  filePath?: string;
}

export class SampleMaterialDto {
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  materialType: string; // 'BROCHURE', 'ADVERTISEMENT', 'PRODUCT_LABEL'

  @IsString()
  @IsOptional()
  filePath?: string;
}

export class TestimonialDto {
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsOptional()
  filePath?: string;

  @IsString()
  @IsOptional()
  source?: string; // Partner/beneficiary name
}

// ============================================================================
// MAIN DTO: Create Mark Usage Report (NSB-004-3)
// ============================================================================

export class CreateMarkUsageReportDto {
  @IsUUID()
  @IsNotEmpty()
  licenseId: string; // Reference to mark_license_agreements

  @IsString()
  @IsNotEmpty()
  reportPeriodStart: string; // Date as string

  @IsString()
  @IsNotEmpty()
  reportPeriodEnd: string; // Date as string

  @IsString()
  @IsNotEmpty()
  nsbContactName: string;

  @IsEmail()
  @IsNotEmpty()
  nsbContactEmail: string;

  // Usage Metrics Arrays
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PromotionalUsageMetricsDto)
  @IsOptional()
  promotionalUsageMetrics?: PromotionalUsageMetricsDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificationUsageMetricsDto)
  @IsOptional()
  certificationUsageMetrics?: CertificationUsageMetricsDto[];

  // Impact Assessment
  @ValidateNested()
  @Type(() => ImpactAssessmentDto)
  @IsOptional()
  impactAssessment?: ImpactAssessmentDto;

  // Compliance Declaration
  @ValidateNested()
  @Type(() => ComplianceChecksDto)
  @IsOptional()
  complianceChecks?: ComplianceChecksDto;

  @IsString()
  @IsOptional()
  nonComplianceIssues?: string;

  @IsString()
  @IsOptional()
  correctiveActionsTaken?: string;

  @IsString()
  @IsNotEmpty()
  plannedUsageNextYear: string;

  @IsEnum({
    YES: 'YES',
    NO: 'NO',
    UNDECIDED: 'UNDECIDED',
  })
  @IsNotEmpty()
  renewalIntention: string;

  // Supporting Evidence
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SupportingEvidenceDto)
  @IsOptional()
  supportingEvidence?: SupportingEvidenceDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SampleMaterialDto)
  @IsOptional()
  samples?: SampleMaterialDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestimonialDto)
  @IsOptional()
  testimonials?: TestimonialDto[];
}

export class UpdateMarkUsageReportDto {
  // Same structure as Create, but all fields optional
  @IsString()
  @IsOptional()
  reportPeriodStart?: string;

  @IsString()
  @IsOptional()
  reportPeriodEnd?: string;

  @IsString()
  @IsOptional()
  nsbContactName?: string;

  @IsEmail()
  @IsOptional()
  nsbContactEmail?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PromotionalUsageMetricsDto)
  @IsOptional()
  promotionalUsageMetrics?: PromotionalUsageMetricsDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificationUsageMetricsDto)
  @IsOptional()
  certificationUsageMetrics?: CertificationUsageMetricsDto[];

  @ValidateNested()
  @Type(() => ImpactAssessmentDto)
  @IsOptional()
  impactAssessment?: ImpactAssessmentDto;

  @ValidateNested()
  @Type(() => ComplianceChecksDto)
  @IsOptional()
  complianceChecks?: ComplianceChecksDto;

  @IsString()
  @IsOptional()
  nonComplianceIssues?: string;

  @IsString()
  @IsOptional()
  correctiveActionsTaken?: string;

  @IsString()
  @IsOptional()
  plannedUsageNextYear?: string;

  @IsEnum({
    YES: 'YES',
    NO: 'NO',
    UNDECIDED: 'UNDECIDED',
  })
  @IsOptional()
  renewalIntention?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SupportingEvidenceDto)
  @IsOptional()
  supportingEvidence?: SupportingEvidenceDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SampleMaterialDto)
  @IsOptional()
  samples?: SampleMaterialDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestimonialDto)
  @IsOptional()
  testimonials?: TestimonialDto[];
}

