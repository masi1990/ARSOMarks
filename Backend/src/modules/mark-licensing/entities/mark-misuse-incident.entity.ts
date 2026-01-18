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
import { MarkMisuseStatus } from '../../../shared/enums';
import { MarkLicenseAgreement } from './mark-license-agreement.entity';
import { SystemUser } from '../../system-user/system-user.entity';
import { MarkSanction } from './mark-sanction.entity';

@Entity('mark_misuse_incidents')
export class MarkMisuseIncident {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'license_id', type: 'uuid', nullable: true })
  licenseId?: string;

  @ManyToOne(() => MarkLicenseAgreement, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'license_id' })
  license?: MarkLicenseAgreement;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'evidence_files', type: 'jsonb', nullable: true })
  evidenceFiles?: Record<string, any>[];

  @Column({ type: 'enum', enum: MarkMisuseStatus, default: MarkMisuseStatus.OPEN })
  status: MarkMisuseStatus;

  @Column({ name: 'reported_by', type: 'uuid', nullable: true })
  reportedBy?: string;

  @ManyToOne(() => SystemUser, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'reported_by' })
  reportedByUser?: SystemUser;

  @Column({ name: 'reviewed_by', type: 'uuid', nullable: true })
  reviewedBy?: string;

  @ManyToOne(() => SystemUser, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'reviewed_by' })
  reviewedByUser?: SystemUser;

  @Column({ name: 'decision_notes', type: 'text', nullable: true })
  decisionNotes?: string;

  @CreateDateColumn({ name: 'reported_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  reportedAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => MarkSanction, (sanction) => sanction.incident, { cascade: true })
  sanctions?: MarkSanction[];
}
