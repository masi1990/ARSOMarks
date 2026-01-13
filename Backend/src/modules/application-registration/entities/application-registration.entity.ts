import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApplicationRegistrationStatus } from '../../../shared/enums';
import { Country } from '../../reference-data/entities/country.entity';
import { SystemUser } from '../../system-user/system-user.entity';

@Entity('application_registrations')
export class ApplicationRegistration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'application_number', unique: true, nullable: true })
  applicationNumber?: string;

  // Basic Information
  @Column({ name: 'applicant_name', length: 200, nullable: true })
  applicantName?: string;

  @Column({ name: 'applicant_type', length: 50, nullable: true })
  applicantType?: string;

  @Column({ name: 'registration_number', length: 50, nullable: true })
  registrationNumber?: string;

  @Column({ name: 'tax_id', length: 30, nullable: true })
  taxId?: string;

  @Column({ name: 'contact_person', length: 100, nullable: true })
  contactPerson?: string;

  @Column({ name: 'contact_email', length: 150, nullable: true })
  contactEmail?: string;

  @Column({ name: 'contact_phone', length: 20, nullable: true })
  contactPhone?: string;

  @Column({ name: 'physical_address', type: 'text', nullable: true })
  physicalAddress?: string;

  @Column({ name: 'city', length: 100, nullable: true })
  city?: string;

  @Column({ name: 'region_state', length: 100, nullable: true })
  regionState?: string;

  @Column({ name: 'postal_code', length: 20, nullable: true })
  postalCode?: string;

  @Column({ name: 'country_id', type: 'uuid', nullable: true })
  countryId?: string;

  @ManyToOne(() => Country, { nullable: true })
  @JoinColumn({ name: 'country_id' })
  country?: Country;

  // Additional Information
  @Column({ name: 'business_activity', type: 'text', nullable: true })
  businessActivity?: string;

  @Column({ name: 'year_established', type: 'int', nullable: true })
  yearEstablished?: number;

  @Column({ name: 'employee_count', type: 'int', nullable: true })
  employeeCount?: number;

  @Column({ name: 'annual_revenue', type: 'decimal', precision: 15, scale: 2, nullable: true })
  annualRevenue?: number;

  // Store nested data as JSON for flexibility (supports all operator registration fields)
  @Column({ name: 'company_info', type: 'jsonb', nullable: true })
  companyInfo?: any;

  @Column({ name: 'company_size', type: 'jsonb', nullable: true })
  companySize?: any;

  @Column({ name: 'ownership_info', type: 'jsonb', nullable: true })
  ownershipInfo?: any;

  @Column({ name: 'primary_contact', type: 'jsonb', nullable: true })
  primaryContact?: any;

  @Column({ name: 'locations', type: 'jsonb', nullable: true })
  locations?: any[];

  @Column({ name: 'business_sectors', type: 'jsonb', nullable: true })
  businessSectors?: any[];

  @Column({ name: 'market_info', type: 'jsonb', nullable: true })
  marketInfo?: any;

  @Column({ name: 'production_capacity', type: 'jsonb', nullable: true })
  productionCapacity?: any;

  @Column({ name: 'preferences', type: 'jsonb', nullable: true })
  preferences?: any;

  @Column({ name: 'accessibility', type: 'jsonb', nullable: true })
  accessibility?: any;

  @Column({ name: 'consents', type: 'jsonb', nullable: true })
  consents?: any;

  // Part B: Product & Certification Details
  @Column({ name: 'product_certification', type: 'jsonb', nullable: true })
  productCertification?: any;

  @Column({ name: 'manufacturer_info', type: 'jsonb', nullable: true })
  manufacturerInfo?: any;

  @Column({ name: 'conformity_evidence', type: 'jsonb', nullable: true })
  conformityEvidence?: any;

  @Column({ name: 'post_certification', type: 'jsonb', nullable: true })
  postCertification?: any;

  @Column({ name: 'cb_selection', type: 'jsonb', nullable: true })
  cbSelection?: any;

  // Status and Metadata
  @Column({
    name: 'status',
    type: 'enum',
    enum: ApplicationRegistrationStatus,
    default: ApplicationRegistrationStatus.DRAFT,
  })
  status: ApplicationRegistrationStatus;

  @Column({ name: 'submitted_at', type: 'timestamp', nullable: true })
  submittedAt?: Date;

  // User relationship
  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId?: string;

  @ManyToOne(() => SystemUser, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: SystemUser;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy?: string;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

