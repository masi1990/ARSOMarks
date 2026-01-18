import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { CorrectiveActionStatus } from '../../../shared/enums';

export class UpdateCorrectiveActionStatusDto {
  @IsEnum(CorrectiveActionStatus)
  status: CorrectiveActionStatus;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  decisionNotes?: string;
}
