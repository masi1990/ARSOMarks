import { ProductCertificationService } from '../services/product-certification.service';
import { CreateProductCertificationApplicationDto, UpdateProductCertificationApplicationDto, UploadCertificationAgreementDto, CreateCbChangeRequestDto, ReviewCbChangeRequestDto } from '../dtos';
import { CertificationAgreementType } from '../../../shared/enums';
import { SystemUser } from '../../system-user/system-user.entity';
import { OperatorService } from '../../operator/services/operator.service';
export declare class ProductCertificationController {
    private readonly productCertificationService;
    private readonly operatorService;
    constructor(productCertificationService: ProductCertificationService, operatorService: OperatorService);
    publicDirectory(): Promise<import("../entities").ProductCertificationApplication[]>;
    create(dto: CreateProductCertificationApplicationDto, user: SystemUser): Promise<import("../entities").ProductCertificationApplication>;
    list(query: any, user: SystemUser): Promise<{
        data: import("../entities").ProductCertificationApplication[];
        total: number;
    }>;
    getById(id: string, user: SystemUser): Promise<import("../entities").ProductCertificationApplication>;
    update(id: string, dto: UpdateProductCertificationApplicationDto, user: SystemUser): Promise<import("../entities").ProductCertificationApplication>;
    submit(id: string, user: SystemUser): Promise<import("../entities").ProductCertificationApplication>;
    uploadAgreement(id: string, agreementType: CertificationAgreementType, file: Express.Multer.File, dto: UploadCertificationAgreementDto, user: SystemUser): Promise<import("../entities").ProductCertificationAgreement>;
    listAgreements(id: string): Promise<import("../entities").ProductCertificationAgreement[]>;
    approveAgreement(agreementId: string, user: SystemUser): Promise<import("../entities").ProductCertificationAgreement>;
    rejectAgreement(agreementId: string, body: {
        reason?: string;
    }, user: SystemUser): Promise<import("../entities").ProductCertificationAgreement>;
    createCbChangeRequest(id: string, dto: CreateCbChangeRequestDto, user: SystemUser): Promise<import("../entities").ProductCertificationCbChangeRequest>;
    approveCbChangeRequest(requestId: string, dto: ReviewCbChangeRequestDto, user: SystemUser): Promise<import("../entities").ProductCertificationCbChangeRequest>;
    rejectCbChangeRequest(requestId: string, dto: ReviewCbChangeRequestDto, user: SystemUser): Promise<import("../entities").ProductCertificationCbChangeRequest>;
    delete(id: string, user: SystemUser): Promise<{
        message: string;
    }>;
}
