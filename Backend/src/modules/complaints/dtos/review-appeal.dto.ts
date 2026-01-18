import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { AppealStatus } from '../../../shared/enums';

export class ReviewAppealDto {
  @IsEnum(AppealStatus)
  status: AppealStatus;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  decisionNotes?: string;
}
