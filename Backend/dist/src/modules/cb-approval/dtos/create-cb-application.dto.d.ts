import { CbAccreditationStandard } from '../../../shared/enums';
export declare class CbDeclarationDto {
    acceptTerms?: boolean;
    dataSharingConsent?: boolean;
}
export declare class CreateCbApplicationDto {
    legalName: string;
    shortName?: string;
    contactPersonName: string;
    contactPersonTitle?: string;
    contactEmail: string;
    contactPhone: string;
    website?: string;
    physicalAddress: string;
    postalAddress?: string;
    countryId?: string;
    regionsOfOperation: string[];
    regionsOther?: string;
    isAccredited: boolean;
    accreditationStandard?: CbAccreditationStandard;
    accreditationBodyId?: string;
    accreditationBodyName?: string;
    accreditationCertificateNumber?: string;
    accreditationScope?: string;
    accreditationValidUntil?: string;
    accreditationApplicationDate?: string;
    accreditationProgressNotes?: string;
    previousLicenseHeld?: boolean;
    previousLicenseGrantedAt?: string;
    previousLicenseTerminatedAt?: string;
    previousLicenseTerminationReason?: string;
    appliedSchemes?: Record<string, any>;
    declarations?: CbDeclarationDto;
}
