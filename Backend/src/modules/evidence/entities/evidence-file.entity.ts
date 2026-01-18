import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { EvidenceParentType } from '../../../shared/enums';

@Entity('evidence_files')
@Index(['parentType', 'parentId'])
export class EvidenceFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'parent_type', type: 'enum', enum: EvidenceParentType, enumName: 'evidence_parent_type' })
  parentType: EvidenceParentType;

  @Column({ name: 'parent_id', type: 'uuid' })
  parentId: string;

  @Column({ name: 'original_name', type: 'text' })
  originalName: string;

  @Column({ name: 'stored_name', type: 'text' })
  storedName: string;

  @Column({ name: 'stored_path', type: 'text' })
  storedPath: string;

  @Column({ name: 'mime_type', type: 'text' })
  mimeType: string;

  @Column({ type: 'integer' })
  size: number;

  @Column({ type: 'text' })
  hash: string;

  @Column({ name: 'uploaded_by', type: 'uuid', nullable: true })
  uploadedBy?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
