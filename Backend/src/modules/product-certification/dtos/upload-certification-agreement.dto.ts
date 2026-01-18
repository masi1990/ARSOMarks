import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UploadCertificationAgreementDto {
  @IsOptional()
  @IsString()
  @MaxLength(150)
  signedByName?: string;

  @IsOptional()
  @IsString()
  contractStart?: string;

  @IsOptional()
  @IsString()
  contractEnd?: string;
}
