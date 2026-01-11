import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferenceDataController } from './reference-data.controller';
import { ReferenceDataService } from './reference-data.service';
import { Country } from './entities/country.entity';
import { Region } from './entities/region.entity';
import { RegionalEconomicCommunity } from './entities/regional-economic-community.entity';
import { CountryRecMembership } from './entities/country-rec-membership.entity';
import { AcapScheme } from './entities/acap-scheme.entity';
import { AccreditationBody } from './entities/accreditation-body.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Country,
      Region,
      RegionalEconomicCommunity,
      CountryRecMembership,
      AcapScheme,
      AccreditationBody,
    ]),
  ],
  controllers: [ReferenceDataController],
  providers: [ReferenceDataService],
  exports: [ReferenceDataService],
})
export class ReferenceDataModule {}

