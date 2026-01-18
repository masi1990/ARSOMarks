import { Coc } from './coc.entity';
import { ProductCertificationApplication } from '../../product-certification/entities/product-certification-application.entity';
export declare class CocStatusHistory {
    id: string;
    cocId: string;
    coc: Coc;
    applicationId?: string;
    application?: ProductCertificationApplication;
    event: string;
    reason?: string;
    actorId?: string;
    createdAt: Date;
}
