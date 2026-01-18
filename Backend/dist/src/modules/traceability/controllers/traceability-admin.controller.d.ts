import { TraceabilityService } from '../services/traceability.service';
import { CreateStandardDto } from '../dtos/create-standard.dto';
import { AssignStandardsDto } from '../dtos/assign-standards.dto';
import { GenerateCocDto } from '../dtos/generate-coc.dto';
import { UpdateCocStatusDto } from '../dtos/update-coc-status.dto';
export declare class TraceabilityAdminController {
    private readonly traceabilityService;
    constructor(traceabilityService: TraceabilityService);
    createStandard(dto: CreateStandardDto): Promise<import("../entities/standard.entity").Standard>;
    assignStandards(dto: AssignStandardsDto): Promise<import("../entities/product-standard.entity").ProductStandard[]>;
    issueCoc(dto: GenerateCocDto): Promise<import("../entities/coc.entity").Coc | {
        token: string;
        publicUrl: string;
        id: string;
        cocNumber: string;
        productId: string;
        product: import("../../product-certification/entities").Product;
        applicationId: string;
        application: import("../../product-certification/entities").ProductCertificationApplication;
        status: import("../entities/coc.entity").CocStatus;
        qrPayloadSig?: string;
        issuedAt?: Date;
        expiresAt?: Date;
        revokedAt?: Date;
        checksum?: string;
        originCountryId?: string;
        originCountry?: import("../../reference-data/entities/country.entity").Country;
        createdAt: Date;
        updatedAt: Date;
        tokens?: import("../entities/qr-token.entity").QrToken[];
        history?: import("../entities/coc-status-history.entity").CocStatusHistory[];
    }>;
    updateCocStatus(dto: UpdateCocStatusDto): Promise<import("../entities/coc.entity").Coc>;
}
