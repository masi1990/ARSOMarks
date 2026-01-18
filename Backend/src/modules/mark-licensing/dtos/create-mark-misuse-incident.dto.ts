import { IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateMarkMisuseIncidentDto {
  @IsOptional()
  @IsUUID()
  licenseId?: string;

  @IsString()
  @MinLength(10)
  @MaxLength(4000)
  description: string;
}
