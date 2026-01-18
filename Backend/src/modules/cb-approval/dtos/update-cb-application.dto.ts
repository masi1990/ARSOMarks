import { PartialType } from '@nestjs/mapped-types';
import { CreateCbApplicationDto } from './create-cb-application.dto';

export class UpdateCbApplicationDto extends PartialType(CreateCbApplicationDto) {}
