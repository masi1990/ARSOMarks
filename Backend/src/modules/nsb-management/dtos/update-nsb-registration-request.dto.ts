import { PartialType } from '@nestjs/mapped-types';
import { CreateNsbRegistrationRequestDto } from './create-nsb-registration-request.dto';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { NsbRegistrationRequestStatus } from '../../../shared/enums';

export class UpdateNsbRegistrationRequestDto extends PartialType(CreateNsbRegistrationRequestDto) {
  @IsEnum(NsbRegistrationRequestStatus)
  @IsOptional()
  status?: NsbRegistrationRequestStatus;

  @IsString()
  @IsOptional()
  remarks?: string;

  @IsUUID()
  @IsOptional()
  nsbId?: string; // Link to created NSB after approval
}

