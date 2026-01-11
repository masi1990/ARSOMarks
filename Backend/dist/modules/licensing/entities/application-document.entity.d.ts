import { LicenseApplication } from './license-application.entity';
import { DocumentType, DocumentVerificationStatus } from '../../../shared/enums';
import { SystemUser } from '../../system-user/system-user.entity';
export declare class ApplicationDocument {
    id: string;
    applicationId: string;
    application: LicenseApplication;
    documentType: DocumentType;
    documentCategory?: string;
    fileName: string;
    filePath: string;
    fileHash: string;
    fileSize: number;
    mimeType?: string;
    version: number;
    isCurrent: boolean;
    verificationStatus: DocumentVerificationStatus;
    verifiedBy?: string;
    verifiedByUser?: SystemUser;
    verifiedAt?: Date;
    remarks?: string;
    uploadedAt: Date;
    uploadedBy: string;
    uploadedByUser?: SystemUser;
}
