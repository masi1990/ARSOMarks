import { IsArray, IsBoolean, IsEmail, IsEnum, IsOptional, IsString, IsUUID, MaxLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CbAccreditationStandard } from '../../../shared/enums';

export class CbDeclarationDto {
  @IsOptional()
  @IsBoolean()
  acceptTerms?: boolean;

  @IsOptional()
  @IsBoolean()
  dataSharingConsent?: boolean;
}

export class CreateCbApplicationDto {
  @IsString()
  @MaxLength(255)
  legalName: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  shortName?: string;

  @IsString()
  @MaxLength(150)
  contactPersonName: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  contactPersonTitle?: string;

  @IsEmail()
  @MaxLength(150)
  contactEmail: string;

  @IsString()
  @MaxLength(50)
  contactPhone: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  website?: string;

  @IsString()
  physicalAddress: string;

  @IsOptional()
  @IsString()
  postalAddress?: string;

  @IsOptional()
  @IsUUID()
  countryId?: string;

  @IsArray()
  regionsOfOperation: string[];

  @IsOptional()
  @IsString()
  regionsOther?: string;

  @IsBoolean()
  isAccredited: boolean;

  @IsOptional()
  @IsEnum(CbAccreditationStandard)
  accreditationStandard?: CbAccreditationStandard;

  @IsOptional()
  @IsUUID()
  accreditationBodyId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  accreditationBodyName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  accreditationCertificateNumber?: string;

  @IsOptional()
  @IsString()
  accreditationScope?: string;

  @IsOptional()
  @IsString()
  accreditationValidUntil?: string;

  @IsOptional()
  @IsString()
  accreditationApplicationDate?: string;

  @IsOptional()
  @IsString()
  accreditationProgressNotes?: string;

  @IsOptional()
  @IsBoolean()
  previousLicenseHeld?: boolean;

  @IsOptional()
  @IsString()
  previousLicenseGrantedAt?: string;

  @IsOptional()
  @IsString()
  previousLicenseTerminatedAt?: string;

  @IsOptional()
  @IsString()
  previousLicenseTerminationReason?: string;

  @IsOptional()
  appliedSchemes?: Record<string, any>;

  @IsOptional()
  @ValidateNested()
  @Type(() => CbDeclarationDto)
  declarations?: CbDeclarationDto;
}
