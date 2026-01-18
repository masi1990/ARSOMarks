import { IsOptional, IsString, IsUUID } from 'class-validator';
import { CocStatus } from '../entities/coc.entity';

export class UpdateCocStatusDto {
  @IsUUID()
  cocId: string;

  @IsString()
  status: CocStatus;

  @IsOptional()
  @IsString()
  reason?: string;
}

