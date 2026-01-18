import { DataSource, Repository } from 'typeorm';
import { ProductCertificationApplication, Product, ProductTechnicalSpec, ProductEnvironmentalClaim, ProductCertificationCbSelection, ProductCertificationDeclaration, ProductCertificationAgreement, ProductCertificationCbChangeRequest } from '../entities';
import { CreateProductCertificationApplicationDto, UpdateProductCertificationApplicationDto } from '../dtos';
import { ProductCertificationStatus, CertificationAgreementType, CbChangeRequestStatus } from '../../../shared/enums';
import { Operator } from '../../operator/entities/operator.entity';
import { ProductCertificationAgreementUploadService } from './product-certification-agreement-upload.service';
export declare class ProductCertificationService {
    private readonly applicationRepository;
    private readonly productRepository;
    private readonly technicalSpecRepository;
    private readonly environmentalClaimRepository;
    private readonly cbSelectionRepository;
    private readonly declarationRepository;
    private readonly agreementRepository;
    private readonly cbChangeRequestRepository;
    private readonly operatorRepository;
    private readonly dataSource;
    private readonly agreementUploadService;
    constructor(applicationRepository: Repository<ProductCertificationApplication>, productRepository: Repository<Product>, technicalSpecRepository: Repository<ProductTechnicalSpec>, environmentalClaimRepository: Repository<ProductEnvironmentalClaim>, cbSelectionRepository: Repository<ProductCertificationCbSelection>, declarationRepository: Repository<ProductCertificationDeclaration>, agreementRepository: Repository<ProductCertificationAgreement>, cbChangeRequestRepository: Repository<ProductCertificationCbChangeRequest>, operatorRepository: Repository<Operator>, dataSource: DataSource, agreementUploadService: ProductCertificationAgreementUploadService);
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
    uploadAgreement(applicationId: string, agreementType: CertificationAgreementType, file: Express.Multer.File, payload: {
        signedByName?: string;
        contractStart?: string;
        contractEnd?: string;
    }, userId: string): Promise<ProductCertificationAgreement>;
    listAgreements(applicationId: string): Promise<ProductCertificationAgreement[]>;
    approveAgreement(id: string, userId: string): Promise<ProductCertificationAgreement>;
    rejectAgreement(id: string, reason: string, userId: string): Promise<ProductCertificationAgreement>;
    createCbChangeRequest(applicationId: string, payload: {
        currentCbId?: string;
        requestedCbId?: string;
        justification: string;
        penaltyPolicy?: string;
    }, userId: string): Promise<ProductCertificationCbChangeRequest>;
    reviewCbChangeRequest(id: string, status: CbChangeRequestStatus.APPROVED | CbChangeRequestStatus.REJECTED, decisionReason: string | undefined, userId: string): Promise<ProductCertificationCbChangeRequest>;
    publicDirectory(): Promise<ProductCertificationApplication[]>;
}
