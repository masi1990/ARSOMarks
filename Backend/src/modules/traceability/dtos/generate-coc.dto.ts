import { IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator';

export class GenerateCocDto {
  @IsUUID()
  applicationId: string;

  @IsOptional()
  @IsUUID()
  productId?: string;

  @IsOptional()
  @IsUUID()
  originCountryId?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(1825)
  validityDays?: number;
}

