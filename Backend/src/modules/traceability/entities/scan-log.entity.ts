import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Coc } from './coc.entity';
import { Product } from '../../product-certification/entities/product.entity';
import { ProductCertificationApplication } from '../../product-certification/entities/product-certification-application.entity';

@Entity('scan_logs')
export class ScanLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'coc_id', type: 'uuid', nullable: true })
  cocId?: string;

  @ManyToOne(() => Coc, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'coc_id' })
  coc?: Coc;

  @Column({ name: 'product_id', type: 'uuid', nullable: true })
  productId?: string;

  @ManyToOne(() => Product, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'product_id' })
  product?: Product;

  @Column({ name: 'application_id', type: 'uuid', nullable: true })
  applicationId?: string;

  @ManyToOne(() => ProductCertificationApplication, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'application_id' })
  application?: ProductCertificationApplication;

  @Column({ name: 'token', type: 'text', nullable: true })
  token?: string;

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

  @Column({ name: 'user_agent', type: 'text', nullable: true })
  userAgent?: string;

  @Column({ name: 'result', length: 50, nullable: true })
  result?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}

