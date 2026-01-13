// Application Registration Models

export enum ApplicationRegistrationStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  WITHDRAWN = 'WITHDRAWN',
}

// Part B: Product & Certification Details
export interface ProductCertification {
  markAppliedFor?: string; // 'ARSO_QUALITY_MARK' | 'ECO_MARK_AFRICA'
  acapScheme?: string;
  productBrandName?: string;
  productModelTypeNumber?: string;
  applicableArsoStandards?: string[];
  scopeOfCertification?: string;
  expectedAnnualCertifiedVolume?: string;
  expectedAnnualCertifiedVolumeUnit?: string;
  targetMarkets?: string[];
}

export interface ManufacturerInfo {
  manufacturerLegalName?: string;
  manufacturerAddress?: string;
  manufacturerCountryId?: string;
  productionSiteGpsCoordinates?: string;
  typeOfProduction?: string;
}

export interface ConformityEvidence {
  testReportFileId?: string;
  testReportIssuingBody?: string;
  testReportCertificateNo?: string;
  qmsCertificateFileId?: string;
  qmsCertificateIssuingBody?: string;
  qmsCertificateNo?: string;
  otherEvidenceFileId?: string;
  otherEvidenceIssuingBody?: string;
  otherEvidenceCertificateNo?: string;
  productPhotographsFileIds?: string[];
  labelArtworkFileId?: string;
  declarationOfConformityFileId?: string;
}

export interface PostCertification {
  productRecallProcedureFileId?: string;
  complaintsManagementProcedureFileId?: string;
  agreementToSurveillance?: boolean;
  traceabilityUndertaking?: boolean;
}

export interface CbSelection {
  selectedCertificationBodyId?: string;
  finalDeclarationSignature?: string;
  finalDeclarationDate?: string;
}

export interface ApplicationRegistration {
  id: string;
  applicationNumber?: string;
  applicantName?: string;
  applicantType?: string;
  registrationNumber?: string;
  taxId?: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  physicalAddress?: string;
  city?: string;
  regionState?: string;
  postalCode?: string;
  countryId?: string;
  businessActivity?: string;
  yearEstablished?: number;
  employeeCount?: number;
  annualRevenue?: number;
  // Part A: Nested data
  companyInfo?: any;
  companySize?: any;
  ownershipInfo?: any;
  primaryContact?: any;
  locations?: any[];
  businessSectors?: any[];
  marketInfo?: any;
  productionCapacity?: any;
  preferences?: any;
  accessibility?: any;
  consents?: any;
  // Part B: Product & Certification Details
  productCertification?: ProductCertification;
  manufacturerInfo?: ManufacturerInfo;
  conformityEvidence?: ConformityEvidence;
  postCertification?: PostCertification;
  cbSelection?: CbSelection;
  status: ApplicationRegistrationStatus;
  submittedAt?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateApplicationRegistrationRequest {
  applicantName?: string;
  applicantType?: string;
  registrationNumber?: string;
  taxId?: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  physicalAddress?: string;
  city?: string;
  regionState?: string;
  postalCode?: string;
  countryId?: string;
  businessActivity?: string;
  yearEstablished?: number;
  employeeCount?: number;
  annualRevenue?: number;
}

export interface PagedApplicationRegistrationResponse {
  data: ApplicationRegistration[];
  total: number;
}

