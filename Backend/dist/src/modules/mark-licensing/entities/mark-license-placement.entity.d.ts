import { MarkLicenseApplication } from './mark-license-application.entity';
import { SystemUser } from '../../system-user/system-user.entity';
export declare class MarkLicensePlacement {
    id: string;
    applicationId: string;
    application: MarkLicenseApplication;
    fileName: string;
    filePath: string;
    fileHash: string;
    fileSize: number;
    mimeType?: string;
    description: string;
    fileFormat?: string;
    uploadedAt: Date;
    uploadedBy?: string;
    uploadedByUser?: SystemUser;
}
