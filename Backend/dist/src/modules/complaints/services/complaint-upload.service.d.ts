import { ConfigService } from '@nestjs/config';
export declare class ComplaintUploadService {
    private configService;
    private readonly uploadDir;
    constructor(configService: ConfigService);
    private ensureUploadDir;
    uploadFile(file: Express.Multer.File, complaintId: string): Promise<{
        fileName: string;
        filePath: string;
        fileHash: string;
        fileSize: number;
        mimeType: string;
    }>;
}
