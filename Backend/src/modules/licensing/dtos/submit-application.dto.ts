import { IsOptional, IsString } from 'class-validator';

export class SubmitApplicationDto {
  @IsString()
  @IsOptional()
  notes?: string;
}

