import { IsUUID } from 'class-validator';

export class SubmitOperatorRegistrationDto {
  @IsUUID()
  operatorId: string;
}

