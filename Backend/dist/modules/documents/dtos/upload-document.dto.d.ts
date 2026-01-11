import { DocumentType } from '../../../shared/enums';
export declare class UploadDocumentDto {
    documentType: DocumentType;
    documentCategory?: string;
    fileName: string;
    filePath: string;
    fileHash: string;
    fileSize: number;
    mimeType?: string;
    uploadedBy: string;
}
