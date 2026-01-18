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
import { CbAccreditationStandard, CbApplicationStatus } from '../../../shared/enums';
import { CbApplicationDocument } from './cb-application-document.entity';
import { AccreditationBody } from '../../reference-data/entities/accreditation-body.entity';

@Entity('cb_applications')
export class CbApplication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'application_number', unique: true, nullable: true })
  applicationNumber?: string;

  // Contact information
  @Column({ name: 'legal_name', length: 255 })
  legalName: string;

  @Column({ name: 'short_name', length: 100, nullable: true })
  shortName?: string;

  @Column({ name: 'contact_person_name', length: 150 })
  contactPersonName: string;

  @Column({ name: 'contact_person_title', length: 150, nullable: true })
  contactPersonTitle?: string;

  @Column({ name: 'contact_email', length: 150 })
  contactEmail: string;

  @Column({ name: 'contact_phone', length: 50 })
  contactPhone: string;

  @Column({ length: 255, nullable: true })
  website?: string;

  @Column({ name: 'physical_address', type: 'text' })
  physicalAddress: string;

  @Column({ name: 'postal_address', type: 'text', nullable: true })
  postalAddress?: string;

  @Column({ name: 'country_id', type: 'uuid', nullable: true })
  countryId?: string;

  @ManyToOne(() => Country, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'country_id' })
  country?: Country;

  @Column({ name: 'regions_of_operation', type: 'text', array: true, default: [] })
  regionsOfOperation: string[];

  @Column({ name: 'regions_other', type: 'text', nullable: true })
  regionsOther?: string;

  // Accreditation details
  @Column({ name: 'is_accredited', default: false })
  isAccredited: boolean;

  @Column({ name: 'accreditation_standard', type: 'enum', enum: CbAccreditationStandard, nullable: true })
  accreditationStandard?: CbAccreditationStandard;

  @Column({ name: 'accreditation_body_id', type: 'uuid', nullable: true })
  accreditationBodyId?: string;

  @ManyToOne(() => AccreditationBody, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'accreditation_body_id' })
  accreditationBody?: AccreditationBody;

  @Column({ name: 'accreditation_body_name', length: 255, nullable: true })
  accreditationBodyName?: string;

  @Column({ name: 'accreditation_certificate_number', length: 100, nullable: true })
  accreditationCertificateNumber?: string;

  @Column({ name: 'accreditation_scope', type: 'text', nullable: true })
  accreditationScope?: string;

  @Column({ name: 'accreditation_valid_until', type: 'date', nullable: true })
  accreditationValidUntil?: string;

  @Column({ name: 'accreditation_application_date', type: 'date', nullable: true })
  accreditationApplicationDate?: string;

  @Column({ name: 'accreditation_progress_notes', type: 'text', nullable: true })
  accreditationProgressNotes?: string;

  // Prior license history
  @Column({ name: 'previous_license_held', default: false })
  previousLicenseHeld: boolean;

  @Column({ name: 'previous_license_granted_at', type: 'date', nullable: true })
  previousLicenseGrantedAt?: string;

  @Column({ name: 'previous_license_terminated_at', type: 'date', nullable: true })
  previousLicenseTerminatedAt?: string;

  @Column({ name: 'previous_license_termination_reason', type: 'text', nullable: true })
  previousLicenseTerminationReason?: string;

  // Scheme scope & declarations
  @Column({ name: 'applied_schemes', type: 'jsonb', nullable: true })
  appliedSchemes?: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  declarations?: Record<string, any>;

  // Workflow
  @Column({ type: 'enum', enum: CbApplicationStatus, default: CbApplicationStatus.DRAFT })
  status: CbApplicationStatus;

  @Column({ name: 'submitted_at', type: 'timestamp', nullable: true })
  submittedAt?: Date;

  @Column({ name: 'reviewed_at', type: 'timestamp', nullable: true })
  reviewedAt?: Date;

  @Column({ name: 'approved_at', type: 'timestamp', nullable: true })
  approvedAt?: Date;

  @Column({ name: 'rejected_at', type: 'timestamp', nullable: true })
  rejectedAt?: Date;

  @Column({ name: 'rejection_reason', type: 'text', nullable: true })
  rejectionReason?: string;

  @Column({ name: 'provisional_valid_until', type: 'date', nullable: true })
  provisionalValidUntil?: string;

  @Column({ name: 'license_start', type: 'date', nullable: true })
  licenseStart?: string;

  @Column({ name: 'license_end', type: 'date', nullable: true })
  licenseEnd?: string;

  @Column({ name: 'renewal_due', type: 'date', nullable: true })
  renewalDue?: string;

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

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => CbApplicationDocument, (doc) => doc.application, { cascade: true })
  documents?: CbApplicationDocument[];
}
