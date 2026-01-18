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

@Entity('operator_consents')
export class OperatorConsent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'operator_id', type: 'uuid', unique: true })
  operatorId: string;

  @OneToOne(() => Operator, (operator) => operator.consents, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'operator_id' })
  operator: Operator;

  // Required Consents
  @Column({ name: 'data_consent', type: 'boolean', nullable: true })
  dataConsent?: boolean;

  @Column({ name: 'data_sharing_consent', type: 'boolean', nullable: true })
  dataSharingConsent?: boolean;

  @Column({ name: 'cross_border_data', type: 'boolean', nullable: true })
  crossBorderData?: boolean;

  @Column({ name: 'terms_acceptance', type: 'boolean', nullable: true })
  termsAcceptance?: boolean;

  // Optional Consents
  @Column({ name: 'marketing_consent', type: 'boolean', nullable: true })
  marketingConsent?: boolean;

  @Column({ name: 'sms_consent', type: 'boolean', nullable: true })
  smsConsent?: boolean;

  @Column({ name: 'whatsapp_consent', type: 'boolean', nullable: true })
  whatsappConsent?: boolean;

  // Declaration
  @Column({ name: 'declaration_signature', length: 100, nullable: true })
  declarationSignature?: string;

  @Column({ name: 'declaration_date', type: 'date', nullable: true })
  declarationDate?: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

