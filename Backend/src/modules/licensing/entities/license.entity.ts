import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LicenseApplication } from './license-application.entity';
import { Nsb } from '../../nsb-management/entities/nsb.entity';
import { LicenseStatus, LicenseType } from '../../../shared/enums';
import { LicenseCompliance } from './license-compliance.entity';
import { SystemUser } from '../../system-user/system-user.entity';

@Entity('licenses')
export class License {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'license_number', unique: true })
  licenseNumber: string;

  @Column({ name: 'application_id', unique: true })
  applicationId: string;

  @OneToOne(() => LicenseApplication, (app) => app.license, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'application_id' })
  application: LicenseApplication;

  @Column({ name: 'nsb_id' })
  nsbId: string;

  @ManyToOne(() => Nsb, (nsb) => nsb.licenses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nsb_id' })
  nsb: Nsb;

  @Column({ name: 'license_type', type: 'enum', enum: LicenseType, default: LicenseType.FULL })
  licenseType: LicenseType;

  @Column({ type: 'enum', enum: LicenseStatus, default: LicenseStatus.ACTIVE })
  status: LicenseStatus;

  @Column({ name: 'valid_from', type: 'date' })
  validFrom: string;

  @Column({ name: 'valid_until', type: 'date' })
  validUntil: string;

  @Column({ name: 'authorized_schemes', type: 'jsonb' })
  authorizedSchemes: Record<string, any>;

  @Column({ name: 'authorized_marks', type: 'jsonb', nullable: true })
  authorizedMarks?: Record<string, any>;

  @Column({ name: 'scope_description', type: 'text', nullable: true })
  scopeDescription?: string;

  @Column({ type: 'jsonb', nullable: true })
  conditions?: Record<string, any>;

  @Column({ name: 'annual_fee', type: 'decimal', precision: 15, scale: 2, nullable: true })
  annualFee?: string;

  @Column({ name: 'royalty_percentage', type: 'decimal', precision: 5, scale: 2, nullable: true })
  royaltyPercentage?: string;

  @Column({ name: 'certificate_url', length: 500, nullable: true })
  certificateUrl?: string;

  @Column({ name: 'qr_code_hash', length: 64, nullable: true })
  qrCodeHash?: string;

  @Column({ name: 'issued_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  issuedAt: Date;

  @Column({ name: 'issued_by', type: 'uuid', nullable: true })
  issuedBy?: string;

  @ManyToOne(() => SystemUser, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'issued_by' })
  issuedByUser?: SystemUser;

  @Column({ name: 'renewed_at', type: 'timestamp', nullable: true })
  renewedAt?: Date;

  @Column({ name: 'suspended_at', type: 'timestamp', nullable: true })
  suspendedAt?: Date;

  @Column({ name: 'suspension_reason', type: 'text', nullable: true })
  suspensionReason?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => LicenseCompliance, (c) => c.license)
  complianceItems?: LicenseCompliance[];
}

