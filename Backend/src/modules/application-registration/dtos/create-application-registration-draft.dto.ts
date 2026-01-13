import { Type } from 'class-transformer';

// Draft DTO - NO VALIDATIONS - All fields are optional and accept any values
// This allows complete flexibility for draft saves

// Section A1: Company Type & Legal Identity
export class CompanyInfoDraftDto {
  operatorType?: any;
  companyLegalName?: any;
  tradingName?: any;
  registrationNumberBusiness?: any;
  taxId?: any;
  vatNumber?: any;
  yearEstablished?: any;
  legalStructure?: any;
  businessActivity?: any;
}

// Section A2: Company Size & Financial Information
export class CompanySizeDraftDto {
  employeeCount?: any;
  annualTurnover?: any;
  annualRevenue?: any;
  exportPercentage?: any;
  importPercentage?: any;
  capitalInvestment?: any;
}

// Section A3: Ownership & Beneficial Ownership
export class OwnershipInfoDraftDto {
  ownershipType?: any;
  majorityOwnerNationality?: any;
  womenOwned?: any;
  youthOwned?: any;
  blackOwnedPercentage?: any;
  beneficialOwnersCount?: any;
  pepInvolved?: any;
  pepDetails?: any;
}

// Section B1: Primary Contact Details
export class ApplicationContactDraftDto {
  contactType?: any;
  primaryContact?: any;
  contactPosition?: any;
  contactEmail?: any;
  contactPhone?: any;
  altContact?: any;
  altEmail?: any;
  altPhone?: any;
  isPrimary?: any;
}

// Section B2: Physical Location Details
export class ApplicationLocationDraftDto {
  locationType?: any;
  physicalAddress?: any;
  addressLine1?: any;
  addressLine2?: any;
  postalCode?: any;
  cityTown?: any;
  regionState?: any;
  countryId?: any;
  gpsCoordinates?: any;
  factoryLocationSame?: any;
  factoryName?: any;
  factoryType?: any;
  factorySize?: any;
  isPrimary?: any;
}

// Section C1: Business Sectors & Activities
export class BusinessSectorDraftDto {
  mainSector?: any;
  subSector?: any;
  isicCode?: any;
  productCategories?: any;
  percentageRevenue?: any;
  sectorStartYear?: any;
}

// Section C2: Market Reach & Trade
export class MarketInfoDraftDto {
  domesticMarkets?: any;
  exportMarkets?: any;
  primaryExportMarket?: any;
  exportStartYear?: any;
  importSources?: any;
  afcftaAwareness?: any;
  tradeChallenges?: any;
}

// Section C3: Production Capacity & Capabilities
export class ProductionCapacityDraftDto {
  productionCapacity?: any;
  capacityUnit?: any;
  capacityUtilization?: any;
  qualityManagement?: any;
  qmsType?: any;
  certificationCount?: any;
  existingCertifications?: any;
  technicalStaff?: any;
}

// Section D1: User Preferences
export class PreferencesDraftDto {
  preferredLanguage?: any;
  communicationPreferences?: any;
  notificationFrequency?: any;
  timezone?: any;
  currency?: any;
}

// Section D2: Accessibility & Special Needs
export class AccessibilityDraftDto {
  assistiveTech?: any;
  disabilityTypes?: any;
  specialAssistance?: any;
  literacyLevel?: any;
  internetAccess?: any;
  deviceType?: any;
}

// Section D3: Data & Marketing Consent
export class ConsentDraftDto {
  dataConsent?: any;
  dataSharingConsent?: any;
  crossBorderData?: any;
  marketingConsent?: any;
  smsConsent?: any;
  whatsappConsent?: any;
  termsAcceptance?: any;
  declarationSignature?: any;
}

// Part B: Section 2 - Product & Certification Details
export class ProductCertificationDraftDto {
  markAppliedFor?: any; // 'ARSO_QUALITY_MARK' | 'ECO_MARK_AFRICA'
  acapScheme?: any; // ACAP scheme code (A1, A2, B, C, etc.)
  productBrandName?: any;
  productModelTypeNumber?: any;
  applicableArsoStandards?: any[]; // Array of ARSO standard codes
  scopeOfCertification?: any;
  expectedAnnualCertifiedVolume?: any;
  expectedAnnualCertifiedVolumeUnit?: any; // 'tons', 'kg', 'units'
  targetMarkets?: any[]; // Array of market types
}

