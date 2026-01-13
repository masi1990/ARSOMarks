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

  @Column({ name: 'parent_ministry', length: 255, nullable: true })
  parentMinistry?: string;

  @Column({ name: 'primary_contact_name', length: 255, nullable: true })
  acapVerificationContactName?: string;

  @Column({ name: 'coordinator_email', length: 255, nullable: true })
  acapVerificationContactEmail?: string;

  @Column({ name: 'coordinator_phone', length: 50, nullable: true })
  acapVerificationContactPhone?: string;

  @Column({ name: 'integration_status', type: 'varchar', length: 50, nullable: true })
  integrationStatus?: string;

  @Column({ name: 'integration_details', type: 'text', nullable: true })
  integrationDetails?: string;

  @Column({ name: 'api_available', type: 'varchar', length: 20, nullable: true })
  apiAvailable?: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

