import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MarkLicenseAsset } from './mark-license-asset.entity';
import { SystemUser } from '../../system-user/system-user.entity';

@Entity('mark_license_asset_downloads')
export class MarkLicenseAssetDownload {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'asset_id' })
  assetId: string;

  @ManyToOne(() => MarkLicenseAsset, (asset) => asset.downloads, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'asset_id' })
  asset: MarkLicenseAsset;

  @Column({ name: 'file_path' })
  filePath: string;

  @Column({ name: 'downloaded_by', type: 'uuid', nullable: true })
  downloadedBy?: string;

  @ManyToOne(() => SystemUser, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'downloaded_by' })
  downloadedByUser?: SystemUser;

  @CreateDateColumn({ name: 'downloaded_at', type: 'timestamp' })
  downloadedAt: Date;

  @Column({ name: 'ip_address', nullable: true })
  ipAddress?: string;

  @Column({ name: 'user_agent', type: 'text', nullable: true })
  userAgent?: string;
}

