import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Region } from './region.entity';
import { CountryRecMembership } from './country-rec-membership.entity';
import { Nsb } from '../../nsb-management/entities/nsb.entity';

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'iso_code', unique: true, length: 2 })
  isoCode: string;

  @Column({ length: 100 })
  name: string;

  @Column({ name: 'continent', length: 50, nullable: true })
  continent?: string;

  @Column({ name: 'region_id', nullable: true })
  regionId?: string;

  @ManyToOne(() => Region, (region) => region.countries, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'region_id' })
  region?: Region;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => CountryRecMembership, (m) => m.country)
  recMemberships?: CountryRecMembership[];

  @OneToMany(() => Nsb, (nsb) => nsb.country)
  nsbs?: Nsb[];
}

