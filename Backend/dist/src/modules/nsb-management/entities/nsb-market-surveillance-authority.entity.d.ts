import { Nsb } from './nsb.entity';
import { MsaJurisdiction, MouStatus, SystemAccessLevel } from '../../../shared/enums';
export declare class NsbMarketSurveillanceAuthority {
    id: string;
    nsbId: string;
    nsb: Nsb;
    agencyName: string;
    jurisdiction: MsaJurisdiction;
    contactPersonName: string;
    contactPersonEmail?: string;
    contactPersonPhone?: string;
    scopeOfAuthority?: string;
    mouStatus?: MouStatus;
    mouDocumentPath?: string;
    mouDocumentHash?: string;
    systemAccessLevelRequested?: SystemAccessLevel;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
