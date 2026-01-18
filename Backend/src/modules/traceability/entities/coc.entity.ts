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
import { Product } from '../../product-certification/entities/product.entity';
import { ProductCertificationApplication } from '../../product-certification/entities/product-certification-application.entity';
import { Country } from '../../reference-data/entities/country.entity';
import { QrToken } from './qr-token.entity';
import { CocStatusHistory } from './coc-status-history.entity';

export enum CocStatus {
  ISSUED = 'ISSUED',
  VALID = 'VALID',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
}

@Entity('cocs')
export class Coc {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'coc_number', length: 100, unique: true })
  cocNumber: string;

  @Column({ name: 'product_id', type: 'uuid' })
  productId: string;

  @ManyToOne(() => Product, (product) => product.cocs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'application_id', type: 'uuid' })
  applicationId: string;

  @ManyToOne(() => ProductCertificationApplication, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'application_id' })
  application: ProductCertificationApplication;

  @Column({ name: 'status', type: 'enum', enum: CocStatus, default: CocStatus.ISSUED })
  status: CocStatus;

  @Column({ name: 'public_url', type: 'text', nullable: true })
  publicUrl?: string;

  @Column({ name: 'qr_payload_sig', type: 'text', nullable: true })
  qrPayloadSig?: string;

  @Column({ name: 'issued_at', type: 'timestamp', nullable: true })
  issuedAt?: Date;

  @Column({ name: 'expires_at', type: 'timestamp', nullable: true })
  expiresAt?: Date;

  @Column({ name: 'revoked_at', type: 'timestamp', nullable: true })
  revokedAt?: Date;

  @Column({ name: 'checksum', length: 12, nullable: true })
  checksum?: string;

  @Column({ name: 'origin_country_id', type: 'uuid', nullable: true })
  originCountryId?: string;

  @ManyToOne(() => Country, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'origin_country_id' })
  originCountry?: Country;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => QrToken, (token) => token.coc)
  tokens?: QrToken[];

  @OneToMany(() => CocStatusHistory, (history) => history.coc)
  history?: CocStatusHistory[];
}

