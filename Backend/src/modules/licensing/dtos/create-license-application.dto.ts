import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApplicationType } from '../../../shared/enums';

export class AccreditationDetailsDto {
  @IsString()
  @IsOptional()
  accreditationBody?: string;

  @IsString()
  @IsOptional()
  accreditationNumber?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  accreditationDate?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  accreditationExpiry?: Date;

  @IsArray()
  @IsOptional()
  accreditationScopes?: string[];

  @IsString()
  @IsOptional()
  accreditationStatus?: string;
}

export class AppliedSchemeDto {
  @IsString()
  schemeCode: string;

  @IsString()
  @IsOptional()
  subjectArea?: string;

  @IsString()
  requestedScope: string;

  @IsArray()
  applicableStandards: string[];

  @IsString()
  @IsOptional()
  justification?: string;
}

export class CreateLicenseApplicationDto {
  @IsUUID()
  nsbId: string;

  @IsEnum(ApplicationType)
  @IsOptional()
  applicationType?: ApplicationType = ApplicationType.FULL;

  @ValidateNested()
  @Type(() => AccreditationDetailsDto)
  @IsOptional()
  accreditationDetails?: AccreditationDetailsDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AppliedSchemeDto)
  @IsOptional()
  appliedSchemes?: AppliedSchemeDto[];

  @IsObject()
  @IsOptional()
  organizationalDetails?: Record<string, any>;

  @IsObject()
  @IsOptional()
  financialDetails?: Record<string, any>;

  @IsObject()
  @IsOptional()
  technicalCompetenceDetails?: Record<string, any>;

  @IsObject()
  @IsOptional()
  qmsDetails?: Record<string, any>;

  @IsObject()
  @IsOptional()
  declarations?: Record<string, any>;

  @IsBoolean()
  @IsOptional()
  saveAsDraft?: boolean = true;
}

