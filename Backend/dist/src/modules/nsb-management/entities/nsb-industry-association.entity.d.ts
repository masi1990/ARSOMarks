import { Nsb } from './nsb.entity';
export declare class NsbIndustryAssociation {
    id: string;
    nsbId: string;
    nsb: Nsb;
    associationName: string;
    sectorIndustry?: string;
    numberOfMembers?: number;
    contactPersonName?: string;
    contactPersonEmail?: string;
    contactPersonPhone?: string;
    willingnessToPromoteAcap: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
