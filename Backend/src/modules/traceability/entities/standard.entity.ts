import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('standards')
export class Standard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'code', length: 100, unique: true })
  code: string;

  @Column({ name: 'name', length: 255 })
  name: string;

  @Column({ name: 'version', length: 50, nullable: true })
  version?: string;

  @Column({ name: 'issuing_authority', length: 255, nullable: true })
  issuingAuthority?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}

