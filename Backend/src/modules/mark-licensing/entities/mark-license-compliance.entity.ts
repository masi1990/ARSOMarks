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

@Entity('mark_license_compliance')
export class MarkLicenseCompliance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'license_id' })
  licenseId: string;

  @ManyToOne(() => MarkLicenseAgreement, (agreement) => agreement.complianceRecords, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'license_id' })
  license: MarkLicenseAgreement;

  // Compliance Check
  @Column({ name: 'compliance_type' })
  complianceType: string; // 'USAGE_COMPLIANCE', 'BRAND_GUIDELINES', etc.

  @Column({ name: 'check_date', type: 'date' })
  checkDate: Date;

  @Column({ name: 'checked_by', type: 'uuid', nullable: true })
  checkedBy?: string;

  @ManyToOne(() => SystemUser, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'checked_by' })
  checkedByUser?: SystemUser;

  // Findings
  @Column({ name: 'is_compliant', default: true })
  isCompliant: boolean;

  @Column({ name: 'findings', type: 'text', nullable: true })
  findings?: string;

  @Column({ name: 'violations', type: 'jsonb', nullable: true })
  violations?: Record<string, any>[];

  @Column({ name: 'corrective_actions_required', type: 'text', nullable: true })
  correctiveActionsRequired?: string;

  @Column({ name: 'corrective_actions_taken', type: 'text', nullable: true })
  correctiveActionsTaken?: string;

  // Follow-up
  @Column({ name: 'next_check_date', type: 'date', nullable: true })
  nextCheckDate?: Date;

  @Column({ name: 'resolved_at', type: 'timestamp', nullable: true })
  resolvedAt?: Date;

  // Audit
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}

