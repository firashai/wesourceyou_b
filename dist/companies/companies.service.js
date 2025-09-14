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
exports.CompaniesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const company_entity_1 = require("./entities/company.entity");
const job_entity_1 = require("../jobs/entities/job.entity");
const job_application_entity_1 = require("../jobs/entities/job-application.entity");
let CompaniesService = class CompaniesService {
    constructor(companyRepository, jobRepository, jobApplicationRepository) {
        this.companyRepository = companyRepository;
        this.jobRepository = jobRepository;
        this.jobApplicationRepository = jobApplicationRepository;
    }
    async create(createCompanyDto) {
        const company = this.companyRepository.create(createCompanyDto);
        return this.companyRepository.save(company);
    }
    async findAll() {
        return this.companyRepository.find({
            relations: ['user', 'jobs'],
        });
    }
    async findOne(id) {
        const company = await this.companyRepository.findOne({
            where: { id },
            relations: ['user', 'jobs'],
        });
        if (!company) {
            throw new common_1.NotFoundException(`Company with ID ${id} not found`);
        }
        return company;
    }
    async findByUserId(userId) {
        const company = await this.companyRepository.findOne({
            where: { user: { id: userId } },
            relations: ['user', 'jobs'],
        });
        if (!company) {
            throw new common_1.NotFoundException(`Company with user ID ${userId} not found`);
        }
        return company;
    }
    async update(id, updateCompanyDto, user) {
        const company = await this.findOne(id);
        if (company.user.id !== user.id && user.role !== 'admin') {
            throw new common_1.ForbiddenException('You can only update your own company');
        }
        Object.assign(company, updateCompanyDto);
        return this.companyRepository.save(company);
    }
    async remove(id, user) {
        const company = await this.findOne(id);
        if (company.user.id !== user.id && user.role !== 'admin') {
            throw new common_1.ForbiddenException('You can only delete your own company');
        }
        await this.companyRepository.remove(company);
    }
    async getVerifiedCompanies() {
        return this.companyRepository.find({
            relations: ['user'],
            where: { isVerified: true, isActive: true },
            order: { rating: 'DESC' },
        });
    }
    async updateRating(id, newRating) {
        const company = await this.findOne(id);
        const totalRating = company.rating * company.totalReviews + newRating;
        company.totalReviews += 1;
        company.rating = totalRating / company.totalReviews;
        return this.companyRepository.save(company);
    }
    async getMyProfile(userId) {
        return this.findByUserId(userId);
    }
    async updateMyProfile(userId, updateCompanyDto) {
        const company = await this.findByUserId(userId);
        Object.assign(company, updateCompanyDto);
        return this.companyRepository.save(company);
    }
    async getMyJobs(userId) {
        const company = await this.findByUserId(userId);
        return this.jobRepository.find({
            where: { company: { id: company.id } },
            relations: ['company', 'applications'],
            order: { createdAt: 'DESC' },
        });
    }
    async getMyApplications(userId) {
        const company = await this.findByUserId(userId);
        return this.jobApplicationRepository.find({
            where: { company: { id: company.id } },
            relations: [
                'job',
                'journalist',
                'journalist.user',
                'company'
            ],
            order: { createdAt: 'DESC' },
        });
    }
    async getMyApplication(applicationId, userId) {
        const company = await this.findByUserId(userId);
        const application = await this.jobApplicationRepository.findOne({
            where: {
                id: applicationId,
                company: { id: company.id }
            },
            relations: [
                'job',
                'journalist',
                'journalist.user',
                'company'
            ],
        });
        if (!application) {
            throw new common_1.NotFoundException(`Job application with ID ${applicationId} not found for your company`);
        }
        return application;
    }
};
exports.CompaniesService = CompaniesService;
exports.CompaniesService = CompaniesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __param(1, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __param(2, (0, typeorm_1.InjectRepository)(job_application_entity_1.JobApplication)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CompaniesService);
//# sourceMappingURL=companies.service.js.map