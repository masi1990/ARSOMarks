import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MarkSanctionStatus, MarkSanctionType } from '../../../shared/enums';
import { MarkMisuseIncident } from './mark-misuse-incident.entity';
import { SystemUser } from '../../system-user/system-user.entity';

@Entity('mark_sanctions')
export class MarkSanction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'incident_id', type: 'uuid' })
  incidentId: string;

  @ManyToOne(() => MarkMisuseIncident, (incident) => incident.sanctions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'incident_id' })
  incident?: MarkMisuseIncident;

  @Column({ name: 'sanction_type', type: 'enum', enum: MarkSanctionType })
  sanctionType: MarkSanctionType;

  @Column({ type: 'enum', enum: MarkSanctionStatus, default: MarkSanctionStatus.ACTIVE })
  status: MarkSanctionStatus;

  @Column({ name: 'start_date', type: 'date', nullable: true })
  startDate?: string;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy?: string;

  @ManyToOne(() => SystemUser, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'created_by' })
  createdByUser?: SystemUser;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
