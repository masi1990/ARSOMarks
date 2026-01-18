import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CbDocumentType } from '../../../shared/enums';
import { SystemUser } from '../../system-user/system-user.entity';
import { CbApplication } from './cb-application.entity';

@Entity('cb_application_documents')
export class CbApplicationDocument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'application_id' })
  applicationId: string;

  @ManyToOne(() => CbApplication, (app) => app.documents, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'application_id' })
  application: CbApplication;

  @Column({ name: 'document_type', type: 'enum', enum: CbDocumentType })
  documentType: CbDocumentType;

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

  @CreateDateColumn({ name: 'uploaded_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  uploadedAt: Date;
}
