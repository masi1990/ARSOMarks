import { ApplicationType } from '../../../shared/enums';
export declare class AccreditationDetailsDto {
    accreditationBody?: string;
    accreditationNumber?: string;
    accreditationDate?: Date;
    accreditationExpiry?: Date;
    accreditationScopes?: string[];
    accreditationStatus?: string;
}
export declare class AppliedSchemeDto {
    schemeCode: string;
    subjectArea?: string;
    requestedScope: string;
    applicableStandards: string[];
    justification?: string;
}
export declare class CreateLicenseApplicationDto {
    nsbId: string;
    applicationType?: ApplicationType;
    accreditationDetails?: AccreditationDetailsDto;
    appliedSchemes?: AppliedSchemeDto[];
    organizationalDetails?: Record<string, any>;
    financialDetails?: Record<string, any>;
    technicalCompetenceDetails?: Record<string, any>;
    qmsDetails?: Record<string, any>;
    declarations?: Record<string, any>;
    saveAsDraft?: boolean;
}
