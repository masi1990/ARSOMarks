import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('search_logs')
export class SearchLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'query', type: 'text', nullable: true })
  query?: string;

  @Column({ name: 'filters', type: 'jsonb', nullable: true })
  filters?: Record<string, any>;

  @Column({ name: 'ip', length: 64, nullable: true })
  ip?: string;

  @Column({ name: 'country', length: 100, nullable: true })
  country?: string;

  @Column({ name: 'city', length: 100, nullable: true })
  city?: string;

  @Column({ name: 'lat', type: 'decimal', precision: 10, scale: 6, nullable: true })
  lat?: number;

  @Column({ name: 'lon', type: 'decimal', precision: 10, scale: 6, nullable: true })
  lon?: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}

