import { ArrayNotEmpty, IsArray, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { UserRole } from '../../../shared/enums';
import { RoleRequestType } from '../types/role-request.type';

export class CreateRoleRequestDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(UserRole, { each: true })
  requestedRoles: UserRole[];

  @IsEnum(RoleRequestType)
  @IsOptional()
  requestType?: RoleRequestType;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  note?: string;
}

