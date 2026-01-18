import { CertificationAgreementStatus, CertificationAgreementType } from '../../../shared/enums';
import { ProductCertificationApplication } from './product-certification-application.entity';
import { SystemUser } from '../../system-user/system-user.entity';
export declare class ProductCertificationAgreement {
    id: string;
    applicationId: string;
    application: ProductCertificationApplication;
    agreementType: CertificationAgreementType;
    status: CertificationAgreementStatus;
    contractStart?: string;
    contractEnd?: string;
    signedByName?: string;
    signedAt?: Date;
    fileName: string;
    filePath: string;
    fileHash: string;
    fileSize: number;
    mimeType?: string;
    uploadedBy?: string;
    uploadedByUser?: SystemUser;
    cbApprovedBy?: string;
    cbApprovedByUser?: SystemUser;
    cbApprovedAt?: Date;
    rejectionReason?: string;
    createdAt: Date;
    updatedAt: Date;
}
