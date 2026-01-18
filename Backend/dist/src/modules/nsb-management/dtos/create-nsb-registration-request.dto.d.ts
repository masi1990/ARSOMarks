import { NsbDocumentType } from '../../../shared/enums';
export declare class UploadDocumentDto {
    documentType: NsbDocumentType;
    fileName: string;
    filePath: string;
    fileHash: string;
    fileSize: number;
    mimeType?: string;
}
export declare class CreateNsbRegistrationRequestDto {
    countryId?: string;
    countryName?: string;
    nsbOfficialName?: string;
    nsbAcronym?: string;
    isoCode?: string;
    legalStatus?: string;
    establishmentActName?: string;
    establishmentActNumber?: string;
    establishmentActDate?: string;
    registrationNumber?: string;
    registrationAuthority?: string;
    taxIdentificationNumber?: string;
    vatNumber?: string;
    yearEstablished?: number;
    website?: string;
    contactPersonName?: string;
    contactPersonTitle?: string;
    contactEmail?: string;
    contactPhone?: string;
    contactMobile?: string;
    directorGeneralName?: string;
    directorGeneralTitle?: string;
    directorGeneralEmail?: string;
    directorGeneralPhone?: string;
    boardChairName?: string;
    boardChairEmail?: string;
    boardChairPhone?: string;
    headquartersAddress?: Record<string, any>;
    postalAddress?: Record<string, any>;
    additionalAddresses?: Record<string, any>[];
    additionalContacts?: Record<string, any>[];
    keyOfficials?: Record<string, any>[];
    internationalMemberships?: Record<string, any>[];
    mandateAreas?: string[];
    additionalUserSlotsRequested?: number;
    requestedRoles?: string[];
    sectors?: string[];
    documents?: UploadDocumentDto[];
}
