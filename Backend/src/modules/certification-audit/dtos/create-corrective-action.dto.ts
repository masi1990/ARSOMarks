import { IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateCorrectiveActionDto {
  @IsUUID()
  findingId: string;

  @IsString()
  @MinLength(10)
  @MaxLength(4000)
  actionPlan: string;

  @IsOptional()
  @IsString()
  @MaxLength(4000)
  evidenceNotes?: string;
}
