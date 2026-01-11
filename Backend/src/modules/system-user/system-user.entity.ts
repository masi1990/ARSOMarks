import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserRole } from '../../shared/enums';

@Entity('system_users')
export class SystemUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ name: 'full_name', length: 255 })
  fullName: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    nullable: true,
  })
  role?: UserRole;

  @Column({
    type: 'enum',
    enum: UserRole,
    array: true,
    default: [],
    nullable: false,
  })
  roles: UserRole[];

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'password_hash', nullable: true, length: 255 })
  passwordHash?: string;

  @Column({ name: 'password_reset_token', nullable: true, length: 255 })
  passwordResetToken?: string;

  @Column({ name: 'password_reset_expires', nullable: true, type: 'timestamp' })
  passwordResetExpires?: Date;

  @Column({ name: 'email_verified', default: false })
  emailVerified: boolean;

  @Column({ name: 'email_verification_token', nullable: true, length: 255 })
  emailVerificationToken?: string;

  @Column({ name: 'last_login', nullable: true, type: 'timestamp' })
  lastLogin?: Date;

  @Column({ name: 'failed_login_attempts', default: 0 })
  failedLoginAttempts: number;

  @Column({ name: 'locked_until', nullable: true, type: 'timestamp' })
  lockedUntil?: Date;

  @Column({ nullable: true, length: 50 })
  phone?: string;

  @Column({ name: 'organization_id', nullable: true, type: 'uuid' })
  organizationId?: string;

  @Column({ name: 'organization_type', nullable: true, length: 50 })
  organizationType?: string;

  @Column({ name: 'country_id', nullable: true, type: 'uuid' })
  countryId?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

