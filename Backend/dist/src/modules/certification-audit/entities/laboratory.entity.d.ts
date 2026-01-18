import { AccreditationBody } from '../../reference-data/entities/accreditation-body.entity';
import { Country } from '../../reference-data/entities/country.entity';
export declare class Laboratory {
    id: string;
    name: string;
    countryId?: string;
    country?: Country;
    accreditationBodyId?: string;
    accreditationBody?: AccreditationBody;
    accreditationNumber?: string;
    isAccredited: boolean;
    scope?: string;
    createdAt: Date;
    updatedAt: Date;
}
