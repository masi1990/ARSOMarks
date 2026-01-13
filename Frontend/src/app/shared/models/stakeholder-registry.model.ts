// Stakeholder Registry Models (Phase 2 - Complete Specification)

// ============================================================================
// ENUMS
// ============================================================================

export enum MsaJurisdiction {
  NATIONAL = 'NATIONAL',
  REGIONAL = 'REGIONAL',
  PROVINCIAL = 'PROVINCIAL',
  COUNTY = 'COUNTY',
  MUNICIPAL = 'MUNICIPAL',
  SPECIAL_ECONOMIC_ZONE = 'SPECIAL_ECONOMIC_ZONE',
  OTHER = 'OTHER',
}

export enum MsaScopeType {
  PRODUCT_SAFETY = 'PRODUCT_SAFETY',
  QUALITY_CONTROL = 'QUALITY_CONTROL',
  METROLOGY = 'METROLOGY',
  CONSUMER_PROTECTION = 'CONSUMER_PROTECTION',
  ENVIRONMENTAL_COMPLIANCE = 'ENVIRONMENTAL_COMPLIANCE',
  HEALTH_STANDARDS = 'HEALTH_STANDARDS',
  AGRICULTURE_STANDARDS = 'AGRICULTURE_STANDARDS',
  IMPORT_EXPORT_CONTROL = 'IMPORT_EXPORT_CONTROL',
  OTHER = 'OTHER',
}

export enum MouStatus {
  NOT_REQUIRED = 'NOT_REQUIRED',
  PLANNED = 'PLANNED',
  DRAFT_UNDER_REVIEW = 'DRAFT_UNDER_REVIEW',
  SIGNED_ACTIVE = 'SIGNED_ACTIVE',
  EXPIRED = 'EXPIRED',
  TERMINATED = 'TERMINATED',
  NOT_APPLICABLE = 'NOT_APPLICABLE',
  // Legacy values for backward compatibility
  SIGNED = 'SIGNED',
  PENDING = 'PENDING',
  NOT_SIGNED = 'NOT_SIGNED',
  N_A = 'N/A',
}

export enum SystemAccessLevel {
  NO_ACCESS = 'NO_ACCESS',
  READ_ONLY_PORTAL = 'READ_ONLY_PORTAL',
  FULL_SUBMISSION_ACCESS = 'FULL_SUBMISSION_ACCESS',
  CUSTOM = 'CUSTOM',
  // Legacy values
  READ_ONLY = 'READ_ONLY',
  FULL = 'FULL',
}

export enum AcapTrainingStatus {
  NOT_TRAINED = 'NOT_TRAINED',
  BASIC_AWARENESS = 'BASIC_AWARENESS',
  TECHNICAL_TRAINING_COMPLETED = 'TECHNICAL_TRAINING_COMPLETED',
  TRAINER_CERTIFIED = 'TRAINER_CERTIFIED',
}

export enum CustomsIntegrationStatus {
  FULLY_INTEGRATED = 'FULLY_INTEGRATED',
  PARTIAL_INTEGRATION = 'PARTIAL_INTEGRATION',
  PLANNED_INTEGRATION = 'PLANNED_INTEGRATION',
  NO_INTEGRATION = 'NO_INTEGRATION',
  UNKNOWN = 'UNKNOWN',
}

export enum BorderPostType {
  AIRPORT = 'AIRPORT',
  SEAPORT = 'SEAPORT',
  LAND_BORDER = 'LAND_BORDER',
  DRY_PORT = 'DRY_PORT',
  INLAND_DEPOT = 'INLAND_DEPOT',
  OTHER = 'OTHER',
}

export enum RegulatoryAgencyType {
  FOOD_DRUG_AUTHORITY = 'FOOD_DRUG_AUTHORITY',
  AGRICULTURE_MINISTRY = 'AGRICULTURE_MINISTRY',
  HEALTH_MINISTRY = 'HEALTH_MINISTRY',
  ENVIRONMENT_AGENCY = 'ENVIRONMENT_AGENCY',
  INDUSTRY_TRADE_MINISTRY = 'INDUSTRY_TRADE_MINISTRY',
  OTHER = 'OTHER',
}

export enum EngagementLevel {
  ACTIVE_PARTNER = 'ACTIVE_PARTNER',
  INTERESTED = 'INTERESTED',
  NEUTRAL = 'NEUTRAL',
  RESISTANT = 'RESISTANT',
  NO_ENGAGEMENT = 'NO_ENGAGEMENT',
  REGULAR_CONTACT = 'REGULAR_CONTACT',
  OCCASIONAL_CONTACT = 'OCCASIONAL_CONTACT',
  NEW_CONTACT = 'NEW_CONTACT',
  DORMANT = 'DORMANT',
}

