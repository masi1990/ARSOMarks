import { IsBoolean, IsEnum, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { CertificationAuditType } from '../../../shared/enums';

export class CreateCertificationAuditDto {
  @IsUUID()
  applicationId: string;

  @IsEnum(CertificationAuditType)
  auditType: CertificationAuditType;

  @IsOptional()
  @IsString()
  plannedDate?: string;

  @IsOptional()
  @IsString()
  actualDate?: string;

  @IsOptional()
  @IsString()
  windowStart?: string;

  @IsOptional()
  @IsString()
  windowEnd?: string;

  @IsOptional()
  @IsBoolean()
  isUnannounced?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  notes?: string;
}
