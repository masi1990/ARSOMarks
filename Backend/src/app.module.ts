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
import { LicenseApplication } from './modules/licensing/entities/license-application.entity';
import { ApplicationDocument } from './modules/licensing/entities/application-document.entity';
import { WorkflowHistory } from './modules/licensing/entities/workflow-history.entity';
import { License } from './modules/licensing/entities/license.entity';
import { LicenseCompliance } from './modules/licensing/entities/license-compliance.entity';
import { SystemUser } from './modules/system-user/system-user.entity';
import { RoleRequest } from './modules/auth/entities/role-request.entity';

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
            LicenseApplication,
            ApplicationDocument,
            WorkflowHistory,
            License,
            LicenseCompliance,
            SystemUser,
            RoleRequest,
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
    ReferenceDataModule,
    DocumentManagementModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

