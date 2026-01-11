import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../../../shared/enums';

export class AssignRolesDto {
  @IsArray()
  @IsEnum(UserRole, { each: true })
  @IsNotEmpty()
  roles: UserRole[];

  @IsString()
  @IsOptional()
  note?: string;
}

