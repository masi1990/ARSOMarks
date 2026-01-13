import { ProductCertificationApplication } from './product-certification-application.entity';
export declare class ProductCertificationDeclaration {
    id: string;
    applicationId: string;
    application: ProductCertificationApplication;
    truthDeclaration: boolean;
    complianceCommitment: boolean;
    surveillanceAcceptance: boolean;
    correctiveActionCommitment: boolean;
    marketSurveillanceAcceptance: boolean;
    markUsageCommitment: boolean;
    feesAcceptance: boolean;
    feeBreakdownAcknowledged: boolean;
    paymentTermsAccepted: boolean;
    additionalCostsUnderstood: boolean;
    applicantName: string;
    applicantPosition: string;
    applicantSignature?: string;
    submissionDate: Date;
    submissionTime: string;
    createdAt: Date;
    updatedAt: Date;
}
