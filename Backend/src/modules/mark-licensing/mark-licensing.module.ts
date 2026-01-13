import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MarkLicenseApplication,
  MarkLicensePlacement,
  MarkLicenseAgreement,
  MarkLicenseAsset,
  MarkLicenseAssetDownload,
  MarkLicenseUsageReport,
  MarkLicenseModification,
  MarkLicenseCompliance,
} from './entities';
import {
  MarkLicenseApplicationService,
  MarkLicenseAgreementService,
  MarkUsageReportService,
  MarkLicenseModificationService,
  MarkAssetService,
} from './services';
import {
  MarkLicenseApplicationController,
  MarkLicenseAgreementController,
  MarkUsageReportController,
  MarkLicenseModificationController,
  MarkAssetController,
  MarkLicenseDashboardController,
} from './controllers';
import { Nsb } from '../nsb-management/entities/nsb.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MarkLicenseApplication,
      MarkLicensePlacement,
      MarkLicenseAgreement,
      MarkLicenseAsset,
      MarkLicenseAssetDownload,
      MarkLicenseUsageReport,
      MarkLicenseModification,
      MarkLicenseCompliance,
      Nsb,
    ]),
  ],
  controllers: [
    MarkLicenseApplicationController,
    MarkLicenseAgreementController,
    MarkUsageReportController,
    MarkLicenseModificationController,
    MarkAssetController,
    MarkLicenseDashboardController,
  ],
  providers: [
    MarkLicenseApplicationService,
    MarkLicenseAgreementService,
    MarkUsageReportService,
    MarkLicenseModificationService,
    MarkAssetService,
  ],
  exports: [
    MarkLicenseApplicationService,
    MarkLicenseAgreementService,
    MarkUsageReportService,
    MarkLicenseModificationService,
    MarkAssetService,
  ],
})
export class MarkLicensingModule {}

