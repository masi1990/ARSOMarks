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
import {
  MarkRequestedType,
  MarkCombinationPreference,
  CertificationSchemeType,
  ApplicationScope,
  ProductCertificationType,
  ProductCertificationStatus,
  PriorityProcessing,
  ExpectedTimeline,
  VolumeUnit,
} from '../../../shared/enums';
import { Operator } from '../../operator/entities/operator.entity';
import { SystemUser } from '../../system-user/system-user.entity';
import { Product } from './product.entity';
import { ProductCertificationCbSelection } from './product-certification-cb-selection.entity';
import { ProductCertificationDeclaration } from './product-certification-declaration.entity';
import { ProductCertificationAgreement } from './product-certification-agreement.entity';
import { ProductCertificationCbChangeRequest } from './product-certification-cb-change-request.entity';

@Entity('product_certification_applications')
export class ProductCertificationApplication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'application_number', unique: true, nullable: true })
  applicationNumber?: string;

  @Column({ name: 'operator_id', type: 'uuid' })
  operatorId: string;

  @ManyToOne(() => Operator, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'operator_id' })
  operator: Operator;

  // A1: Mark Selection
  @Column({ name: 'mark_requested', type: 'enum', enum: MarkRequestedType, array: true })
  markRequested: MarkRequestedType[];

  @Column({ name: 'arso_quality_mark', type: 'boolean', default: false })
  arsoQualityMark: boolean;

  @Column({ name: 'eco_mark_africa', type: 'boolean', default: false })
  ecoMarkAfrica: boolean;

  @Column({ name: 'mark_combination', type: 'enum', enum: MarkCombinationPreference, nullable: true })
  markCombination?: MarkCombinationPreference;

  // A2: Certification Scheme Details
  @Column({ name: 'scheme_type', type: 'enum', enum: CertificationSchemeType })
  schemeType: CertificationSchemeType;

  @Column({ name: 'scheme_description', type: 'text', nullable: true })
  schemeDescription?: string;

  @Column({ name: 'scheme_payload', type: 'jsonb', nullable: true })
  schemePayload?: Record<string, any>;

  @Column({ name: 'application_scope', type: 'enum', enum: ApplicationScope })
  applicationScope: ApplicationScope;

  @Column({ name: 'certification_type', type: 'enum', enum: ProductCertificationType })
  certificationType: ProductCertificationType;

  // A3: Volume & Priority
  @Column({ name: 'estimated_volume', type: 'decimal', precision: 15, scale: 2 })
  estimatedVolume: number;

  @Column({ name: 'volume_unit', type: 'enum', enum: VolumeUnit })
  volumeUnit: VolumeUnit;

  @Column({ name: 'peak_month', type: 'int', nullable: true })
  peakMonth?: number; // 1-12

  @Column({ name: 'priority_processing', type: 'enum', enum: PriorityProcessing, default: PriorityProcessing.NO })
  priorityProcessing: PriorityProcessing;

  @Column({ name: 'priority_reason', type: 'text', nullable: true })
  priorityReason?: string;

  @Column({ name: 'expected_timeline', type: 'enum', enum: ExpectedTimeline })
  expectedTimeline: ExpectedTimeline;

  // Status & Workflow
  @Column({ type: 'enum', enum: ProductCertificationStatus, default: ProductCertificationStatus.DRAFT })
  status: ProductCertificationStatus;

  @Column({ name: 'submitted_at', type: 'timestamp', nullable: true })
  submittedAt?: Date;

  @Column({ name: 'approved_at', type: 'timestamp', nullable: true })
  approvedAt?: Date;

  @Column({ name: 'rejected_at', type: 'timestamp', nullable: true })
  rejectedAt?: Date;

  @Column({ name: 'rejection_reason', type: 'text', nullable: true })
  rejectionReason?: string;

  @Column({ name: 'certified_at', type: 'timestamp', nullable: true })
  certifiedAt?: Date;

  @Column({ name: 'certificate_number', length: 50, nullable: true })
  certificateNumber?: string;

  // Audit columns
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy?: string;

  @ManyToOne(() => SystemUser, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'created_by' })
  createdByUser?: SystemUser;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy?: string;

  @ManyToOne(() => SystemUser, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'updated_by' })
  updatedByUser?: SystemUser;

  // Relations
  @OneToMany(() => Product, (product) => product.application, { cascade: true })
  products?: Product[];

  @OneToOne(() => ProductCertificationCbSelection, (cbSelection) => cbSelection.application, { cascade: true })
  cbSelection?: ProductCertificationCbSelection;

  @OneToOne(() => ProductCertificationDeclaration, (declaration) => declaration.application, { cascade: true })
  declaration?: ProductCertificationDeclaration;

  @OneToMany(() => ProductCertificationAgreement, (agreement) => agreement.application, { cascade: true })
  agreements?: ProductCertificationAgreement[];

  @OneToMany(() => ProductCertificationCbChangeRequest, (request) => request.application, { cascade: true })
  cbChangeRequests?: ProductCertificationCbChangeRequest[];
}

