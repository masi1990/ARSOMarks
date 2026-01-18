import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { EvidenceParentType } from '../../shared/enums';
import { UploadEvidenceDto } from './dtos/upload-evidence.dto';
import { EvidenceFile } from './entities/evidence-file.entity';
export declare class EvidenceService {
    private readonly evidenceRepo;
    private readonly configService;
    private readonly uploadDir;
    private readonly allowedMimeTypes;
    private readonly maxSizeBytes;
    constructor(evidenceRepo: Repository<EvidenceFile>, configService: ConfigService);
    upload(parentType: EvidenceParentType, parentId: string, files: Express.Multer.File[], userId: string | undefined, dto?: UploadEvidenceDto): Promise<EvidenceFile[]>;
    list(parentType: EvidenceParentType, parentId: string): Promise<EvidenceFile[]>;
    getFile(id: string): Promise<{
        record: EvidenceFile;
        stream: import("fs").ReadStream;
        absolutePath: string;
    }>;
    private ensureUploadDir;
    private validateFile;
    private persistFile;
}
