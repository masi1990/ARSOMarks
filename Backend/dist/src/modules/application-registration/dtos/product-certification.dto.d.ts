export declare class ProductCertificationDto {
    markAppliedFor: string;
    acapScheme: string;
    productBrandName: string;
    productModelTypeNumber: string;
    applicableArsoStandards: string[];
    scopeOfCertification: string;
    expectedAnnualCertifiedVolume: string;
    expectedAnnualCertifiedVolumeUnit?: string;
    targetMarkets: string[];
}
export declare class ManufacturerInfoDto {
    manufacturerLegalName: string;
    manufacturerAddress: string;
    manufacturerCountryId: string;
    productionSiteGpsCoordinates: string;
    typeOfProduction: string;
}
export declare class ConformityEvidenceDto {
    testReportFileId: string;
    testReportIssuingBody: string;
    testReportCertificateNo: string;
    qmsCertificateFileId?: string;
    qmsCertificateIssuingBody?: string;
    qmsCertificateNo?: string;
    otherEvidenceFileId?: string;
    otherEvidenceIssuingBody?: string;
    otherEvidenceCertificateNo?: string;
    productPhotographsFileIds: string[];
    labelArtworkFileId: string;
    declarationOfConformityFileId: string;
}
export declare class PostCertificationDto {
    productRecallProcedureFileId: string;
    complaintsManagementProcedureFileId: string;
    agreementToSurveillance: boolean;
    traceabilityUndertaking: boolean;
}
export declare class CbSelectionDto {
    selectedCertificationBodyId: string;
    finalDeclarationSignature: string;
    finalDeclarationDate: string;
}
