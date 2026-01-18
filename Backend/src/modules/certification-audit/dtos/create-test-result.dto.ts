import { IsEnum, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { TestResultStatus } from '../../../shared/enums';

export class CreateTestResultDto {
  @IsUUID()
  samplingId: string;

  @IsOptional()
  @IsUUID()
  laboratoryId?: string;

  @IsOptional()
  parameters?: Record<string, any>;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  reportFilePath?: string;

  @IsEnum(TestResultStatus)
  resultStatus: TestResultStatus;

  @IsOptional()
  @IsString()
  testedAt?: string;
}
