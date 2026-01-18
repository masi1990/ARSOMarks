import { Type } from 'class-transformer';

// Draft DTO - NO VALIDATIONS - All fields are optional and accept any values
// This allows complete flexibility for draft saves

// Section A1: Company Type & Legal Identity
export class CompanyInfoDraftDto {
  operatorType?: any;
  companyLegalName?: any;
  tradingName?: any;
  registrationNumberBusiness?: any;
  legalRegistrationNumberType?: any;
  legalRegistrationNumber?: any;
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
export class OperatorContactDraftDto {
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
export class OperatorLocationDraftDto {
  locationType?: any;
  physicalAddress?: any;
  addressLine1?: any;
  addressLine2?: any;
  postalCode?: any;
  cityTown?: any;
  regionState?: any;
  countryId?: any;
  gpsCoordinates?: any;
  geoLat?: any;
  geoLng?: any;
  geoAccuracyM?: any;
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

// Main DTO for creating operator registration draft (NO VALIDATIONS)
export class CreateOperatorRegistrationDraftDto {
  // Section A: Basic Company Information
  @Type(() => CompanyInfoDraftDto)
  companyInfo?: CompanyInfoDraftDto;

  @Type(() => CompanySizeDraftDto)
  companySize?: CompanySizeDraftDto;

  @Type(() => OwnershipInfoDraftDto)
  ownershipInfo?: OwnershipInfoDraftDto;

  // Section B: Contact & Location Information
  @Type(() => OperatorContactDraftDto)
  primaryContact?: OperatorContactDraftDto;

  @Type(() => OperatorLocationDraftDto)
  locations?: OperatorLocationDraftDto[];

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

  isGroup?: any;
  groupManagerId?: any;
  groupMembers?: any;
  schemeType?: any;
  schemePayload?: any;

  // Optional: Link to user account
  userId?: any;
  countryId?: any;
}
