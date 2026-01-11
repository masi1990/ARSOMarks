import { Nsb } from './nsb.entity';
import { AccreditationStatus } from '../../../shared/enums';
export declare class NsbTestingLaboratory {
    id: string;
    nsbId: string;
    nsb: Nsb;
    name: string;
    accreditationStatus?: AccreditationStatus;
    otherAccreditationDescription?: string;
    scopeOfAccreditation?: string;
    contactForAcapReferralsName?: string;
    contactForAcapReferralsEmail?: string;
    contactForAcapReferralsPhone?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
