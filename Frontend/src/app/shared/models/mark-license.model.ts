// ============================================================================
// Enums
// ============================================================================

export enum MarkLicenseType {
  PROMOTIONAL_INSTITUTIONAL = 'PROMOTIONAL_INSTITUTIONAL',
  CERTIFICATION_BODY = 'CERTIFICATION_BODY',
  SPECIAL_PROJECT = 'SPECIAL_PROJECT',
}

export enum MarkLicenseStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED_PENDING_AGREEMENT = 'APPROVED_PENDING_AGREEMENT',
  PENDING_NSB_SIGNATURE = 'PENDING_NSB_SIGNATURE',
  PENDING_ARSO_SIGNATURE = 'PENDING_ARSO_SIGNATURE',
  EXECUTED = 'EXECUTED',
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  SUSPENDED = 'SUSPENDED',
  REJECTED = 'REJECTED',
  WITHDRAWN = 'WITHDRAWN',
  TERMINATED = 'TERMINATED',
}

export enum MarkType {
  ARSO_QUALITY_MARK = 'ARSO_QUALITY_MARK',
  ECO_MARK_AFRICA = 'ECO_MARK_AFRICA',
  BOTH = 'BOTH',
}

export enum MediaType {
  DIGITAL_ONLINE = 'DIGITAL_ONLINE',
  PRINT = 'PRINT',
  BROADCAST = 'BROADCAST',
  OUTDOOR = 'OUTDOOR',
  EVENTS = 'EVENTS',
  SOCIAL_MEDIA = 'SOCIAL_MEDIA',
  OTHER = 'OTHER',
}

export enum AgreementStatus {
  DRAFT = 'DRAFT',
  PENDING_NSB = 'PENDING_NSB',
  PENDING_ARSO = 'PENDING_ARSO',
  EXECUTED = 'EXECUTED',
  ARCHIVED = 'ARCHIVED',
}

export enum ReportStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  REQUIRES_REVISION = 'REQUIRES_REVISION',
}

export enum ModificationStatus {
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  IMPLEMENTED = 'IMPLEMENTED',
}

export enum LicenseDurationType {
  ONE_YEAR = 'ONE_YEAR',
  TWO_YEARS = 'TWO_YEARS',
  THREE_YEARS = 'THREE_YEARS',
  PROJECT_BASED = 'PROJECT_BASED',
  OTHER = 'OTHER',
}

export enum AssetDeliveryMethod {
  PORTAL_DOWNLOAD = 'PORTAL_DOWNLOAD',
  EMAIL_DELIVERY = 'EMAIL_DELIVERY',
  PHYSICAL_MEDIA = 'PHYSICAL_MEDIA',
  OTHER = 'OTHER',
}

// ============================================================================
// Application Models (NSB-004-1)
// ============================================================================

export interface PromotionalLicenseDetails {
  primaryPurpose: string;
  promoPurposeOther?: string;
  targetAudience: string[];
  geographicScope: string;
  budgetEstimate?: string;
}

export interface CertificationBodyLicenseDetails {
  cbUnitName: string;
  cbAccreditationNumber: string;
  cbAccreditationBody: string;
  cbAccreditationScope: string;
  cbAccreditationExpiry: string;
  cbSchemesApplying: string[];
  cbExpectedVolume?: string;
}

export interface SpecialProjectLicenseDetails {
  projectName: string;
  projectFunder?: string;
  projectDurationStart: string;
  projectDurationEnd: string;
  projectDescription: string;
  projectDeliverables: string[];
  projectBudget?: string;
}

export interface MediaUsage {
  mediaType: MediaType;
  mediaSpecific: string;
  mediaLanguage: string[];
  mediaAudienceSize?: string;
  mediaDuration: string;
  mediaBudgetAllocation?: string;
}

export interface CampaignTimeline {
  timelinePhase: string;
  timelineStart: string;
  timelineEnd: string;
  timelineMetrics?: string;
}

export interface ExpectedImpactMetrics {
  expectedIndustryAwareness?: string;
  expectedConsumerAwareness?: string;
  expectedCbApplications?: string;
  expectedCertifications?: string;
  expectedMediaCoverage?: string;
  kpiMeasurementMethod?: string;
}

export interface PlacementExample {
  fileName: string;
  description: string;
  filePath?: string;
}

export interface SupportingDocument {
  documentType: string;
  fileName: string;
  filePath?: string;
}

