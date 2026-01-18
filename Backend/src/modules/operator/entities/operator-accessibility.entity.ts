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
import {
  AssistiveTechType,
  DigitalLiteracyLevel,
  InternetAccessType,
  DeviceType,
} from '../../../shared/enums';

@Entity('operator_accessibility')
export class OperatorAccessibility {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'operator_id', type: 'uuid', unique: true })
  operatorId: string;

  @OneToOne(() => Operator, (operator) => operator.accessibility, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'operator_id' })
  operator: Operator;

  @Column({ name: 'assistive_tech', type: 'boolean', nullable: true })
  assistiveTech?: boolean;

  @Column({ name: 'disability_types', type: 'enum', enum: AssistiveTechType, array: true, nullable: true })
  disabilityTypes?: AssistiveTechType[];

  @Column({ name: 'special_assistance', type: 'text', nullable: true })
  specialAssistance?: string;

  @Column({ name: 'literacy_level', type: 'enum', enum: DigitalLiteracyLevel, nullable: true })
  literacyLevel?: DigitalLiteracyLevel;

  @Column({ name: 'internet_access', type: 'enum', enum: InternetAccessType, nullable: true })
  internetAccess?: InternetAccessType;

  @Column({ name: 'device_type', type: 'enum', enum: DeviceType, nullable: true })
  deviceType?: DeviceType;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

