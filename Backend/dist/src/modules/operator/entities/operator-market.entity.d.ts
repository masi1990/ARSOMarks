import { Operator } from './operator.entity';
import { Country } from '../../reference-data/entities/country.entity';
import { DomesticMarketType } from '../../../shared/enums';
export declare class OperatorMarket {
    id: string;
    operatorId: string;
    operator: Operator;
    domesticMarkets: DomesticMarketType[];
    exportMarkets?: string[];
    primaryExportMarketId?: string;
    primaryExportMarket?: Country;
    exportStartYear?: number;
    importSources?: string[];
    afcftaAwareness: string;
    tradeChallenges?: string;
    createdAt: Date;
    updatedAt: Date;
}
