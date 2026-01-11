import { Nsb } from './nsb.entity';
import { NsbContactType } from '../../../shared/enums';
export declare class NsbContact {
    id: string;
    nsbId: string;
    nsb: Nsb;
    contactType: NsbContactType;
    name: string;
    designation?: string;
    email: string;
    phone?: string;
    mobile?: string;
    isActive: boolean;
    createdAt: Date;
}