export interface MarkLicenseApplication {
  id: string;
  applicationNumber: string;
  nsbId: string;
  nsbApplicantName: string;
  applicationDate: string;
  applicationReference?: string;
  licenseTypes: MarkLicenseType[];
  licenseDuration: LicenseDurationType;
  licenseDurationOther?: string;
  promotionalLicenseDetails?: PromotionalLicenseDetails;
  certificationBodyDetails?: CertificationBodyLicenseDetails;
  specialProjectDetails?: SpecialProjectLicenseDetails;
  mediaUsage?: MediaUsage[];
  campaignTimeline?: CampaignTimeline[];
  expectedImpactMetrics?: ExpectedImpactMetrics;
  marksRequested: MarkType[];
  markColorsNeeded?: string[];
  markSizesNeeded?: string;
  markLanguages?: string[];
  annexBCompliance: boolean;
  brandGuidelinesAck: boolean;
  modificationPolicyAcceptance: boolean;
  supportingDocuments?: SupportingDocument[];
  declarationSignatory: string;
  signatoryTitle: string;
  signatoryEmail: string;
  auditRightsAcceptance: boolean;
  annualReportingCommitment: boolean;
  dataSharingConsent: boolean;
  status: MarkLicenseStatus;
  submittedAt?: string;
  reviewedAt?: string;
  approvedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMarkLicenseApplicationRequest {
  nsbId: string;
  applicationReference?: string;
  licenseTypes: MarkLicenseType[];
  licenseDuration: LicenseDurationType;
  licenseDurationOther?: string;
  promotionalLicenseDetails?: PromotionalLicenseDetails;
  certificationBodyDetails?: CertificationBodyLicenseDetails;
  specialProjectDetails?: SpecialProjectLicenseDetails;
  mediaUsage?: MediaUsage[];
  campaignTimeline?: CampaignTimeline[];
  expectedImpactMetrics?: ExpectedImpactMetrics;
  marksRequested: MarkType[];
  markColorsNeeded?: string[];
  markSizesNeeded?: string;
  markLanguages?: string[];
  annexBCompliance: boolean;
  brandGuidelinesAck: boolean;
  modificationPolicyAcceptance: boolean;
  supportingDocuments?: SupportingDocument[];
  declarationSignatory: string;
  signatoryTitle: string;
  signatoryEmail: string;
  auditRightsAcceptance: boolean;
  annualReportingCommitment: boolean;
  dataSharingConsent: boolean;
}

// ============================================================================
// Agreement Models (NSB-004-2)
// ============================================================================

export interface MarkLicenseAgreement {
  id: string;
  agreementId: string;
  applicationId: string;
  nsbId: string;
  licenseTypeDisplay: string;
  licenseStartDate: string;
  licenseEndDate: string;
  licenseTermsDisplay?: string;
  royaltyFeeStructure?: Record<string, any>;
  paymentSchedule?: Record<string, any>;
  usageRestrictions?: string;
  terminationClauses?: string;
  nsbSignerName: string;
  nsbSignerTitle: string;
  nsbSignerEmail: string;
  nsbSignerIp?: string;
  nsbSignerTimestamp?: string;
  nsbSignerConsent: boolean;
  nsbSignatureImagePath?: string;
  arsoSignerName?: string;
  arsoSignerTitle?: string;
  arsoSignerTimestamp?: string;
  agreementStatus: AgreementStatus;
  agreementDocumentPath?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMarkLicenseAgreementRequest {
  applicationId: string;
  licenseStartDate: string;
  licenseEndDate: string;
  licenseTermsDisplay?: string;
  royaltyFeeStructure?: Record<string, any>;
  paymentSchedule?: Record<string, any>;
  usageRestrictions?: string;
  terminationClauses?: string;
}

export interface SignAgreementRequest {
  nsbSignerName: string;
  nsbSignerTitle: string;
  nsbSignerEmail: string;
  nsbSignerConsent: boolean;
  nsbSignatureImagePath?: string;
}

// ============================================================================
// Usage Report Models (NSB-004-3)
// ============================================================================

export interface PromotionalUsageMetrics {
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

export interface CertificationUsageMetrics {
  sector: string;
  certificationsIssued: string;
  markAppearances: string;
  clientFeedback?: string;
  nonConformities: string;
  correctiveActions?: string;
}

export interface ImpactAssessment {
  awarenessIncrease?: string;
  inquiriesReceived: string;
  partnershipsFormed?: string;
  mediaCoverage?: string;
  successStories?: string[];
  challengesFaced?: string[];
}

export interface ComplianceChecks {
  usedMarksOnlyAsAuthorized: boolean;
  followedBrandGuidelines: boolean;
  didNotModifyMarks: boolean;
  usedCurrentVersionOfMarks: boolean;
}

export interface SupportingEvidence {
  fileName: string;
  evidenceType: string;
  filePath?: string;
}

export interface MarkLicenseUsageReport {
  id: string;
  reportNumber: string;
  licenseId: string;
  agreementId: string;
  reportPeriodStart: string;
  reportPeriodEnd: string;
  reportYear: number;
  nsbContactName: string;
  nsbContactEmail: string;
  reportSubmissionDate: string;
  promotionalUsageMetrics?: PromotionalUsageMetrics[];
  certificationUsageMetrics?: CertificationUsageMetrics[];
  impactAssessment?: ImpactAssessment;
  complianceChecks?: ComplianceChecks;
  nonComplianceIssues?: string;
  correctiveActionsTaken?: string;
  plannedUsageNextYear: string;
  renewalIntention?: 'YES' | 'NO' | 'UNDECIDED';
  supportingEvidence?: SupportingEvidence[];
  samples?: any[];
  testimonials?: any[];
  status: ReportStatus;
  submittedAt?: string;
  reviewedAt?: string;
  approvedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMarkUsageReportRequest {
  licenseId: string;
  reportPeriodStart: string;
  reportPeriodEnd: string;
  nsbContactName: string;
  nsbContactEmail: string;
  promotionalUsageMetrics?: PromotionalUsageMetrics[];
  certificationUsageMetrics?: CertificationUsageMetrics[];
  impactAssessment?: ImpactAssessment;
  complianceChecks?: ComplianceChecks;
  nonComplianceIssues?: string;
  correctiveActionsTaken?: string;
  plannedUsageNextYear: string;
  renewalIntention: 'YES' | 'NO' | 'UNDECIDED';
  supportingEvidence?: SupportingEvidence[];
  samples?: any[];
  testimonials?: any[];
}

// ============================================================================
// Modification Models (NSB-004-4)
// ============================================================================

export interface MarkLicenseModification {
  id: string;
  originalLicenseId: string;
  agreementId: string;
  modificationTypes: string[];
  modificationReason: string;
  proposedChanges: string;
  effectiveDateRequest: string;
  supportingJustificationPath?: string;
  impactAssessment?: string;
  feeAdjustmentNeeded: 'YES' | 'NO' | 'TO_BE_DETERMINED';
  status: ModificationStatus;
  submittedAt: string;
  reviewedAt?: string;
  approvedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  implementedAt?: string;
  implementedChanges?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLicenseModificationRequest {
  originalLicenseId: string;
  modificationTypes: string[];
  modificationReason: string;
  proposedChanges: string;
  effectiveDateRequest: string;
  supportingJustificationPath?: string;
  impactAssessment?: string;
  feeAdjustmentNeeded: 'YES' | 'NO' | 'TO_BE_DETERMINED';
}

// ============================================================================
// Asset Models
// ============================================================================

export interface MarkLicenseAsset {
  id: string;
  agreementId: string;
  assetRequestDate: string;
  requestedAssets: string[];
  assetDeliveryMethod: AssetDeliveryMethod;
  assetRecipientName: string;
  assetRecipientEmail: string;
  assetUseConfirmation: boolean;
  assetFiles?: any[];
  deliveredAt?: string;
  deliveryMethodUsed?: AssetDeliveryMethod;
  downloadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface RequestAssetsRequest {
  agreementId: string;
  requestedAssets: string[];
  assetDeliveryMethod: AssetDeliveryMethod;
  assetRecipientName: string;
  assetRecipientEmail: string;
  assetUseConfirmation: boolean;
}

// ============================================================================
// Dashboard Models (NSB-004-DASH)
// ============================================================================

export interface DashboardOverview {
  activeLicenses: number;
  totalApplications: number;
  expiringSoon: number;
  licenses: Array<{
    agreementId: string;
    licenseType: string;
    status: AgreementStatus;
    startDate: string;
    endDate: string;
    daysUntilExpiry: number;
  }>;
  applications: Array<{
    id: string;
    applicationNumber: string;
    status: MarkLicenseStatus;
    createdAt: string;
  }>;
  expiringAgreements: Array<{
    agreementId: string;
    endDate: string;
    daysUntilExpiry: number;
  }>;
}

export interface DashboardAnalytics {
  totalImpressions: number;
  mediaTypeBreakdown: Record<string, number>;
  markUsageRatio: Record<string, number>;
  totalReports: number;
  reportsByYear: Record<number, number>;
}

export interface DashboardCalendar {
  deadlines: Array<{
    type: string;
    dueDate: string;
    description: string;
    status: 'URGENT' | 'PENDING';
  }>;
}

