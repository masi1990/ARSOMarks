import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductCertificationApplication } from './product-certification-application.entity';
import { ProductTechnicalSpec } from './product-technical-spec.entity';
import { ProductEnvironmentalClaim } from './product-environmental-claim.entity';
import { ProductCategory, TargetConsumerGroup, PackagingType } from '../../../shared/enums';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'application_id', type: 'uuid' })
  applicationId: string;

  @ManyToOne(() => ProductCertificationApplication, (application) => application.products, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'application_id' })
  application: ProductCertificationApplication;

  // B1: Basic Product Details
  @Column({ name: 'product_name', length: 200 })
  productName: string;

  @Column({ name: 'product_scientific_name', length: 200, nullable: true })
  productScientificName?: string;

  @Column({ name: 'brand_name', length: 100 })
  brandName: string;

  @Column({ name: 'model_variant', length: 100 })
  modelVariant: string;

  @Column({ name: 'product_code', length: 50, nullable: true })
  productCode?: string;

  @Column({ name: 'hs_code', length: 12 })
  hsCode: string;

  @Column({ name: 'hs_description', type: 'text', nullable: true })
  hsDescription?: string;

  @Column({ name: 'product_category', type: 'enum', enum: ProductCategory })
  productCategory: ProductCategory;

  // B2: Product Description & Use
  @Column({ name: 'product_description', type: 'text' })
  productDescription: string;

  @Column({ name: 'intended_use', type: 'text' })
  intendedUse: string;

  @Column({ name: 'key_features', type: 'text', array: true, nullable: true })
  keyFeatures?: string[];

  @Column({ name: 'unique_selling_point', type: 'text', nullable: true })
  uniqueSellingPoint?: string;

  // B3: Target Market & Consumers
  @Column({ name: 'intended_markets', type: 'uuid', array: true, nullable: true })
  intendedMarkets?: string[]; // Array of country IDs

  @Column({ name: 'primary_target_market', type: 'uuid', nullable: true })
  primaryTargetMarketId?: string;

  @Column({ name: 'target_consumers', type: 'enum', enum: TargetConsumerGroup, array: true })
  targetConsumers: TargetConsumerGroup[];

  @Column({ name: 'consumer_warnings', type: 'text', nullable: true })
  consumerWarnings?: string;

  @Column({ name: 'shelf_life', length: 50, nullable: true })
  shelfLife?: string;

  @Column({ name: 'storage_conditions', type: 'text', nullable: true })
  storageConditions?: string;

  // B4: Physical Specifications
  @Column({ name: 'unit_weight', length: 50, nullable: true })
  unitWeight?: string;

  @Column({ name: 'dimensions', length: 100, nullable: true })
  dimensions?: string;

  @Column({ name: 'color', type: 'text', array: true, nullable: true })
  color?: string[];

  @Column({ name: 'material_composition', type: 'text', nullable: true })
  materialComposition?: string;

  @Column({ name: 'packaging_type', type: 'enum', enum: PackagingType })
  packagingType: PackagingType;

  @Column({ name: 'packaging_material', length: 100 })
  packagingMaterial: string;

  @Column({ name: 'packaging_weight', length: 50, nullable: true })
  packagingWeight?: string;

  @Column({ name: 'units_per_package', type: 'int', nullable: true })
  unitsPerPackage?: number;

  @Column({ name: 'display_order', type: 'int', default: 0 })
  displayOrder: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // Relations
  @OneToOne(() => ProductTechnicalSpec, (spec) => spec.product, { cascade: true })
  technicalSpec?: ProductTechnicalSpec;

  @OneToOne(() => ProductEnvironmentalClaim, (claim) => claim.product, { cascade: true })
  environmentalClaim?: ProductEnvironmentalClaim;
}

