import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LicenseApplication } from './entities/license-application.entity';
import { ApplicationDocument } from './entities/application-document.entity';
import { WorkflowHistory } from './entities/workflow-history.entity';
import { License } from './entities/license.entity';
import { LicenseCompliance } from './entities/license-compliance.entity';
import { LicenseApplicationService } from './services/license-application.service';
import { WorkflowService } from './services/workflow.service';
import { LicenseApplicationController } from './controllers/license-application.controller';
import { LicensingLookupController } from './controllers/licensing-lookup.controller';
import { AcapScheme } from '../reference-data/entities/acap-scheme.entity';
import { AccreditationBody } from '../reference-data/entities/accreditation-body.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LicenseApplication,
      ApplicationDocument,
      WorkflowHistory,
      License,
      LicenseCompliance,
      AcapScheme,
      AccreditationBody,
    ]),
  ],
  controllers: [LicenseApplicationController, LicensingLookupController],
  providers: [LicenseApplicationService, WorkflowService],
  exports: [LicenseApplicationService, WorkflowService],
})
export class LicensingModule {}

