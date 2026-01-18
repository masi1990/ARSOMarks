import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Operator } from './operator.entity';
import { OperatorContactType } from '../../../shared/enums';

@Entity('operator_contacts')
export class OperatorContact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'operator_id', type: 'uuid' })
  operatorId: string;

  @ManyToOne(() => Operator, (operator) => operator.contacts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'operator_id' })
  operator: Operator;

  @Column({ name: 'contact_type', type: 'enum', enum: OperatorContactType, nullable: true })
  contactType?: OperatorContactType;

  @Column({ name: 'primary_contact', length: 100, nullable: true })
  primaryContact?: string;

  @Column({ name: 'contact_position', length: 100, nullable: true })
  contactPosition?: string;

  @Column({ name: 'contact_email', length: 150, nullable: true })
  contactEmail?: string;

  @Column({ name: 'contact_email_verified', type: 'boolean', nullable: true })
  contactEmailVerified?: boolean;

  @Column({ name: 'contact_email_verification_token', length: 255, nullable: true })
  contactEmailVerificationToken?: string;

  @Column({ name: 'contact_email_verified_at', type: 'timestamp', nullable: true })
  contactEmailVerifiedAt?: Date;

  @Column({ name: 'contact_phone', length: 20, nullable: true })
  contactPhone?: string;

  @Column({ name: 'contact_phone_verified', type: 'boolean', nullable: true })
  contactPhoneVerified?: boolean;

  @Column({ name: 'contact_phone_verification_code', length: 10, nullable: true })
  contactPhoneVerificationCode?: string;

  @Column({ name: 'contact_phone_verified_at', type: 'timestamp', nullable: true })
  contactPhoneVerifiedAt?: Date;

  @Column({ name: 'alt_contact', length: 100, nullable: true })
  altContact?: string;

  @Column({ name: 'alt_email', length: 150, nullable: true })
  altEmail?: string;

  @Column({ name: 'alt_phone', length: 20, nullable: true })
  altPhone?: string;

  @Column({ name: 'is_primary', type: 'boolean', default: false })
  isPrimary: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

