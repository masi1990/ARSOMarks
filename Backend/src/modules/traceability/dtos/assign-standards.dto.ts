import { ArrayNotEmpty, IsArray, IsOptional, IsUUID } from 'class-validator';

export class AssignStandardsDto {
  @IsUUID()
  productId: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  standardIds: string[];

  @IsOptional()
  @IsUUID()
  certificationApplicationId?: string;
}

