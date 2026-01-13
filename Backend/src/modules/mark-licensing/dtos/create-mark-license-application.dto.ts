import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  MarkLicenseType,
  MarkType,
  LicenseDurationType,
  MediaType,
} from '../../../shared/enums';

// ============================================================================
// SECTION A: License Type Specific Details
// ============================================================================

export class PromotionalLicenseDetailsDto {
  @IsEnum({
    NATIONAL_AWARENESS_CAMPAIGN: 'NATIONAL_AWARENESS_CAMPAIGN',
    GOVERNMENT_PUBLICATIONS: 'GOVERNMENT_PUBLICATIONS',
    TRAINING_MATERIALS: 'TRAINING_MATERIALS',
    WEBSITE_PROMOTION: 'WEBSITE_PROMOTION',
    EVENT_MATERIALS: 'EVENT_MATERIALS',
    OTHER: 'OTHER',
  })
  @IsNotEmpty()
  primaryPurpose: string;

  @IsString()
  @ValidateIf((o) => o.primaryPurpose === 'OTHER')
  @IsNotEmpty()
  promoPurposeOther?: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  targetAudience: string[]; // ['INDUSTRY', 'CONSUMERS', 'GOVERNMENT_OFFICIALS', etc.]

  @IsEnum({
    NATIONAL: 'NATIONAL',
    REGIONAL: 'REGIONAL',
    SPECIFIC_STATES_PROVINCES: 'SPECIFIC_STATES_PROVINCES',
    LOCAL_CAMPAIGN: 'LOCAL_CAMPAIGN',
  })
  @IsNotEmpty()
  geographicScope: string;

  @IsString()
  @IsOptional()
  budgetEstimate?: string; // Currency as string
}

export class CertificationBodyLicenseDetailsDto {
  @IsString()
  @IsNotEmpty()
  cbUnitName: string;

  @IsString()
  @IsNotEmpty()
  cbAccreditationNumber: string;

  @IsString()
  @IsNotEmpty()
  cbAccreditationBody: string;

  @IsString()
  @IsNotEmpty()
  cbAccreditationScope: string; // Copy-paste from certificate

  @IsString()
  @IsNotEmpty()
  cbAccreditationExpiry: string; // Date as string

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  cbSchemesApplying: string[]; // ACAP scheme codes

  @IsString()
  @IsOptional()
  cbExpectedVolume?: string; // Number as string
}

export class SpecialProjectLicenseDetailsDto {
  @IsString()
  @IsNotEmpty()
  projectName: string;

  @IsString()
  @IsOptional()
  projectFunder?: string;

  @IsString()
  @IsNotEmpty()
  projectDurationStart: string; // Date as string

  @IsString()
  @IsNotEmpty()
  projectDurationEnd: string; // Date as string

  @IsString()
  @IsNotEmpty()
  projectDescription: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  projectDeliverables: string[];

  @IsString()
  @IsOptional()
  projectBudget?: string; // Currency as string
}

// ============================================================================
// SECTION B: Intended Use Details
// ============================================================================

export class MediaUsageDto {
  @IsEnum(MediaType)
  @IsNotEmpty()
  mediaType: MediaType;

  @IsString()
  @IsNotEmpty()
  mediaSpecific: string; // e.g., 'Facebook', 'National TV', 'Trade Magazine'

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  mediaLanguage: string[]; // ['ENGLISH', 'FRENCH', etc.]

  @IsString()
  @IsOptional()
  mediaAudienceSize?: string; // Number as string

  @IsString()
  @IsNotEmpty()
  mediaDuration: string; // e.g., '6 months', 'Ongoing'

  @IsString()
  @IsOptional()
  mediaBudgetAllocation?: string; // Currency as string
}

export class CampaignTimelineDto {
  @IsString()
  @IsNotEmpty()
  timelinePhase: string; // Activity name

  @IsString()
  @IsNotEmpty()
  timelineStart: string; // Date as string

  @IsString()
  @IsNotEmpty()
  timelineEnd: string; // Date as string

  @IsString()
  @IsOptional()
  timelineMetrics?: string; // Success metrics
}

export class ExpectedImpactMetricsDto {
  @IsString()
  @IsOptional()
  expectedIndustryAwareness?: string; // Percentage as string

  @IsString()
  @IsOptional()
  expectedConsumerAwareness?: string; // Percentage as string

  @IsString()
  @IsOptional()
  expectedCbApplications?: string; // Number as string

