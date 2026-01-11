import { IsArray, IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  @Length(2, 2)
  isoCode: string;

  @IsString()
  name: string;

  @IsUUID()
  regionId: string;

  @IsString()
  @IsOptional()
  continent?: string;

  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  recIds?: string[];
}


