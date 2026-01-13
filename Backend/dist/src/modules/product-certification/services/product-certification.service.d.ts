import { DataSource, Repository } from 'typeorm';
import { ProductCertificationApplication, Product, ProductTechnicalSpec, ProductEnvironmentalClaim, ProductCertificationCbSelection, ProductCertificationDeclaration } from '../entities';
import { CreateProductCertificationApplicationDto, UpdateProductCertificationApplicationDto } from '../dtos';
import { ProductCertificationStatus } from '../../../shared/enums';
import { Operator } from '../../operator/entities/operator.entity';
export declare class ProductCertificationService {
    private readonly applicationRepository;
    private readonly productRepository;
    private readonly technicalSpecRepository;
    private readonly environmentalClaimRepository;
    private readonly cbSelectionRepository;
    private readonly declarationRepository;
    private readonly operatorRepository;
    private readonly dataSource;
    constructor(applicationRepository: Repository<ProductCertificationApplication>, productRepository: Repository<Product>, technicalSpecRepository: Repository<ProductTechnicalSpec>, environmentalClaimRepository: Repository<ProductEnvironmentalClaim>, cbSelectionRepository: Repository<ProductCertificationCbSelection>, declarationRepository: Repository<ProductCertificationDeclaration>, operatorRepository: Repository<Operator>, dataSource: DataSource);
    createApplication(dto: CreateProductCertificationApplicationDto, userId: string): Promise<ProductCertificationApplication>;
    updateApplication(id: string, dto: UpdateProductCertificationApplicationDto, userId: string): Promise<ProductCertificationApplication>;
    submitApplication(id: string, userId: string): Promise<ProductCertificationApplication>;
    findById(id: string): Promise<ProductCertificationApplication>;
    findByOperatorId(operatorId: string): Promise<ProductCertificationApplication[]>;
    findAll(filters?: {
        operatorId?: string;
        status?: ProductCertificationStatus;
        skip?: number;
        limit?: number;
    }): Promise<{
        data: ProductCertificationApplication[];
        total: number;
    }>;
    deleteApplication(id: string, userId: string): Promise<void>;
}
