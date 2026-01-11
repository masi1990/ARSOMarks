import {
  IsArray,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { NsbDocumentType } from '../../../shared/enums';

export class UploadDocumentDto {
  @IsEnum(NsbDocumentType)
  documentType: NsbDocumentType;

  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  filePath: string;

  @IsString()
  @IsNotEmpty()
  fileHash: string;

  @IsInt()
  @Min(0)
  fileSize: number;

  @IsString()
  @IsOptional()
  mimeType?: string;
}

export class CreateNsbRegistrationRequestDto {
  // Country Information
  @IsUUID()
  @IsOptional()
  countryId?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  countryName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  nsbOfficialName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  nsbAcronym?: string;

  @IsString()
  @IsOptional()
  @MaxLength(2)
  @MinLength(2)
  isoCode?: string;

  // Primary Contact Information
  @IsString()
  @IsOptional()
  @MaxLength(255)
  contactPersonName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  contactPersonTitle?: string;

  @IsEmail()
  @IsOptional()
  @MaxLength(255)
  contactEmail?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  contactPhone?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  contactMobile?: string;

  // Role Designation
  @IsInt()
  @Min(0)
  @IsOptional()
  additionalUserSlotsRequested?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  requestedRoles?: string[];

  // Documents (handled separately via file upload)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UploadDocumentDto)
  @IsOptional()
  documents?: UploadDocumentDto[];
}

