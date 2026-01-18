import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CbApplication } from './entities/cb-application.entity';
import { CbApplicationDocument } from './entities/cb-application-document.entity';
import { CbApplicationService } from './services/cb-application.service';
import { CbDocumentUploadService } from './services/cb-document-upload.service';
import { CbApplicationController } from './controllers/cb-application.controller';
import { AccreditationBody } from '../reference-data/entities/accreditation-body.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CbApplication, CbApplicationDocument, AccreditationBody])],
  controllers: [CbApplicationController],
  providers: [CbApplicationService, CbDocumentUploadService],
  exports: [CbApplicationService],
})
export class CbApprovalModule {}
