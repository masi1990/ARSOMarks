import { IsEmail, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateComplaintDto {
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  complainantName: string;

  @IsEmail()
  complainantEmail: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  complainantPhone?: string;

  @IsString()
  @MinLength(5)
  @MaxLength(200)
  subject: string;

  @IsString()
  @MinLength(10)
  @MaxLength(4000)
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  referenceType?: string;

  @IsOptional()
  @IsUUID()
  referenceId?: string;
}
