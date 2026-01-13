import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';
import {
  EnvironmentalBenefit,
  ThirdPartyVerificationStatus,
  LifecycleAssessmentType,
  LifecycleAspect,
  EnvironmentalManagementSystem,
  TakeBackProgramStatus,
} from '../../../shared/enums';

@Entity('product_environmental_claims')
export class ProductEnvironmentalClaim {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'product_id', type: 'uuid', unique: true })
  productId: string;

  @OneToOne(() => Product, (product) => product.environmentalClaim, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  // D1: Environmental Benefits
  @Column({ name: 'environmental_benefits', type: 'enum', enum: EnvironmentalBenefit, array: true })
  environmentalBenefits: EnvironmentalBenefit[];

  @Column({ name: 'benefit_quantification', type: 'jsonb', nullable: true })
  benefitQuantification?: Record<string, string>; // {benefit: quantification_data}

  @Column({ name: 'eco_claims_supporting', type: 'text' })
  ecoClaimsSupporting: string;

  @Column({ name: 'third_party_verification', type: 'enum', enum: ThirdPartyVerificationStatus })
  thirdPartyVerification: ThirdPartyVerificationStatus;

  @Column({ name: 'verifier_name', length: 200, nullable: true })
  verifierName?: string;

  // D2: Lifecycle Assessment
  @Column({ name: 'lifecycle_aspects', type: 'enum', enum: LifecycleAspect, array: true })
  lifecycleAspects: LifecycleAspect[];

  @Column({ name: 'lifecycle_assessment', type: 'enum', enum: LifecycleAssessmentType })
  lifecycleAssessment: LifecycleAssessmentType;

  @Column({ name: 'carbon_footprint', type: 'boolean', default: false })
  carbonFootprint: boolean;

  @Column({ name: 'carbon_value', type: 'decimal', precision: 15, scale: 2, nullable: true })
  carbonValue?: number;

  // D3: Environmental Management
  @Column({ name: 'environmental_management', type: 'enum', enum: EnvironmentalManagementSystem })
  environmentalManagement: EnvironmentalManagementSystem;

  @Column({ name: 'environmental_policy', type: 'boolean', default: false })
  environmentalPolicy: boolean;

  @Column({ name: 'waste_management', type: 'text' })
  wasteManagement: string;

  @Column({ name: 'recycling_info', type: 'text' })
  recyclingInfo: string;

  @Column({ name: 'take_back_program', type: 'enum', enum: TakeBackProgramStatus })
  takeBackProgram: TakeBackProgramStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

