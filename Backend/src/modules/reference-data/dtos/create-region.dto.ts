import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateRegionDto {
  @IsString()
  @MaxLength(10)
  code: string;

  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}


