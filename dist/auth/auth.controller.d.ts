import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterJournalistDto } from './dto/register-journalist.dto';
import { RegisterCompanyDto } from './dto/register-company.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
            role: import("../users/entities/user.entity").UserRole;
            status: import("../users/entities/user.entity").UserStatus;
            profile: import("../journalists/entities/journalist.entity").Journalist;
        };
    }>;
    registerCompany(registerDto: RegisterCompanyDto): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            role: import("../users/entities/user.entity").UserRole;
            status: import("../users/entities/user.entity").UserStatus;
            profile: import("../companies/entities/company.entity").Company;
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
    getProfile(req: any): any;
}
