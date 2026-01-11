import { ArrayNotEmpty, IsArray, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { UserRole } from '../../../shared/enums';

export class CreateRoleRequestDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(UserRole, { each: true })
  roles: UserRole[];

  @IsString()
  @IsOptional()
  @MaxLength(500)
  note?: string;
}

