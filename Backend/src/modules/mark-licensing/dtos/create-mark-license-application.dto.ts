import { IsOptional } from 'class-validator';
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
  @IsOptional()
  primaryPurpose: string;

  @IsOptional()
  promoPurposeOther?: string;

  @IsOptional()
  targetAudience: string[]; // ['INDUSTRY', 'CONSUMERS', 'GOVERNMENT_OFFICIALS', etc.]

  @IsOptional()
  geographicScope: string;

  @IsOptional()
  budgetEstimate?: string; // Currency as string
}

export class CertificationBodyLicenseDetailsDto {
  @IsOptional()
  cbUnitName: string;

  @IsOptional()
  cbAccreditationNumber: string;

  @IsOptional()
  cbAccreditationBody: string;

  @IsOptional()
  cbAccreditationScope: string; // Copy-paste from certificate

  @IsOptional()
  cbAccreditationExpiry: string; // Date as string

  @IsOptional()
  cbSchemesApplying: string[]; // ACAP scheme codes

  @IsOptional()
  cbExpectedVolume?: string; // Number as string
}

export class SpecialProjectLicenseDetailsDto {
  @IsOptional()
  projectName: string;

  @IsOptional()
  projectFunder?: string;

  @IsOptional()
  projectDurationStart: string; // Date as string

  @IsOptional()
  projectDurationEnd: string; // Date as string

  @IsOptional()
  projectDescription: string;

  @IsOptional()
  projectDeliverables: string[];

  @IsOptional()
  projectBudget?: string;
}

// ============================================================================
// SECTION B: Intended Use Details
// ============================================================================

export class MediaUsageDto {
  @IsOptional()
  mediaType: MediaType;

  @IsOptional()
  mediaSpecific: string; // e.g., "Facebook", "National TV"

  @IsOptional()
  mediaLanguage: string[]; // Language(s) used

  @IsOptional()
  mediaAudienceSize?: string; // Estimated reach

  @IsOptional()
  mediaDuration: string; // E.g., "3 months"

  @IsOptional()
  mediaBudgetAllocation?: string; // Optional
}

export class CampaignTimelineDto {
  @IsOptional()
  timelinePhase: string; // Phase name

  @IsOptional()
  timelineStart: string; // Date as string

  @IsOptional()
  timelineEnd: string; // Date as string

  @IsOptional()
  timelineMetrics?: string; // Optional KPI
}

export class ExpectedImpactMetricsDto {
  @IsOptional()
  expectedIndustryAwareness?: string;

  @IsOptional()
  expectedConsumerAwareness?: string;

  @IsOptional()
  expectedCbApplications?: string;

  @IsOptional()
  expectedCertifications?: string;

  @IsOptional()
  expectedMediaCoverage?: string;

  @IsOptional()
  kpiMeasurementMethod?: string;
}

// ============================================================================
// SECTION C: Mark Usage Specifications
// ============================================================================

export class PlacementExampleDto {
  @IsOptional()
  fileName: string;

  @IsOptional()
  description: string; // Where/how mark will appear
}

// ============================================================================
// SECTION D: Supporting Documents
// ============================================================================

export class SupportingDocumentDto {
  @IsOptional()
  documentType: string; // 'ACCREDITATION_CERTIFICATE', 'NSB_BOARD_RESOLUTION', etc.

  @IsOptional()
  fileName: string;

  @IsOptional()
  filePath?: string; // Will be set by upload service

  @IsOptional()
  otherDocumentName?: string;
}

// ============================================================================
// MAIN DTO: Create Mark License Application (NSB-004-1)
// ============================================================================

export class CreateMarkLicenseApplicationDto {
  // SECTION A: Applicant & License Type Information
  @IsOptional()
  nsbId: string;

  @IsOptional()
  applicationReference?: string; // NSB's internal tracking number

  @IsOptional()
  licenseTypes: MarkLicenseType[];

  @IsOptional()
  licenseDuration: LicenseDurationType;

  @IsOptional()
  licenseDurationOther?: string;

  // License Type Specific Details (conditional)
  @IsOptional()
  promotionalLicenseDetails?: PromotionalLicenseDetailsDto;

  @IsOptional()
  certificationBodyDetails?: CertificationBodyLicenseDetailsDto;

  @IsOptional()
  specialProjectDetails?: SpecialProjectLicenseDetailsDto;

  // SECTION B: Intended Use Details
  @IsOptional()
  mediaUsage?: MediaUsageDto[];

  @IsOptional()
  campaignTimeline?: CampaignTimelineDto[];

  @IsOptional()
  expectedImpactMetrics?: ExpectedImpactMetricsDto;

  // SECTION C: Mark Usage Specifications
  @IsOptional()
  marksRequested: MarkType[];

  @IsOptional()
  markColorsNeeded?: string[];

  @IsOptional()
  markSizesNeeded?: string;

  @IsOptional()
  markLanguages?: string[];

  // SECTION C: Compliance Declarations
  @IsOptional()
  annexBCompliance: boolean;

  @IsOptional()
  brandGuidelinesAck: boolean;

  @IsOptional()
  modificationPolicyAcceptance: boolean;

  // SECTION D: Supporting Documents
  @IsOptional()
  supportingDocuments?: SupportingDocumentDto[];

  // SECTION E: Declarations
  @IsOptional()
  declarationSignatory: string;

  @IsOptional()
  signatoryTitle: string;

  @IsOptional()
  signatoryEmail: string;

  @IsOptional()
  auditRightsAcceptance: boolean;

  @IsOptional()
  annualReportingCommitment: boolean;

  @IsOptional()
  dataSharingConsent: boolean;
}
