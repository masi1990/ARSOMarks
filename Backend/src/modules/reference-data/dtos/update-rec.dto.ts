import { PartialType } from '@nestjs/mapped-types';
import { CreateRecDto } from './create-rec.dto';

export class UpdateRecDto extends PartialType(CreateRecDto) {}


