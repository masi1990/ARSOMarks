import { IsEnum, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { AuditFindingType } from '../../../shared/enums';

export class CreateAuditFindingDto {
  @IsUUID()
  auditId: string;

  @IsEnum(AuditFindingType)
  findingType: AuditFindingType;

  @IsString()
  @MinLength(10)
  @MaxLength(4000)
  description: string;

  @IsOptional()
  @IsString()
  deadlineDate?: string;
}
