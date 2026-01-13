import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductCertificationApplication } from './product-certification-application.entity';

@Entity('product_certification_declarations')
export class ProductCertificationDeclaration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'application_id', type: 'uuid', unique: true })
  applicationId: string;

  @OneToOne(() => ProductCertificationApplication, (application) => application.declaration, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'application_id' })
  application: ProductCertificationApplication;

  // F1: Applicant Declarations
  @Column({ name: 'truth_declaration', type: 'boolean', default: false })
  truthDeclaration: boolean;

  @Column({ name: 'compliance_commitment', type: 'boolean', default: false })
  complianceCommitment: boolean;

  @Column({ name: 'surveillance_acceptance', type: 'boolean', default: false })
  surveillanceAcceptance: boolean;

  @Column({ name: 'corrective_action_commitment', type: 'boolean', default: false })
  correctiveActionCommitment: boolean;

  @Column({ name: 'market_surveillance_acceptance', type: 'boolean', default: false })
  marketSurveillanceAcceptance: boolean;

  @Column({ name: 'mark_usage_commitment', type: 'boolean', default: false })
  markUsageCommitment: boolean;

  // F2: Fee Acceptance
  @Column({ name: 'fees_acceptance', type: 'boolean', default: false })
  feesAcceptance: boolean;

  @Column({ name: 'fee_breakdown_acknowledged', type: 'boolean', default: false })
  feeBreakdownAcknowledged: boolean;

  @Column({ name: 'payment_terms_accepted', type: 'boolean', default: false })
  paymentTermsAccepted: boolean;

  @Column({ name: 'additional_costs_understood', type: 'boolean', default: false })
  additionalCostsUnderstood: boolean;

  // F3: Final Submission
  @Column({ name: 'applicant_name', length: 100 })
  applicantName: string;

  @Column({ name: 'applicant_position', length: 100 })
  applicantPosition: string;

  @Column({ name: 'applicant_signature', type: 'text', nullable: true })
  applicantSignature?: string;

  @Column({ name: 'submission_date', type: 'date', default: () => 'CURRENT_DATE' })
  submissionDate: Date;

  @Column({ name: 'submission_time', type: 'time', default: () => 'CURRENT_TIME' })
  submissionTime: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

