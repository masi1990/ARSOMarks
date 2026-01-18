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
import { SamplingStatus } from '../../../shared/enums';
import { CertificationAudit } from './certification-audit.entity';
import { TestResult } from './test-result.entity';
import { SystemUser } from '../../system-user/system-user.entity';

@Entity('sampling_records')
export class SamplingRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'audit_id', type: 'uuid' })
  auditId: string;

  @ManyToOne(() => CertificationAudit, (audit) => audit.samplingRecords, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'audit_id' })
  audit?: CertificationAudit;

  @Column({ type: 'enum', enum: SamplingStatus, default: SamplingStatus.PENDING })
  status: SamplingStatus;

  @Column({ name: 'sampling_method', type: 'text', nullable: true })
  samplingMethod?: string;

  @Column({ name: 'sampling_location', type: 'text', nullable: true })
  samplingLocation?: string;

  @Column({ name: 'quantity', type: 'decimal', precision: 10, scale: 2, nullable: true })
  quantity?: number;

  @Column({ name: 'quantity_unit', length: 30, nullable: true })
  quantityUnit?: string;

  @Column({ type: 'text', nullable: true })
  traceability?: string;

  @Column({ name: 'sampled_at', type: 'date', nullable: true })
  sampledAt?: string;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy?: string;

  @ManyToOne(() => SystemUser, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'created_by' })
  createdByUser?: SystemUser;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => TestResult, (result) => result.sampling, { cascade: true })
  testResults?: TestResult[];
}