export enum LaboratoryType {
  TESTING_LABORATORY = 'TESTING_LABORATORY',
  CALIBRATION_LABORATORY = 'CALIBRATION_LABORATORY',
  MEDICAL_LABORATORY = 'MEDICAL_LABORATORY',
  INSPECTION_BODY = 'INSPECTION_BODY',
  CERTIFICATION_BODY = 'CERTIFICATION_BODY',
  RESEARCH_INSTITUTE = 'RESEARCH_INSTITUTE',
}

export enum LaboratoryLegalStatus {
  GOVERNMENT_OWNED = 'GOVERNMENT_OWNED',
  PRIVATE_COMMERCIAL = 'PRIVATE_COMMERCIAL',
  UNIVERSITY_AFFILIATED = 'UNIVERSITY_AFFILIATED',
  NON_PROFIT = 'NON_PROFIT',
  INTERNATIONAL_BRANCH = 'INTERNATIONAL_BRANCH',
}

export enum AccreditationStatus {
  AFRAC_MRA_SIGNATORY = 'AFRAC_MRA_SIGNATORY',
  ILAC_MRA_SIGNATORY = 'ILAC_MRA_SIGNATORY',
  REGIONAL_MRA = 'REGIONAL_MRA',
  NATIONAL_ACCREDITATION_ONLY = 'NATIONAL_ACCREDITATION_ONLY',
  NOT_ACCREDITED = 'NOT_ACCREDITED',
  APPLICATION_IN_PROGRESS = 'APPLICATION_IN_PROGRESS',
  // Legacy values
  AFRAC_MRA = 'AFRAC_MRA',
  OTHER = 'OTHER',
  NONE = 'NONE',
}

export enum DigitalCapability {
  PDF_REPORTS_ONLY = 'PDF_REPORTS_ONLY',
  DIGITAL_SIGNATURES = 'DIGITAL_SIGNATURES',
  API_INTEGRATION = 'API_INTEGRATION',
  BLOCKCHAIN_ENABLED = 'BLOCKCHAIN_ENABLED',
  NONE = 'NONE',
}

export enum StakeholderCategory {
  ACADEMIC_RESEARCH = 'ACADEMIC_RESEARCH',
  CONSUMER_ORGANIZATIONS = 'CONSUMER_ORGANIZATIONS',
  DEVELOPMENT_PARTNERS = 'DEVELOPMENT_PARTNERS',
  FINANCIAL_INSTITUTIONS = 'FINANCIAL_INSTITUTIONS',
  MEDIA_ORGANIZATIONS = 'MEDIA_ORGANIZATIONS',
  PROFESSIONAL_BODIES = 'PROFESSIONAL_BODIES',
  TRADE_UNIONS = 'TRADE_UNIONS',
  OTHER = 'OTHER',
}

export enum NsbPriorityLevel {
  HIGH_PRIORITY = 'HIGH_PRIORITY',
  MEDIUM_PRIORITY = 'MEDIUM_PRIORITY',
  LOW_PRIORITY = 'LOW_PRIORITY',
  MONITOR_ONLY = 'MONITOR_ONLY',
}

// ============================================================================
// INTERFACES - NSB-003-1: NATIONAL AUTHORITIES DIRECTORY
// ============================================================================

