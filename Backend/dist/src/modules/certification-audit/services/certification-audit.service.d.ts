import { Repository } from 'typeorm';
import { CertificationAudit, CertificationAuditFinding, CorrectiveAction, SamplingRecord, Laboratory, TestResult } from '../entities';
import { CreateCertificationAuditDto, UpdateCertificationAuditDto, CreateAuditFindingDto, CreateCorrectiveActionDto, CreateSamplingRecordDto, CreateLaboratoryDto, CreateTestResultDto, UpdateCorrectiveActionStatusDto } from '../dtos';
export declare class CertificationAuditService {
    private readonly auditRepository;
    private readonly findingRepository;
    private readonly correctiveActionRepository;
    private readonly samplingRepository;
    private readonly labRepository;
    private readonly testResultRepository;
    constructor(auditRepository: Repository<CertificationAudit>, findingRepository: Repository<CertificationAuditFinding>, correctiveActionRepository: Repository<CorrectiveAction>, samplingRepository: Repository<SamplingRecord>, labRepository: Repository<Laboratory>, testResultRepository: Repository<TestResult>);
    createAudit(dto: CreateCertificationAuditDto, userId: string): Promise<CertificationAudit>;
    updateAudit(id: string, dto: UpdateCertificationAuditDto, userId: string): Promise<CertificationAudit>;
    markAuditComplete(id: string, userId: string): Promise<CertificationAudit>;
    listAudits(filters?: {
        applicationId?: string;
    }): Promise<CertificationAudit[]>;
    getAudit(id: string): Promise<CertificationAudit>;
    addFinding(dto: CreateAuditFindingDto, userId: string): Promise<CertificationAuditFinding>;
    addCorrectiveAction(dto: CreateCorrectiveActionDto, userId: string): Promise<CorrectiveAction>;
    addSamplingRecord(dto: CreateSamplingRecordDto, userId: string): Promise<SamplingRecord>;
    addTestResult(dto: CreateTestResultDto): Promise<TestResult>;
    createLaboratory(dto: CreateLaboratoryDto): Promise<Laboratory>;
    listLaboratories(): Promise<Laboratory[]>;
    closeFinding(findingId: string, userId: string): Promise<CertificationAuditFinding>;
    updateCorrectiveActionStatus(id: string, dto: UpdateCorrectiveActionStatusDto, userId: string): Promise<CorrectiveAction>;
    private validateAuditDates;
}
