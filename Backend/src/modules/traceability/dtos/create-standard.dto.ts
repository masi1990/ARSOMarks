import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateStandardDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  code: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  version?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  issuingAuthority?: string;
}

