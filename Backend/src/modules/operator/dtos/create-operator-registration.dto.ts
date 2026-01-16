import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
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
  LegalRegistrationNumberType,
} from '../../../shared/enums';
import { TransformEmptyToUndefined } from '../../../shared/decorators/transform-empty-to-undefined.decorator';

// Section A1: Company Type & Legal Identity
export class CompanyInfoDto {
  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Operator type is required' })
  @IsEnum(OperatorType)
  operatorType: OperatorType;

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
  @IsNotEmpty({ message: 'Registration number is required' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  registrationNumberBusiness: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsEnum(LegalRegistrationNumberType)
  legalRegistrationNumberType?: LegalRegistrationNumberType;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  legalRegistrationNumber?: string;

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
  @IsNotEmpty({ message: 'Legal structure is required' })
  @IsEnum(LegalStructure)
  legalStructure: LegalStructure;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Business activity is required' })
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  businessActivity: string;
}

// Section A2: Company Size & Financial Information
export class CompanySizeDto {
  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Employee count is required' })
  @IsEnum(EmployeeCountRange)
  employeeCount: EmployeeCountRange;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Annual turnover is required' })
  @IsEnum(AnnualTurnoverRange)
  annualTurnover: AnnualTurnoverRange;

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
export class OwnershipInfoDto {
  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Ownership type is required' })
  @IsEnum(OwnershipType)
  ownershipType: OwnershipType;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  majorityOwnerNationality?: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Women owned status is required' })
  @IsEnum(OwnershipStatus)
  womenOwned: OwnershipStatus;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Youth owned status is required' })
  @IsEnum(OwnershipStatus)
  youthOwned: OwnershipStatus;

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
export class OperatorContactDto {
  @TransformEmptyToUndefined()
  @IsOptional()
  @IsEnum(['PRIMARY', 'ALTERNATIVE', 'TECHNICAL', 'FINANCIAL', 'LEGAL'])
  contactType?: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Primary contact name is required' })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  primaryContact: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Contact position is required' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  contactPosition: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Contact email is required' })
  @IsEmail()
  @MaxLength(150)
  contactEmail: string;

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
export class OperatorLocationDto {
  @TransformEmptyToUndefined()
  @IsOptional()
  @IsEnum(['REGISTERED_ADDRESS', 'FACTORY', 'PRODUCTION_FACILITY', 'WAREHOUSE', 'OFFICE', 'OTHER'])
  locationType?: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Physical address is required' })
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  physicalAddress: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Address line 1 is required' })
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  addressLine1: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  addressLine2?: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Postal code is required' })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  postalCode: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'City/Town is required' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  cityTown: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Region/State is required' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  regionState: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Country is required' })
  @IsUUID()
  countryId: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  gpsCoordinates?: string;

  @IsNumber()
  @IsOptional()
  @Min(-90)
  @Max(90)
  geoLat?: number;

  @IsNumber()
  @IsOptional()
  @Min(-180)
  @Max(180)
  geoLng?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(10)
  geoAccuracyM?: number;

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
export class BusinessSectorDto {
  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Main business sector is required' })
  @IsEnum(['AGRICULTURE', 'MANUFACTURING', 'SERVICES', 'CONSTRUCTION', 'MINING', 'RETAIL', 'WHOLESALE', 'TRANSPORT', 'ENERGY', 'TELECOMMUNICATIONS', 'OTHER'])
  mainSector: string;

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
export class MarketInfoDto {
  @IsArray()
  @IsEnum(['NATIONAL', 'REGIONAL', 'LOCAL'], { each: true })
  @IsOptional()
  domesticMarkets?: string[];

  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  exportMarkets?: string[];

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Primary export market is required' })
  @IsUUID()
  primaryExportMarket: string;

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
  @IsNotEmpty({ message: 'AFCFTA awareness is required' })
  @IsEnum(['HIGH', 'MEDIUM', 'LOW', 'NONE'])
  afcftaAwareness: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  tradeChallenges?: string;
}

// Section C3: Production Capacity & Capabilities
export class ProductionCapacityDto {
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
  @IsNotEmpty({ message: 'Quality management status is required' })
  @IsEnum(['YES', 'NO', 'IN_PROGRESS'], { message: 'Quality management status must be one of: YES, NO, IN_PROGRESS' })
  qualityManagement: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'QMS type is required' })
  @IsEnum(['ISO_9001', 'HACCP', 'GMP', 'INTERNAL_SYSTEM', 'NONE', 'IN_PROGRESS'], { message: 'QMS type must be one of: ISO_9001, HACCP, GMP, INTERNAL_SYSTEM, NONE, IN_PROGRESS' })
  qmsType: string;

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
export class PreferencesDto {
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
export class AccessibilityDto {
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
  @IsNotEmpty({ message: 'Internet access type is required' })
  @IsEnum(['HIGH_SPEED', 'MOBILE_DATA', 'LIMITED', 'INTERMITTENT'], { message: 'Internet access type must be one of: HIGH_SPEED, MOBILE_DATA, LIMITED, INTERMITTENT' })
  internetAccess: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Device type is required' })
  @IsEnum(['DESKTOP', 'LAPTOP', 'SMARTPHONE', 'TABLET', 'FEATURE_PHONE'], { message: 'Device type must be one of: DESKTOP, LAPTOP, SMARTPHONE, TABLET, FEATURE_PHONE' })
  deviceType: string;
}

// Section D3: Data & Marketing Consent
export class ConsentDto {
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
  @IsNotEmpty({ message: 'Declaration signature is required' })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  declarationSignature: string;
}

export class GroupMemberDto {
  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Member name is required' })
  @IsString()
  @MaxLength(200)
  memberName: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  registrationNumberBusiness?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsUUID()
  countryId?: string;
}

// Main DTO for creating operator registration
export class CreateOperatorRegistrationDto {
  // Section A: Basic Company Information
  @ValidateNested()
  @Type(() => CompanyInfoDto)
  @IsOptional()
  companyInfo?: CompanyInfoDto;

  @ValidateNested()
  @Type(() => CompanySizeDto)
  @IsOptional()
  companySize?: CompanySizeDto;

  @ValidateNested()
  @Type(() => OwnershipInfoDto)
  @IsOptional()
  ownershipInfo?: OwnershipInfoDto;

  // Section B: Contact & Location Information
  @ValidateNested()
  @Type(() => OperatorContactDto)
  @IsOptional()
  primaryContact?: OperatorContactDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OperatorLocationDto)
  @IsOptional()
  locations?: OperatorLocationDto[];

  // Section C: Business Activities & Markets
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BusinessSectorDto)
  @IsOptional()
  businessSectors?: BusinessSectorDto[];

  @ValidateNested()
  @Type(() => MarketInfoDto)
  @IsOptional()
  marketInfo?: MarketInfoDto;

  @ValidateNested()
  @Type(() => ProductionCapacityDto)
  @IsOptional()
  productionCapacity?: ProductionCapacityDto;

  // Section D: Preferences, Accessibility & Consent
  @ValidateNested()
  @Type(() => PreferencesDto)
  @IsOptional()
  preferences?: PreferencesDto;

  @ValidateNested()
  @Type(() => AccessibilityDto)
  @IsOptional()
  accessibility?: AccessibilityDto;

  @ValidateNested()
  @Type(() => ConsentDto)
  @IsOptional()
  consents?: ConsentDto;

  @IsOptional()
  @IsBoolean()
  isGroup?: boolean;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsUUID()
  groupManagerId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GroupMemberDto)
  @IsOptional()
  groupMembers?: GroupMemberDto[];

  // Optional: Link to user account
  @TransformEmptyToUndefined()
  @IsUUID()
  @IsOptional()
  userId?: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Country is required' })
  @IsUUID()
  countryId: string;
}

