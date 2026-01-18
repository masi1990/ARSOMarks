import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Coc } from './coc.entity';

@Entity('qr_tokens')
export class QrToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'coc_id', type: 'uuid' })
  cocId: string;

  @ManyToOne(() => Coc, (coc) => coc.tokens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'coc_id' })
  coc: Coc;

  @Column({ name: 'token', type: 'text' })
  token: string;

  @Column({ name: 'expires_at', type: 'timestamp', nullable: true })
  expiresAt?: Date;

  @Column({ name: 'last_used_at', type: 'timestamp', nullable: true })
  lastUsedAt?: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}

