import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AppealStatus } from '../../../shared/enums';
import { Complaint } from './complaint.entity';

@Entity('appeals')
export class Appeal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'appeal_number', unique: true })
  appealNumber: string;

  @Column({ name: 'complaint_id', type: 'uuid' })
  complaintId: string;

  @ManyToOne(() => Complaint, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'complaint_id' })
  complaint: Complaint;

  @Column({ name: 'appellant_name' })
  appellantName: string;

  @Column({ name: 'appellant_email' })
  appellantEmail: string;

  @Column({ name: 'appellant_phone', nullable: true })
  appellantPhone?: string;

  @Column({ name: 'reason', type: 'text' })
  reason: string;

  @Column({ type: 'enum', enum: AppealStatus, default: AppealStatus.RECEIVED })
  status: AppealStatus;

  @Column({ name: 'decision_notes', type: 'text', nullable: true })
  decisionNotes?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
