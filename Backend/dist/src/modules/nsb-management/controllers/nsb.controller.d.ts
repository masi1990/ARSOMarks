import { Response } from 'express';
import { NsbService } from '../services/nsb.service';
import { NsbDocumentService } from '../services/nsb-document.service';
import { StakeholderRegistryService } from '../services/stakeholder-registry.service';
import { CreateNsbDto, UpdateNsbDto, StakeholderRegistryDto } from '../dtos';
import { SystemUser } from '../../system-user/system-user.entity';
export declare class NsbController {
    private readonly nsbService;
    private readonly documentService;
    private readonly stakeholderRegistryService;
    constructor(nsbService: NsbService, documentService: NsbDocumentService, stakeholderRegistryService: StakeholderRegistryService);
    create(dto: CreateNsbDto, user: SystemUser): Promise<import("../entities/nsb.entity").Nsb>;
    list(query: any, user: SystemUser): Promise<{
        data: import("../entities/nsb.entity").Nsb[];
        total: number;
    }>;
    getMyNsb(user: SystemUser): Promise<import("../entities/nsb.entity").Nsb>;
    getById(id: string, user: SystemUser): Promise<import("../entities/nsb.entity").Nsb>;
    update(id: string, dto: UpdateNsbDto, user: SystemUser): Promise<import("../entities/nsb.entity").Nsb>;
    uploadDocument(id: string, file: Express.Multer.File, body: {
        documentType: string;
    }, user: SystemUser): Promise<import("../entities/nsb-document.entity").NsbDocument>;
    getDocuments(id: string, user: SystemUser): Promise<import("../entities/nsb-document.entity").NsbDocument[]>;
    viewDocument(id: string, documentId: string, res: Response, user: SystemUser): Promise<void>;
    deleteDocument(id: string, documentId: string, user: SystemUser): Promise<{
        message: string;
    }>;
    getStakeholderRegistry(id: string, user: SystemUser): Promise<StakeholderRegistryDto>;
    updateStakeholderRegistry(id: string, dto: StakeholderRegistryDto, user: SystemUser): Promise<StakeholderRegistryDto>;
}
