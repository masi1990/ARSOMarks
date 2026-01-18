import { MarkLicenseApplicationService } from '../services/mark-license-application.service';
import { CreateMarkLicenseApplicationDto, UpdateMarkLicenseApplicationDto, SubmitMarkLicenseApplicationDto, UploadMarkLicenseDocumentDto, CreateMarkMisuseIncidentDto } from '../dtos';
import { MarkMisuseStatus, MarkSanctionType } from '../../../shared/enums';
import { SystemUser } from '../../system-user/system-user.entity';
export declare class MarkLicenseApplicationController {
    private readonly applicationService;
    constructor(applicationService: MarkLicenseApplicationService);
    create(dto: CreateMarkLicenseApplicationDto, user: SystemUser): Promise<import("../entities").MarkLicenseApplication>;
    getById(id: string): Promise<import("../entities").MarkLicenseApplication>;
    update(id: string, dto: UpdateMarkLicenseApplicationDto, user: SystemUser): Promise<import("../entities").MarkLicenseApplication>;
    submit(id: string, dto: SubmitMarkLicenseApplicationDto, user: SystemUser): Promise<import("../entities").MarkLicenseApplication>;
    getApplications(nsbId: string, includeDrafts: string, user: SystemUser): Promise<import("../entities").MarkLicenseApplication[]>;
    delete(id: string, user: SystemUser): Promise<void>;
    approve(id: string, user: SystemUser): Promise<import("../entities").MarkLicenseApplication>;
    reject(id: string, body: {
        reason?: string;
    }, user: SystemUser): Promise<import("../entities").MarkLicenseApplication>;
    uploadDocument(id: string, dto: UploadMarkLicenseDocumentDto, user: SystemUser): Promise<{
        id: string;
        documentType: string;
        fileName: string;
        filePath: string;
        otherDocumentName: string;
    }>;
    listDocuments(id: string): Promise<Record<string, any>[]>;
    deleteDocument(id: string, documentId: string, user: SystemUser): Promise<void>;
    reportMisuse(dto: CreateMarkMisuseIncidentDto, user: SystemUser): Promise<import("../entities").MarkMisuseIncident>;
    listMisuse(): Promise<import("../entities").MarkMisuseIncident[]>;
    reviewMisuse(id: string, body: {
        status: MarkMisuseStatus;
        decisionNotes?: string;
    }, user: SystemUser): Promise<import("../entities").MarkMisuseIncident>;
    addSanction(id: string, body: {
        sanctionType: MarkSanctionType;
        startDate?: string;
        endDate?: string;
        notes?: string;
    }, user: SystemUser): Promise<import("../entities").MarkSanction>;
    uploadMisuseEvidence(id: string, file: Express.Multer.File): Promise<{
        uploadedAt: string;
        fileName: string;
        filePath: string;
        fileHash: string;
        fileSize: number;
        mimeType: string;
        id: string;
    }>;
}
