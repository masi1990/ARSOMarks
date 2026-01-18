import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

class ResponsiblePersonDto {
  @IsString()
  @MaxLength(200)
  name: string;

  @IsString()
  @MaxLength(200)
  role: string;

  @IsOptional()
  @IsEmail()
  contactEmail?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  phone?: string;
}

class AuditorQualificationDto {
  @IsString()
  @MaxLength(200)
  auditorName: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  scheme?: string;

  @IsString()
  @MaxLength(200)
  qualification: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  expiryDate?: string;
}

class LocalOfficeDto {
  @IsString()
  @MaxLength(150)
  country: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  contactPerson?: string;

  @IsOptional()
  @IsBoolean()
  hasCertificationAuthority?: boolean;
}

export class UpsertCbComplianceProfileDto {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ResponsiblePersonDto)
  @ArrayNotEmpty()
  @ArrayMaxSize(50)
  responsiblePersons?: ResponsiblePersonDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AuditorQualificationDto)
  @ArrayNotEmpty()
  @ArrayMaxSize(100)
  auditorQualifications?: AuditorQualificationDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  countriesOfCertification?: string[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => LocalOfficeDto)
  @ArrayMaxSize(100)
  localOffices?: LocalOfficeDto[];
}
