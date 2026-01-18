import { ConfigService } from '@nestjs/config';
export declare class ProductCertificationAgreementUploadService {
    private configService;
    private readonly uploadDir;
    constructor(configService: ConfigService);
    private ensureUploadDir;
    uploadFile(file: Express.Multer.File, applicationId: string, agreementType: string): Promise<{
        fileName: string;
        filePath: string;
        fileHash: string;
        fileSize: number;
        mimeType: string;
    }>;
}
