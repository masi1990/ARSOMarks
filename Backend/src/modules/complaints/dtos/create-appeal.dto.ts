import { IsEmail, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateAppealDto {
  @IsUUID()
  complaintId: string;

  @IsString()
  @MinLength(2)
  @MaxLength(200)
  appellantName: string;

  @IsEmail()
  appellantEmail: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  appellantPhone?: string;

  @IsString()
  @MinLength(10)
  @MaxLength(4000)
  reason: string;
}
