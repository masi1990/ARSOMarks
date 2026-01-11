import { Nsb } from './nsb.entity';
import { NsbLocationType } from '../../../shared/enums';
import { Country } from '../../reference-data/entities/country.entity';
export declare class NsbLocation {
    id: string;
    nsbId: string;
    nsb: Nsb;
    locationType: NsbLocationType;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    stateProvince?: string;
    postalCode?: string;
    countryId?: string;
    country?: Country;
    latitude?: number;
    longitude?: number;
    isPrimary: boolean;
    createdAt: Date;
}
