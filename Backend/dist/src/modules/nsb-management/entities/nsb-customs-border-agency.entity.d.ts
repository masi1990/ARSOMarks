import { Nsb } from './nsb.entity';
export declare class NsbCustomsBorderAgency {
    id: string;
    nsbId: string;
    nsb: Nsb;
    agencyName: string;
    parentMinistry?: string;
    acapVerificationContactName?: string;
    acapVerificationContactEmail?: string;
    acapVerificationContactPhone?: string;
    integrationStatus?: string;
    integrationDetails?: string;
    apiAvailable?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
