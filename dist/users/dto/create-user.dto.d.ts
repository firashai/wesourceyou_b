import { UserRole, UserStatus } from '../entities/user.entity';
export declare class CreateUserDto {
    email: string;
    password: string;
    role: UserRole;
    status?: UserStatus;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    country?: string;
    city?: string;
}
