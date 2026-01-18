import { Operator } from './operator.entity';
export declare class OperatorConsent {
    id: string;
    operatorId: string;
    operator: Operator;
    dataConsent?: boolean;
    dataSharingConsent?: boolean;
    crossBorderData?: boolean;
    termsAcceptance?: boolean;
    marketingConsent?: boolean;
    smsConsent?: boolean;
    whatsappConsent?: boolean;
    declarationSignature?: string;
    declarationDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}
