import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nsb } from './entities/nsb.entity';
import { NsbContact } from './entities/nsb-contact.entity';
import { NsbLocation } from './entities/nsb-location.entity';
import { NsbDocument } from './entities/nsb-document.entity';
import { NsbRegistrationRequest } from './entities/nsb-registration-request.entity';
import { NsbRegistrationRequestDocument } from './entities/nsb-registration-request-document.entity';
import { NsbMarketSurveillanceAuthority } from './entities/nsb-market-surveillance-authority.entity';
import { NsbCustomsBorderAgency } from './entities/nsb-customs-border-agency.entity';
import { NsbRegulatoryAgency } from './entities/nsb-regulatory-agency.entity';
import { NsbIndustryAssociation } from './entities/nsb-industry-association.entity';
import { NsbTestingLaboratory } from './entities/nsb-testing-laboratory.entity';
import { Country } from '../reference-data/entities/country.entity';
import { SystemUser } from '../system-user/system-user.entity';
import { NsbService } from './services/nsb.service';
import { NsbRegistrationRequestService } from './services/nsb-registration-request.service';
import { NsbDocumentUploadService } from './services/nsb-document-upload.service';
import { NsbDocumentService } from './services/nsb-document.service';
import { StakeholderRegistryService } from './services/stakeholder-registry.service';
import { NsbController } from './controllers/nsb.controller';
import { NsbRegistrationRequestController } from './controllers/nsb-registration-request.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Nsb,
      NsbContact,
      NsbLocation,
      NsbDocument,
      NsbRegistrationRequest,
      NsbRegistrationRequestDocument,
      NsbMarketSurveillanceAuthority,
      NsbCustomsBorderAgency,
      NsbRegulatoryAgency,
      NsbIndustryAssociation,
      NsbTestingLaboratory,
      Country,
      SystemUser,
    ]),
    AuthModule,
  ],
  controllers: [NsbController, NsbRegistrationRequestController],
  providers: [NsbService, NsbRegistrationRequestService, NsbDocumentUploadService, NsbDocumentService, StakeholderRegistryService],
  exports: [NsbService, NsbRegistrationRequestService],
})
export class NsbManagementModule {}

