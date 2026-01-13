import { IsUUID } from 'class-validator';

export class SubmitProductCertificationApplicationDto {
  @IsUUID()
  applicationId: string;
}

