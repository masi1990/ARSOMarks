import { IsOptional, IsString, MaxLength } from 'class-validator';

export class ReviewCbChangeRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  decisionReason?: string;
}
