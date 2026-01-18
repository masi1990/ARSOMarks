import { Coc } from './coc.entity';
import { Product } from '../../product-certification/entities/product.entity';
import { ProductCertificationApplication } from '../../product-certification/entities/product-certification-application.entity';
export declare class ScanLog {
    id: string;
    cocId?: string;
    coc?: Coc;
    productId?: string;
    product?: Product;
    applicationId?: string;
    application?: ProductCertificationApplication;
    token?: string;
    ip?: string;
    country?: string;
    city?: string;
    lat?: number;
    lon?: number;
    userAgent?: string;
    result?: string;
    createdAt: Date;
}
