import { EvidenceParentType } from '../../shared/enums';
import { UploadEvidenceDto } from './dtos/upload-evidence.dto';
import { EvidenceService } from './evidence.service';
export declare class EvidenceController {
    private readonly evidenceService;
    constructor(evidenceService: EvidenceService);
    uploadEvidence(parentType: EvidenceParentType, parentId: string, files: Express.Multer.File[], dto: UploadEvidenceDto, req: any): Promise<import("./entities/evidence-file.entity").EvidenceFile[]>;
    listEvidence(parentType: EvidenceParentType, parentId: string): Promise<import("./entities/evidence-file.entity").EvidenceFile[]>;
    downloadEvidence(id: string, res: any): Promise<void>;
}
