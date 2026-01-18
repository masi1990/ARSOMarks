import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CertificationAgreementStatus, CertificationAgreementType } from '../../../shared/enums';
import { ProductCertificationApplication } from './product-certification-application.entity';
import { SystemUser } from '../../system-user/system-user.entity';

@Entity('product_certification_agreements')
export class ProductCertificationAgreement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'application_id', type: 'uuid' })
  applicationId: string;

  @ManyToOne(() => ProductCertificationApplication, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'application_id' })
  application: ProductCertificationApplication;

  @Column({ name: 'agreement_type', type: 'enum', enum: CertificationAgreementType })
  agreementType: CertificationAgreementType;

  @Column({
    name: 'status',
    type: 'enum',
    enum: CertificationAgreementStatus,
    default: CertificationAgreementStatus.PENDING_CB_APPROVAL,
  })
  status: CertificationAgreementStatus;

  @Column({ name: 'contract_start', type: 'date', nullable: true })
  contractStart?: string;

  @Column({ name: 'contract_end', type: 'date', nullable: true })
  contractEnd?: string;

  @Column({ name: 'signed_by_name', length: 150, nullable: true })
  signedByName?: string;

  @Column({ name: 'signed_at', type: 'timestamp', nullable: true })
  signedAt?: Date;

  @Column({ name: 'file_name', length: 255 })
  fileName: string;

  @Column({ name: 'file_path', length: 500 })
  filePath: string;

  @Column({ name: 'file_hash', length: 64 })
  fileHash: string;

  @Column({ name: 'file_size', type: 'bigint' })
  fileSize: number;

  @Column({ name: 'mime_type', length: 100, nullable: true })
  mimeType?: string;

  @Column({ name: 'uploaded_by', type: 'uuid', nullable: true })
  uploadedBy?: string;

  @ManyToOne(() => SystemUser, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'uploaded_by' })
  uploadedByUser?: SystemUser;

  @Column({ name: 'cb_approved_by', type: 'uuid', nullable: true })
  cbApprovedBy?: string;

  @ManyToOne(() => SystemUser, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'cb_approved_by' })
  cbApprovedByUser?: SystemUser;

  @Column({ name: 'cb_approved_at', type: 'timestamp', nullable: true })
  cbApprovedAt?: Date;

  @Column({ name: 'rejection_reason', type: 'text', nullable: true })
  rejectionReason?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
