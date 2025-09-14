import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  JOURNALIST = 'journalist',
  COMPANY = 'company',
  ADMIN = 'admin',
}

export enum UserStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
}

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.JOURNALIST,
  })
  role: UserRole;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.PENDING,
  })
  status: UserStatus;

  @ApiProperty()
  @Column({ nullable: true })
  firstName: string;

  @ApiProperty()
  @Column({ nullable: true })
  lastName: string;

  @ApiProperty()
  @Column({ nullable: true })
  phoneNumber: string;

  @ApiProperty()
  @Column({ nullable: true })
  country: string;

  @ApiProperty()
  @Column({ nullable: true })
  city: string;

  @ApiProperty()
  @Column({ nullable: true })
  profilePicture: string;

  @ApiProperty()
  @Column({ default: false })
  emailVerified: boolean;

  @ApiProperty()
  @Column({ nullable: true })
  emailVerificationToken: string;

  @ApiProperty()
  @Column({ nullable: true })
  resetPasswordToken: string;

  @ApiProperty()
  @Column({ nullable: true })
  resetPasswordExpires: Date;

  @ApiProperty()
  @Column({ nullable: true })
  lastLoginAt: Date;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToOne('Journalist', 'user', { cascade: true })
  journalist: any;

  @OneToOne('Company', 'user', { cascade: true })
  company: any;

  @OneToMany('MediaPurchase', 'buyer')
  purchases: any[];

  @OneToMany('MediaPurchase', 'seller')
  sales: any[];
}
