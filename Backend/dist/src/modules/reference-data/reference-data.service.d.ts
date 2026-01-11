import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { Region } from './entities/region.entity';
import { RegionalEconomicCommunity } from './entities/regional-economic-community.entity';
import { CountryRecMembership } from './entities/country-rec-membership.entity';
import { AcapScheme } from './entities/acap-scheme.entity';
import { AccreditationBody } from './entities/accreditation-body.entity';
import { CreateCountryDto, CreateRecDto, CreateRegionDto, UpdateCountryDto, UpdateRecDto, UpdateRegionDto } from './dtos';
export declare class ReferenceDataService {
    private readonly countryRepo;
    private readonly regionRepo;
    private readonly recRepo;
    private readonly membershipRepo;
    private readonly acapRepo;
    private readonly accreditationRepo;
    constructor(countryRepo: Repository<Country>, regionRepo: Repository<Region>, recRepo: Repository<RegionalEconomicCommunity>, membershipRepo: Repository<CountryRecMembership>, acapRepo: Repository<AcapScheme>, accreditationRepo: Repository<AccreditationBody>);
    private mapCountryResponse;
    getCountries(): Promise<{
        recIds: string[];
        id: string;
        isoCode: string;
        name: string;
        continent?: string;
        regionId?: string;
        region?: Region;
        createdAt: Date;
        nsbs?: import("../nsb-management/entities/nsb.entity").Nsb[];
    }[]>;
    getCountry(id: string): Promise<{
        recIds: string[];
        id: string;
        isoCode: string;
        name: string;
        continent?: string;
        regionId?: string;
        region?: Region;
        createdAt: Date;
        nsbs?: import("../nsb-management/entities/nsb.entity").Nsb[];
    }>;
    createCountry(dto: CreateCountryDto): Promise<{
        recIds: string[];
        id: string;
        isoCode: string;
        name: string;
        continent?: string;
        regionId?: string;
        region?: Region;
        createdAt: Date;
        nsbs?: import("../nsb-management/entities/nsb.entity").Nsb[];
    }>;
    updateCountry(id: string, dto: UpdateCountryDto): Promise<{
        recIds: string[];
        id: string;
        isoCode: string;
        name: string;
        continent?: string;
        regionId?: string;
        region?: Region;
        createdAt: Date;
        nsbs?: import("../nsb-management/entities/nsb.entity").Nsb[];
    }>;
    deleteCountry(id: string): Promise<{
        success: boolean;
    }>;
    getRegions(): Promise<Region[]>;
    getRegion(id: string): Promise<Region>;
    createRegion(dto: CreateRegionDto): Promise<Region>;
    updateRegion(id: string, dto: UpdateRegionDto): Promise<Region>;
    deleteRegion(id: string): Promise<{
        success: boolean;
    }>;
    getRegionsByCountry(countryId: string): Promise<Region[]>;
    getRecs(): Promise<RegionalEconomicCommunity[]>;
    getRec(id: string): Promise<RegionalEconomicCommunity>;
    createRec(dto: CreateRecDto): Promise<RegionalEconomicCommunity>;
    updateRec(id: string, dto: UpdateRecDto): Promise<RegionalEconomicCommunity>;
    deleteRec(id: string): Promise<{
        success: boolean;
    }>;
    getCountryRecMemberships(countryId: string): Promise<CountryRecMembership[]>;
    getAcapSchemes(): Promise<AcapScheme[]>;
    getAccreditationBodies(): Promise<AccreditationBody[]>;
}
