import { Operator } from './operator.entity';
import { OperatorContactType } from '../../../shared/enums';
export declare class OperatorContact {
    id: string;
    operatorId: string;
    operator: Operator;
    contactType: OperatorContactType;
    primaryContact: string;
    contactPosition: string;
    contactEmail: string;
    contactEmailVerified: boolean;
    contactEmailVerificationToken?: string;
    contactEmailVerifiedAt?: Date;
    contactPhone: string;
    contactPhoneVerified: boolean;
    contactPhoneVerificationCode?: string;
    contactPhoneVerifiedAt?: Date;
    altContact?: string;
    altEmail?: string;
    altPhone?: string;
    isPrimary: boolean;
    createdAt: Date;
    updatedAt: Date;
}
