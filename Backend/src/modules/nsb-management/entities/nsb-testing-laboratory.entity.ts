import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Nsb } from './nsb.entity';
import { AccreditationStatus } from '../../../shared/enums';

@Entity('nsb_testing_laboratories')
export class NsbTestingLaboratory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nsb_id' })
  nsbId: string;

  @ManyToOne(() => Nsb, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nsb_id' })
  nsb: Nsb;

  @Column({ length: 255 })
  name: string;

  @Column({ name: 'accreditation_status', type: 'varchar', length: 50, nullable: true })
  accreditationStatus?: AccreditationStatus;

  @Column({ name: 'other_accreditation_description', length: 255, nullable: true })
  otherAccreditationDescription?: string;

  @Column({ name: 'scope_of_accreditation', type: 'text', nullable: true })
  scopeOfAccreditation?: string;

  @Column({ name: 'contact_for_acap_referrals_name', length: 255, nullable: true })
  contactForAcapReferralsName?: string;

  @Column({ name: 'contact_for_acap_referrals_email', length: 255, nullable: true })
  contactForAcapReferralsEmail?: string;

  @Column({ name: 'contact_for_acap_referrals_phone', length: 50, nullable: true })
  contactForAcapReferralsPhone?: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

