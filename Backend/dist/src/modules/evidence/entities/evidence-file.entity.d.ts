import { EvidenceParentType } from '../../../shared/enums';
export declare class EvidenceFile {
    id: string;
    parentType: EvidenceParentType;
    parentId: string;
    originalName: string;
    storedName: string;
    storedPath: string;
    mimeType: string;
    size: number;
    hash: string;
    uploadedBy?: string;
    description?: string;
    createdAt: Date;
}
