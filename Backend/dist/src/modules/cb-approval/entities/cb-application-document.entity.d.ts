import { CbDocumentType } from '../../../shared/enums';
import { SystemUser } from '../../system-user/system-user.entity';
import { CbApplication } from './cb-application.entity';
export declare class CbApplicationDocument {
    id: string;
    applicationId: string;
    application: CbApplication;
    documentType: CbDocumentType;
    fileName: string;
    filePath: string;
    fileHash: string;
    fileSize: number;
    mimeType?: string;
    uploadedBy?: string;
    uploadedByUser?: SystemUser;
    uploadedAt: Date;
}
