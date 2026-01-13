export declare class CreateMarkLicenseAgreementDto {
    applicationId: string;
    licenseStartDate: Date;
    licenseEndDate: Date;
    licenseTermsDisplay?: string;
    royaltyFeeStructure?: Record<string, any>;
    paymentSchedule?: Record<string, any>;
    usageRestrictions?: string;
    terminationClauses?: string;
}
export declare class SignAgreementDto {
    agreementId: string;
    nsbSignerName: string;
    nsbSignerTitle: string;
    nsbSignerEmail: string;
    nsbSignerConsent: boolean;
    nsbSignatureImagePath?: string;
}
export declare class RequestAssetsDto {
    agreementId: string;
    requestedAssets: string[];
    assetDeliveryMethod: string;
    assetRecipientName: string;
    assetRecipientEmail: string;
    assetUseConfirmation: boolean;
}
