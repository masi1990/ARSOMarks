import { MarkLicenseAgreementService } from '../services/mark-license-agreement.service';
import { CreateMarkLicenseAgreementDto, SignAgreementDto } from '../dtos';
import { SystemUser } from '../../system-user/system-user.entity';
import { Request } from 'express';
export declare class MarkLicenseAgreementController {
    private readonly agreementService;
    constructor(agreementService: MarkLicenseAgreementService);
    generateAgreement(dto: CreateMarkLicenseAgreementDto, user: SystemUser): Promise<import("../entities").MarkLicenseAgreement>;
    getById(id: string): Promise<import("../entities").MarkLicenseAgreement>;
    getByAgreementId(agreementId: string): Promise<import("../entities").MarkLicenseAgreement>;
    signAgreement(id: string, dto: SignAgreementDto, user: SystemUser, req: Request): Promise<import("../entities").MarkLicenseAgreement>;
    arsoSignAgreement(id: string, body: {
        arsoSignerName: string;
        arsoSignerTitle: string;
    }, user: SystemUser): Promise<import("../entities").MarkLicenseAgreement>;
    getActiveAgreements(nsbId: string): Promise<import("../entities").MarkLicenseAgreement[]>;
    getExpiringAgreements(daysBeforeExpiry?: string): Promise<import("../entities").MarkLicenseAgreement[]>;
}
