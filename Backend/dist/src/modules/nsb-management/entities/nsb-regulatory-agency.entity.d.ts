import { Nsb } from './nsb.entity';
import { RegulatoryAgencyType } from '../../../shared/enums';
export declare class NsbRegulatoryAgency {
    id: string;
    nsbId: string;
    nsb: Nsb;
    agencyName: string;
    agencyType: RegulatoryAgencyType;
    otherTypeDescription?: string;
    contactPersonName?: string;
    contactPersonEmail?: string;
    contactPersonPhone?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
