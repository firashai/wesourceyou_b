import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { MediaWorkType, AnalystSpecialty } from '../../journalists/entities/journalist.entity';

@Entity('companies')
export class Company {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  website: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  mission: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  vision: string;

  @ApiProperty()
  @Column({ nullable: true })
  logo: string;

  @ApiProperty()
  @Column({ type: 'json', nullable: true })
  requiredServices: {
    serviceType: MediaWorkType;
    analystSpecialty?: AnalystSpecialty;
    description?: string;
  }[];

  @ApiProperty()
  @Column({ type: 'json', nullable: true })
  companySize: {
    employees: number;
    range: string;
  };

  @ApiProperty()
  @Column({ type: 'json', nullable: true })
  industry: string[];

  @ApiProperty()
  @Column({ type: 'json', nullable: true })
  specializations: string[];

  @ApiProperty()
  @Column({ type: 'json', nullable: true })
  languages: string[];

  @ApiProperty()
  @Column({ type: 'json', nullable: true })
  locations: {
    country: string;
    city: string;
    address: string;
  }[];

  @ApiProperty()
  @Column({ type: 'json', nullable: true })
  socialMediaAccounts: {
    platform: string;
    url: string;
  }[];

  @ApiProperty()
  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  rating: number;

  @ApiProperty()
  @Column({ default: 0 })
  totalReviews: number;

  @ApiProperty()
  @Column({ default: 0 })
  completedProjects: number;

  @ApiProperty()
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty()
  @Column({ default: false })
  isVerified: boolean;

  @ApiProperty()
  @Column({ type: 'json', nullable: true })
  contactPersons: {
    name: string;
    position: string;
    email: string;
    phone: string;
  }[];

  @ApiProperty()
  @Column({ type: 'json', nullable: true })
  paymentMethods: string[];

  @ApiProperty()
  @Column({ type: 'json', nullable: true })
  preferredCommunication: string[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToOne('User', 'company')
  @JoinColumn({ name: 'userId' })
  user: any;

  @OneToMany('Job', 'company')
  jobs: any[];

  @OneToMany('JobApplication', 'company')
  applications: any[];
}

// Import these entities to avoid circular dependency issues
import { User } from '../../users/entities/user.entity';
import { Job } from '../../jobs/entities/job.entity';
import { JobApplication } from '../../jobs/entities/job-application.entity';
