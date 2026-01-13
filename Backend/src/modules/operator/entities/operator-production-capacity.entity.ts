import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Operator } from './operator.entity';
import { QMSType } from '../../../shared/enums';

@Entity('operator_production_capacity')
export class OperatorProductionCapacity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'operator_id', type: 'uuid', unique: true })
  operatorId: string;

  @OneToOne(() => Operator, (operator) => operator.productionCapacity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'operator_id' })
  operator: Operator;

  @Column({ name: 'production_capacity', type: 'decimal', precision: 15, scale: 2 })
  productionCapacity: number;

  @Column({ name: 'capacity_unit', length: 20 })
  capacityUnit: string;

  @Column({ name: 'capacity_utilization', type: 'decimal', precision: 5, scale: 2 })
  capacityUtilization: number;

  @Column({ name: 'quality_management', length: 20 })
  qualityManagement: string; // 'YES', 'NO', 'IN_PROGRESS'

  @Column({ name: 'qms_type', type: 'enum', enum: QMSType, nullable: true })
  qmsType?: QMSType;

  @Column({ name: 'certification_count', type: 'int', default: 0 })
  certificationCount: number;

  @Column({ name: 'existing_certifications', type: 'text', nullable: true })
  existingCertifications?: string;

  @Column({ name: 'technical_staff', type: 'int', default: 0 })
  technicalStaff: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

