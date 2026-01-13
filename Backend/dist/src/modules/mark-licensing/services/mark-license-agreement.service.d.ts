import { DataSource, Repository } from 'typeorm';
import { MarkLicenseAgreement } from '../entities/mark-license-agreement.entity';
import { MarkLicenseApplication } from '../entities/mark-license-application.entity';
import { CreateMarkLicenseAgreementDto, SignAgreementDto } from '../dtos';
export declare class MarkLicenseAgreementService {
    private readonly agreementRepository;
    private readonly applicationRepository;
    private readonly dataSource;
    constructor(agreementRepository: Repository<MarkLicenseAgreement>, applicationRepository: Repository<MarkLicenseApplication>, dataSource: DataSource);
    generateAgreement(createDto: CreateMarkLicenseAgreementDto, userId: string): Promise<MarkLicenseAgreement>;
    signAgreement(signDto: SignAgreementDto, userId: string, ipAddress?: string): Promise<MarkLicenseAgreement>;
    arsoSignAgreement(agreementId: string, arsoSignerName: string, arsoSignerTitle: string, userId: string): Promise<MarkLicenseAgreement>;
    findById(id: string): Promise<MarkLicenseAgreement>;
    findByAgreementId(agreementId: string): Promise<MarkLicenseAgreement>;
    getActiveAgreementsByNsb(nsbId: string): Promise<MarkLicenseAgreement[]>;
    checkExpiringAgreements(daysBeforeExpiry?: number): Promise<MarkLicenseAgreement[]>;
    private generateAgreementId;
    private generateDefaultTerms;
    private getDefaultFeeStructure;
    private getDefaultPaymentSchedule;
    private getDefaultUsageRestrictions;
    private getDefaultTerminationClauses;
}
