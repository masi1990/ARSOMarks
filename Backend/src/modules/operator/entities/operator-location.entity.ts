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
import { Country } from '../../reference-data/entities/country.entity';
import { OperatorLocationType, FactoryType } from '../../../shared/enums';

@Entity('operator_locations')
export class OperatorLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'operator_id', type: 'uuid' })
  operatorId: string;

  @ManyToOne(() => Operator, (operator) => operator.locations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'operator_id' })
  operator: Operator;

  @Column({ name: 'location_type', type: 'enum', enum: OperatorLocationType, default: OperatorLocationType.REGISTERED_ADDRESS })
  locationType: OperatorLocationType;

  @Column({ name: 'physical_address', type: 'text' })
  physicalAddress: string;

  @Column({ name: 'address_line1', length: 100 })
  addressLine1: string;

  @Column({ name: 'address_line2', length: 100, nullable: true })
  addressLine2?: string;

  @Column({ name: 'postal_code', length: 20 })
  postalCode: string;

  @Column({ name: 'city_town', length: 100 })
  cityTown: string;

  @Column({ name: 'region_state', length: 100 })
  regionState: string;

  @Column({ name: 'country_id', type: 'uuid' })
  countryId: string;

  @ManyToOne(() => Country, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @Column({ name: 'gps_coordinates', length: 50, nullable: true })
  gpsCoordinates?: string;

  @Column({ name: 'factory_location_same', type: 'boolean', nullable: true })
  factoryLocationSame?: boolean;

  @Column({ name: 'factory_name', length: 200, nullable: true })
  factoryName?: string;

  @Column({ name: 'factory_type', type: 'enum', enum: FactoryType, nullable: true })
  factoryType?: FactoryType;

  @Column({ name: 'factory_size', type: 'decimal', precision: 10, scale: 2, nullable: true })
  factorySize?: number;

  @Column({ name: 'is_primary', type: 'boolean', default: false })
  isPrimary: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

