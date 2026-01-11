import { MsaJurisdiction, MouStatus, SystemAccessLevel, RegulatoryAgencyType, AccreditationStatus } from '../../../shared/enums';
export declare class MarketSurveillanceAuthorityDto {
    id?: string;
    agencyName: string;
    jurisdiction: MsaJurisdiction;
    contactPersonName: string;
    contactPersonEmail?: string;
    contactPersonPhone?: string;
    scopeOfAuthority?: string;
    mouStatus?: MouStatus;
    mouDocumentPath?: string;
    mouDocumentHash?: string;
    systemAccessLevelRequested?: SystemAccessLevel;
    isActive?: boolean;
}
export declare class CustomsBorderAgencyDto {
    id?: string;
    agencyName: string;
    keyBorderPosts?: string[];
    acapVerificationContactName?: string;
    acapVerificationContactEmail?: string;
    acapVerificationContactPhone?: string;
    integrationWithNationalSingleWindow?: boolean;
    isActive?: boolean;
}
export declare class RegulatoryAgencyDto {
    id?: string;
    agencyName: string;
    agencyType: RegulatoryAgencyType;
    otherTypeDescription?: string;
    contactPersonName?: string;
    contactPersonEmail?: string;
    contactPersonPhone?: string;
    isActive?: boolean;
}
export declare class IndustryAssociationDto {
    id?: string;
    associationName: string;
    sectorIndustry?: string;
    numberOfMembers?: number;
    contactPersonName?: string;
    contactPersonEmail?: string;
    contactPersonPhone?: string;
    willingnessToPromoteAcap?: boolean;
    isActive?: boolean;
}
export declare class TestingLaboratoryDto {
    id?: string;
    name: string;
    accreditationStatus?: AccreditationStatus;
    otherAccreditationDescription?: string;
    scopeOfAccreditation?: string;
    contactForAcapReferralsName?: string;
    contactForAcapReferralsEmail?: string;
    contactForAcapReferralsPhone?: string;
    isActive?: boolean;
}
export declare class StakeholderRegistryDto {
    marketSurveillanceAuthorities?: MarketSurveillanceAuthorityDto[];
    customsBorderAgencies?: CustomsBorderAgencyDto[];
    regulatoryAgencies?: RegulatoryAgencyDto[];
    industryAssociations?: IndustryAssociationDto[];
    testingLaboratories?: TestingLaboratoryDto[];
}
