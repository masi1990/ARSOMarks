import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { RoleRequestStatus } from '../../../shared/enums';

export class DecideRoleRequestDto {
  @IsEnum(RoleRequestStatus)
  status: RoleRequestStatus.APPROVED | RoleRequestStatus.REJECTED;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  note?: string;
}

