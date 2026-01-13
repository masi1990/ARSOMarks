import { ProductCertificationService } from '../services/product-certification.service';
import { CreateProductCertificationApplicationDto, UpdateProductCertificationApplicationDto } from '../dtos';
import { SystemUser } from '../../system-user/system-user.entity';
import { OperatorService } from '../../operator/services/operator.service';
export declare class ProductCertificationController {
    private readonly productCertificationService;
    private readonly operatorService;
    constructor(productCertificationService: ProductCertificationService, operatorService: OperatorService);
    create(dto: CreateProductCertificationApplicationDto, user: SystemUser): Promise<import("../entities").ProductCertificationApplication>;
    list(query: any, user: SystemUser): Promise<{
        data: import("../entities").ProductCertificationApplication[];
        total: number;
    }>;
    getById(id: string, user: SystemUser): Promise<import("../entities").ProductCertificationApplication>;
    update(id: string, dto: UpdateProductCertificationApplicationDto, user: SystemUser): Promise<import("../entities").ProductCertificationApplication>;
    submit(id: string, user: SystemUser): Promise<import("../entities").ProductCertificationApplication>;
    delete(id: string, user: SystemUser): Promise<{
        message: string;
    }>;
}
