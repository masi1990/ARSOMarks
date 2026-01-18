import { Product } from '../../product-certification/entities/product.entity';
import { ProductCertificationApplication } from '../../product-certification/entities/product-certification-application.entity';
import { Country } from '../../reference-data/entities/country.entity';
import { QrToken } from './qr-token.entity';
import { CocStatusHistory } from './coc-status-history.entity';
export declare enum CocStatus {
    ISSUED = "ISSUED",
    VALID = "VALID",
    EXPIRED = "EXPIRED",
    REVOKED = "REVOKED"
}
export declare class Coc {
    id: string;
    cocNumber: string;
    productId: string;
    product: Product;
    applicationId: string;
    application: ProductCertificationApplication;
    status: CocStatus;
    publicUrl?: string;
    qrPayloadSig?: string;
    issuedAt?: Date;
    expiresAt?: Date;
    revokedAt?: Date;
    checksum?: string;
    originCountryId?: string;
    originCountry?: Country;
    createdAt: Date;
    updatedAt: Date;
    tokens?: QrToken[];
    history?: CocStatusHistory[];
}
