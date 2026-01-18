import { ConfigService } from '@nestjs/config';
export declare class CbDocumentUploadService {
    private configService;
    private readonly uploadDir;
    constructor(configService: ConfigService);
    private ensureUploadDir;
    uploadFile(file: Express.Multer.File, applicationId: string, documentType: string): Promise<{
        fileName: string;
        filePath: string;
        fileHash: string;
        fileSize: number;
        mimeType: string;
    }>;
    getFile(filePath: string): Promise<Buffer>;
}
