import { MediaType, MarkType } from '../../../shared/enums';
export declare class PromotionalUsageMetricsDto {
    mediaCampaignName: string;
    mediaTypeReported: MediaType;
    markUsed: MarkType;
    usagePeriodStart: string;
    usagePeriodEnd: string;
    audienceReached?: string;
    impressions?: string;
    engagementMetrics?: string;
    campaignCost?: string;
}
export declare class CertificationUsageMetricsDto {
    sector: string;
    certificationsIssued: string;
    markAppearances: string;
    clientFeedback?: string;
    nonConformities: string;
    correctiveActions?: string;
}
export declare class ImpactAssessmentDto {
    awarenessIncrease?: string;
    inquiriesReceived: string;
    partnershipsFormed?: string;
    mediaCoverage?: string;
    successStories?: string[];
    challengesFaced?: string[];
}
export declare class ComplianceChecksDto {
    usedMarksOnlyAsAuthorized: boolean;
    followedBrandGuidelines: boolean;
    didNotModifyMarks: boolean;
    usedCurrentVersionOfMarks: boolean;
}
export declare class SupportingEvidenceDto {
    fileName: string;
    evidenceType: string;
    filePath?: string;
}
export declare class SampleMaterialDto {
    fileName: string;
    materialType: string;
    filePath?: string;
}
export declare class TestimonialDto {
    fileName: string;
    filePath?: string;
    source?: string;
}
export declare class CreateMarkUsageReportDto {
    licenseId: string;
    reportPeriodStart: string;
    reportPeriodEnd: string;
    nsbContactName: string;
    nsbContactEmail: string;
    promotionalUsageMetrics?: PromotionalUsageMetricsDto[];
    certificationUsageMetrics?: CertificationUsageMetricsDto[];
    impactAssessment?: ImpactAssessmentDto;
    complianceChecks?: ComplianceChecksDto;
    nonComplianceIssues?: string;
    correctiveActionsTaken?: string;
    plannedUsageNextYear: string;
    renewalIntention: string;
    supportingEvidence?: SupportingEvidenceDto[];
    samples?: SampleMaterialDto[];
    testimonials?: TestimonialDto[];
}
export declare class UpdateMarkUsageReportDto {
    reportPeriodStart?: string;
    reportPeriodEnd?: string;
    nsbContactName?: string;
    nsbContactEmail?: string;
    promotionalUsageMetrics?: PromotionalUsageMetricsDto[];
    certificationUsageMetrics?: CertificationUsageMetricsDto[];
    impactAssessment?: ImpactAssessmentDto;
    complianceChecks?: ComplianceChecksDto;
    nonComplianceIssues?: string;
    correctiveActionsTaken?: string;
    plannedUsageNextYear?: string;
    renewalIntention?: string;
    supportingEvidence?: SupportingEvidenceDto[];
    samples?: SampleMaterialDto[];
    testimonials?: TestimonialDto[];
}
