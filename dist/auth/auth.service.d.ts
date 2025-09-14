import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User, UserRole, UserStatus } from '../users/entities/user.entity';
import { Journalist } from '../journalists/entities/journalist.entity';
import { Company } from '../companies/entities/company.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterJournalistDto } from './dto/register-journalist.dto';
import { RegisterCompanyDto } from './dto/register-company.dto';
export declare class AuthService {
    private userRepository;
    private journalistRepository;
    private companyRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, journalistRepository: Repository<Journalist>, companyRepository: Repository<Company>, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            role: any;
            status: any;
        };
    }>;
    registerJournalist(registerDto: RegisterJournalistDto): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            role: UserRole;
            status: UserStatus;
            profile: Journalist;
        };
    }>;
    registerCompany(registerDto: RegisterCompanyDto): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            role: UserRole;
            status: UserStatus;
            profile: Company;
        };
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
    requestPasswordReset(email: string): Promise<{
        message: string;
        resetToken?: undefined;
    } | {
        message: string;
        resetToken: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
}
