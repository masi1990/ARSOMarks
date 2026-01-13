import { MarkLicenseAgreement } from './mark-license-agreement.entity';
import { SystemUser } from '../../system-user/system-user.entity';
export declare class MarkLicenseCompliance {
    id: string;
    licenseId: string;
    license: MarkLicenseAgreement;
    complianceType: string;
    checkDate: Date;
    checkedBy?: string;
    checkedByUser?: SystemUser;
    isCompliant: boolean;
    findings?: string;
    violations?: Record<string, any>[];
    correctiveActionsRequired?: string;
    correctiveActionsTaken?: string;
    nextCheckDate?: Date;
    resolvedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
