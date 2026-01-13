import { Operator } from './operator.entity';
import { QMSType } from '../../../shared/enums';
export declare class OperatorProductionCapacity {
    id: string;
    operatorId: string;
    operator: Operator;
    productionCapacity: number;
    capacityUnit: string;
    capacityUtilization: number;
    qualityManagement: string;
    qmsType?: QMSType;
    certificationCount: number;
    existingCertifications?: string;
    technicalStaff: number;
    createdAt: Date;
    updatedAt: Date;
}
