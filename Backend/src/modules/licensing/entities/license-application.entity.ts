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
import { ApplicationStatus, ApplicationType } from '../../../shared/enums';
import { ApplicationDocument } from './application-document.entity';
import { WorkflowHistory } from './workflow-history.entity';
import { License } from './license.entity';
import { SystemUser } from '../../system-user/system-user.entity';

@Entity('license_applications')
export class LicenseApplication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'application_number', unique: true })
  applicationNumber: string;

  @Column({ name: 'nsb_id' })
  nsbId: string;

  @ManyToOne(() => Nsb, (nsb) => nsb.licenseApplications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nsb_id' })
  nsb: Nsb;

  @Column({ name: 'application_type', type: 'enum', enum: ApplicationType, default: ApplicationType.FULL })
  applicationType: ApplicationType;

  @Column({ type: 'enum', enum: ApplicationStatus, default: ApplicationStatus.DRAFT })
  status: ApplicationStatus;

  @Column({ name: 'applied_schemes', type: 'jsonb', nullable: true })
  appliedSchemes?: Record<string, any>;

  @Column({ name: 'accreditation_details', type: 'jsonb', nullable: true })
  accreditationDetails?: Record<string, any>;

  @Column({ name: 'organizational_details', type: 'jsonb', nullable: true })
  organizationalDetails?: Record<string, any>;

  @Column({ name: 'financial_details', type: 'jsonb', nullable: true })
  financialDetails?: Record<string, any>;

  @Column({ name: 'technical_competence_details', type: 'jsonb', nullable: true })
  technicalCompetenceDetails?: Record<string, any>;

  @Column({ name: 'qms_details', type: 'jsonb', nullable: true })
  qmsDetails?: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  declarations?: Record<string, any>;

  @Column({ name: 'submission_data', type: 'jsonb', nullable: true })
  submissionData?: Record<string, any>;

  @Column({ name: 'is_provisional', default: false })
  isProvisional: boolean;

  @Column({ name: 'provisional_valid_until', type: 'date', nullable: true })
  provisionalValidUntil?: string;

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

  @OneToMany(() => ApplicationDocument, (doc) => doc.application, { cascade: true })
  documents?: ApplicationDocument[];

  @OneToMany(() => WorkflowHistory, (history) => history.application, { cascade: true })
  workflowHistory?: WorkflowHistory[];

  @OneToOne(() => License, (license) => license.application)
  license?: License;
}

