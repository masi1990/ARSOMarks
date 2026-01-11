import { ConfigService } from '@nestjs/config';
import { NsbDocumentType } from '../../../shared/enums';
export declare class NsbDocumentUploadService {
    private configService;
    private readonly uploadDir;
    constructor(configService: ConfigService);
    private ensureUploadDir;
    uploadFile(file: Express.Multer.File, entityId: string, documentType: NsbDocumentType | string): Promise<{
        fileName: string;
        filePath: string;
        fileHash: string;
        fileSize: number;
        mimeType: string;
    }>;
    deleteFile(filePath: string): Promise<void>;
    getFile(filePath: string): Promise<Buffer>;
}
