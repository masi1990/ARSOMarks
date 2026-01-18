import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CorrectiveActionStatus } from '../../../shared/enums';
import { CertificationAuditFinding } from './certification-audit-finding.entity';
import { SystemUser } from '../../system-user/system-user.entity';

@Entity('corrective_actions')
export class CorrectiveAction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'finding_id', type: 'uuid' })
  findingId: string;

  @ManyToOne(() => CertificationAuditFinding, (finding) => finding.correctiveActions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'finding_id' })
  finding?: CertificationAuditFinding;

  @Column({ type: 'text' })
  actionPlan: string;

  @Column({ name: 'evidence_notes', type: 'text', nullable: true })
  evidenceNotes?: string;

  @Column({ name: 'evidence_files', type: 'jsonb', nullable: true })
  evidenceFiles?: Record<string, any>[];

  @Column({ type: 'enum', enum: CorrectiveActionStatus, default: CorrectiveActionStatus.PENDING })
  status: CorrectiveActionStatus;

  @Column({ name: 'verified_by', type: 'uuid', nullable: true })
  verifiedBy?: string;

  @ManyToOne(() => SystemUser, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'verified_by' })
  verifiedByUser?: SystemUser;

  @Column({ name: 'verified_at', type: 'timestamp', nullable: true })
  verifiedAt?: Date;

  @Column({ name: 'decision_notes', type: 'text', nullable: true })
  decisionNotes?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
