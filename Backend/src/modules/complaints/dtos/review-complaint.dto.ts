import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { ComplaintStatus } from '../../../shared/enums';

export class ReviewComplaintDto {
  @IsEnum(ComplaintStatus)
  status: ComplaintStatus;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  decisionNotes?: string;
}
