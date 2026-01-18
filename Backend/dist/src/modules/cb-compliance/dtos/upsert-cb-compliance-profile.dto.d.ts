declare class ResponsiblePersonDto {
    name: string;
    role: string;
    contactEmail?: string;
    phone?: string;
}
declare class AuditorQualificationDto {
    auditorName: string;
    scheme?: string;
    qualification: string;
    expiryDate?: string;
}
declare class LocalOfficeDto {
    country: string;
    city?: string;
    address?: string;
    contactPerson?: string;
    hasCertificationAuthority?: boolean;
}
export declare class UpsertCbComplianceProfileDto {
    responsiblePersons?: ResponsiblePersonDto[];
    auditorQualifications?: AuditorQualificationDto[];
    countriesOfCertification?: string[];
    localOffices?: LocalOfficeDto[];
}
export {};
