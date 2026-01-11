import { Nsb } from './nsb.entity';
import { NsbProfileDocumentType } from '../../../shared/enums';
import { SystemUser } from '../../system-user/system-user.entity';
export declare class NsbDocument {
    id: string;
    nsbId: string;
    nsb?: Nsb;
    documentType: NsbProfileDocumentType;
    fileName: string;
    filePath: string;
    fileHash: string;
    fileSize: number;
    mimeType?: string;
    uploadedBy?: string;
    uploadedByUser?: SystemUser;
    uploadedAt: Date;
}
