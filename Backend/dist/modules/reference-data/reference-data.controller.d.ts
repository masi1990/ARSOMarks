import { ReferenceDataService } from './reference-data.service';
export declare class ReferenceDataController {
    private readonly service;
    constructor(service: ReferenceDataService);
    getCountries(): Promise<import("./entities/country.entity").Country[]>;
    getRegions(): Promise<import("./entities/region.entity").Region[]>;
    getRegionsByCountry(countryId: string): Promise<import("./entities/region.entity").Region[]>;
    getRecs(): Promise<import("./entities/regional-economic-community.entity").RegionalEconomicCommunity[]>;
    getRecMemberships(countryId: string): Promise<import("./entities/country-rec-membership.entity").CountryRecMembership[]>;
    getAcapSchemes(): Promise<import("./entities/acap-scheme.entity").AcapScheme[]>;
    getAccreditationBodies(): Promise<import("./entities/accreditation-body.entity").AccreditationBody[]>;
}
