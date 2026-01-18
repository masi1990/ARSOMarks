import { Repository } from 'typeorm';
import { ProductCertificationApplication } from '../entities/product-certification-application.entity';
import { Product } from '../entities/product.entity';
import { ProductTechnicalSpec } from '../entities/product-technical-spec.entity';
import { Operator } from '../../operator/entities/operator.entity';
import { TraceabilityService } from '../../traceability/services/traceability.service';
export declare class PublicCertifiedProductsController {
    private readonly applicationRepository;
    private readonly productRepository;
    private readonly technicalSpecRepository;
    private readonly operatorRepository;
    private readonly traceabilityService;
    constructor(applicationRepository: Repository<ProductCertificationApplication>, productRepository: Repository<Product>, technicalSpecRepository: Repository<ProductTechnicalSpec>, operatorRepository: Repository<Operator>, traceabilityService: TraceabilityService);
    getCertifiedProducts(search?: string, category?: string, country?: string, skip?: string, limit?: string): Promise<any[]>;
    getCertifiedProductByCoc(cocNumber: string): Promise<{
        id: string;
        cocNumber: string;
        productName: string;
        brand: string;
        countryOfOrigin: string;
        company: string;
        standards: string[];
        issueDate: string;
        expiryDate: string;
        category: import("../../../shared/enums").ProductCategory;
        operatorId: string;
        operatorName: string;
        applicationId: string;
    }>;
    private calculateExpiryDate;
}
