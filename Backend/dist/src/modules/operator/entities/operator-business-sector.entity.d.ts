import { Operator } from './operator.entity';
import { MainBusinessSector } from '../../../shared/enums';
export declare class OperatorBusinessSector {
    id: string;
    operatorId: string;
    operator: Operator;
    mainSector?: MainBusinessSector;
    subSector?: string[];
    isicCode?: string;
    productCategories?: string[];
    percentageRevenue?: number;
    sectorStartYear?: number;
    sectorExperience?: number;
    createdAt: Date;
    updatedAt: Date;
}
