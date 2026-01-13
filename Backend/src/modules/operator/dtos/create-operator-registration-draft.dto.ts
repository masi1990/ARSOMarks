import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  OperatorType,
  LegalStructure,
  EmployeeCountRange,
  AnnualTurnoverRange,
  OwnershipType,
  OwnershipStatus,
} from '../../../shared/enums';
import { TransformEmptyToUndefined } from '../../../shared/decorators/transform-empty-to-undefined.decorator';

// Draft DTO - All fields are optional to allow partial saves
// This extends the structure of CreateOperatorRegistrationDto but makes everything optional

// Section A1: Company Type & Legal Identity
export class CompanyInfoDraftDto {
  @TransformEmptyToUndefined()
  @IsOptional()
  @IsEnum(OperatorType)
  operatorType?: OperatorType;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  companyLegalName?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(150)
  tradingName?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  registrationNumberBusiness?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(30)
  taxId?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(30)
  vatNumber?: string;

  @IsInt()
  @IsOptional()
  @Min(1900)
  @Max(new Date().getFullYear())
  yearEstablished?: number;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsEnum(LegalStructure)
  legalStructure?: LegalStructure;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  businessActivity?: string;
}

// Section A2: Company Size & Financial Information
export class CompanySizeDraftDto {
  @TransformEmptyToUndefined()
  @IsOptional()
  @IsEnum(EmployeeCountRange)
  employeeCount?: EmployeeCountRange;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsEnum(AnnualTurnoverRange)
  annualTurnover?: AnnualTurnoverRange;

  @IsNumber()
  @IsOptional()
  annualRevenue?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  exportPercentage?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  importPercentage?: number;

  @IsNumber()
  @IsOptional()
  capitalInvestment?: number;
}

// Section A3: Ownership & Beneficial Ownership
export class OwnershipInfoDraftDto {
  @TransformEmptyToUndefined()
  @IsOptional()
  @IsEnum(OwnershipType)
  ownershipType?: OwnershipType;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  majorityOwnerNationality?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsEnum(OwnershipStatus)
  womenOwned?: OwnershipStatus;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsEnum(OwnershipStatus)
  youthOwned?: OwnershipStatus;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  blackOwnedPercentage?: number;

  @IsInt()
  @IsOptional()
  @Min(1)
  beneficialOwnersCount?: number;

  @IsBoolean()
  @IsOptional()
  pepInvolved?: boolean;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  pepDetails?: string;
}

// Section B1: Primary Contact Details
export class OperatorContactDraftDto {
  @TransformEmptyToUndefined()
  @IsOptional()
  @IsEnum(['PRIMARY', 'ALTERNATIVE', 'TECHNICAL', 'FINANCIAL', 'LEGAL'])
  contactType?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  primaryContact?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  contactPosition?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsEmail()
  @MaxLength(150)
  contactEmail?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  contactPhone?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  altContact?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsEmail()
  @MaxLength(150)
  altEmail?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  altPhone?: string;

  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;
}

// Section B2: Physical Location Details
export class OperatorLocationDraftDto {
  @TransformEmptyToUndefined()
  @IsOptional()
  @IsEnum(['REGISTERED_ADDRESS', 'FACTORY', 'PRODUCTION_FACILITY', 'WAREHOUSE', 'OFFICE', 'OTHER'])
  locationType?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  physicalAddress?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  addressLine1?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  addressLine2?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  postalCode?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  cityTown?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  regionState?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsUUID()
  countryId?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  gpsCoordinates?: string;

  @IsBoolean()
  @IsOptional()
  factoryLocationSame?: boolean;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  factoryName?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsEnum(['MANUFACTURING_PLANT', 'PROCESSING_UNIT', 'ASSEMBLY_LINE', 'WORKSHOP', 'PACKAGING_FACILITY', 'OTHER'])
  factoryType?: string;

  @IsNumber()
  @IsOptional()
  factorySize?: number;

  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;
}

// Section C1: Business Sectors & Activities
export class BusinessSectorDraftDto {
  @TransformEmptyToUndefined()
  @IsOptional()
  @IsEnum(['AGRICULTURE', 'MANUFACTURING', 'SERVICES', 'CONSTRUCTION', 'MINING', 'RETAIL', 'WHOLESALE', 'TRANSPORT', 'ENERGY', 'TELECOMMUNICATIONS', 'OTHER'])
  mainSector?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  subSector?: string[];

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(10)
  isicCode?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  productCategories?: string[];

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  percentageRevenue?: number;

  @IsInt()
  @IsOptional()
  @Min(1900)
  @Max(new Date().getFullYear())
  sectorStartYear?: number;
}

// Section C2: Market Reach & Trade
export class MarketInfoDraftDto {
  @IsArray()
  @IsEnum(['NATIONAL', 'REGIONAL', 'LOCAL'], { each: true })
  @IsOptional()
  domesticMarkets?: string[];

  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  exportMarkets?: string[];

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsUUID()
  primaryExportMarket?: string;

  @IsInt()
  @IsOptional()
  @Min(1900)
  @Max(new Date().getFullYear())
  exportStartYear?: number;

  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  importSources?: string[];

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsEnum(['HIGH', 'MEDIUM', 'LOW', 'NONE'])
  afcftaAwareness?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  tradeChallenges?: string;
}

