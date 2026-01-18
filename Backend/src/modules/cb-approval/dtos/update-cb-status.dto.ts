import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { CbApplicationStatus } from '../../../shared/enums';

export class UpdateCbStatusDto {
  @IsEnum(CbApplicationStatus)
  status: CbApplicationStatus;

  @IsOptional()
  @IsDateString()
  provisionalEnd?: string;

  @IsOptional()
  @IsDateString()
  licenseStart?: string;

  @IsOptional()
  @IsDateString()
  licenseEnd?: string;

  @IsOptional()
  @IsDateString()
  renewalDue?: string;
}