  @IsString()
  @IsOptional()
  expectedCertifications?: string; // Number as string

  @IsString()
  @IsOptional()
  expectedMediaCoverage?: string; // Number as string

  @IsString()
  @IsOptional()
  kpiMeasurementMethod?: string;
}

// ============================================================================
// SECTION C: Mark Usage Specifications
// ============================================================================

export class PlacementExampleDto {
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  description: string; // Where/how mark will appear
}

// ============================================================================
// SECTION D: Supporting Documents
// ============================================================================

export class SupportingDocumentDto {
  @IsString()
  @IsNotEmpty()
  documentType: string; // 'ACCREDITATION_CERTIFICATE', 'NSB_BOARD_RESOLUTION', etc.

  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsOptional()
  filePath?: string; // Will be set by upload service
}

// ============================================================================
// MAIN DTO: Create Mark License Application (NSB-004-1)
// ============================================================================

export class CreateMarkLicenseApplicationDto {
  // SECTION A: Applicant & License Type Information
  @IsUUID()
  @IsNotEmpty()
  nsbId: string;

  @IsString()
  @IsOptional()
  applicationReference?: string; // NSB's internal tracking number

  @IsArray()
  @IsEnum(MarkLicenseType, { each: true })
  @IsNotEmpty()
  licenseTypes: MarkLicenseType[];

  @IsEnum(LicenseDurationType)
  @IsNotEmpty()
  licenseDuration: LicenseDurationType;

  @IsString()
  @ValidateIf((o) => o.licenseDuration === LicenseDurationType.OTHER)
  @IsNotEmpty()
  licenseDurationOther?: string;

  // License Type Specific Details (conditional)
  @ValidateNested()
  @Type(() => PromotionalLicenseDetailsDto)
  @ValidateIf((o) => o.licenseTypes?.includes(MarkLicenseType.PROMOTIONAL_INSTITUTIONAL))
  @IsOptional()
  promotionalLicenseDetails?: PromotionalLicenseDetailsDto;

  @ValidateNested()
  @Type(() => CertificationBodyLicenseDetailsDto)
  @ValidateIf((o) => o.licenseTypes?.includes(MarkLicenseType.CERTIFICATION_BODY))
  @IsOptional()
  certificationBodyDetails?: CertificationBodyLicenseDetailsDto;

  @ValidateNested()
  @Type(() => SpecialProjectLicenseDetailsDto)
  @ValidateIf((o) => o.licenseTypes?.includes(MarkLicenseType.SPECIAL_PROJECT))
  @IsOptional()
  specialProjectDetails?: SpecialProjectLicenseDetailsDto;

  // SECTION B: Intended Use Details
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MediaUsageDto)
  @IsOptional()
  mediaUsage?: MediaUsageDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CampaignTimelineDto)
  @IsOptional()
  campaignTimeline?: CampaignTimelineDto[];

  @ValidateNested()
  @Type(() => ExpectedImpactMetricsDto)
  @IsOptional()
  expectedImpactMetrics?: ExpectedImpactMetricsDto;

  // SECTION C: Mark Usage Specifications
  @IsArray()
  @IsEnum(MarkType, { each: true })
  @IsNotEmpty()
  marksRequested: MarkType[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  markColorsNeeded?: string[];

  @IsString()
  @IsOptional()
  markSizesNeeded?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  markLanguages?: string[];

  // SECTION C: Compliance Declarations
  @IsBoolean()
  @IsNotEmpty()
  annexBCompliance: boolean;

  @IsBoolean()
  @IsNotEmpty()
  brandGuidelinesAck: boolean;

  @IsBoolean()
  @IsNotEmpty()
  modificationPolicyAcceptance: boolean;

  // SECTION D: Supporting Documents
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SupportingDocumentDto)
  @IsOptional()
  supportingDocuments?: SupportingDocumentDto[];

  // SECTION D: Declarations
  @IsString()
  @IsNotEmpty()
  declarationSignatory: string;

  @IsString()
  @IsNotEmpty()
  signatoryTitle: string;

  @IsEmail()
  @IsNotEmpty()
  signatoryEmail: string;

  @IsBoolean()
  @IsNotEmpty()
  auditRightsAcceptance: boolean;

  @IsBoolean()
  @IsNotEmpty()
  annualReportingCommitment: boolean;

  @IsBoolean()
  @IsNotEmpty()
  dataSharingConsent: boolean;
}

