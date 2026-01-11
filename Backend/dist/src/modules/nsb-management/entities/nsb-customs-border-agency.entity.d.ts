import { Nsb } from './nsb.entity';
export declare class NsbCustomsBorderAgency {
    id: string;
    nsbId: string;
    nsb: Nsb;
    agencyName: string;
    keyBorderPosts: string[];
    acapVerificationContactName?: string;
    acapVerificationContactEmail?: string;
    acapVerificationContactPhone?: string;
    integrationWithNationalSingleWindow: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
