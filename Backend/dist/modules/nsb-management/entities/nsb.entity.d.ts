import { Country } from '../../reference-data/entities/country.entity';
import { NsbContact } from './nsb-contact.entity';
import { NsbLocation } from './nsb-location.entity';
import { NsbClassification, NsbStatus } from '../../../shared/enums';
import { LicenseApplication } from '../../licensing/entities/license-application.entity';
import { License } from '../../licensing/entities/license.entity';
import { SystemUser } from '../../system-user/system-user.entity';
export declare class Nsb {
    id: string;
    name: string;
    shortName?: string;
    countryId: string;
    country: Country;
    classification: NsbClassification;
    registrationNumber?: string;
    description?: string;
    status: NsbStatus;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;
    createdByUser?: SystemUser;
    updatedBy?: string;
    updatedByUser?: SystemUser;
    contacts?: NsbContact[];
    locations?: NsbLocation[];
    licenseApplications?: LicenseApplication[];
    licenses?: License[];
}
