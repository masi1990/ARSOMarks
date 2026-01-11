import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Nsb } from './nsb.entity';
import { NsbProfileDocumentType } from '../../../shared/enums';
import { SystemUser } from '../../system-user/system-user.entity';

@Entity('nsb_documents')
export class NsbDocument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nsb_id' })
  nsbId: string;

  @ManyToOne(() => Nsb, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nsb_id' })
  nsb?: Nsb;

  @Column({ name: 'document_type', type: 'enum', enum: NsbProfileDocumentType })
  documentType: NsbProfileDocumentType;

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