export interface MarketSurveillanceAuthority {
  id?: string;
  nsbId?: string;
  // Basic Information
  agencyName: string;
  agencyNameEnglish?: string;
  acronym?: string;
  jurisdiction: MsaJurisdiction;
  jurisdictionOther?: string;
  parentMinistry?: string;
  // Contact Information
  contactPersonName: string;
  contactPersonTitle?: string;
  contactEmail: string;
  contactPhone: string;
  contactAlt?: string;
  // Authority Scope
  scopeOfAuthority?: string[]; // Array of MsaScopeType
  scopeOther?: string;
  productsCovered?: string[]; // Tag Input - HS codes or product categories
  // MOU Information
  mouStatus: MouStatus;
  mouDocumentPath?: string;
  mouDocumentHash?: string;
  mouStartDate?: string;
  mouEndDate?: string;
  // System Access
  accessLevel: SystemAccessLevel;
  customAccessRequirements?: string;
  // Training Information
  trainingStatus: AcapTrainingStatus;
  lastTrainingDate?: string;
  isNationalFocalPoint?: boolean;
  // Additional Information
  notes?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface MsaDocument {
  id?: string;
  msaId: string;
  documentType: 'MOU' | 'MANDATE' | 'ORG_CHART' | 'OTHER';
  fileName: string;
  filePath: string;
  fileHash: string;
  fileSize: number;
  mimeType?: string;
  uploadedAt?: string;
}

export interface BorderPost {
  id?: string;
  customsAgencyId: string;
  borderPostName: string;
  postType: BorderPostType;
  location: string; // City/Region
  gpsCoordinates?: string;
  contactName: string;
  contactPhone: string;
  contactEmail?: string;
  operatingHours: string;
  verificationEquipment?: string[];
  trainingNeeds?: string[];
  estimatedAnnualTraffic?: 'HIGH' | 'MEDIUM' | 'LOW';
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CustomsBorderAgency {
  id?: string;
  nsbId?: string;
  agencyName: string;
  parentMinistry: string;
  primaryContactName: string; // National ACAP Coordinator
  coordinatorEmail: string;
  coordinatorPhone: string;
  integrationStatus: CustomsIntegrationStatus;
  integrationDetails?: string;
  apiAvailable?: 'YES' | 'NO' | 'UNDER_DEVELOPMENT';
  borderPosts?: BorderPost[];
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegulatoryAgency {
  id?: string;
  nsbId?: string;
  agencyType: RegulatoryAgencyType;
  agencyName: string;
  specificDepartment?: string;
  contactPersonName?: string;
  contactEmail?: string;
  contactPhone?: string;
  engagementLevel?: EngagementLevel;
  relevantMandate?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ============================================================================
// INTERFACES - NSB-003-2: INDUSTRY ASSOCIATIONS DIRECTORY
// ============================================================================

export interface IndustryAssociation {
  id?: string;
  nsbId?: string;
  associationName: string;
  acronym?: string;
  registrationNumber: string;
  primarySector: string[]; // Multi-select - ISIC codes + ACAP priority sectors
  subSectors?: string[]; // Tag Input
  membershipType: string[]; // Array: Manufacturers, Importers, Exporters, etc.
  memberCount: number;
  estimatedSmeMembers?: number;
  contactPersonName: string;
  contactTitle: string;
  contactEmail: string;
  contactPhone: string;
  website?: string;
  willingnessToPromoteAcap?: 'EAGER_TO_PROMOTE' | 'WILLING_IF_SUPPORTED' | 'NEUTRAL' | 'RESISTANT' | 'ALREADY_PROMOTING';
  promotionMethods?: string[];
  trainingNeeds?: string[];
  memberChallenges?: string[];
  annualEvents?: string;
  notes?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ============================================================================
// INTERFACES - NSB-003-3: TESTING LABORATORIES & INSPECTION BODIES
// ============================================================================

export interface LaboratoryAccreditation {
  id?: string;
  laboratoryId: string;
  accreditationBody: string;
  certificateNumber: string;
  scopeOfAccreditation: string;
  accreditationExpiryDate: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TestingLaboratory {
  id?: string;
  nsbId?: string;
  name: string;
  organizationType: LaboratoryType;
  legalStatus: LaboratoryLegalStatus;
  accreditationStatus: AccreditationStatus;
  accreditations?: LaboratoryAccreditation[]; // Array of accreditations
  acapContactName: string; // ACAP Referral Contact Person
  contactEmail: string;
  contactPhone: string;
  emergencyContact?: string;
  testingCategories: string[];
  specificTestMethods?: string[]; // Tag Input
  productsCovered: string[]; // Tag Input
  reportLanguages?: string[];
  digitalCapability: DigitalCapability;
  typicalTurnaroundTime?: 'LESS_THAN_24_HOURS' | '2_3_DAYS' | '1_WEEK' | '2_WEEKS' | 'MORE_THAN_2_WEEKS';
  feeStructureType?: 'FIXED_RATES' | 'NEGOTIATED_CONTRACTS' | 'GOVERNMENT_SUBSIDIZED' | 'COMMERCIAL_RATES';
  willingAcapListing: 'YES' | 'NO' | 'CONDITIONAL';
  listingConditions?: string;
  notes?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ============================================================================
// INTERFACES - NSB-003-4: OTHER STAKEHOLDER GROUPS
// ============================================================================

export interface OtherStakeholderGroup {
  id?: string;
  nsbId?: string;
  stakeholderCategory: StakeholderCategory;
  categoryOther?: string;
  primaryContactName: string;
  contactEmail: string;
  contactPhone: string;
  engagementLevel: EngagementLevel;
  nsbPriorityLevel: NsbPriorityLevel;
  categorySpecificData?: Record<string, any>; // JSONB for flexible category data
  notes?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ============================================================================
// MAIN REGISTRY INTERFACE
// ============================================================================

export interface StakeholderRegistry {
  marketSurveillanceAuthorities?: MarketSurveillanceAuthority[];
  customsBorderAgencies?: CustomsBorderAgency[];
  regulatoryAgencies?: RegulatoryAgency[];
  industryAssociations?: IndustryAssociation[];
  testingLaboratories?: TestingLaboratory[];
  otherStakeholderGroups?: OtherStakeholderGroup[];
}
