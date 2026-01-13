import { Product } from './product.entity';
import { EnvironmentalBenefit, ThirdPartyVerificationStatus, LifecycleAssessmentType, LifecycleAspect, EnvironmentalManagementSystem, TakeBackProgramStatus } from '../../../shared/enums';
export declare class ProductEnvironmentalClaim {
    id: string;
    productId: string;
    product: Product;
    environmentalBenefits: EnvironmentalBenefit[];
    benefitQuantification?: Record<string, string>;
    ecoClaimsSupporting: string;
    thirdPartyVerification: ThirdPartyVerificationStatus;
    verifierName?: string;
    lifecycleAspects: LifecycleAspect[];
    lifecycleAssessment: LifecycleAssessmentType;
    carbonFootprint: boolean;
    carbonValue?: number;
    environmentalManagement: EnvironmentalManagementSystem;
    environmentalPolicy: boolean;
    wasteManagement: string;
    recyclingInfo: string;
    takeBackProgram: TakeBackProgramStatus;
    createdAt: Date;
    updatedAt: Date;
}
