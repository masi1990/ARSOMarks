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
import { ReportStatus } from '../../../shared/enums';

@Entity('mark_license_usage_reports')
export class MarkLicenseUsageReport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'report_number', unique: true })
  reportNumber: string;

  @Column({ name: 'license_id' })
  licenseId: string;

  @ManyToOne(() => MarkLicenseAgreement, (agreement) => agreement.usageReports, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'license_id' })
  license: MarkLicenseAgreement;

  @Column({ name: 'agreement_id' })
  agreementId: string; // Reference for easy lookup

  // Reporting Period
  @Column({ name: 'report_period_start', type: 'date' })
  reportPeriodStart: Date;

  @Column({ name: 'report_period_end', type: 'date' })
  reportPeriodEnd: Date;

  @Column({ name: 'report_year', type: 'integer' })
  reportYear: number;

  // Reporting Contact
  @Column({ name: 'nsb_contact_name' })
  nsbContactName: string;

  @Column({ name: 'nsb_contact_email' })
  nsbContactEmail: string;

  @CreateDateColumn({ name: 'report_submission_date', type: 'timestamp' })
  reportSubmissionDate: Date;

  // Usage Metrics (JSONB arrays)
  @Column({ name: 'promotional_usage_metrics', type: 'jsonb', nullable: true })
  promotionalUsageMetrics?: Record<string, any>[];

  @Column({ name: 'certification_usage_metrics', type: 'jsonb', nullable: true })
  certificationUsageMetrics?: Record<string, any>[];

  @Column({ name: 'impact_assessment', type: 'jsonb', nullable: true })
  impactAssessment?: Record<string, any>;

  // Compliance Declaration
  @Column({ name: 'compliance_checks', type: 'jsonb', nullable: true })
  complianceChecks?: Record<string, any>;

  @Column({ name: 'non_compliance_issues', type: 'text', nullable: true })
  nonComplianceIssues?: string;

  @Column({ name: 'corrective_actions_taken', type: 'text', nullable: true })
  correctiveActionsTaken?: string;

  @Column({ name: 'planned_usage_next_year', type: 'text' })
  plannedUsageNextYear: string;

  @Column({ name: 'renewal_intention', nullable: true })
  renewalIntention?: string; // 'YES', 'NO', 'UNDECIDED'

  // Supporting Evidence (JSONB arrays)
  @Column({ name: 'supporting_evidence', type: 'jsonb', nullable: true })
  supportingEvidence?: Record<string, any>[];

  @Column({ name: 'samples', type: 'jsonb', nullable: true })
  samples?: Record<string, any>[];

  @Column({ name: 'testimonials', type: 'jsonb', nullable: true })
  testimonials?: Record<string, any>[];

  // Status
  @Column({ type: 'enum', enum: ReportStatus, default: ReportStatus.DRAFT })
  status: ReportStatus;

  @Column({ name: 'submitted_at', type: 'timestamp', nullable: true })
  submittedAt?: Date;

  @Column({ name: 'reviewed_at', type: 'timestamp', nullable: true })
  reviewedAt?: Date;

  @Column({ name: 'approved_at', type: 'timestamp', nullable: true })
  approvedAt?: Date;

  @Column({ name: 'rejected_at', type: 'timestamp', nullable: true })
  rejectedAt?: Date;

  @Column({ name: 'rejection_reason', type: 'text', nullable: true })
  rejectionReason?: string;

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
}

