export declare enum UserRole {
    JOURNALIST = "journalist",
    COMPANY = "company",
    ADMIN = "admin"
}
export declare enum UserStatus {
    PENDING = "pending",
    ACTIVE = "active",
    SUSPENDED = "suspended"
}
export declare class User {
    id: number;
    email: string;
    password: string;
    role: UserRole;
    status: UserStatus;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    country: string;
    city: string;
    profilePicture: string;
    emailVerified: boolean;
    emailVerificationToken: string;
    resetPasswordToken: string;
    resetPasswordExpires: Date;
    lastLoginAt: Date;
    createdAt: Date;
    updatedAt: Date;
    journalist: any;
    company: any;
    purchases: any[];
    sales: any[];
}
