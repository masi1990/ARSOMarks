import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LicenseApplication } from './license-application.entity';
import { ApplicationStatus } from '../../../shared/enums';
import { SystemUser } from '../../system-user/system-user.entity';

@Entity('application_workflow_history')
export class WorkflowHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'application_id' })
  applicationId: string;

  @ManyToOne(() => LicenseApplication, (app) => app.workflowHistory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'application_id' })
  application: LicenseApplication;

  @Column({ name: 'from_status', type: 'enum', enum: ApplicationStatus, nullable: true })
  fromStatus?: ApplicationStatus;

  @Column({ name: 'to_status', type: 'enum', enum: ApplicationStatus })
  toStatus: ApplicationStatus;

  @Column({ name: 'action_performed', length: 100 })
  actionPerformed: string;

  @Column({ name: 'performed_by', type: 'uuid' })
  performedBy: string;

  @ManyToOne(() => SystemUser, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'performed_by' })
  performedByUser?: SystemUser;

  @CreateDateColumn({ name: 'performed_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  performedAt: Date;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;
}

