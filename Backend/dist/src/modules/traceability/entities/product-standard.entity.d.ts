import { Product } from '../../product-certification/entities/product.entity';
import { Standard } from './standard.entity';
import { ProductCertificationApplication } from '../../product-certification/entities/product-certification-application.entity';
export declare class ProductStandard {
    id: string;
    productId: string;
    product: Product;
    standardId: string;
    standard: Standard;
    certificationApplicationId?: string;
    certificationApplication?: ProductCertificationApplication;
    createdAt: Date;
}
