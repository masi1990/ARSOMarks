import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccreditationBody } from '../../reference-data/entities/accreditation-body.entity';
import { Country } from '../../reference-data/entities/country.entity';

@Entity('laboratories')
export class Laboratory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ name: 'country_id', type: 'uuid', nullable: true })
  countryId?: string;

  @ManyToOne(() => Country, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'country_id' })
  country?: Country;

  @Column({ name: 'accreditation_body_id', type: 'uuid', nullable: true })
  accreditationBodyId?: string;

  @ManyToOne(() => AccreditationBody, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'accreditation_body_id' })
  accreditationBody?: AccreditationBody;

  @Column({ name: 'accreditation_number', length: 100, nullable: true })
  accreditationNumber?: string;

  @Column({ name: 'is_accredited', type: 'boolean', default: false })
  isAccredited: boolean;

  @Column({ name: 'scope', type: 'text', nullable: true })
  scope?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
