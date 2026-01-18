import { DataSource, Repository } from 'typeorm';
import { MarkLicenseApplication } from '../entities/mark-license-application.entity';
import { MarkLicensePlacement } from '../entities/mark-license-placement.entity';
import { CreateMarkLicenseApplicationDto, UpdateMarkLicenseApplicationDto, SubmitMarkLicenseApplicationDto } from '../dtos';
import { MarkMisuseStatus, MarkSanctionType } from '../../../shared/enums';
import { Nsb } from '../../nsb-management/entities/nsb.entity';
import { MarkMisuseIncident } from '../entities/mark-misuse-incident.entity';
import { MarkSanction } from '../entities/mark-sanction.entity';
import { MarkMisuseUploadService } from './mark-misuse-upload.service';
export declare class MarkLicenseApplicationService {
    private readonly applicationRepository;
    private readonly placementRepository;
    private readonly nsbRepository;
    private readonly misuseRepository;
    private readonly sanctionRepository;
    private readonly misuseUploadService;
    private readonly dataSource;
    constructor(applicationRepository: Repository<MarkLicenseApplication>, placementRepository: Repository<MarkLicensePlacement>, nsbRepository: Repository<Nsb>, misuseRepository: Repository<MarkMisuseIncident>, sanctionRepository: Repository<MarkSanction>, misuseUploadService: MarkMisuseUploadService, dataSource: DataSource);
    createApplication(createDto: CreateMarkLicenseApplicationDto, userId: string): Promise<MarkLicenseApplication>;
    updateApplication(id: string, updateDto: UpdateMarkLicenseApplicationDto, userId: string): Promise<MarkLicenseApplication>;
    submitApplication(id: string, submitDto: SubmitMarkLicenseApplicationDto, userId: string): Promise<MarkLicenseApplication>;
    private validateApplication;
    findById(id: string): Promise<MarkLicenseApplication>;
    getApplicationsByNsb(nsbId: string, includeDrafts?: boolean): Promise<MarkLicenseApplication[]>;
    getAllApplications(includeDrafts?: boolean): Promise<MarkLicenseApplication[]>;
    deleteDraft(id: string, userId: string): Promise<void>;
    addSupportingDocument(id: string, document: {
        documentType: string;
        fileName: string;
        filePath?: string;
        otherDocumentName?: string;
    }, userId: string): Promise<{
        id: string;
        documentType: string;
        fileName: string;
        filePath: string;
        otherDocumentName: string;
    }>;
    listSupportingDocuments(id: string): Promise<Record<string, any>[]>;
    removeSupportingDocument(id: string, documentId: string, userId: string): Promise<void>;
    approveApplication(id: string, userId: string): Promise<MarkLicenseApplication>;
    reportMisuse(payload: {
        licenseId?: string;
        description: string;
    }, userId: string): Promise<MarkMisuseIncident>;
    listMisuseIncidents(): Promise<MarkMisuseIncident[]>;
    reviewMisuseIncident(id: string, status: MarkMisuseStatus, decisionNotes: string | undefined, userId: string): Promise<MarkMisuseIncident>;
    addSanction(incidentId: string, payload: {
        sanctionType: MarkSanctionType;
        startDate?: string;
        endDate?: string;
        notes?: string;
    }, userId: string): Promise<MarkSanction>;
    addMisuseEvidence(incidentId: string, file: Express.Multer.File): Promise<{
        uploadedAt: string;
        fileName: string;
        filePath: string;
        fileHash: string;
        fileSize: number;
        mimeType: string;
        id: string;
    }>;
    rejectApplication(id: string, reason: string | undefined, userId: string): Promise<MarkLicenseApplication>;
    private generateApplicationNumber;
}
