import { Product } from './product.entity';
import { TechnicalDocsStatus, TestReportsAvailability, TraceabilityStatus } from '../../../shared/enums';
export declare class ProductTechnicalSpec {
    id: string;
    productId: string;
    product: Product;
    applicableStandards: string[];
    mandatoryStandards: string[];
    voluntaryStandards?: string[];
    standardStatus?: Record<string, string>;
    regulatoryBody: string;
    regulatoryApproval?: string;
    technicalDocsAvailable: TechnicalDocsStatus;
    missingDocuments?: string;
    testReportsAvailable: TestReportsAvailability;
    testCoverage?: number;
    manufacturingProcess: string;
    processFlowDiagram: boolean;
    keyComponents: string;
    criticalComponents: string;
    componentSources: string;
    supplierListAvailable?: string;
    traceabilitySystem: TraceabilityStatus;
    batchTraceability: TraceabilityStatus;
    createdAt: Date;
    updatedAt: Date;
}
