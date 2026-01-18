import { Operator } from './operator.entity';
import { Country } from '../../reference-data/entities/country.entity';
import { OperatorLocationType, FactoryType } from '../../../shared/enums';
export declare class OperatorLocation {
    id: string;
    operatorId: string;
    operator: Operator;
    locationType?: OperatorLocationType;
    physicalAddress?: string;
    addressLine1?: string;
    addressLine2?: string;
    postalCode?: string;
    cityTown?: string;
    regionState?: string;
    countryId?: string;
    country: Country;
    gpsCoordinates?: string;
    geoLat?: number;
    geoLng?: number;
    geoAccuracyM?: number;
    factoryLocationSame?: boolean;
    factoryName?: string;
    factoryType?: FactoryType;
    factorySize?: number;
    isPrimary: boolean;
    createdAt: Date;
    updatedAt: Date;
}
