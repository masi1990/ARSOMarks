import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TestResultStatus } from '../../../shared/enums';
import { SamplingRecord } from './sampling-record.entity';
import { Laboratory } from './laboratory.entity';

@Entity('test_results')
export class TestResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'sampling_id', type: 'uuid' })
  samplingId: string;

  @ManyToOne(() => SamplingRecord, (sampling) => sampling.testResults, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sampling_id' })
  sampling?: SamplingRecord;

  @Column({ name: 'laboratory_id', type: 'uuid', nullable: true })
  laboratoryId?: string;

  @ManyToOne(() => Laboratory, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'laboratory_id' })
  laboratory?: Laboratory;

  @Column({ name: 'parameters', type: 'jsonb', nullable: true })
  parameters?: Record<string, any>;

  @Column({ name: 'report_file_path', length: 500, nullable: true })
  reportFilePath?: string;

  @Column({ name: 'result_status', type: 'enum', enum: TestResultStatus, default: TestResultStatus.PASS })
  resultStatus: TestResultStatus;

  @Column({ name: 'tested_at', type: 'date', nullable: true })
  testedAt?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
