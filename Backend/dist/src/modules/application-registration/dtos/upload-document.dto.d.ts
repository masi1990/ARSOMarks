export declare enum ApplicationRegistrationDocumentType {
    TEST_REPORT = "TEST_REPORT",
    QMS_CERTIFICATE = "QMS_CERTIFICATE",
    OTHER_EVIDENCE = "OTHER_EVIDENCE",
    PRODUCT_PHOTOGRAPH = "PRODUCT_PHOTOGRAPH",
    LABEL_ARTWORK = "LABEL_ARTWORK",
    DECLARATION_OF_CONFORMITY = "DECLARATION_OF_CONFORMITY",
    PRODUCT_RECALL_PROCEDURE = "PRODUCT_RECALL_PROCEDURE",
    COMPLAINTS_MANAGEMENT_PROCEDURE = "COMPLAINTS_MANAGEMENT_PROCEDURE",
    COMPANY_REGISTRATION_CERTIFICATE = "COMPANY_REGISTRATION_CERTIFICATE"
}
export declare class UploadApplicationDocumentDto {
    documentType: ApplicationRegistrationDocumentType;
    fileName: string;
    filePath: string;
    fileHash: string;
    fileSize: string;
    mimeType?: string;
    applicationRegistrationId?: string;
}
