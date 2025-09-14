"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../users/entities/user.entity");
const journalist_entity_1 = require("../journalists/entities/journalist.entity");
const company_entity_1 = require("../companies/entities/company.entity");
let AuthService = class AuthService {
    constructor(userRepository, journalistRepository, companyRepository, jwtService) {
        this.userRepository = userRepository;
        this.journalistRepository = journalistRepository;
        this.companyRepository = companyRepository;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.userRepository.findOne({
            where: { email },
        });
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.validateUser(email, password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role,
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                status: user.status,
            },
        };
    }
    async registerJournalist(registerDto) {
        const { email, password, ...journalistData } = registerDto;
        const existingUser = await this.userRepository.findOne({
            where: { email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            email,
            password: hashedPassword,
            role: user_entity_1.UserRole.JOURNALIST,
            status: user_entity_1.UserStatus.PENDING,
            firstName: journalistData.name,
            phoneNumber: journalistData.phoneNumber,
            country: journalistData.country,
            city: journalistData.cityOfResidence,
        });
        const savedUser = await this.userRepository.save(user);
        const journalist = this.journalistRepository.create({
            ...journalistData,
            user: savedUser,
        });
        await this.journalistRepository.save(journalist);
        const payload = {
            email: savedUser.email,
            sub: savedUser.id,
            role: savedUser.role,
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: savedUser.id,
                email: savedUser.email,
                role: savedUser.role,
                status: savedUser.status,
                profile: journalist,
            },
        };
    }
    async registerCompany(registerDto) {
        const { email, password, ...companyData } = registerDto;
        const existingUser = await this.userRepository.findOne({
            where: { email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            email,
            password: hashedPassword,
            role: user_entity_1.UserRole.COMPANY,
            status: user_entity_1.UserStatus.PENDING,
            firstName: companyData.name,
            phoneNumber: companyData.phoneNumber,
            country: companyData.country,
            city: companyData.city,
        });
        const savedUser = await this.userRepository.save(user);
        const company = this.companyRepository.create({
            ...companyData,
            user: savedUser,
        });
        await this.companyRepository.save(company);
        const payload = {
            email: savedUser.email,
            sub: savedUser.id,
            role: savedUser.role,
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: savedUser.id,
                email: savedUser.email,
                role: savedUser.role,
                status: savedUser.status,
                profile: company,
            },
        };
    }
    async verifyEmail(token) {
        const user = await this.userRepository.findOne({
            where: { emailVerificationToken: token },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid verification token');
        }
        user.status = user_entity_1.UserStatus.ACTIVE;
        user.emailVerified = true;
        user.emailVerificationToken = null;
        await this.userRepository.save(user);
        return { message: 'Email verified successfully' };
    }
    async requestPasswordReset(email) {
        const user = await this.userRepository.findOne({
            where: { email },
        });
        if (!user) {
            return { message: 'If the email exists, a password reset link has been sent' };
        }
        const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const resetExpires = new Date();
        resetExpires.setHours(resetExpires.getHours() + 1);
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetExpires;
        await this.userRepository.save(user);
        return {
            message: 'Password reset link sent to email',
            resetToken
        };
    }
    async resetPassword(token, newPassword) {
        const user = await this.userRepository.findOne({
            where: { resetPasswordToken: token },
        });
        if (!user || user.resetPasswordExpires < new Date()) {
            throw new common_1.UnauthorizedException('Invalid or expired reset token');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await this.userRepository.save(user);
        return { message: 'Password reset successfully' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(journalist_entity_1.Journalist)),
    __param(2, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map