import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MarkLicenseAgreement } from './mark-license-agreement.entity';
import { SystemUser } from '../../system-user/system-user.entity';
import { ModificationStatus } from '../../../shared/enums';

@Entity('mark_license_modifications')
export class MarkLicenseModification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'original_license_id' })
  originalLicenseId: string;

  @ManyToOne(() => MarkLicenseAgreement, (agreement) => agreement.modifications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'original_license_id' })
  originalLicense: MarkLicenseAgreement;

  @Column({ name: 'agreement_id' })
  agreementId: string; // Reference for easy lookup

  // Modification Details
  @Column({ name: 'modification_types', type: 'text', array: true })
  modificationTypes: string[];

  @Column({ name: 'modification_reason', type: 'text' })
  modificationReason: string;

  @Column({ name: 'proposed_changes', type: 'text' })
  proposedChanges: string;

  @Column({ name: 'effective_date_request', type: 'date' })
  effectiveDateRequest: Date;

  @Column({ name: 'supporting_justification_path', nullable: true })
  supportingJustificationPath?: string;

  @Column({ name: 'impact_assessment', type: 'text', nullable: true })
  impactAssessment?: string;

  @Column({ name: 'fee_adjustment_needed', nullable: true })
  feeAdjustmentNeeded?: string; // 'YES', 'NO', 'TO_BE_DETERMINED'

  // Status
  @Column({ type: 'enum', enum: ModificationStatus, default: ModificationStatus.PENDING })
  status: ModificationStatus;

  @CreateDateColumn({ name: 'submitted_at', type: 'timestamp' })
  submittedAt: Date;

  @Column({ name: 'reviewed_at', type: 'timestamp', nullable: true })
  reviewedAt?: Date;

  @Column({ name: 'approved_at', type: 'timestamp', nullable: true })
  approvedAt?: Date;

  @Column({ name: 'rejected_at', type: 'timestamp', nullable: true })
  rejectedAt?: Date;

  @Column({ name: 'rejection_reason', type: 'text', nullable: true })
  rejectionReason?: string;

  @Column({ name: 'implemented_at', type: 'timestamp', nullable: true })
  implementedAt?: Date;

  // Implementation Details (if approved)
  @Column({ name: 'implemented_changes', type: 'jsonb', nullable: true })
  implementedChanges?: Record<string, any>;

  // Audit
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
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

  @Column({ name: 'reviewed_by', type: 'uuid', nullable: true })
  reviewedBy?: string;

  @ManyToOne(() => SystemUser, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'reviewed_by' })
  reviewedByUser?: SystemUser;
}

