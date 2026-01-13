import { MarkLicenseModificationService } from '../services/mark-license-modification.service';
import { CreateLicenseModificationDto, ApproveModificationDto, RejectModificationDto } from '../dtos';
import { SystemUser } from '../../system-user/system-user.entity';
export declare class MarkLicenseModificationController {
    private readonly modificationService;
    constructor(modificationService: MarkLicenseModificationService);
    requestModification(dto: CreateLicenseModificationDto, user: SystemUser): Promise<import("../entities").MarkLicenseModification>;
    getById(id: string): Promise<import("../entities").MarkLicenseModification>;
    approve(id: string, dto: ApproveModificationDto, user: SystemUser): Promise<import("../entities").MarkLicenseModification>;
    reject(id: string, dto: RejectModificationDto, user: SystemUser): Promise<import("../entities").MarkLicenseModification>;
    getModificationHistory(licenseId: string): Promise<import("../entities").MarkLicenseModification[]>;
}
