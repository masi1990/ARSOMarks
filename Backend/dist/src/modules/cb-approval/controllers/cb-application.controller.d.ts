import { CbApplicationService } from '../services/cb-application.service';
import { CreateCbApplicationDto, CreateCbApplicationDraftDto, UpdateCbApplicationDto, UploadCbApplicationDocumentDto, UpdateCbStatusDto } from '../dtos';
import { SystemUser } from '../../system-user/system-user.entity';
export declare class CbApplicationController {
    private readonly cbApplicationService;
    constructor(cbApplicationService: CbApplicationService);
    createDraft(dto: CreateCbApplicationDraftDto, user: SystemUser): Promise<import("../entities/cb-application.entity").CbApplication>;
    create(dto: CreateCbApplicationDto, user: SystemUser): Promise<import("../entities/cb-application.entity").CbApplication>;
    update(id: string, dto: UpdateCbApplicationDto, user: SystemUser): Promise<import("../entities/cb-application.entity").CbApplication>;
    submit(id: string, user: SystemUser): Promise<import("../entities/cb-application.entity").CbApplication>;
    approve(id: string, user: SystemUser): Promise<import("../entities/cb-application.entity").CbApplication>;
    reject(id: string, body: {
        reason?: string;
    }, user: SystemUser): Promise<import("../entities/cb-application.entity").CbApplication>;
    updateStatus(id: string, dto: UpdateCbStatusDto, user: SystemUser): Promise<import("../entities/cb-application.entity").CbApplication>;
    getMyApplications(user: SystemUser): Promise<import("../entities/cb-application.entity").CbApplication[]>;
    list(query: any): Promise<{
        data: import("../entities/cb-application.entity").CbApplication[];
        total: number;
    }>;
    getById(id: string): Promise<import("../entities/cb-application.entity").CbApplication>;
    uploadDocument(id: string, file: Express.Multer.File, body: UploadCbApplicationDocumentDto, user: SystemUser): Promise<import("../entities/cb-application-document.entity").CbApplicationDocument>;
    listDocuments(id: string): Promise<import("../entities/cb-application-document.entity").CbApplicationDocument[]>;
}
