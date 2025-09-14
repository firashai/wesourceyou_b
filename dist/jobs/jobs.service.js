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
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const job_entity_1 = require("./entities/job.entity");
const job_application_entity_1 = require("./entities/job-application.entity");
const job_entity_2 = require("./entities/job.entity");
const job_application_entity_2 = require("./entities/job-application.entity");
let JobsService = class JobsService {
    constructor(jobRepository, jobApplicationRepository) {
        this.jobRepository = jobRepository;
        this.jobApplicationRepository = jobApplicationRepository;
    }
    async create(createJobDto, user) {
        const job = this.jobRepository.create(createJobDto);
        return this.jobRepository.save(job);
    }
    async findAll(query) {
        return this.jobRepository.find({
            relations: ['company'],
            where: { status: job_entity_2.JobStatus.PUBLISHED },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const job = await this.jobRepository.findOne({
            where: { id },
            relations: ['company', 'applications'],
        });
        if (!job) {
            throw new common_1.NotFoundException(`Job with ID ${id} not found`);
        }
        return job;
    }
    async findByCompany(companyId) {
        return this.jobRepository.find({
            where: { company: { id: companyId } },
            relations: ['company', 'applications'],
            order: { createdAt: 'DESC' },
        });
    }
    async update(id, updateJobDto, user) {
        const job = await this.findOne(id);
        if (job.company.user.id !== user.id && user.role !== 'admin') {
            throw new common_1.ForbiddenException('You can only update jobs from your own company');
        }
        Object.assign(job, updateJobDto);
        return this.jobRepository.save(job);
    }
    async remove(id, user) {
        const job = await this.findOne(id);
        if (job.company.user.id !== user.id && user.role !== 'admin') {
            throw new common_1.ForbiddenException('You can only delete jobs from your own company');
        }
        await this.jobRepository.remove(job);
    }
    async applyForJob(jobId, applyDto, user) {
        const { coverLetter, resumeUrl, resumeFilename, resumeSize, portfolio, samples, proposedRate, availableStartDate, availability, answers, references, skills, languages, equipment, experience, education, notes } = applyDto;
        const job = await this.findOne(jobId);
        if (job.status !== job_entity_2.JobStatus.PUBLISHED) {
            throw new common_1.BadRequestException('Job is not available for applications');
        }
        const existingApplication = await this.jobApplicationRepository.findOne({
            where: { job: { id: jobId }, journalist: { user: { id: user.id } } },
        });
        if (existingApplication) {
            throw new common_1.BadRequestException('You have already applied for this job');
        }
        const application = this.jobApplicationRepository.create({
            job,
            journalist: { user: { id: user.id } },
            company: job.company,
            coverLetter,
            resumeUrl,
            resumeFilename,
            resumeSize,
            portfolio,
            samples,
            proposedRate,
            availableStartDate,
            availability,
            answers,
            references,
            skills,
            languages,
            equipment,
            experience,
            education,
            notes,
            status: job_application_entity_2.ApplicationStatus.PENDING,
        });
        const savedApplication = await this.jobApplicationRepository.save(application);
        job.applicationsCount += 1;
        await this.jobRepository.save(job);
        return savedApplication;
    }
    async getApplicationsByJob(jobId) {
        return this.jobApplicationRepository.find({
            where: { job: { id: jobId } },
            relations: ['journalist', 'journalist.user'],
            order: { createdAt: 'DESC' },
        });
    }
    async getApplicationsByJournalist(journalistId) {
        return this.jobApplicationRepository.find({
            where: { journalist: { id: journalistId } },
            relations: ['job', 'job.company'],
            order: { createdAt: 'DESC' },
        });
    }
    async updateApplicationStatus(applicationId, status, notes) {
        const application = await this.jobApplicationRepository.findOne({
            where: { id: applicationId },
            relations: ['job', 'journalist'],
        });
        if (!application) {
            throw new common_1.NotFoundException(`Application with ID ${applicationId} not found`);
        }
        application.status = status;
        if (status === job_application_entity_2.ApplicationStatus.REJECTED) {
            application.rejectionReason = notes;
            application.rejectedAt = new Date();
        }
        else if (status === job_application_entity_2.ApplicationStatus.ACCEPTED) {
            application.acceptanceNotes = notes;
            application.acceptedAt = new Date();
        }
        return this.jobApplicationRepository.save(application);
    }
    async searchJobs(filters) {
        const { location, mediaWorkType, jobType, experienceLevel, salaryMin, salaryMax, limit = 20, offset = 0, } = filters;
        const queryBuilder = this.jobRepository
            .createQueryBuilder('job')
            .leftJoinAndSelect('job.company', 'company')
            .where('job.status = :status', { status: job_entity_2.JobStatus.PUBLISHED });
        if (location) {
            queryBuilder.andWhere('JSON_CONTAINS(job.locations, :location)', { location: JSON.stringify({ city: location }) });
        }
        if (mediaWorkType) {
            queryBuilder.andWhere('job.mediaWorkType = :mediaWorkType', { mediaWorkType });
        }
        if (jobType) {
            queryBuilder.andWhere('job.jobType = :jobType', { jobType });
        }
        if (experienceLevel) {
            queryBuilder.andWhere('job.experienceLevel = :experienceLevel', { experienceLevel });
        }
        if (salaryMin || salaryMax) {
            if (salaryMin && salaryMax) {
                queryBuilder.andWhere('job.salary->>"$.min" >= :salaryMin AND job.salary->>"$.max" <= :salaryMax', {
                    salaryMin,
                    salaryMax,
                });
            }
            else if (salaryMin) {
                queryBuilder.andWhere('job.salary->>"$.min" >= :salaryMin', { salaryMin });
            }
            else if (salaryMax) {
                queryBuilder.andWhere('job.salary->>"$.max" <= :salaryMax', { salaryMax });
            }
        }
        queryBuilder
            .orderBy('job.isUrgent', 'DESC')
            .addOrderBy('job.createdAt', 'DESC')
            .limit(limit)
            .offset(offset);
        return queryBuilder.getMany();
    }
    async incrementViews(id) {
        await this.jobRepository.increment({ id }, 'viewsCount', 1);
    }
    async getUrgentJobs() {
        return this.jobRepository.find({
            relations: ['company'],
            where: { isUrgent: true, status: job_entity_2.JobStatus.PUBLISHED },
            order: { createdAt: 'DESC' },
            take: 10,
        });
    }
    async getFeaturedJobs() {
        return this.jobRepository.find({
            relations: ['company'],
            where: { isFeatured: true, status: job_entity_2.JobStatus.PUBLISHED },
            order: { createdAt: 'DESC' },
            take: 10,
        });
    }
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __param(1, (0, typeorm_1.InjectRepository)(job_application_entity_1.JobApplication)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], JobsService);
//# sourceMappingURL=jobs.service.js.map