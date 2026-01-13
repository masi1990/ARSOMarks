import { PartialType } from '@nestjs/mapped-types';
import { CreateOperatorRegistrationDto } from './create-operator-registration.dto';

export class UpdateOperatorRegistrationDto extends PartialType(CreateOperatorRegistrationDto) {}

