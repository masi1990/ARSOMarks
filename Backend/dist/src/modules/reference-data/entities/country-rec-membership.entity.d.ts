import { Country } from './country.entity';
import { RegionalEconomicCommunity } from './regional-economic-community.entity';
import { MembershipStatus } from '../../../shared/enums';
export declare class CountryRecMembership {
    id: string;
    countryId: string;
    recId: string;
    membershipStatus: MembershipStatus;
    joinedDate?: string;
    createdAt: Date;
    country: Country;
    rec: RegionalEconomicCommunity;
}
