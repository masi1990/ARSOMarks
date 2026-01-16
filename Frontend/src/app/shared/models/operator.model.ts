// Operator Registration Models

export enum OperatorType {
  MANUFACTURER = 'MANUFACTURER',
  IMPORTER = 'IMPORTER',
  EXPORTER = 'EXPORTER',
  DISTRIBUTOR = 'DISTRIBUTOR',
  RETAILER = 'RETAILER',
  SERVICE_PROVIDER = 'SERVICE_PROVIDER',
  OTHER = 'OTHER',
}

export enum LegalStructure {
  LIMITED_COMPANY = 'LIMITED_COMPANY',
  PARTNERSHIP = 'PARTNERSHIP',
  SOLE_PROPRIETOR = 'SOLE_PROPRIETOR',
  NGO = 'NGO',
  GOVERNMENT = 'GOVERNMENT',
  COOPERATIVE = 'COOPERATIVE',
  OTHER = 'OTHER',
}

export enum EmployeeCountRange {
  MICRO_1_9 = 'MICRO_1_9',
  SMALL_10_49 = 'SMALL_10_49',
  MEDIUM_50_249 = 'MEDIUM_50_249',
  LARGE_250_PLUS = 'LARGE_250_PLUS',
}

export enum AnnualTurnoverRange {
  UNDER_50K = 'UNDER_50K',
  '50K_100K' = '50K_100K',
  '100K_500K' = '100K_500K',
  '500K_1M' = '500K_1M',
  '1M_5M' = '1M_5M',
  '5M_10M' = '5M_10M',
  OVER_10M = 'OVER_10M',
}

export enum OwnershipType {
  LOCAL = 'LOCAL',
  FOREIGN = 'FOREIGN',
  JOINT_VENTURE = 'JOINT_VENTURE',
  PUBLIC = 'PUBLIC',
  GOVERNMENT = 'GOVERNMENT',
  MIXED = 'MIXED',
}

export enum OwnershipStatus {
  YES = 'YES',
  NO = 'NO',
  WOMEN_LED = 'WOMEN_LED',
  YOUTH_LED = 'YOUTH_LED',
}

export enum LegalRegistrationNumberType {
  BUSINESS_REGISTRATION = 'BUSINESS_REGISTRATION',
  TAX_ID = 'TAX_ID',
  VAT = 'VAT',
  OTHER = 'OTHER',
}

export enum OperatorStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SUSPENDED = 'SUSPENDED',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface Operator {
  id: string;
  registrationNumber?: string;
  operatorType: OperatorType;
  companyLegalName: string;
  tradingName?: string;
  registrationNumberBusiness: string;
  legalRegistrationNumberType?: LegalRegistrationNumberType;
  legalRegistrationNumber?: string;
  taxId?: string;
  vatNumber?: string;
  yearEstablished: number;
  companyAge?: number;
  legalStructure: LegalStructure;
  businessActivity: string;
  employeeCount: EmployeeCountRange;
  annualTurnover: AnnualTurnoverRange;
  annualRevenue?: number;
  exportPercentage?: number;
  importPercentage?: number;
  capitalInvestment?: number;
  ownershipType: OwnershipType;
  majorityOwnerNationality?: string;
  womenOwned: OwnershipStatus;
  youthOwned?: OwnershipStatus;
  blackOwnedPercentage?: number;
  smeCategory?: string;
  beneficialOwnersCount: number;
  pepInvolved: boolean;
  pepDetails?: string;
  isGroup?: boolean;
  groupManagerId?: string;
  groupMembers?: OperatorGroupMember[];
  status: OperatorStatus;
  submittedAt?: string;
  approvedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  userId?: string;
  countryId?: string;
  contacts?: OperatorContact[];
  locations?: OperatorLocation[];
  businessSectors?: OperatorBusinessSector[];
  markets?: OperatorMarket;
  productionCapacity?: OperatorProductionCapacity;
  preferences?: OperatorPreference;
  accessibility?: OperatorAccessibility;
  consents?: OperatorConsent;
  createdAt: string;
  updatedAt: string;
}

