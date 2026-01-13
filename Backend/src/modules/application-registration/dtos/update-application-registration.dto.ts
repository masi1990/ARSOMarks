import { PartialType } from '@nestjs/mapped-types';
import { CreateApplicationRegistrationDraftDto } from './create-application-registration-draft.dto';

// Update DTO uses draft DTO as base - allows partial updates without validation
export class UpdateApplicationRegistrationDto extends PartialType(CreateApplicationRegistrationDraftDto) {}

