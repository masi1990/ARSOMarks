import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { License } from './license.entity';
import { ComplianceStatus, ComplianceType } from '../../../shared/enums';
import { SystemUser } from '../../system-user/system-user.entity';

@Entity('license_compliance')
export class LicenseCompliance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'license_id' })
  licenseId: string;

  @ManyToOne(() => License, (license) => license.complianceItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'license_id' })
  license: License;

  @Column({ name: 'compliance_type', type: 'enum', enum: ComplianceType })
  complianceType: ComplianceType;

  @Column({ name: 'scheduled_date', type: 'date' })
  scheduledDate: string;

  @Column({ name: 'actual_date', type: 'date', nullable: true })
  actualDate?: string;

  @Column({ type: 'enum', enum: ComplianceStatus, default: ComplianceStatus.SCHEDULED })
  status: ComplianceStatus;

  @Column({ type: 'text', nullable: true })
  findings?: string;

  @Column({ name: 'corrective_actions', type: 'text', nullable: true })
  correctiveActions?: string;

  @Column({ name: 'next_due_date', type: 'date', nullable: true })
  nextDueDate?: string;

  @Column({ name: 'conducted_by', type: 'uuid', nullable: true })
  conductedBy?: string;

  @ManyToOne(() => SystemUser, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'conducted_by' })
  conductedByUser?: SystemUser;

  @Column({ name: 'report_url', length: 500, nullable: true })
  reportUrl?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

