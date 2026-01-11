import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { Region } from './entities/region.entity';
import { RegionalEconomicCommunity } from './entities/regional-economic-community.entity';
import { CountryRecMembership } from './entities/country-rec-membership.entity';
import { AcapScheme } from './entities/acap-scheme.entity';
import { AccreditationBody } from './entities/accreditation-body.entity';
export declare class ReferenceDataService {
    private readonly countryRepo;
    private readonly regionRepo;
    private readonly recRepo;
    private readonly membershipRepo;
    private readonly acapRepo;
    private readonly accreditationRepo;
    constructor(countryRepo: Repository<Country>, regionRepo: Repository<Region>, recRepo: Repository<RegionalEconomicCommunity>, membershipRepo: Repository<CountryRecMembership>, acapRepo: Repository<AcapScheme>, accreditationRepo: Repository<AccreditationBody>);
    getCountries(): Promise<Country[]>;
    getRegions(): Promise<Region[]>;
    getRegionsByCountry(countryId: string): Promise<Region[]>;
    getRecs(): Promise<RegionalEconomicCommunity[]>;
    getCountryRecMemberships(countryId: string): Promise<CountryRecMembership[]>;
    getAcapSchemes(): Promise<AcapScheme[]>;
    getAccreditationBodies(): Promise<AccreditationBody[]>;
}
