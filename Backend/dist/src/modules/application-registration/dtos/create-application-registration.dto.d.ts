import { ProductCertificationDto, ManufacturerInfoDto, ConformityEvidenceDto, PostCertificationDto, CbSelectionDto } from './product-certification.dto';
export declare class CreateApplicationRegistrationDto {
    applicantName: string;
    applicantType: string;
    registrationNumber: string;
    taxId?: string;
    contactPerson: string;
    contactEmail: string;
    contactPhone: string;
    physicalAddress: string;
    city: string;
    regionState: string;
    postalCode: string;
    countryId: string;
    businessActivity: string;
    yearEstablished?: number;
    employeeCount?: number;
    annualRevenue?: number;
    productCertification?: ProductCertificationDto;
    manufacturerInfo?: ManufacturerInfoDto;
    conformityEvidence?: ConformityEvidenceDto;
    postCertification?: PostCertificationDto;
    cbSelection?: CbSelectionDto;
    userId?: string;
}
