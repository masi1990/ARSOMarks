import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Nsb } from './nsb.entity';

@Entity('nsb_industry_associations')
export class NsbIndustryAssociation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nsb_id' })
  nsbId: string;

  @ManyToOne(() => Nsb, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nsb_id' })
  nsb: Nsb;

  @Column({ name: 'association_name', length: 255 })
  associationName: string;

  @Column({ name: 'sector_industry', length: 255, nullable: true })
  sectorIndustry?: string;

  @Column({ name: 'number_of_members', type: 'int', nullable: true })
  numberOfMembers?: number;

  @Column({ name: 'contact_person_name', length: 255, nullable: true })
  contactPersonName?: string;

  @Column({ name: 'contact_person_email', length: 255, nullable: true })
  contactPersonEmail?: string;

  @Column({ name: 'contact_person_phone', length: 50, nullable: true })
  contactPersonPhone?: string;

  @Column({ name: 'willingness_to_promote_acap', default: false })
  willingnessToPromoteAcap: boolean;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

