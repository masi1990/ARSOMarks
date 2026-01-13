import { DataSource, Repository } from 'typeorm';
import { MarkLicenseModification } from '../entities/mark-license-modification.entity';
import { MarkLicenseAgreement } from '../entities/mark-license-agreement.entity';
import { CreateLicenseModificationDto, ApproveModificationDto, RejectModificationDto } from '../dtos';
export declare class MarkLicenseModificationService {
    private readonly modificationRepository;
    private readonly agreementRepository;
    private readonly dataSource;
    constructor(modificationRepository: Repository<MarkLicenseModification>, agreementRepository: Repository<MarkLicenseAgreement>, dataSource: DataSource);
    requestModification(createDto: CreateLicenseModificationDto, userId: string): Promise<MarkLicenseModification>;
    approveModification(modificationId: string, approveDto: ApproveModificationDto, userId: string): Promise<MarkLicenseModification>;
    rejectModification(modificationId: string, rejectDto: RejectModificationDto, userId: string): Promise<MarkLicenseModification>;
    findById(id: string): Promise<MarkLicenseModification>;
    getModificationHistory(licenseId: string): Promise<MarkLicenseModification[]>;
}
