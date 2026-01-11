import { Repository } from 'typeorm';
import { NsbDocument } from '../entities/nsb-document.entity';
import { NsbProfileDocumentType } from '../../../shared/enums';
import { NsbDocumentUploadService } from './nsb-document-upload.service';
export declare class NsbDocumentService {
    private readonly documentRepo;
    private readonly uploadService;
    constructor(documentRepo: Repository<NsbDocument>, uploadService: NsbDocumentUploadService);
    uploadDocument(nsbId: string, file: Express.Multer.File, documentType: NsbProfileDocumentType, userId: string): Promise<NsbDocument>;
    deleteDocument(nsbId: string, documentId: string): Promise<void>;
    getDocument(nsbId: string, documentId: string): Promise<NsbDocument>;
    getDocumentsByNsb(nsbId: string): Promise<NsbDocument[]>;
    getFile(filePath: string): Promise<Buffer>;
}
