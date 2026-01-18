import { IsBoolean, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateLaboratoryDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsUUID()
  countryId?: string;

  @IsOptional()
  @IsUUID()
  accreditationBodyId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  accreditationNumber?: string;

  @IsOptional()
  @IsBoolean()
  isAccredited?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  scope?: string;
}
