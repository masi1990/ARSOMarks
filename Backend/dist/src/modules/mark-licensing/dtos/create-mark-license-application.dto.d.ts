import { MarkLicenseType, MarkType, LicenseDurationType, MediaType } from '../../../shared/enums';
export declare class PromotionalLicenseDetailsDto {
    primaryPurpose: string;
    promoPurposeOther?: string;
    targetAudience: string[];
    geographicScope: string;
    budgetEstimate?: string;
}
export declare class CertificationBodyLicenseDetailsDto {
    cbUnitName: string;
    cbAccreditationNumber: string;
    cbAccreditationBody: string;
    cbAccreditationScope: string;
    cbAccreditationExpiry: string;
    cbSchemesApplying: string[];
    cbExpectedVolume?: string;
}
export declare class SpecialProjectLicenseDetailsDto {
    projectName: string;
    projectFunder?: string;
    projectDurationStart: string;
    projectDurationEnd: string;
    projectDescription: string;
    projectDeliverables: string[];
    projectBudget?: string;
}
export declare class MediaUsageDto {
    mediaType: MediaType;
    mediaSpecific: string;
    mediaLanguage: string[];
    mediaAudienceSize?: string;
    mediaDuration: string;
    mediaBudgetAllocation?: string;
}
export declare class CampaignTimelineDto {
    timelinePhase: string;
    timelineStart: string;
    timelineEnd: string;
    timelineMetrics?: string;
}
export declare class ExpectedImpactMetricsDto {
    expectedIndustryAwareness?: string;
    expectedConsumerAwareness?: string;
    expectedCbApplications?: string;
    expectedCertifications?: string;
    expectedMediaCoverage?: string;
    kpiMeasurementMethod?: string;
}
export declare class PlacementExampleDto {
    fileName: string;
    description: string;
}
export declare class SupportingDocumentDto {
    documentType: string;
    fileName: string;
    filePath?: string;
}
export declare class CreateMarkLicenseApplicationDto {
    nsbId: string;
    applicationReference?: string;
    licenseTypes: MarkLicenseType[];
    licenseDuration: LicenseDurationType;
    licenseDurationOther?: string;
    promotionalLicenseDetails?: PromotionalLicenseDetailsDto;
    certificationBodyDetails?: CertificationBodyLicenseDetailsDto;
    specialProjectDetails?: SpecialProjectLicenseDetailsDto;
    mediaUsage?: MediaUsageDto[];
    campaignTimeline?: CampaignTimelineDto[];
    expectedImpactMetrics?: ExpectedImpactMetricsDto;
    marksRequested: MarkType[];
    markColorsNeeded?: string[];
    markSizesNeeded?: string;
    markLanguages?: string[];
    annexBCompliance: boolean;
    brandGuidelinesAck: boolean;
    modificationPolicyAcceptance: boolean;
    supportingDocuments?: SupportingDocumentDto[];
    declarationSignatory: string;
    signatoryTitle: string;
    signatoryEmail: string;
    auditRightsAcceptance: boolean;
    annualReportingCommitment: boolean;
    dataSharingConsent: boolean;
}
