import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ComplaintStatus } from '../../../shared/enums';

@Entity('complaints')
export class Complaint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'complaint_number', unique: true })
  complaintNumber: string;

  @Column({ name: 'complainant_name' })
  complainantName: string;

  @Column({ name: 'complainant_email' })
  complainantEmail: string;

  @Column({ name: 'complainant_phone', nullable: true })
  complainantPhone?: string;

  @Column({ name: 'subject', type: 'text' })
  subject: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'evidence_files', type: 'jsonb', nullable: true })
  evidenceFiles?: Record<string, any>[];

  @Column({ name: 'reference_type', type: 'text', nullable: true })
  referenceType?: string;

  @Column({ name: 'reference_id', type: 'uuid', nullable: true })
  referenceId?: string;

  @Column({ type: 'enum', enum: ComplaintStatus, default: ComplaintStatus.RECEIVED })
  status: ComplaintStatus;

  @Column({ name: 'decision_notes', type: 'text', nullable: true })
  decisionNotes?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
