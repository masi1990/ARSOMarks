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
import { Country } from '../../reference-data/entities/country.entity';
import { SystemUser } from '../../system-user/system-user.entity';
import { NsbRegistrationRequestStatus, NsbDocumentType } from '../../../shared/enums';
import { NsbRegistrationRequestDocument } from './nsb-registration-request-document.entity';

@Entity('nsb_registration_requests')
export class NsbRegistrationRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'country_id', nullable: true })
  countryId?: string;

  @ManyToOne(() => Country, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'country_id' })
  country?: Country;

  // Country Information
  @Column({ name: 'country_name', length: 255, nullable: true })
  countryName?: string;

  @Column({ name: 'nsb_official_name', length: 255, nullable: true })
  nsbOfficialName?: string;

  @Column({ name: 'nsb_acronym', length: 50, nullable: true })
  nsbAcronym?: string;

  @Column({ name: 'iso_code', length: 2, nullable: true })
  isoCode?: string;

  // Legal Identity & Registration
  @Column({ name: 'legal_status', type: 'text', nullable: true })
  legalStatus?: string;

  @Column({ name: 'establishment_act_name', type: 'text', nullable: true })
  establishmentActName?: string;

  @Column({ name: 'establishment_act_number', type: 'text', nullable: true })
  establishmentActNumber?: string;

  @Column({ name: 'establishment_act_date', type: 'date', nullable: true })
  establishmentActDate?: Date;

  @Column({ name: 'registration_number', type: 'text', nullable: true })
  registrationNumber?: string;

  @Column({ name: 'registration_authority', type: 'text', nullable: true })
  registrationAuthority?: string;

  @Column({ name: 'tax_identification_number', type: 'text', nullable: true })
  taxIdentificationNumber?: string;

  @Column({ name: 'vat_number', type: 'text', nullable: true })
  vatNumber?: string;

  @Column({ name: 'year_established', type: 'int', nullable: true })
  yearEstablished?: number;

  @Column({ name: 'website', length: 500, nullable: true })
  website?: string;

  // Primary Contact Information
  @Column({ name: 'contact_person_name', length: 255, nullable: true })
  contactPersonName?: string;

  @Column({ name: 'contact_person_title', length: 255, nullable: true })
  contactPersonTitle?: string;

  @Column({ name: 'contact_email', length: 255, nullable: true })
  contactEmail?: string;

  @Column({ name: 'contact_phone', length: 50, nullable: true })
  contactPhone?: string;

  @Column({ name: 'contact_mobile', length: 50, nullable: true })
  contactMobile?: string;

  // Leadership & Governance
  @Column({ name: 'director_general_name', length: 255, nullable: true })
  directorGeneralName?: string;

  @Column({ name: 'director_general_title', length: 255, nullable: true })
  directorGeneralTitle?: string;

  @Column({ name: 'director_general_email', length: 255, nullable: true })
  directorGeneralEmail?: string;

  @Column({ name: 'director_general_phone', length: 50, nullable: true })
  directorGeneralPhone?: string;

  @Column({ name: 'board_chair_name', length: 255, nullable: true })
  boardChairName?: string;

  @Column({ name: 'board_chair_email', length: 255, nullable: true })
  boardChairEmail?: string;

  @Column({ name: 'board_chair_phone', length: 50, nullable: true })
  boardChairPhone?: string;

  // Addresses
  @Column({ name: 'headquarters_address', type: 'jsonb', nullable: true })
  headquartersAddress?: Record<string, any>;

  @Column({ name: 'postal_address', type: 'jsonb', nullable: true })
  postalAddress?: Record<string, any>;

  @Column({ name: 'additional_addresses', type: 'jsonb', nullable: true })
  additionalAddresses?: Record<string, any>[];

  // Additional Contacts
  @Column({ name: 'additional_contacts', type: 'jsonb', nullable: true })
  additionalContacts?: Record<string, any>[];

  @Column({ name: 'key_officials', type: 'jsonb', nullable: true })
  keyOfficials?: Record<string, any>[];

  @Column({ name: 'international_memberships', type: 'jsonb', nullable: true })
  internationalMemberships?: Record<string, any>[];

  @Column({ name: 'mandate_areas', type: 'text', array: true, nullable: true })
  mandateAreas?: string[];

  // Role Designation
  @Column({ name: 'additional_user_slots_requested', type: 'int', default: 0 })
  additionalUserSlotsRequested: number;

  @Column({ name: 'requested_roles', type: 'text', array: true, default: [] })
  requestedRoles: string[]; // Array of role names like 'MARKET_SURVEILLANCE_OFFICER', etc.

  // Sectors/Domains covered by this NSB (e.g., Food & Agriculture, Telecommunications, etc.)
  @Column({ type: 'text', array: true, nullable: true })
  sectors?: string[];

  // Request Status
  @Column({ type: 'enum', enum: NsbRegistrationRequestStatus, default: NsbRegistrationRequestStatus.DRAFT })
  status: NsbRegistrationRequestStatus;

  @Column({ type: 'text', nullable: true })
  remarks?: string;

  @Column({ name: 'reviewed_by', type: 'uuid', nullable: true })
  reviewedBy?: string;

  @ManyToOne(() => SystemUser, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'reviewed_by' })
  reviewedByUser?: SystemUser;

  @Column({ name: 'reviewed_at', type: 'timestamp', nullable: true })
  reviewedAt?: Date;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy?: string;

  @ManyToOne(() => SystemUser, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'created_by' })
  createdByUser?: SystemUser;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => NsbRegistrationRequestDocument, (doc) => doc.registrationRequest, { cascade: false })
  documents?: NsbRegistrationRequestDocument[];

  // After approval, link to the created NSB
  @Column({ name: 'nsb_id', type: 'uuid', nullable: true })
  nsbId?: string;
}

