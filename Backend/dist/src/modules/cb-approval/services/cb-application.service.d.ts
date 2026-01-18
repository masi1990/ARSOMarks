import { Repository } from 'typeorm';
import { CbApplication } from '../entities/cb-application.entity';
import { CreateCbApplicationDto, CreateCbApplicationDraftDto, UpdateCbApplicationDto, UpdateCbStatusDto } from '../dtos';
import { CbApplicationStatus, CbDocumentType } from '../../../shared/enums';
import { CbApplicationDocument } from '../entities/cb-application-document.entity';
import { CbDocumentUploadService } from './cb-document-upload.service';
import { AccreditationBody } from '../../reference-data/entities/accreditation-body.entity';
export declare class CbApplicationService {
    private readonly cbApplicationRepo;
    private readonly cbDocumentRepo;
    private readonly accreditationBodyRepo;
    private readonly uploadService;
    constructor(cbApplicationRepo: Repository<CbApplication>, cbDocumentRepo: Repository<CbApplicationDocument>, accreditationBodyRepo: Repository<AccreditationBody>, uploadService: CbDocumentUploadService);
    private removeUndefinedValues;
    createDraft(dto: CreateCbApplicationDraftDto, userId: string): Promise<CbApplication>;
    create(dto: CreateCbApplicationDto, userId: string): Promise<CbApplication>;
    updateDraft(id: string, dto: UpdateCbApplicationDto, userId: string): Promise<CbApplication>;
    submit(id: string, userId: string): Promise<CbApplication>;
    approve(id: string, userId: string): Promise<CbApplication>;
    reject(id: string, reason: string, userId: string): Promise<CbApplication>;
    list(filters?: {
        status?: CbApplicationStatus;
        search?: string;
        skip?: number;
        limit?: number;
    }): Promise<{
        data: CbApplication[];
        total: number;
    }>;
    findById(id: string): Promise<CbApplication>;
    findByUserId(userId: string): Promise<CbApplication[]>;
    uploadDocument(applicationId: string, file: Express.Multer.File, documentType: CbDocumentType, userId: string): Promise<CbApplicationDocument>;
    listDocuments(applicationId: string): Promise<CbApplicationDocument[]>;
    private generateApplicationNumber;
    updateLifecycle(id: string, dto: UpdateCbStatusDto, userId: string): Promise<CbApplication>;
    private ensureProvisionalWindow;
    private calculateProvisionalEnd;
}
