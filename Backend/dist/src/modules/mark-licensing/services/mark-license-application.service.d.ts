import { DataSource, Repository } from 'typeorm';
import { MarkLicenseApplication } from '../entities/mark-license-application.entity';
import { MarkLicensePlacement } from '../entities/mark-license-placement.entity';
import { CreateMarkLicenseApplicationDto, UpdateMarkLicenseApplicationDto, SubmitMarkLicenseApplicationDto } from '../dtos';
import { Nsb } from '../../nsb-management/entities/nsb.entity';
export declare class MarkLicenseApplicationService {
    private readonly applicationRepository;
    private readonly placementRepository;
    private readonly nsbRepository;
    private readonly dataSource;
    constructor(applicationRepository: Repository<MarkLicenseApplication>, placementRepository: Repository<MarkLicensePlacement>, nsbRepository: Repository<Nsb>, dataSource: DataSource);
    createApplication(createDto: CreateMarkLicenseApplicationDto, userId: string): Promise<MarkLicenseApplication>;
    updateApplication(id: string, updateDto: UpdateMarkLicenseApplicationDto, userId: string): Promise<MarkLicenseApplication>;
    submitApplication(id: string, submitDto: SubmitMarkLicenseApplicationDto, userId: string): Promise<MarkLicenseApplication>;
    private validateApplication;
    findById(id: string): Promise<MarkLicenseApplication>;
    getApplicationsByNsb(nsbId: string, includeDrafts?: boolean): Promise<MarkLicenseApplication[]>;
    deleteDraft(id: string, userId: string): Promise<void>;
    private generateApplicationNumber;
}
