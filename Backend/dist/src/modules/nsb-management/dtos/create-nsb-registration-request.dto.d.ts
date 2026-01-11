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
    contactPersonName?: string;
    contactPersonTitle?: string;
    contactEmail?: string;
    contactPhone?: string;
    contactMobile?: string;
    additionalUserSlotsRequested?: number;
    requestedRoles?: string[];
    documents?: UploadDocumentDto[];
}
