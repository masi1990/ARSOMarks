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
import { Nsb } from '../../nsb-management/entities/nsb.entity';
import { SystemUser } from '../../system-user/system-user.entity';
import { MarkLicenseStatus, MarkType, LicenseDurationType } from '../../../shared/enums';
import { MarkLicensePlacement } from './mark-license-placement.entity';
import { MarkLicenseAgreement } from './mark-license-agreement.entity';

@Entity('mark_license_applications')
export class MarkLicenseApplication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'application_number', unique: true })
  applicationNumber: string;

  @Column({ name: 'nsb_id' })
  nsbId: string;

  @ManyToOne(() => Nsb, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nsb_id' })
  nsb: Nsb;

  @Column({ name: 'nsb_applicant_name' })
  nsbApplicantName: string;

  @Column({ name: 'application_date', type: 'date', default: () => 'CURRENT_DATE' })
  applicationDate: Date;

  @Column({ name: 'application_reference', nullable: true })
  applicationReference?: string;

  // License Type Information
  @Column({ name: 'license_types', type: 'text', array: true })
  licenseTypes: string[];

  @Column({ name: 'license_duration', type: 'enum', enum: LicenseDurationType })
  licenseDuration: LicenseDurationType;

  @Column({ name: 'license_duration_other', type: 'text', nullable: true })
  licenseDurationOther?: string;

  // License Type Specific Details (JSONB)
  @Column({ name: 'promotional_license_details', type: 'jsonb', nullable: true })
  promotionalLicenseDetails?: Record<string, any>;

  @Column({ name: 'certification_body_details', type: 'jsonb', nullable: true })
  certificationBodyDetails?: Record<string, any>;

  @Column({ name: 'special_project_details', type: 'jsonb', nullable: true })
  specialProjectDetails?: Record<string, any>;

  // Intended Use Details (JSONB arrays)
  @Column({ name: 'media_usage', type: 'jsonb', nullable: true })
  mediaUsage?: Record<string, any>[];

  @Column({ name: 'campaign_timeline', type: 'jsonb', nullable: true })
  campaignTimeline?: Record<string, any>[];

  @Column({ name: 'expected_impact_metrics', type: 'jsonb', nullable: true })
  expectedImpactMetrics?: Record<string, any>;

  // Mark Usage Specifications
  @Column({ name: 'marks_requested', type: 'enum', enum: MarkType, array: true })
  marksRequested: MarkType[];

  @Column({ name: 'mark_colors_needed', type: 'text', array: true, nullable: true })
  markColorsNeeded?: string[];

  @Column({ name: 'mark_sizes_needed', type: 'text', nullable: true })
  markSizesNeeded?: string;

  @Column({ name: 'mark_languages', type: 'text', array: true, nullable: true })
  markLanguages?: string[];

  // Compliance Declarations
  @Column({ name: 'annex_b_compliance', default: false })
  annexBCompliance: boolean;

  @Column({ name: 'brand_guidelines_ack', default: false })
  brandGuidelinesAck: boolean;

  @Column({ name: 'modification_policy_acceptance', default: false })
  modificationPolicyAcceptance: boolean;

  // Supporting Documents (JSONB array)
  @Column({ name: 'supporting_documents', type: 'jsonb', nullable: true })
  supportingDocuments?: Record<string, any>[];

  // Declarations
  @Column({ name: 'declaration_signatory' })
  declarationSignatory: string;

  @Column({ name: 'signatory_title' })
  signatoryTitle: string;

  @Column({ name: 'signatory_email' })
  signatoryEmail: string;

  @Column({ name: 'audit_rights_acceptance', default: false })
  auditRightsAcceptance: boolean;

  @Column({ name: 'annual_reporting_commitment', default: false })
  annualReportingCommitment: boolean;

  @Column({ name: 'data_sharing_consent', default: false })
  dataSharingConsent: boolean;

  // Status and Workflow
  @Column({ type: 'enum', enum: MarkLicenseStatus, default: MarkLicenseStatus.DRAFT })
  status: MarkLicenseStatus;

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

  // Relations
  @OneToMany(() => MarkLicensePlacement, (placement) => placement.application, { cascade: true })
  placements?: MarkLicensePlacement[];

  @OneToOne(() => MarkLicenseAgreement, (agreement) => agreement.application)
  agreement?: MarkLicenseAgreement;
}

