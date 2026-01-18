import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Operator } from './operator.entity';
import { Country } from '../../reference-data/entities/country.entity';
import { DomesticMarketType } from '../../../shared/enums';

@Entity('operator_markets')
export class OperatorMarket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'operator_id', type: 'uuid', unique: true })
  operatorId: string;

  @OneToOne(() => Operator, (operator) => operator.markets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'operator_id' })
  operator: Operator;

  @Column({ name: 'domestic_markets', type: 'enum', enum: DomesticMarketType, array: true, nullable: true })
  domesticMarkets?: DomesticMarketType[];

  @Column({ name: 'export_markets', type: 'uuid', array: true, nullable: true })
  exportMarkets?: string[]; // Array of country IDs

  @Column({ name: 'primary_export_market', type: 'uuid', nullable: true })
  primaryExportMarketId?: string;

  @ManyToOne(() => Country, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'primary_export_market' })
  primaryExportMarket?: Country;

  @Column({ name: 'export_start_year', type: 'int', nullable: true })
  exportStartYear?: number;

  @Column({ name: 'import_sources', type: 'uuid', array: true, nullable: true })
  importSources?: string[]; // Array of country IDs

  @Column({ name: 'afcfta_awareness', length: 20, nullable: true })
  afcftaAwareness?: string; // 'HIGH', 'MEDIUM', 'LOW', 'NONE'

  @Column({ name: 'trade_challenges', type: 'text', nullable: true })
  tradeChallenges?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

