import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Nsb } from './nsb.entity';
import { MsaJurisdiction, MouStatus, SystemAccessLevel } from '../../../shared/enums';

@Entity('nsb_market_surveillance_authorities')
export class NsbMarketSurveillanceAuthority {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nsb_id' })
  nsbId: string;

  @ManyToOne(() => Nsb, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nsb_id' })
  nsb: Nsb;

  @Column({ name: 'agency_name', length: 255 })
  agencyName: string;

  @Column({ type: 'varchar', length: 50 })
  jurisdiction: MsaJurisdiction;

  @Column({ name: 'contact_person_name', length: 255 })
  contactPersonName: string;

  @Column({ name: 'contact_person_email', length: 255, nullable: true })
  contactPersonEmail?: string;

  @Column({ name: 'contact_person_phone', length: 50, nullable: true })
  contactPersonPhone?: string;

  @Column({ name: 'scope_of_authority', type: 'text', nullable: true })
  scopeOfAuthority?: string;

  @Column({ name: 'mou_status', type: 'varchar', length: 50, nullable: true })
  mouStatus?: MouStatus;

  @Column({ name: 'mou_document_path', length: 500, nullable: true })
  mouDocumentPath?: string;

  @Column({ name: 'mou_document_hash', length: 64, nullable: true })
  mouDocumentHash?: string;

  @Column({ name: 'system_access_level_requested', type: 'varchar', length: 50, nullable: true })
  systemAccessLevelRequested?: SystemAccessLevel;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

