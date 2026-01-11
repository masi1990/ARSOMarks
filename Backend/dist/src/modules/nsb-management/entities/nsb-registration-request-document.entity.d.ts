import { NsbRegistrationRequest } from './nsb-registration-request.entity';
import { NsbDocumentType } from '../../../shared/enums';
import { SystemUser } from '../../system-user/system-user.entity';
export declare class NsbRegistrationRequestDocument {
    id: string;
    registrationRequestId: string;
    registrationRequest?: NsbRegistrationRequest;
    documentType: NsbDocumentType;
    fileName: string;
    filePath: string;
    fileHash: string;
    fileSize: number;
    mimeType?: string;
    uploadedBy?: string;
    uploadedByUser?: SystemUser;
    uploadedAt: Date;
}
