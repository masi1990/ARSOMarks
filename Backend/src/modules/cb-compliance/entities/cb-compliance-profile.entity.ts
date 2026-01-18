import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CbApplication } from '../../cb-approval/entities/cb-application.entity';

@Entity('cb_compliance_profiles')
export class CbComplianceProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'cb_application_id', type: 'uuid', unique: true })
  cbApplicationId: string;

  @ManyToOne(() => CbApplication, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cb_application_id' })
  cbApplication: CbApplication;

  @Column({ name: 'responsible_persons', type: 'jsonb', nullable: true })
  responsiblePersons?: Record<string, any>[];

  @Column({ name: 'auditor_qualifications', type: 'jsonb', nullable: true })
  auditorQualifications?: Record<string, any>[];

  @Column({ name: 'countries_of_certification', type: 'text', array: true, nullable: true })
  countriesOfCertification?: string[];

  @Column({ name: 'local_offices', type: 'jsonb', nullable: true })
  localOffices?: Record<string, any>[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
