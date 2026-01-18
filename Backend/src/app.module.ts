import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { NsbManagementModule } from './modules/nsb-management/nsb-management.module';
import { LicensingModule } from './modules/licensing/licensing.module';
import { ReferenceDataModule } from './modules/reference-data/reference-data.module';
import { DocumentManagementModule } from './modules/documents/document-management.module';
import { AuthModule } from './modules/auth/auth.module';
import { SystemUserModule } from './modules/system-user/system-user.module';
import { Region } from './modules/reference-data/entities/region.entity';
import { Country } from './modules/reference-data/entities/country.entity';
import { RegionalEconomicCommunity } from './modules/reference-data/entities/regional-economic-community.entity';
import { CountryRecMembership } from './modules/reference-data/entities/country-rec-membership.entity';
import { AcapScheme } from './modules/reference-data/entities/acap-scheme.entity';
import { AccreditationBody } from './modules/reference-data/entities/accreditation-body.entity';
import { Nsb } from './modules/nsb-management/entities/nsb.entity';
import { NsbContact } from './modules/nsb-management/entities/nsb-contact.entity';
import { NsbLocation } from './modules/nsb-management/entities/nsb-location.entity';
import { NsbRegistrationRequest } from './modules/nsb-management/entities/nsb-registration-request.entity';
import { NsbRegistrationRequestDocument } from './modules/nsb-management/entities/nsb-registration-request-document.entity';
import { NsbDocument } from './modules/nsb-management/entities/nsb-document.entity';
import { NsbMarketSurveillanceAuthority } from './modules/nsb-management/entities/nsb-market-surveillance-authority.entity';
import { NsbCustomsBorderAgency } from './modules/nsb-management/entities/nsb-customs-border-agency.entity';
import { NsbRegulatoryAgency } from './modules/nsb-management/entities/nsb-regulatory-agency.entity';
import { NsbIndustryAssociation } from './modules/nsb-management/entities/nsb-industry-association.entity';
import { NsbTestingLaboratory } from './modules/nsb-management/entities/nsb-testing-laboratory.entity';
import { LicenseApplication } from './modules/licensing/entities/license-application.entity';
import { ApplicationDocument } from './modules/licensing/entities/application-document.entity';
import { WorkflowHistory } from './modules/licensing/entities/workflow-history.entity';
import { License } from './modules/licensing/entities/license.entity';
import { LicenseCompliance } from './modules/licensing/entities/license-compliance.entity';
import { SystemUser } from './modules/system-user/system-user.entity';
import { RoleRequest } from './modules/auth/entities/role-request.entity';
import { MarkLicenseApplication } from './modules/mark-licensing/entities/mark-license-application.entity';
import { MarkLicensePlacement } from './modules/mark-licensing/entities/mark-license-placement.entity';
import { MarkLicenseAgreement } from './modules/mark-licensing/entities/mark-license-agreement.entity';
import { MarkLicenseAsset } from './modules/mark-licensing/entities/mark-license-asset.entity';
import { MarkLicenseAssetDownload } from './modules/mark-licensing/entities/mark-license-asset-download.entity';
import { MarkLicenseUsageReport } from './modules/mark-licensing/entities/mark-license-usage-report.entity';
import { MarkLicenseModification } from './modules/mark-licensing/entities/mark-license-modification.entity';
import { MarkLicenseCompliance } from './modules/mark-licensing/entities/mark-license-compliance.entity';
import { MarkMisuseIncident } from './modules/mark-licensing/entities/mark-misuse-incident.entity';
import { MarkSanction } from './modules/mark-licensing/entities/mark-sanction.entity';
import { MarkLicensingModule } from './modules/mark-licensing/mark-licensing.module';
import { ComplaintsModule } from './modules/complaints/complaints.module';
import { OperatorModule } from './modules/operator/operator.module';
import { ProductCertificationModule } from './modules/product-certification/product-certification.module';
import { ApplicationRegistrationModule } from './modules/application-registration/application-registration.module';
import { Operator } from './modules/operator/entities/operator.entity';
import { OperatorContact } from './modules/operator/entities/operator-contact.entity';
import { OperatorLocation } from './modules/operator/entities/operator-location.entity';
import { OperatorBusinessSector } from './modules/operator/entities/operator-business-sector.entity';
import { OperatorMarket } from './modules/operator/entities/operator-market.entity';
import { OperatorProductionCapacity } from './modules/operator/entities/operator-production-capacity.entity';
import { OperatorPreference } from './modules/operator/entities/operator-preference.entity';
import { OperatorAccessibility } from './modules/operator/entities/operator-accessibility.entity';
import { OperatorConsent } from './modules/operator/entities/operator-consent.entity';
import { ProductCertificationApplication } from './modules/product-certification/entities/product-certification-application.entity';
import { Product } from './modules/product-certification/entities/product.entity';
import { ProductTechnicalSpec } from './modules/product-certification/entities/product-technical-spec.entity';
import { ProductEnvironmentalClaim } from './modules/product-certification/entities/product-environmental-claim.entity';
import { ProductCertificationCbSelection } from './modules/product-certification/entities/product-certification-cb-selection.entity';
import { ProductCertificationDeclaration } from './modules/product-certification/entities/product-certification-declaration.entity';
import { ProductCertificationAgreement } from './modules/product-certification/entities/product-certification-agreement.entity';
import { ProductCertificationCbChangeRequest } from './modules/product-certification/entities/product-certification-cb-change-request.entity';
import { CertificationAuditModule } from './modules/certification-audit/certification-audit.module';
import { CertificationAudit } from './modules/certification-audit/entities/certification-audit.entity';
import { CertificationAuditFinding } from './modules/certification-audit/entities/certification-audit-finding.entity';
import { CorrectiveAction } from './modules/certification-audit/entities/corrective-action.entity';
import { SamplingRecord } from './modules/certification-audit/entities/sampling-record.entity';
import { Laboratory } from './modules/certification-audit/entities/laboratory.entity';
import { TestResult } from './modules/certification-audit/entities/test-result.entity';
import { ApplicationRegistration } from './modules/application-registration/entities/application-registration.entity';
import { CbApprovalModule } from './modules/cb-approval/cb-approval.module';
import { CbApplication } from './modules/cb-approval/entities/cb-application.entity';
import { CbApplicationDocument } from './modules/cb-approval/entities/cb-application-document.entity';
import { Complaint } from './modules/complaints/entities/complaint.entity';
import { Appeal } from './modules/complaints/entities/appeal.entity';
import { CbComplianceModule } from './modules/cb-compliance/cb-compliance.module';
import { CbComplianceProfile } from './modules/cb-compliance/entities/cb-compliance-profile.entity';
import { EvidenceModule } from './modules/evidence/evidence.module';
import { EvidenceFile } from './modules/evidence/entities/evidence-file.entity';
import { TraceabilityModule } from './modules/traceability/traceability.module';
import { Standard } from './modules/traceability/entities/standard.entity';
import { ProductStandard } from './modules/traceability/entities/product-standard.entity';
import { Coc } from './modules/traceability/entities/coc.entity';
import { QrToken } from './modules/traceability/entities/qr-token.entity';
import { CocStatusHistory } from './modules/traceability/entities/coc-status-history.entity';
import { ScanLog } from './modules/traceability/entities/scan-log.entity';
import { SearchLog } from './modules/traceability/entities/search-log.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const host = String(config.get<string>('DB_HOST') ?? 'localhost');
        const port = Number(config.get<string>('DB_PORT') ?? 8079);
        const username = String(config.get<string>('DB_USER') ?? 'postgres');
        const dbPass = config.get<string>('DB_PASS');
        const password = typeof dbPass === 'string' ? dbPass : (dbPass != null ? String(dbPass) : '');
        const database = String(config.get<string>('DB_NAME') ?? 'ARSOMarks');

        // Debug log (remove after fixing)
        console.log('DB Config:', { host, port, username, password: password ? '***' : '(empty)', database, passwordType: typeof password });

        return {
          type: 'postgres',
          host,
          port,
          username,
          password: password || '',
          database,
          entities: [
            Region,
            Country,
            RegionalEconomicCommunity,
            CountryRecMembership,
            AcapScheme,
            AccreditationBody,
            Nsb,
            NsbContact,
            NsbLocation,
            NsbRegistrationRequest,
            NsbRegistrationRequestDocument,
            NsbDocument,
            NsbMarketSurveillanceAuthority,
            NsbCustomsBorderAgency,
            NsbRegulatoryAgency,
            NsbIndustryAssociation,
            NsbTestingLaboratory,
            LicenseApplication,
            ApplicationDocument,
            WorkflowHistory,
            License,
            LicenseCompliance,
            SystemUser,
            RoleRequest,
            MarkLicenseApplication,
            MarkLicensePlacement,
            MarkLicenseAgreement,
            MarkLicenseAsset,
            MarkLicenseAssetDownload,
            MarkLicenseUsageReport,
            MarkLicenseModification,
            MarkLicenseCompliance,
            MarkMisuseIncident,
            MarkSanction,
            Operator,
            OperatorContact,
            OperatorLocation,
            OperatorBusinessSector,
            OperatorMarket,
            OperatorProductionCapacity,
            OperatorPreference,
            OperatorAccessibility,
            OperatorConsent,
            ProductCertificationApplication,
            Product,
            ProductTechnicalSpec,
            ProductEnvironmentalClaim,
            ProductCertificationCbSelection,
            ProductCertificationDeclaration,
            ProductCertificationAgreement,
            ProductCertificationCbChangeRequest,
            CertificationAudit,
            CertificationAuditFinding,
            CorrectiveAction,
            SamplingRecord,
            Laboratory,
            TestResult,
            ApplicationRegistration,
            CbApplication,
            CbApplicationDocument,
            Complaint,
            Appeal,
            CbComplianceProfile,
            EvidenceFile,
            Standard,
            ProductStandard,
            Coc,
            QrToken,
            CocStatusHistory,
            ScanLog,
            SearchLog,
          ],
          synchronize: false,
          autoLoadEntities: false,
        };
      },
    }),
    AuthModule,
    SystemUserModule,
    NsbManagementModule,
    LicensingModule,
    MarkLicensingModule,
    ComplaintsModule,
    OperatorModule,
    ProductCertificationModule,
    CertificationAuditModule,
    ApplicationRegistrationModule,
    CbApprovalModule,
    CbComplianceModule,
    ReferenceDataModule,
    DocumentManagementModule,
    EvidenceModule,
    TraceabilityModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