export interface OperatorContact {
  id?: string;
  contactType?: string;
  primaryContact: string;
  contactPosition: string;
  contactEmail: string;
  contactPhone: string;
  altContact?: string;
  altEmail?: string;
  altPhone?: string;
  isPrimary?: boolean;
}

export interface OperatorLocation {
  id?: string;
  locationType?: string;
  physicalAddress: string;
  addressLine1: string;
  addressLine2?: string;
  postalCode: string;
  cityTown: string;
  regionState: string;
  countryId: string;
  gpsCoordinates?: string;
  geoLat?: number;
  geoLng?: number;
  geoAccuracyM?: number;
  factoryLocationSame?: boolean;
  factoryName?: string;
  factoryType?: string;
  factorySize?: number;
  isPrimary?: boolean;
}

export interface OperatorGroupMember {
  memberName: string;
  registrationNumberBusiness?: string;
  countryId?: string;
}

export interface OperatorBusinessSector {
  id?: string;
  mainSector: string;
  subSector?: string[];
  isicCode?: string;
  productCategories?: string[];
  percentageRevenue: number;
  sectorStartYear?: number;
  sectorExperience?: number;
}

export interface OperatorMarket {
  id?: string;
  domesticMarkets: string[];
  exportMarkets?: string[];
  primaryExportMarket?: string;
  exportStartYear?: number;
  importSources?: string[];
  afcftaAwareness: string;
  tradeChallenges?: string;
}

export interface OperatorProductionCapacity {
  id?: string;
  productionCapacity: number;
  capacityUnit: string;
  capacityUtilization: number;
  qualityManagement: string;
  qmsType?: string;
  certificationCount: number;
  existingCertifications?: string;
  technicalStaff: number;
}

export interface OperatorPreference {
  id?: string;
  preferredLanguage: string;
  communicationPreferences: string[];
  notificationFrequency: string;
  timezone: string;
  currency: string;
}

export interface OperatorAccessibility {
  id?: string;
  assistiveTech: boolean;
  disabilityTypes?: string[];
  specialAssistance?: string;
  literacyLevel: string;
  internetAccess: string;
  deviceType: string;
}

export interface OperatorConsent {
  id?: string;
  dataConsent: boolean;
  dataSharingConsent: boolean;
  crossBorderData: boolean;
  marketingConsent?: boolean;
  smsConsent?: boolean;
  whatsappConsent?: boolean;
  termsAcceptance: boolean;
  declarationSignature: string;
}

export interface CreateOperatorRegistrationRequest {
  companyInfo: {
    operatorType: OperatorType;
    companyLegalName: string;
    tradingName?: string;
    registrationNumberBusiness: string;
    legalRegistrationNumberType?: LegalRegistrationNumberType;
    legalRegistrationNumber?: string;
    taxId?: string;
    vatNumber?: string;
    yearEstablished: number;
    legalStructure: LegalStructure;
    businessActivity: string;
  };
  companySize: {
    employeeCount: EmployeeCountRange;
    annualTurnover: AnnualTurnoverRange;
    annualRevenue?: number;
    exportPercentage?: number;
    importPercentage?: number;
    capitalInvestment?: number;
  };
  ownershipInfo: {
    ownershipType: OwnershipType;
    majorityOwnerNationality?: string;
    womenOwned: OwnershipStatus;
    youthOwned?: OwnershipStatus;
    blackOwnedPercentage?: number;
    beneficialOwnersCount: number;
    pepInvolved: boolean;
    pepDetails?: string;
  };
  primaryContact: OperatorContact;
  locations: OperatorLocation[];
  businessSectors: OperatorBusinessSector[];
  marketInfo: OperatorMarket;
  productionCapacity: OperatorProductionCapacity;
  preferences: OperatorPreference;
  accessibility: OperatorAccessibility;
  consents: OperatorConsent;
  isGroup?: boolean;
  groupManagerId?: string;
  groupMembers?: OperatorGroupMember[];
  userId?: string;
  countryId?: string;
}

export interface PagedOperatorResponse {
  data: Operator[];
  total: number;
}

