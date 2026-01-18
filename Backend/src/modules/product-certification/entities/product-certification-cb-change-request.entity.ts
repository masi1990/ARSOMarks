import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CbChangeRequestStatus } from '../../../shared/enums';
import { ProductCertificationApplication } from './product-certification-application.entity';
import { SystemUser } from '../../system-user/system-user.entity';

@Entity('product_certification_cb_change_requests')
export class ProductCertificationCbChangeRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'application_id', type: 'uuid' })
  applicationId: string;

  @ManyToOne(() => ProductCertificationApplication, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'application_id' })
  application: ProductCertificationApplication;

  @Column({ name: 'current_cb_id', type: 'uuid', nullable: true })
  currentCbId?: string;

  @Column({ name: 'requested_cb_id', type: 'uuid', nullable: true })
  requestedCbId?: string;

  @Column({ type: 'text' })
  justification: string;

  @Column({ name: 'penalty_policy', type: 'text', nullable: true })
  penaltyPolicy?: string;

  @Column({ type: 'enum', enum: CbChangeRequestStatus, default: CbChangeRequestStatus.PENDING })
  status: CbChangeRequestStatus;

  @Column({ name: 'requested_by', type: 'uuid', nullable: true })
  requestedBy?: string;

  @ManyToOne(() => SystemUser, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'requested_by' })
  requestedByUser?: SystemUser;

  @Column({ name: 'reviewed_by', type: 'uuid', nullable: true })
  reviewedBy?: string;

  @ManyToOne(() => SystemUser, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'reviewed_by' })
  reviewedByUser?: SystemUser;

  @Column({ name: 'reviewed_at', type: 'timestamp', nullable: true })
  reviewedAt?: Date;

  @Column({ name: 'decision_reason', type: 'text', nullable: true })
  decisionReason?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
