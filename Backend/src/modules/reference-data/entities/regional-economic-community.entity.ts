import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Country } from './country.entity';
import { CountryRecMembership } from './country-rec-membership.entity';

@Entity('regional_economic_communities')
export class RegionalEconomicCommunity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 10 })
  code: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'headquarters_country_id', nullable: true })
  headquartersCountryId?: string;

  @ManyToOne(() => Country, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'headquarters_country_id' })
  headquartersCountry?: Country;

  @Column({ name: 'established_date', type: 'date', nullable: true })
  establishedDate?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => CountryRecMembership, (m) => m.rec)
  memberships?: CountryRecMembership[];
}

