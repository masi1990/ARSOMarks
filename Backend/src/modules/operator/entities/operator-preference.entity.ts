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
  PreferredLanguage,
  CommunicationPreference,
  NotificationFrequency,
} from '../../../shared/enums';

@Entity('operator_preferences')
export class OperatorPreference {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'operator_id', type: 'uuid', unique: true })
  operatorId: string;

  @OneToOne(() => Operator, (operator) => operator.preferences, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'operator_id' })
  operator: Operator;

  @Column({ name: 'preferred_language', type: 'enum', enum: PreferredLanguage, default: PreferredLanguage.ENGLISH })
  preferredLanguage: PreferredLanguage;

  @Column({ name: 'communication_preferences', type: 'enum', enum: CommunicationPreference, array: true })
  communicationPreferences: CommunicationPreference[];

  @Column({ name: 'notification_frequency', type: 'enum', enum: NotificationFrequency, default: NotificationFrequency.DAILY_DIGEST })
  notificationFrequency: NotificationFrequency;

  @Column({ length: 50 })
  timezone: string;

  @Column({ length: 10, default: 'USD' })
  currency: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

