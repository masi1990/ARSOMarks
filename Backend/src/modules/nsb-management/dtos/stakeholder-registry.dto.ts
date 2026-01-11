import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  MsaJurisdiction,
  MouStatus,
  SystemAccessLevel,
  RegulatoryAgencyType,
  AccreditationStatus,
} from '../../../shared/enums';

// Market Surveillance Authority DTO
export class MarketSurveillanceAuthorityDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  agencyName: string;

  @IsEnum(MsaJurisdiction)
  jurisdiction: MsaJurisdiction;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  contactPersonName: string;

  @IsEmail()
  @IsOptional()
  contactPersonEmail?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  contactPersonPhone?: string;

  @IsString()
  @IsOptional()
  scopeOfAuthority?: string;

  @IsEnum(MouStatus)
  @IsOptional()
  mouStatus?: MouStatus;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  mouDocumentPath?: string;

  @IsString()
  @IsOptional()
  @MaxLength(64)
  mouDocumentHash?: string;

  @IsEnum(SystemAccessLevel)
  @IsOptional()
  systemAccessLevelRequested?: SystemAccessLevel;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}

// Customs/Border Agency DTO
export class CustomsBorderAgencyDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  agencyName: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  keyBorderPosts?: string[];

  @IsString()
  @IsOptional()
  @MaxLength(255)
  acapVerificationContactName?: string;

  @IsEmail()
  @IsOptional()
  acapVerificationContactEmail?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  acapVerificationContactPhone?: string;

  @IsBoolean()
  @IsOptional()
  integrationWithNationalSingleWindow?: boolean = false;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}

// Regulatory Agency DTO
export class RegulatoryAgencyDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  agencyName: string;

  @IsEnum(RegulatoryAgencyType)
  agencyType: RegulatoryAgencyType;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  otherTypeDescription?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  contactPersonName?: string;

  @IsEmail()
  @IsOptional()
  contactPersonEmail?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  contactPersonPhone?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}

// Industry Association DTO
export class IndustryAssociationDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  associationName: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  sectorIndustry?: string;

  @IsNumber()
  @IsOptional()
  numberOfMembers?: number;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  contactPersonName?: string;

  @IsEmail()
  @IsOptional()
  contactPersonEmail?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  contactPersonPhone?: string;

  @IsBoolean()
  @IsOptional()
  willingnessToPromoteAcap?: boolean = false;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}

// Testing Laboratory DTO
export class TestingLaboratoryDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @IsEnum(AccreditationStatus)
  @IsOptional()
  accreditationStatus?: AccreditationStatus;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  otherAccreditationDescription?: string;

  @IsString()
  @IsOptional()
  scopeOfAccreditation?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  contactForAcapReferralsName?: string;

  @IsEmail()
  @IsOptional()
  contactForAcapReferralsEmail?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  contactForAcapReferralsPhone?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}

// Main Stakeholder Registry DTO
export class StakeholderRegistryDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MarketSurveillanceAuthorityDto)
  @IsOptional()
  marketSurveillanceAuthorities?: MarketSurveillanceAuthorityDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomsBorderAgencyDto)
  @IsOptional()
  customsBorderAgencies?: CustomsBorderAgencyDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RegulatoryAgencyDto)
  @IsOptional()
  regulatoryAgencies?: RegulatoryAgencyDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IndustryAssociationDto)
  @IsOptional()
  industryAssociations?: IndustryAssociationDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestingLaboratoryDto)
  @IsOptional()
  testingLaboratories?: TestingLaboratoryDto[];
}

