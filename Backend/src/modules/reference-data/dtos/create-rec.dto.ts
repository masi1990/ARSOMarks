import { IsDateString, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateRecDto {
  @IsString()
  @MaxLength(10)
  code: string;

  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUUID()
  @IsOptional()
  headquartersCountryId?: string;

  @IsDateString()
  @IsOptional()
  establishedDate?: string;
}