// Section C3: Production Capacity & Capabilities
export class ProductionCapacityDraftDto {
  @IsNumber()
  @IsOptional()
  @Min(0)
  productionCapacity?: number;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  capacityUnit?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  capacityUtilization?: number;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsEnum(['YES', 'NO', 'IN_PROGRESS'])
  qualityManagement?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsEnum(['ISO_9001', 'HACCP', 'GMP', 'INTERNAL_SYSTEM', 'NONE', 'IN_PROGRESS'])
  qmsType?: string;

  @IsInt()
  @IsOptional()
  @Min(0)
  certificationCount?: number;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  existingCertifications?: string;

  @IsInt()
  @IsOptional()
  @Min(0)
  technicalStaff?: number;
}

// Section D1: User Preferences
export class PreferencesDraftDto {
  @IsEnum(['ENGLISH', 'FRENCH', 'PORTUGUESE', 'ARABIC', 'SWAHILI', 'OTHER'])
  @IsOptional()
  preferredLanguage?: string;

  @IsArray()
  @IsEnum(['EMAIL', 'SMS', 'PHONE', 'WHATSAPP', 'POSTAL_MAIL', 'IN_PERSON'], { each: true })
  @IsOptional()
  communicationPreferences?: string[];

  @IsEnum(['REAL_TIME', 'DAILY_DIGEST', 'WEEKLY_SUMMARY', 'MONTHLY_SUMMARY'])
  @IsOptional()
  notificationFrequency?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  timezone?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(10)
  currency?: string;
}

// Section D2: Accessibility & Special Needs
export class AccessibilityDraftDto {
  @IsBoolean()
  @IsOptional()
  assistiveTech?: boolean;

  @IsArray()
  @IsEnum(['SCREEN_READER', 'HIGH_CONTRAST', 'LARGE_TEXT', 'TEXT_TO_SPEECH', 'KEYBOARD_NAVIGATION', 'OTHER'], { each: true })
  @IsOptional()
  disabilityTypes?: string[];

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  specialAssistance?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsEnum(['BASIC', 'INTERMEDIATE', 'ADVANCED'])
  literacyLevel?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsEnum(['HIGH_SPEED', 'MOBILE_DATA', 'LIMITED', 'INTERMITTENT'])
  internetAccess?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsEnum(['DESKTOP', 'LAPTOP', 'SMARTPHONE', 'TABLET', 'FEATURE_PHONE'])
  deviceType?: string;
}

// Section D3: Data & Marketing Consent
export class ConsentDraftDto {
  @IsBoolean()
  @IsOptional()
  dataConsent?: boolean;

  @IsBoolean()
  @IsOptional()
  dataSharingConsent?: boolean;

  @IsBoolean()
  @IsOptional()
  crossBorderData?: boolean;

  @IsBoolean()
  @IsOptional()
  marketingConsent?: boolean;

  @IsBoolean()
  @IsOptional()
  smsConsent?: boolean;

  @IsBoolean()
  @IsOptional()
  whatsappConsent?: boolean;

  @IsBoolean()
  @IsOptional()
  termsAcceptance?: boolean;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  declarationSignature?: string;
}

// Main DTO for creating operator registration draft (all fields optional)
export class CreateOperatorRegistrationDraftDto {
  // Section A: Basic Company Information
  @ValidateNested()
  @Type(() => CompanyInfoDraftDto)
  @IsOptional()
  companyInfo?: CompanyInfoDraftDto;

  @ValidateNested()
  @Type(() => CompanySizeDraftDto)
  @IsOptional()
  companySize?: CompanySizeDraftDto;

  @ValidateNested()
  @Type(() => OwnershipInfoDraftDto)
  @IsOptional()
  ownershipInfo?: OwnershipInfoDraftDto;

  // Section B: Contact & Location Information
  @ValidateNested()
  @Type(() => OperatorContactDraftDto)
  @IsOptional()
  primaryContact?: OperatorContactDraftDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OperatorLocationDraftDto)
  @IsOptional()
  locations?: OperatorLocationDraftDto[];

  // Section C: Business Activities & Markets
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BusinessSectorDraftDto)
  @IsOptional()
  businessSectors?: BusinessSectorDraftDto[];

  @ValidateNested()
  @Type(() => MarketInfoDraftDto)
  @IsOptional()
  marketInfo?: MarketInfoDraftDto;

  @ValidateNested()
  @Type(() => ProductionCapacityDraftDto)
  @IsOptional()
  productionCapacity?: ProductionCapacityDraftDto;

  // Section D: Preferences, Accessibility & Consent
  @ValidateNested()
  @Type(() => PreferencesDraftDto)
  @IsOptional()
  preferences?: PreferencesDraftDto;

  @ValidateNested()
  @Type(() => AccessibilityDraftDto)
  @IsOptional()
  accessibility?: AccessibilityDraftDto;

  @ValidateNested()
  @Type(() => ConsentDraftDto)
  @IsOptional()
  consents?: ConsentDraftDto;

  // Optional: Link to user account
  @TransformEmptyToUndefined()
  @IsUUID()
  @IsOptional()
  userId?: string;

  @TransformEmptyToUndefined()
  @IsUUID()
  @IsOptional()
  countryId?: string;
}

