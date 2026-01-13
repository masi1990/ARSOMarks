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
import { TechnicalDocsStatus, TestReportsAvailability, TraceabilityStatus } from '../../../shared/enums';

@Entity('product_technical_specs')
export class ProductTechnicalSpec {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'product_id', type: 'uuid', unique: true })
  productId: string;

  @OneToOne(() => Product, (product) => product.technicalSpec, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  // C1: Standards & Regulations
  @Column({ name: 'applicable_standards', type: 'text', array: true })
  applicableStandards: string[];

  @Column({ name: 'mandatory_standards', type: 'text', array: true })
  mandatoryStandards: string[];

  @Column({ name: 'voluntary_standards', type: 'text', array: true, nullable: true })
  voluntaryStandards?: string[];

  @Column({ name: 'standard_status', type: 'jsonb', nullable: true })
  standardStatus?: Record<string, string>; // {standard_code: compliance_status}

  @Column({ name: 'regulatory_body', length: 200 })
  regulatoryBody: string;

  @Column({ name: 'regulatory_approval', type: 'text', nullable: true })
  regulatoryApproval?: string;

  // C2: Technical Documentation
  @Column({ name: 'technical_docs_available', type: 'enum', enum: TechnicalDocsStatus })
  technicalDocsAvailable: TechnicalDocsStatus;

  @Column({ name: 'missing_documents', type: 'text', nullable: true })
  missingDocuments?: string;

  @Column({ name: 'test_reports_available', type: 'enum', enum: TestReportsAvailability })
  testReportsAvailable: TestReportsAvailability;

  @Column({ name: 'test_coverage', type: 'decimal', precision: 5, scale: 2, nullable: true })
  testCoverage?: number;

  @Column({ name: 'manufacturing_process', type: 'text' })
  manufacturingProcess: string;

  @Column({ name: 'process_flow_diagram', type: 'boolean', default: false })
  processFlowDiagram: boolean;

  // C3: Components & Supply Chain
  @Column({ name: 'key_components', type: 'text' })
  keyComponents: string;

  @Column({ name: 'critical_components', type: 'text' })
  criticalComponents: string;

  @Column({ name: 'component_sources', type: 'text' })
  componentSources: string;

  @Column({ name: 'supplier_list_available', length: 20, nullable: true })
  supplierListAvailable?: string; // 'YES', 'PARTIAL', 'NO'

  @Column({ name: 'traceability_system', type: 'enum', enum: TraceabilityStatus })
  traceabilitySystem: TraceabilityStatus;

  @Column({ name: 'batch_traceability', type: 'enum', enum: TraceabilityStatus })
  batchTraceability: TraceabilityStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

