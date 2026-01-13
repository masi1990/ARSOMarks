export declare class CreateLicenseModificationDto {
    originalLicenseId: string;
    modificationTypes: string[];
    modificationReason: string;
    proposedChanges: string;
    effectiveDateRequest: Date;
    supportingJustificationPath?: string;
    impactAssessment?: string;
    feeAdjustmentNeeded: string;
}
export declare class ApproveModificationDto {
    modificationId: string;
    notes?: string;
    implementedChanges?: Record<string, any>;
}
export declare class RejectModificationDto {
    modificationId: string;
    rejectionReason: string;
}
