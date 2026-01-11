import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Country } from './country.entity';
import { RegionalEconomicCommunity } from './regional-economic-community.entity';
import { MembershipStatus } from '../../../shared/enums';

@Entity('country_rec_memberships')
@Unique(['countryId', 'recId'])
export class CountryRecMembership {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'country_id' })
  countryId: string;

  @Column({ name: 'rec_id' })
  recId: string;

  @Column({ name: 'membership_status', type: 'enum', enum: MembershipStatus, default: MembershipStatus.MEMBER })
  membershipStatus: MembershipStatus;

  @Column({ name: 'joined_date', type: 'date', nullable: true })
  joinedDate?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Country, (country) => country.recMemberships, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @ManyToOne(() => RegionalEconomicCommunity, (rec) => rec.memberships, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'rec_id' })
  rec: RegionalEconomicCommunity;
}

