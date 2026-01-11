import { Country } from './country.entity';
export declare class AccreditationBody {
    id: string;
    name: string;
    countryId?: string;
    country?: Country;
    isFracMraSignatory: boolean;
    mraScope?: Record<string, any>;
    contactDetails?: Record<string, any>;
    isActive: boolean;
    createdAt: Date;
}
