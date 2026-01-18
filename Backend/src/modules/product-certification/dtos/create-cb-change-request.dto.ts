import { IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateCbChangeRequestDto {
  @IsOptional()
  @IsUUID()
  currentCbId?: string;

  @IsOptional()
  @IsUUID()
  requestedCbId?: string;

  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  justification: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  penaltyPolicy?: string;
}
