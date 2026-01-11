import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Nsb } from './nsb.entity';
import { NsbLocationType } from '../../../shared/enums';
import { Country } from '../../reference-data/entities/country.entity';

@Entity('nsb_locations')
export class NsbLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nsb_id' })
  nsbId: string;

  @ManyToOne(() => Nsb, (nsb) => nsb.locations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nsb_id' })
  nsb: Nsb;

  @Column({ name: 'location_type', type: 'enum', enum: NsbLocationType })
  locationType: NsbLocationType;

  @Column({ name: 'address_line_1', length: 255, nullable: true })
  addressLine1?: string;

  @Column({ name: 'address_line_2', length: 255, nullable: true })
  addressLine2?: string;

  @Column({ length: 100, nullable: true })
  city?: string;

  @Column({ name: 'state_province', length: 100, nullable: true })
  stateProvince?: string;

  @Column({ name: 'postal_code', length: 50, nullable: true })
  postalCode?: string;

  @Column({ name: 'country_id', nullable: true })
  countryId?: string;

  @ManyToOne(() => Country, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'country_id' })
  country?: Country;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude?: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude?: number;

  @Column({ name: 'is_primary', default: false })
  isPrimary: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

