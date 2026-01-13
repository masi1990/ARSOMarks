import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MarkLicenseAgreement } from './mark-license-agreement.entity';
import { SystemUser } from '../../system-user/system-user.entity';
import { AssetDeliveryMethod } from '../../../shared/enums';
import { MarkLicenseAssetDownload } from './mark-license-asset-download.entity';

@Entity('mark_license_assets')
export class MarkLicenseAsset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'agreement_id' })
  agreementId: string;

  @ManyToOne(() => MarkLicenseAgreement, (agreement) => agreement.assets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'agreement_id' })
  agreement: MarkLicenseAgreement;

  // Asset Request Details
  @CreateDateColumn({ name: 'asset_request_date', type: 'timestamp' })
  assetRequestDate: Date;

  @Column({ name: 'requested_assets', type: 'text', array: true })
  requestedAssets: string[];

  @Column({
    name: 'asset_delivery_method',
    type: 'enum',
    enum: AssetDeliveryMethod,
  })
  assetDeliveryMethod: AssetDeliveryMethod;

  @Column({ name: 'asset_recipient_name' })
  assetRecipientName: string;

  @Column({ name: 'asset_recipient_email' })
  assetRecipientEmail: string;

  @Column({ name: 'asset_use_confirmation', default: false })
  assetUseConfirmation: boolean;

  // Asset Files (JSONB array)
  @Column({ name: 'asset_files', type: 'jsonb', nullable: true })
  assetFiles?: Record<string, any>[];

  // Delivery Status
  @Column({ name: 'delivered_at', type: 'timestamp', nullable: true })
  deliveredAt?: Date;

  @Column({
    name: 'delivery_method_used',
    type: 'enum',
    enum: AssetDeliveryMethod,
    nullable: true,
  })
  deliveryMethodUsed?: AssetDeliveryMethod;

  @Column({ name: 'download_count', default: 0 })
  downloadCount: number;

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

  // Relations
  @OneToMany(() => MarkLicenseAssetDownload, (download) => download.asset, { cascade: true })
  downloads?: MarkLicenseAssetDownload[];
}

