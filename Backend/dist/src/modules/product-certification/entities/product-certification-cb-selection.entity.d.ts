import { ProductCertificationApplication } from './product-certification-application.entity';
import { AuditLanguage, AuditTeamSize } from '../../../shared/enums';
export declare class ProductCertificationCbSelection {
    id: string;
    applicationId: string;
    application: ProductCertificationApplication;
    preferredCbId?: string;
    cbSelectionReason: string;
    previousCb: boolean;
    previousCbName?: string;
    previousCertificateNumber?: string;
    auditLanguage: AuditLanguage;
    auditTiming: string;
    peakPeriods: string;
    specialRequirements?: string;
    auditTeamSize: AuditTeamSize;
    createdAt: Date;
    updatedAt: Date;
}
