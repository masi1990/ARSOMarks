import { NsbClassification, NsbContactType, NsbLocationType } from '../../../shared/enums';
export declare class NsbContactDto {
    contactType: NsbContactType;
    name: string;
    designation?: string;
    email: string;
    phone?: string;
    mobile?: string;
    isActive?: boolean;
}
export declare class NsbLocationDto {
    locationType: NsbLocationType;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    stateProvince?: string;
    postalCode?: string;
    countryId: string;
    latitude?: number;
    longitude?: number;
    isPrimary?: boolean;
}
export declare class CreateNsbDto {
    name: string;
    shortName?: string;
    countryId: string;
    classification: NsbClassification;
    registrationNumber?: string;
    description?: string;
    contacts: NsbContactDto[];
    locations?: NsbLocationDto[];
    additionalInfo?: Record<string, any>;
}
