import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Nsb } from './nsb.entity';
import { NsbContactType } from '../../../shared/enums';

@Entity('nsb_contacts')
export class NsbContact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nsb_id' })
  nsbId: string;

  @ManyToOne(() => Nsb, (nsb) => nsb.contacts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nsb_id' })
  nsb: Nsb;

  @Column({ name: 'contact_type', type: 'enum', enum: NsbContactType })
  contactType: NsbContactType;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 100, nullable: true })
  designation?: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 50, nullable: true })
  phone?: string;

  @Column({ length: 50, nullable: true })
  mobile?: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

