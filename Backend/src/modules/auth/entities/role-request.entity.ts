import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleRequestStatus, UserRole } from '../../../shared/enums';
import { SystemUser } from '../../system-user/system-user.entity';

@Entity('role_requests')
export class RoleRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => SystemUser, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: SystemUser;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({
    name: 'requested_roles',
    type: 'enum',
    enum: UserRole,
    array: true,
  })
  requestedRoles: UserRole[];

  @Column({
    type: 'enum',
    enum: RoleRequestStatus,
    default: RoleRequestStatus.PENDING,
  })
  status: RoleRequestStatus;

  @Column({ name: 'decision_note', type: 'text', nullable: true })
  decisionNote?: string | null;

  @Column({ name: 'reviewed_by', type: 'uuid', nullable: true })
  reviewedBy?: string | null;

  @Column({ name: 'reviewed_at', type: 'timestamp', nullable: true })
  reviewedAt?: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

