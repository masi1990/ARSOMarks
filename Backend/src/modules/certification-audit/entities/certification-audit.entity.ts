import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CertificationAuditType, ComplianceStatus } from '../../../shared/enums';
import { ProductCertificationApplication } from '../../product-certification/entities/product-certification-application.entity';
import { SystemUser } from '../../system-user/system-user.entity';
import { CertificationAuditFinding } from './certification-audit-finding.entity';
import { SamplingRecord } from './sampling-record.entity';

@Entity('certification_audits')
export class CertificationAudit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'application_id', type: 'uuid' })
  applicationId: string;

  @ManyToOne(() => ProductCertificationApplication, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'application_id' })
  application?: ProductCertificationApplication;

  @Column({ name: 'audit_type', type: 'enum', enum: CertificationAuditType })
  auditType: CertificationAuditType;

  @Column({ type: 'enum', enum: ComplianceStatus, default: ComplianceStatus.SCHEDULED })
  status: ComplianceStatus;

  @Column({ name: 'planned_date', type: 'date', nullable: true })
  plannedDate?: string;

  @Column({ name: 'actual_date', type: 'date', nullable: true })
  actualDate?: string;

  @Column({ name: 'window_start', type: 'date', nullable: true })
  windowStart?: string;

  @Column({ name: 'window_end', type: 'date', nullable: true })
  windowEnd?: string;

  @Column({ name: 'is_unannounced', type: 'boolean', default: false })
  isUnannounced: boolean;

  @Column({ type: 'text', nullable: true })
  notes?: string;

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

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => CertificationAuditFinding, (finding) => finding.audit, { cascade: true })
  findings?: CertificationAuditFinding[];

  @OneToMany(() => SamplingRecord, (sampling) => sampling.audit, { cascade: true })
  samplingRecords?: SamplingRecord[];
}
