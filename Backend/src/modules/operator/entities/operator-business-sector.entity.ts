import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Operator } from './operator.entity';
import { MainBusinessSector } from '../../../shared/enums';

@Entity('operator_business_sectors')
export class OperatorBusinessSector {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'operator_id', type: 'uuid' })
  operatorId: string;

  @ManyToOne(() => Operator, (operator) => operator.businessSectors, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'operator_id' })
  operator: Operator;

  @Column({ name: 'main_sector', type: 'enum', enum: MainBusinessSector, nullable: true })
  mainSector?: MainBusinessSector;

  @Column({ name: 'sub_sector', type: 'text', array: true, nullable: true })
  subSector?: string[];

  @Column({ name: 'isic_code', length: 10, nullable: true })
  isicCode?: string;

  @Column({ name: 'product_categories', type: 'text', array: true, nullable: true })
  productCategories?: string[];

  @Column({ name: 'percentage_revenue', type: 'decimal', precision: 5, scale: 2, nullable: true })
  percentageRevenue?: number;

  @Column({ name: 'sector_start_year', type: 'int', nullable: true })
  sectorStartYear?: number;

  @Column({ name: 'sector_experience', type: 'int', nullable: true })
  sectorExperience?: number; // Auto-calculated

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

