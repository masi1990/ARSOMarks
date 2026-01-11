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
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { NsbClassification, NsbContactType, NsbLocationType } from '../../../shared/enums';

export class NsbContactDto {
  @IsEnum(NsbContactType)
  contactType: NsbContactType;

  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @IsOptional()
  designation?: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  mobile?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}

export class NsbLocationDto {
  @IsEnum(NsbLocationType)
  locationType: NsbLocationType;

  @IsString()
  addressLine1: string;

  @IsString()
  @IsOptional()
  addressLine2?: string;

  @IsString()
  city: string;

  @IsString()
  @IsOptional()
  stateProvince?: string;

  @IsString()
  @IsOptional()
  postalCode?: string;

  @IsUUID()
  countryId: string;

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number;

  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean = false;
}

export class CreateNsbDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  shortName?: string;

  @IsUUID()
  countryId: string;

  @IsEnum(NsbClassification)
  classification: NsbClassification;

  @IsString()
  @IsOptional()
  registrationNumber?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NsbContactDto)
  contacts: NsbContactDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NsbLocationDto)
  @IsOptional()
  locations?: NsbLocationDto[];

  @IsObject()
  @IsOptional()
  additionalInfo?: Record<string, any>;
}

