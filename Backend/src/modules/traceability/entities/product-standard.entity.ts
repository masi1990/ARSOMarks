import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../product-certification/entities/product.entity';
import { Standard } from './standard.entity';
import { ProductCertificationApplication } from '../../product-certification/entities/product-certification-application.entity';

@Entity('product_standards')
export class ProductStandard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'product_id', type: 'uuid' })
  productId: string;

  @ManyToOne(() => Product, (product) => product.standards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'standard_id', type: 'uuid' })
  standardId: string;

  @ManyToOne(() => Standard, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'standard_id' })
  standard: Standard;

  @Column({ name: 'certification_application_id', type: 'uuid', nullable: true })
  certificationApplicationId?: string;

  @ManyToOne(() => ProductCertificationApplication, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'certification_application_id' })
  certificationApplication?: ProductCertificationApplication;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}

