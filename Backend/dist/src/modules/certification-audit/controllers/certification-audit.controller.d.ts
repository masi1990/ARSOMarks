import { SystemUser } from '../../system-user/system-user.entity';
import { CertificationAuditService } from '../services/certification-audit.service';
import { CreateCertificationAuditDto, UpdateCertificationAuditDto, CreateAuditFindingDto, CreateCorrectiveActionDto, CreateSamplingRecordDto, CreateLaboratoryDto, CreateTestResultDto, UpdateCorrectiveActionStatusDto } from '../dtos';
export declare class CertificationAuditController {
    private readonly auditService;
    constructor(auditService: CertificationAuditService);
    createAudit(dto: CreateCertificationAuditDto, user: SystemUser): Promise<import("../entities").CertificationAudit>;
    updateAudit(id: string, dto: UpdateCertificationAuditDto, user: SystemUser): Promise<import("../entities").CertificationAudit>;
    completeAudit(id: string, user: SystemUser): Promise<import("../entities").CertificationAudit>;
    listAudits(applicationId?: string): Promise<import("../entities").CertificationAudit[]>;
    getAudit(id: string): Promise<import("../entities").CertificationAudit>;
    addFinding(dto: CreateAuditFindingDto, user: SystemUser): Promise<import("../entities").CertificationAuditFinding>;
    closeFinding(id: string, user: SystemUser): Promise<import("../entities").CertificationAuditFinding>;
    addCorrectiveAction(dto: CreateCorrectiveActionDto, user: SystemUser): Promise<import("../entities").CorrectiveAction>;
    updateCorrectiveActionStatus(id: string, dto: UpdateCorrectiveActionStatusDto, user: SystemUser): Promise<import("../entities").CorrectiveAction>;
    addSampling(dto: CreateSamplingRecordDto, user: SystemUser): Promise<import("../entities").SamplingRecord>;
    addTestResult(dto: CreateTestResultDto): Promise<import("../entities").TestResult>;
    createLaboratory(dto: CreateLaboratoryDto): Promise<import("../entities").Laboratory>;
    listLaboratories(): Promise<import("../entities").Laboratory[]>;
}
