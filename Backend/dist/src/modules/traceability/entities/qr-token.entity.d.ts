import { Coc } from './coc.entity';
export declare class QrToken {
    id: string;
    cocId: string;
    coc: Coc;
    token: string;
    expiresAt?: Date;
    lastUsedAt?: Date;
    createdAt: Date;
}
