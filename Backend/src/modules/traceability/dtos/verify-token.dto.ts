import { IsNumber, IsOptional, IsString } from 'class-validator';

export class VerifyTokenDto {
  @IsString()
  token: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsNumber()
  lat?: number;

  @IsOptional()
  @IsNumber()
  lon?: number;
}

