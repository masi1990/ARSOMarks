import { ReferenceDataService } from './reference-data.service';
import { CreateCountryDto, CreateRecDto, CreateRegionDto, UpdateCountryDto, UpdateRecDto, UpdateRegionDto } from './dtos';
export declare class ReferenceDataController {
    private readonly service;
    constructor(service: ReferenceDataService);
    getCountries(): Promise<{
        recIds: string[];
        id: string;
        isoCode: string;
        name: string;
        continent?: string;
        regionId?: string;
        region?: import("./entities/region.entity").Region;
        createdAt: Date;
        nsbs?: import("../nsb-management/entities/nsb.entity").Nsb[];
    }[]>;
    getCountry(countryId: string): Promise<{
        recIds: string[];
        id: string;
        isoCode: string;
        name: string;
        continent?: string;
        regionId?: string;
        region?: import("./entities/region.entity").Region;
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
        region?: import("./entities/region.entity").Region;
        createdAt: Date;
        nsbs?: import("../nsb-management/entities/nsb.entity").Nsb[];
    }>;
    updateCountry(countryId: string, dto: UpdateCountryDto): Promise<{
        recIds: string[];
        id: string;
        isoCode: string;
        name: string;
        continent?: string;
        regionId?: string;
        region?: import("./entities/region.entity").Region;
        createdAt: Date;
        nsbs?: import("../nsb-management/entities/nsb.entity").Nsb[];
    }>;
    deleteCountry(countryId: string): Promise<{
        success: boolean;
    }>;
    getRegions(): Promise<import("./entities/region.entity").Region[]>;
    getRegion(regionId: string): Promise<import("./entities/region.entity").Region>;
    createRegion(dto: CreateRegionDto): Promise<import("./entities/region.entity").Region>;
    updateRegion(regionId: string, dto: UpdateRegionDto): Promise<import("./entities/region.entity").Region>;
    deleteRegion(regionId: string): Promise<{
        success: boolean;
    }>;
    getRegionsByCountry(countryId: string): Promise<import("./entities/region.entity").Region[]>;
    getRecs(): Promise<import("./entities/regional-economic-community.entity").RegionalEconomicCommunity[]>;
    getRec(recId: string): Promise<import("./entities/regional-economic-community.entity").RegionalEconomicCommunity>;
    createRec(dto: CreateRecDto): Promise<import("./entities/regional-economic-community.entity").RegionalEconomicCommunity>;
    updateRec(recId: string, dto: UpdateRecDto): Promise<import("./entities/regional-economic-community.entity").RegionalEconomicCommunity>;
    deleteRec(recId: string): Promise<{
        success: boolean;
    }>;
    getRecMemberships(countryId: string): Promise<import("./entities/country-rec-membership.entity").CountryRecMembership[]>;
    getAcapSchemes(): Promise<import("./entities/acap-scheme.entity").AcapScheme[]>;
    getAccreditationBodies(): Promise<import("./entities/accreditation-body.entity").AccreditationBody[]>;
}
