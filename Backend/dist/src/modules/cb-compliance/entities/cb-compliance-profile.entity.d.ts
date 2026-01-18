import { CbApplication } from '../../cb-approval/entities/cb-application.entity';
export declare class CbComplianceProfile {
    id: string;
    cbApplicationId: string;
    cbApplication: CbApplication;
    responsiblePersons?: Record<string, any>[];
    auditorQualifications?: Record<string, any>[];
    countriesOfCertification?: string[];
    localOffices?: Record<string, any>[];
    createdAt: Date;
    updatedAt: Date;
}
