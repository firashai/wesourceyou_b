import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum MediaWorkType {
  VIDEO_PRODUCTION = 'video_production',
  PHOTO_JOURNALISM = 'photo_journalism',
  WRITTEN_CONTENT = 'written_content',
  AUDIO_PRODUCTION = 'audio_production',
}

export enum AnalystSpecialty {
  ARABIC_AFFAIRS = 'arabic_affairs',
  KURDISH_AFFAIRS = 'kurdish_affairs',
  PERSIAN_AFFAIRS = 'persian_affairs',
  MIDDLE_EASTERN_AFFAIRS = 'middle_eastern_affairs',
  EUROPEAN_AFFAIRS = 'european_affairs',
  AMERICAN_AFFAIRS = 'american_affairs',
  OTHER = 'other',
}

export enum SocialMediaPlatform {
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
  YOUTUBE = 'youtube',
  OTHER = 'other',
}

export enum ExperienceLevel {
  JUNIOR = 'junior',
  MID_LEVEL = 'mid_level',
  SENIOR = 'senior',
  EXPERT = 'expert',
}

@Entity('journalists')
export class Journalist {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  bio: string;

  @ApiProperty()
  @Column({ default: false })
  hasCamera: boolean;

  @ApiProperty()
  @Column({ nullable: true })
  cameraType: string;

  @ApiProperty()
  @Column({ default: false })
  hasAudioEquipment: boolean;

  @ApiProperty()
  @Column({ nullable: true })
  audioEquipmentType: string;

  @ApiProperty()
  @Column({ default: false })
  canTravel: boolean;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: MediaWorkType,
  })
  mediaWorkType: MediaWorkType;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: AnalystSpecialty,
    nullable: true,
  })
  analystSpecialty: AnalystSpecialty;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ExperienceLevel,
    nullable: true,
  })
  experienceLevel: ExperienceLevel;

  @ApiProperty()
  @Column({ type: 'json', nullable: true })
  socialMediaAccounts: {
    platform: SocialMediaPlatform;
    url: string;
  }[];

  @ApiProperty()
  @Column({ type: 'json', nullable: true })
  previousWorkLinks: string[];

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
  @Column({ type: 'json', nullable: true })
  skills: string[];

  @ApiProperty()
  @Column({ type: 'json', nullable: true })
  languages: string[];

  @ApiProperty()
  @Column({ type: 'json', nullable: true })
  certifications: string[];

  @ApiProperty()
  @Column({ type: 'json', nullable: true })
  portfolio: {
    title: string;
    description: string;
    url: string;
    type: string;
  }[];

  @ApiProperty()
  @Column({ default: true })
  isAvailable: boolean;

  @ApiProperty()
  @Column({ default: false })
  isApproved: boolean;

  @ApiProperty()
  @Column({ nullable: true })
  approvedBy: number;

  @ApiProperty()
  @Column({ nullable: true })
  approvedAt: Date;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  approvalNotes: string;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  hourlyRate: number;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  dailyRate: number;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  projectRate: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToOne('User', 'journalist')
  @JoinColumn({ name: 'userId' })
  user: any;

  @OneToMany('MediaContent', 'journalist')
  mediaContent: any[];

  @OneToMany('JobApplication', 'journalist')
  jobApplications: any[];
}

// Import these entities to avoid circular dependency issues
import { User } from '../../users/entities/user.entity';
import { MediaContent } from '../../media-content/entities/media-content.entity';
import { JobApplication } from '../../jobs/entities/job-application.entity';
