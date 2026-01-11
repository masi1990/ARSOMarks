import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Country } from '../../reference-data/entities/country.entity';
import { NsbContact } from './nsb-contact.entity';
import { NsbLocation } from './nsb-location.entity';
import { NsbDocument } from './nsb-document.entity';
import { NsbClassification, NsbStatus } from '../../../shared/enums';
import { LicenseApplication } from '../../licensing/entities/license-application.entity';
import { License } from '../../licensing/entities/license.entity';
import { SystemUser } from '../../system-user/system-user.entity';

@Entity('nsb')
export class Nsb {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ name: 'short_name', length: 100, nullable: true })
  shortName?: string;

  @Column({ name: 'country_id' })
  countryId: string;

  @ManyToOne(() => Country, (country) => country.nsbs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @Column({ type: 'enum', enum: NsbClassification })
  classification: NsbClassification;

  @Column({ name: 'registration_number', length: 100, nullable: true })
  registrationNumber?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: NsbStatus, default: NsbStatus.ACTIVE })
  status: NsbStatus;

  // Stage 1.2: Additional Profile Fields
  @Column({ name: 'website_url', length: 500, nullable: true })
  websiteUrl?: string;

  @Column({ name: 'social_media_handles', type: 'jsonb', nullable: true })
  socialMediaHandles?: Record<string, string>;

  @Column({ name: 'total_staff', type: 'int', nullable: true })
  totalStaff?: number;

  @Column({ name: 'key_departments', type: 'text', array: true, nullable: true })
  keyDepartments?: string[];

  @Column({ name: 'national_standards_act_link', length: 500, nullable: true })
  nationalStandardsActLink?: string;

  @Column({ name: 'national_conformity_assessment_policy_link', length: 500, nullable: true })
  nationalConformityAssessmentPolicyLink?: string;

  @Column({ name: 'national_quality_policy_link', length: 500, nullable: true })
  nationalQualityPolicyLink?: string;

  @Column({ name: 'acap_coordinator_name', length: 255, nullable: true })
  acapCoordinatorName?: string;

  @Column({ name: 'acap_coordinator_contact', length: 255, nullable: true })
  acapCoordinatorContact?: string;

  @Column({ name: 'market_surveillance_focal_point_name', length: 255, nullable: true })
  marketSurveillanceFocalPointName?: string;

  @Column({ name: 'market_surveillance_focal_point_contact', length: 255, nullable: true })
  marketSurveillanceFocalPointContact?: string;

  @Column({ name: 'customs_trade_focal_point_name', length: 255, nullable: true })
  customsTradeFocalPointName?: string;

  @Column({ name: 'customs_trade_focal_point_contact', length: 255, nullable: true })
  customsTradeFocalPointContact?: string;

  @Column({ name: 'consumer_affairs_focal_point_name', length: 255, nullable: true })
  consumerAffairsFocalPointName?: string;

  @Column({ name: 'consumer_affairs_focal_point_contact', length: 255, nullable: true })
  consumerAffairsFocalPointContact?: string;

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

  @OneToMany(() => NsbContact, (contact) => contact.nsb, { cascade: true })
  contacts?: NsbContact[];

  @OneToMany(() => NsbLocation, (location) => location.nsb, { cascade: true })
  locations?: NsbLocation[];

  @OneToMany(() => LicenseApplication, (app) => app.nsb)
  licenseApplications?: LicenseApplication[];

  @OneToMany(() => License, (license) => license.nsb)
  licenses?: License[];

  @OneToMany(() => NsbDocument, (doc) => doc.nsb, { cascade: false })
  documents?: NsbDocument[];
}

