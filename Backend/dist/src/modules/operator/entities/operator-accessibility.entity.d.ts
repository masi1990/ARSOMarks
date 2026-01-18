import { Operator } from './operator.entity';
import { AssistiveTechType, DigitalLiteracyLevel, InternetAccessType, DeviceType } from '../../../shared/enums';
export declare class OperatorAccessibility {
    id: string;
    operatorId: string;
    operator: Operator;
    assistiveTech?: boolean;
    disabilityTypes?: AssistiveTechType[];
    specialAssistance?: string;
    literacyLevel?: DigitalLiteracyLevel;
    internetAccess?: InternetAccessType;
    deviceType?: DeviceType;
    createdAt: Date;
    updatedAt: Date;
}
