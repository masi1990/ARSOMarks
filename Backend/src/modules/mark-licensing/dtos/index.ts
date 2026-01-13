// Application DTOs (NSB-004-1)
export { CreateMarkLicenseApplicationDto } from './create-mark-license-application.dto';
export { UpdateMarkLicenseApplicationDto } from './update-mark-license-application.dto';
export { SubmitMarkLicenseApplicationDto } from './submit-mark-license-application.dto';
export type {
  PromotionalLicenseDetailsDto,
  CertificationBodyLicenseDetailsDto,
  SpecialProjectLicenseDetailsDto,
  MediaUsageDto,
  CampaignTimelineDto,
  ExpectedImpactMetricsDto,
  PlacementExampleDto,
  SupportingDocumentDto,
} from './create-mark-license-application.dto';

// Agreement DTOs (NSB-004-2)
export {
  CreateMarkLicenseAgreementDto,
  SignAgreementDto,
  RequestAssetsDto,
} from './create-mark-license-agreement.dto';

// Usage Report DTOs (NSB-004-3)
export {
  CreateMarkUsageReportDto,
  UpdateMarkUsageReportDto,
} from './create-mark-usage-report.dto';
export type {
  PromotionalUsageMetricsDto,
  CertificationUsageMetricsDto,
  ImpactAssessmentDto,
  ComplianceChecksDto,
  SupportingEvidenceDto,
  SampleMaterialDto,
  TestimonialDto,
} from './create-mark-usage-report.dto';

// Modification DTOs (NSB-004-4)
export {
  CreateLicenseModificationDto,
  ApproveModificationDto,
  RejectModificationDto,
} from './create-license-modification.dto';

