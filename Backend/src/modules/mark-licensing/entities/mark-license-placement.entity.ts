import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MarkLicenseApplication } from './mark-license-application.entity';
import { SystemUser } from '../../system-user/system-user.entity';

@Entity('mark_license_placements')
export class MarkLicensePlacement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'application_id' })
  applicationId: string;

  @ManyToOne(() => MarkLicenseApplication, (application) => application.placements, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'application_id' })
  application: MarkLicenseApplication;

  @Column({ name: 'file_name' })
  fileName: string;

  @Column({ name: 'file_path' })
  filePath: string;

  @Column({ name: 'file_hash' })
  fileHash: string;

  @Column({ name: 'file_size', type: 'bigint' })
  fileSize: number;

  @Column({ name: 'mime_type', nullable: true })
  mimeType?: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'file_format', nullable: true })
  fileFormat?: string;

  @CreateDateColumn({ name: 'uploaded_at', type: 'timestamp' })
  uploadedAt: Date;

  @Column({ name: 'uploaded_by', type: 'uuid', nullable: true })
  uploadedBy?: string;

  @ManyToOne(() => SystemUser, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'uploaded_by' })
  uploadedByUser?: SystemUser;
}