// Part B: Section 3 - Production & Manufacturer Information
export class ManufacturerInfoDraftDto {
  manufacturerLegalName?: any;
  manufacturerAddress?: any;
  manufacturerCountryId?: any;
  productionSiteGpsCoordinates?: any; // Latitude/Longitude
  typeOfProduction?: any; // 'Crops', 'Livestock', 'Aquaculture', 'Processing', etc.
}

// Part B: Section 4 - Conformity Evidence & Document Validation
export class ConformityEvidenceDraftDto {
  testReportFileId?: any; // Reference to uploaded document
  testReportIssuingBody?: any;
  testReportCertificateNo?: any;
  qmsCertificateFileId?: any; // Optional
  qmsCertificateIssuingBody?: any; // Optional
  qmsCertificateNo?: any; // Optional
  otherEvidenceFileId?: any; // Optional
  otherEvidenceIssuingBody?: any; // Optional
  otherEvidenceCertificateNo?: any; // Optional
  productPhotographsFileIds?: any[]; // Array of file IDs
  labelArtworkFileId?: any;
  declarationOfConformityFileId?: any;
}

// Part B: Section 5 - Post-Certification Commitments & Systems
export class PostCertificationDraftDto {
  productRecallProcedureFileId?: any;
  complaintsManagementProcedureFileId?: any;
  agreementToSurveillance?: any; // boolean
  traceabilityUndertaking?: any; // boolean
}

// Part B: Section 6 - Certification Body Selection & Declaration
export class CbSelectionDraftDto {
  selectedCertificationBodyId?: any; // UUID of selected CB
  finalDeclarationSignature?: any; // Signature/Date
  finalDeclarationDate?: any;
}

// Main DTO for creating application registration draft (NO VALIDATIONS)
export class CreateApplicationRegistrationDraftDto {
  // Section A: Basic Company Information
  @Type(() => CompanyInfoDraftDto)
  companyInfo?: CompanyInfoDraftDto;

  @Type(() => CompanySizeDraftDto)
  companySize?: CompanySizeDraftDto;

  @Type(() => OwnershipInfoDraftDto)
  ownershipInfo?: OwnershipInfoDraftDto;

  // Section B: Contact & Location Information
  @Type(() => ApplicationContactDraftDto)
  primaryContact?: ApplicationContactDraftDto;

  @Type(() => ApplicationLocationDraftDto)
  locations?: ApplicationLocationDraftDto[];

  // Section C: Business Activities & Markets
  @Type(() => BusinessSectorDraftDto)
  businessSectors?: BusinessSectorDraftDto[];

  @Type(() => MarketInfoDraftDto)
  marketInfo?: MarketInfoDraftDto;

  @Type(() => ProductionCapacityDraftDto)
  productionCapacity?: ProductionCapacityDraftDto;

  // Section D: Preferences, Accessibility & Consent
  @Type(() => PreferencesDraftDto)
  preferences?: PreferencesDraftDto;

  @Type(() => AccessibilityDraftDto)
  accessibility?: AccessibilityDraftDto;

  @Type(() => ConsentDraftDto)
  consents?: ConsentDraftDto;

  // Part B: Product & Certification Details
  @Type(() => ProductCertificationDraftDto)
  productCertification?: ProductCertificationDraftDto;

  @Type(() => ManufacturerInfoDraftDto)
  manufacturerInfo?: ManufacturerInfoDraftDto;

  @Type(() => ConformityEvidenceDraftDto)
  conformityEvidence?: ConformityEvidenceDraftDto;

  @Type(() => PostCertificationDraftDto)
  postCertification?: PostCertificationDraftDto;

  @Type(() => CbSelectionDraftDto)
  cbSelection?: CbSelectionDraftDto;

  // Optional: Link to user account
  userId?: any;
  countryId?: any;
}
