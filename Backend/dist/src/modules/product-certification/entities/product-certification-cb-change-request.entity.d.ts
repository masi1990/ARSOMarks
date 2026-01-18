import { CbChangeRequestStatus } from '../../../shared/enums';
import { ProductCertificationApplication } from './product-certification-application.entity';
import { SystemUser } from '../../system-user/system-user.entity';
export declare class ProductCertificationCbChangeRequest {
    id: string;
    applicationId: string;
    application: ProductCertificationApplication;
    currentCbId?: string;
    requestedCbId?: string;
    justification: string;
    penaltyPolicy?: string;
    status: CbChangeRequestStatus;
    requestedBy?: string;
    requestedByUser?: SystemUser;
    reviewedBy?: string;
    reviewedByUser?: SystemUser;
    reviewedAt?: Date;
    decisionReason?: string;
    createdAt: Date;
    updatedAt: Date;
}
