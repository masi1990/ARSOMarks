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
import { AuditFindingStatus, AuditFindingType } from '../../../shared/enums';
import { CertificationAudit } from './certification-audit.entity';
import { CorrectiveAction } from './corrective-action.entity';
import { SystemUser } from '../../system-user/system-user.entity';

@Entity('certification_audit_findings')
export class CertificationAuditFinding {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'audit_id', type: 'uuid' })
  auditId: string;

  @ManyToOne(() => CertificationAudit, (audit) => audit.findings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'audit_id' })
  audit?: CertificationAudit;

  @Column({ name: 'finding_type', type: 'enum', enum: AuditFindingType })
  findingType: AuditFindingType;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'deadline_date', type: 'date', nullable: true })
  deadlineDate?: string;

  @Column({ type: 'enum', enum: AuditFindingStatus, default: AuditFindingStatus.OPEN })
  status: AuditFindingStatus;

  @Column({ name: 'closed_at', type: 'timestamp', nullable: true })
  closedAt?: Date;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy?: string;

  @ManyToOne(() => SystemUser, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'created_by' })
  createdByUser?: SystemUser;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => CorrectiveAction, (action) => action.finding, { cascade: true })
  correctiveActions?: CorrectiveAction[];
}
