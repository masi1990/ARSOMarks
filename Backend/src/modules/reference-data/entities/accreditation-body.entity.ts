import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Country } from './country.entity';

@Entity('accreditation_bodies')
export class AccreditationBody {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ name: 'country_id', nullable: true })
  countryId?: string;

  @ManyToOne(() => Country, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'country_id' })
  country?: Country;

  @Column({ name: 'is_frac_mra_signatory', default: false })
  isFracMraSignatory: boolean;

  @Column({ name: 'mra_scope', type: 'jsonb', nullable: true })
  mraScope?: Record<string, any>;

  @Column({ name: 'contact_details', type: 'jsonb', nullable: true })
  contactDetails?: Record<string, any>;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

