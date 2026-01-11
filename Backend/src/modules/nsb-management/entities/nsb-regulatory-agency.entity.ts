import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Nsb } from './nsb.entity';
import { RegulatoryAgencyType } from '../../../shared/enums';

@Entity('nsb_regulatory_agencies')
export class NsbRegulatoryAgency {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nsb_id' })
  nsbId: string;

  @ManyToOne(() => Nsb, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nsb_id' })
  nsb: Nsb;

  @Column({ name: 'agency_name', length: 255 })
  agencyName: string;

  @Column({ name: 'agency_type', type: 'varchar', length: 100 })
  agencyType: RegulatoryAgencyType;

  @Column({ name: 'other_type_description', length: 255, nullable: true })
  otherTypeDescription?: string;

  @Column({ name: 'contact_person_name', length: 255, nullable: true })
  contactPersonName?: string;

  @Column({ name: 'contact_person_email', length: 255, nullable: true })
  contactPersonEmail?: string;

  @Column({ name: 'contact_person_phone', length: 50, nullable: true })
  contactPersonPhone?: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

