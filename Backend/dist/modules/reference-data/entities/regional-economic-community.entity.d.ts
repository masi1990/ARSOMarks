import { Country } from './country.entity';
import { CountryRecMembership } from './country-rec-membership.entity';
export declare class RegionalEconomicCommunity {
    id: string;
    code: string;
    name: string;
    description?: string;
    headquartersCountryId?: string;
    headquartersCountry?: Country;
    establishedDate?: string;
    createdAt: Date;
    memberships?: CountryRecMembership[];
}
