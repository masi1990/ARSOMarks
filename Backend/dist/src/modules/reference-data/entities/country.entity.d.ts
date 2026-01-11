import { Region } from './region.entity';
import { CountryRecMembership } from './country-rec-membership.entity';
import { Nsb } from '../../nsb-management/entities/nsb.entity';
export declare class Country {
    id: string;
    isoCode: string;
    name: string;
    continent?: string;
    regionId?: string;
    region?: Region;
    createdAt: Date;
    recMemberships?: CountryRecMembership[];
    nsbs?: Nsb[];
}
