import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  OperatorType,
  LegalStructure,
  EmployeeCountRange,
  AnnualTurnoverRange,
  OwnershipType,
  SMECategory,
  OwnershipStatus,
  OperatorStatus,
  LegalRegistrationNumberType,
} from '../../../shared/enums';
import { Country } from '../../reference-data/entities/country.entity';
import { SystemUser } from '../../system-user/system-user.entity';
import { OperatorContact } from './operator-contact.entity';
import { OperatorLocation } from './operator-location.entity';
import { OperatorBusinessSector } from './operator-business-sector.entity';
import { OperatorMarket } from './operator-market.entity';
import { OperatorProductionCapacity } from './operator-production-capacity.entity';
import { OperatorPreference } from './operator-preference.entity';
import { OperatorAccessibility } from './operator-accessibility.entity';
import { OperatorConsent } from './operator-consent.entity';

@Entity('operators')
export class Operator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'registration_number', unique: true, nullable: true })
  registrationNumber?: string;

  // A1: Company Type & Legal Identity
  @Column({ name: 'operator_type', type: 'enum', enum: OperatorType, nullable: true })
  operatorType?: OperatorType;

  @Column({ name: 'company_legal_name', length: 200, nullable: true })
  companyLegalName?: string;

  @Column({ name: 'trading_name', length: 150, nullable: true })
  tradingName?: string;

  @Column({ name: 'registration_number_business', length: 50, nullable: true })
  registrationNumberBusiness?: string;

  @Column({ name: 'legal_registration_number_type', type: 'enum', enum: LegalRegistrationNumberType, nullable: true })
  legalRegistrationNumberType?: LegalRegistrationNumberType;

  @Column({ name: 'legal_registration_number', length: 100, nullable: true })
  legalRegistrationNumber?: string;

  @Column({ name: 'tax_id', length: 30, nullable: true })
  taxId?: string;

  @Column({ name: 'vat_number', length: 30, nullable: true })
  vatNumber?: string;

  @Column({ name: 'year_established', type: 'int', nullable: true })
  yearEstablished?: number;

  @Column({ name: 'company_age', type: 'int', nullable: true })
  companyAge?: number; // Auto-calculated

  @Column({ name: 'legal_structure', type: 'enum', enum: LegalStructure, nullable: true })
  legalStructure?: LegalStructure;

  @Column({ name: 'business_activity', type: 'text', nullable: true })
  businessActivity?: string;

  // A2: Company Size & Financial Information
  @Column({ name: 'employee_count', type: 'enum', enum: EmployeeCountRange, nullable: true })
  employeeCount?: EmployeeCountRange;

  @Column({ name: 'annual_turnover', type: 'enum', enum: AnnualTurnoverRange, nullable: true })
  annualTurnover?: AnnualTurnoverRange;

  @Column({ name: 'annual_revenue', type: 'decimal', precision: 15, scale: 2, nullable: true })
  annualRevenue?: number;

  @Column({ name: 'export_percentage', type: 'decimal', precision: 5, scale: 2, nullable: true })
  exportPercentage?: number;

  @Column({ name: 'import_percentage', type: 'decimal', precision: 5, scale: 2, nullable: true })
  importPercentage?: number;

  @Column({ name: 'capital_investment', type: 'decimal', precision: 15, scale: 2, nullable: true })
  capitalInvestment?: number;

  // A3: Ownership & Beneficial Ownership (KYC)
  @Column({ name: 'ownership_type', type: 'enum', enum: OwnershipType, nullable: true })
  ownershipType?: OwnershipType;

  @Column({ name: 'majority_owner_nationality', length: 50, nullable: true })
  majorityOwnerNationality?: string;

  @Column({ name: 'women_owned', type: 'enum', enum: OwnershipStatus, nullable: true })
  womenOwned?: OwnershipStatus;

  @Column({ name: 'youth_owned', type: 'enum', enum: OwnershipStatus, nullable: true })
  youthOwned?: OwnershipStatus;

  @Column({ name: 'black_owned_percentage', type: 'decimal', precision: 5, scale: 2, nullable: true })
  blackOwnedPercentage?: number;

  @Column({ name: 'sme_category', type: 'enum', enum: SMECategory, nullable: true })
  smeCategory?: SMECategory; // Auto-calculated

  @Column({ name: 'beneficial_owners_count', type: 'int', nullable: true })
  beneficialOwnersCount?: number;

  @Column({ name: 'pep_involved', type: 'boolean', nullable: true })
  pepInvolved?: boolean;

  @Column({ name: 'pep_details', type: 'text', nullable: true })
  pepDetails?: string;

  @Column({ name: 'is_group', type: 'boolean', default: false })
  isGroup?: boolean;

  @Column({ name: 'group_manager_id', type: 'uuid', nullable: true })
  groupManagerId?: string;

  @Column({ name: 'group_members', type: 'jsonb', nullable: true })
  groupMembers?: Record<string, any>[];

  // Status & Workflow
  @Column({ type: 'enum', enum: OperatorStatus, default: OperatorStatus.DRAFT })
  status: OperatorStatus;

  @Column({ name: 'submitted_at', type: 'timestamp', nullable: true })
  submittedAt?: Date;

  @Column({ name: 'approved_at', type: 'timestamp', nullable: true })
  approvedAt?: Date;

  @Column({ name: 'rejected_at', type: 'timestamp', nullable: true })
  rejectedAt?: Date;

  @Column({ name: 'rejection_reason', type: 'text', nullable: true })
  rejectionReason?: string;

  // Foreign keys
  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId?: string;

  @ManyToOne(() => SystemUser, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user?: SystemUser;

  @Column({ name: 'country_id', type: 'uuid', nullable: true })
  countryId?: string;

  @ManyToOne(() => Country, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'country_id' })
  country?: Country;

  // Audit columns
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy?: string;

  @ManyToOne(() => SystemUser, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'created_by' })
  createdByUser?: SystemUser;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy?: string;

  @ManyToOne(() => SystemUser, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'updated_by' })
  updatedByUser?: SystemUser;

  // Relations
  @OneToMany(() => OperatorContact, (contact) => contact.operator, { cascade: true })
  contacts?: OperatorContact[];

  @OneToMany(() => OperatorLocation, (location) => location.operator, { cascade: true })
  locations?: OperatorLocation[];

  @OneToMany(() => OperatorBusinessSector, (sector) => sector.operator, { cascade: true })
  businessSectors?: OperatorBusinessSector[];

  @OneToOne(() => OperatorMarket, (market) => market.operator, { cascade: true })
  markets?: OperatorMarket;

  @OneToOne(() => OperatorProductionCapacity, (capacity) => capacity.operator, { cascade: true })
  productionCapacity?: OperatorProductionCapacity;

  @OneToOne(() => OperatorPreference, (preference) => preference.operator, { cascade: true })
  preferences?: OperatorPreference;

  @OneToOne(() => OperatorAccessibility, (accessibility) => accessibility.operator, { cascade: true })
  accessibility?: OperatorAccessibility;

  @OneToOne(() => OperatorConsent, (consent) => consent.operator, { cascade: true })
  consents?: OperatorConsent;
}

