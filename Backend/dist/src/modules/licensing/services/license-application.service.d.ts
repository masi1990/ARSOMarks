import { DataSource, Repository } from 'typeorm';
import { LicenseApplication } from '../entities/license-application.entity';
import { ApplicationDocument } from '../entities/application-document.entity';
import { WorkflowHistory } from '../entities/workflow-history.entity';
import { CreateLicenseApplicationDto, SubmitApplicationDto } from '../dtos';
import { WorkflowService } from './workflow.service';
export declare class LicenseApplicationService {
    private readonly applicationRepository;
    private readonly documentRepository;
    private readonly workflowRepository;
    private readonly dataSource;
    private readonly workflowService;
    constructor(applicationRepository: Repository<LicenseApplication>, documentRepository: Repository<ApplicationDocument>, workflowRepository: Repository<WorkflowHistory>, dataSource: DataSource, workflowService: WorkflowService);
    createApplication(createDto: CreateLicenseApplicationDto, userId: string): Promise<LicenseApplication>;
    updateDraftApplication(id: string, updateDto: CreateLicenseApplicationDto, userId: string): Promise<LicenseApplication>;
    submitApplication(id: string, submitDto: SubmitApplicationDto, userId: string): Promise<LicenseApplication>;
    private validateForSubmission;
    findById(id: string): Promise<LicenseApplication>;
    getApplicationsByNsb(nsbId: string, includeDrafts?: boolean): Promise<LicenseApplication[]>;
}
