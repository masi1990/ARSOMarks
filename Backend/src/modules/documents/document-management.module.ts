import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { ApplicationDocument } from '../licensing/entities/application-document.entity';
import { LicenseApplication } from '../licensing/entities/license-application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationDocument, LicenseApplication])],
  controllers: [DocumentController],
  providers: [DocumentService],
  exports: [DocumentService],
})
export class DocumentManagementModule {}

