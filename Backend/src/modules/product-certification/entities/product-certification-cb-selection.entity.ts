import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductCertificationApplication } from './product-certification-application.entity';
import { AuditLanguage, AuditTeamSize } from '../../../shared/enums';

@Entity('product_certification_cb_selection')
export class ProductCertificationCbSelection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'application_id', type: 'uuid', unique: true })
  applicationId: string;

  @OneToOne(() => ProductCertificationApplication, (application) => application.cbSelection, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'application_id' })
  application: ProductCertificationApplication;

  // E1: CB Preferences
  @Column({ name: 'preferred_cb', type: 'uuid', nullable: true })
  preferredCbId?: string; // References CB/NSB

  @Column({ name: 'cb_selection_reason', type: 'text' })
  cbSelectionReason: string;

  @Column({ name: 'previous_cb', type: 'boolean', default: false })
  previousCb: boolean;

  @Column({ name: 'previous_cb_name', length: 200, nullable: true })
  previousCbName?: string;

  @Column({ name: 'previous_certificate_number', length: 50, nullable: true })
  previousCertificateNumber?: string;

  // E2: Audit Requirements
  @Column({ name: 'audit_language', type: 'enum', enum: AuditLanguage })
  auditLanguage: AuditLanguage;

  @Column({ name: 'audit_timing', type: 'text' })
  auditTiming: string;

  @Column({ name: 'peak_periods', type: 'text' })
  peakPeriods: string;

  @Column({ name: 'special_requirements', type: 'text', nullable: true })
  specialRequirements?: string;

  @Column({ name: 'audit_team_size', type: 'enum', enum: AuditTeamSize })
  auditTeamSize: AuditTeamSize;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

