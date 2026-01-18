import { Operator } from './operator.entity';
import { PreferredLanguage, CommunicationPreference, NotificationFrequency } from '../../../shared/enums';
export declare class OperatorPreference {
    id: string;
    operatorId: string;
    operator: Operator;
    preferredLanguage?: PreferredLanguage;
    communicationPreferences?: CommunicationPreference[];
    notificationFrequency?: NotificationFrequency;
    timezone?: string;
    currency?: string;
    createdAt: Date;
    updatedAt: Date;
}
