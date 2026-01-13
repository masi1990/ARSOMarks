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
import { Nsb } from '../../nsb-management/entities/nsb.entity';
import { SystemUser } from '../../system-user/system-user.entity';
import { AgreementStatus } from '../../../shared/enums';
import { MarkLicenseApplication } from './mark-license-application.entity';
import { MarkLicenseAsset } from './mark-license-asset.entity';
import { MarkLicenseUsageReport } from './mark-license-usage-report.entity';
import { MarkLicenseModification } from './mark-license-modification.entity';
import { MarkLicenseCompliance } from './mark-license-compliance.entity';

@Entity('mark_license_agreements')
export class MarkLicenseAgreement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'agreement_id', unique: true })
  agreementId: string;

  @Column({ name: 'application_id', unique: true })
  applicationId: string;

  @OneToOne(() => MarkLicenseApplication, (application) => application.agreement, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'application_id' })
  application: MarkLicenseApplication;

  @Column({ name: 'nsb_id' })
  nsbId: string;

  @ManyToOne(() => Nsb, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nsb_id' })
  nsb: Nsb;

  // License Details
  @Column({ name: 'license_type_display' })
  licenseTypeDisplay: string;

  @Column({ name: 'license_start_date', type: 'date' })
  licenseStartDate: Date;

  @Column({ name: 'license_end_date', type: 'date' })
  licenseEndDate: Date;

  @Column({ name: 'license_terms_display', type: 'text', nullable: true })
  licenseTermsDisplay?: string;

  @Column({ name: 'royalty_fee_structure', type: 'jsonb', nullable: true })
  royaltyFeeStructure?: Record<string, any>;

  @Column({ name: 'payment_schedule', type: 'jsonb', nullable: true })
  paymentSchedule?: Record<string, any>;

  @Column({ name: 'usage_restrictions', type: 'text', nullable: true })
  usageRestrictions?: string;

  @Column({ name: 'termination_clauses', type: 'text', nullable: true })
  terminationClauses?: string;

  // NSB Signatory Details
  @Column({ name: 'nsb_signer_name' })
  nsbSignerName: string;

  @Column({ name: 'nsb_signer_title' })
  nsbSignerTitle: string;

  @Column({ name: 'nsb_signer_email' })
  nsbSignerEmail: string;

  @Column({ name: 'nsb_signer_ip', nullable: true })
  nsbSignerIp?: string;

  @Column({ name: 'nsb_signer_timestamp', type: 'timestamp', nullable: true })
  nsbSignerTimestamp?: Date;

  @Column({ name: 'nsb_signer_consent', default: false })
  nsbSignerConsent: boolean;

  @Column({ name: 'nsb_signature_image_path', nullable: true })
  nsbSignatureImagePath?: string;

  // ARSO Signatory Details
  @Column({ name: 'arso_signer_name', nullable: true })
  arsoSignerName?: string;

  @Column({ name: 'arso_signer_title', nullable: true })
  arsoSignerTitle?: string;

  @Column({ name: 'arso_signer_timestamp', type: 'timestamp', nullable: true })
  arsoSignerTimestamp?: Date;

  // Agreement Status
  @Column({
    name: 'agreement_status',
    type: 'enum',
    enum: AgreementStatus,
    default: AgreementStatus.DRAFT,
  })
  agreementStatus: AgreementStatus;

  @Column({ name: 'agreement_document_path', nullable: true })
  agreementDocumentPath?: string;

  // Audit
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy?: string;

  @ManyToOne(() => SystemUser, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'created_by' })
  createdByUser?: SystemUser;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy?: string;

  @ManyToOne(() => SystemUser, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'updated_by' })
  updatedByUser?: SystemUser;

  // Relations
  @OneToMany(() => MarkLicenseAsset, (asset) => asset.agreement, { cascade: true })
  assets?: MarkLicenseAsset[];

  @OneToMany(() => MarkLicenseUsageReport, (report) => report.license, { cascade: true })
  usageReports?: MarkLicenseUsageReport[];

  @OneToMany(() => MarkLicenseModification, (modification) => modification.originalLicense, {
    cascade: true,
  })
  modifications?: MarkLicenseModification[];

  @OneToMany(() => MarkLicenseCompliance, (compliance) => compliance.license, { cascade: true })
  complianceRecords?: MarkLicenseCompliance[];
}

