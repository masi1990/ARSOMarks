import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Coc } from './coc.entity';
import { ProductCertificationApplication } from '../../product-certification/entities/product-certification-application.entity';

@Entity('coc_status_history')
export class CocStatusHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'coc_id', type: 'uuid' })
  cocId: string;

  @ManyToOne(() => Coc, (coc) => coc.history, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'coc_id' })
  coc: Coc;

  @Column({ name: 'application_id', type: 'uuid', nullable: true })
  applicationId?: string;

  @ManyToOne(() => ProductCertificationApplication, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'application_id' })
  application?: ProductCertificationApplication;

  @Column({ name: 'event', length: 50 })
  event: string;

  @Column({ name: 'reason', type: 'text', nullable: true })
  reason?: string;

  @Column({ name: 'actor_id', type: 'uuid', nullable: true })
  actorId?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}

