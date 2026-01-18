import { IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateSamplingRecordDto {
  @IsUUID()
  auditId: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(2000)
  samplingMethod?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(2000)
  samplingLocation?: string;

  @IsOptional()
  quantity?: number;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  quantityUnit?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  traceability?: string;

  @IsOptional()
  @IsString()
  sampledAt?: string;
}
