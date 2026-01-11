import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Nsb } from './nsb.entity';

@Entity('nsb_customs_border_agencies')
export class NsbCustomsBorderAgency {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nsb_id' })
  nsbId: string;

  @ManyToOne(() => Nsb, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nsb_id' })
  nsb: Nsb;

  @Column({ name: 'agency_name', length: 255 })
  agencyName: string;

  @Column({ name: 'key_border_posts', type: 'text', array: true, default: [] })
  keyBorderPosts: string[];

  @Column({ name: 'acap_verification_contact_name', length: 255, nullable: true })
  acapVerificationContactName?: string;

  @Column({ name: 'acap_verification_contact_email', length: 255, nullable: true })
  acapVerificationContactEmail?: string;

  @Column({ name: 'acap_verification_contact_phone', length: 50, nullable: true })
  acapVerificationContactPhone?: string;

  @Column({ name: 'integration_with_national_single_window', default: false })
  integrationWithNationalSingleWindow: boolean;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

