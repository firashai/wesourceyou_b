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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const journalist_entity_1 = require("../journalists/entities/journalist.entity");
const company_entity_1 = require("../companies/entities/company.entity");
const job_entity_1 = require("../jobs/entities/job.entity");
const media_content_entity_1 = require("../media-content/entities/media-content.entity");
const job_application_entity_1 = require("../jobs/entities/job-application.entity");
const media_purchase_entity_1 = require("../media-content/entities/media-purchase.entity");
let AdminService = class AdminService {
    constructor(userRepository, journalistRepository, companyRepository, jobRepository, mediaContentRepository, jobApplicationRepository, mediaPurchaseRepository) {
        this.userRepository = userRepository;
        this.journalistRepository = journalistRepository;
        this.companyRepository = companyRepository;
        this.jobRepository = jobRepository;
        this.mediaContentRepository = mediaContentRepository;
        this.jobApplicationRepository = jobApplicationRepository;
        this.mediaPurchaseRepository = mediaPurchaseRepository;
    }
    async getDashboardStats() {
        const [totalUsers, pendingUsers, totalJournalists, pendingJournalists, totalCompanies, pendingCompanies, totalJobs, pendingJobs, totalMedia, pendingMedia, totalApplications, totalPurchases,] = await Promise.all([
            this.userRepository.count(),
            this.userRepository.count({ where: { status: user_entity_1.UserStatus.PENDING } }),
            this.journalistRepository.count(),
            this.journalistRepository.count({ where: { isApproved: false } }),
            this.companyRepository.count(),
            this.companyRepository.count({ where: { isVerified: false } }),
            this.jobRepository.count(),
            this.jobRepository.count({ where: { isApproved: false } }),
            this.mediaContentRepository.count(),
            this.mediaContentRepository.count({ where: { isApproved: false } }),
            this.jobApplicationRepository.count(),
            this.mediaPurchaseRepository.count(),
        ]);
        return {
            users: { total: totalUsers, pending: pendingUsers },
            journalists: { total: totalJournalists, pending: pendingJournalists },
            companies: { total: totalCompanies, pending: pendingCompanies },
            jobs: { total: totalJobs, pending: pendingJobs },
            media: { total: totalMedia, pending: pendingMedia },
            applications: { total: totalApplications },
            purchases: { total: totalPurchases },
        };
    }
    async getAllUsers(page = 1, limit = 10, status, role) {
        const query = this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.journalist', 'journalist')
            .leftJoinAndSelect('user.company', 'company');
        if (status) {
            query.andWhere('user.status = :status', { status });
        }
        if (role) {
            query.andWhere('user.role = :role', { role });
        }
        const [users, total] = await query
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy('user.createdAt', 'DESC')
            .getManyAndCount();
        return {
            users,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async updateUserStatus(userId, status, adminId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.status = status;
        user.updatedAt = new Date();
        return await this.userRepository.save(user);
    }
    async getAllJournalists(page = 1, limit = 10, approved) {
        const query = this.journalistRepository.createQueryBuilder('journalist')
            .leftJoinAndSelect('journalist.user', 'user');
        if (approved !== undefined) {
            query.andWhere('journalist.isApproved = :approved', { approved });
        }
        const [journalists, total] = await query
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy('journalist.createdAt', 'DESC')
            .getManyAndCount();
        return {
            journalists,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async approveJournalist(journalistId, approved, adminId, notes) {
        const journalist = await this.journalistRepository.findOne({
            where: { id: journalistId },
            relations: ['user']
        });
        if (!journalist) {
            throw new common_1.NotFoundException('Journalist not found');
        }
        journalist.isApproved = approved;
        journalist.approvedBy = adminId;
        journalist.approvedAt = new Date();
        journalist.approvalNotes = notes;
        if (approved && journalist.user) {
            journalist.user.status = user_entity_1.UserStatus.ACTIVE;
            await this.userRepository.save(journalist.user);
        }
        return await this.journalistRepository.save(journalist);
    }
    async updateJournalist(journalistId, updateData, adminId) {
        const journalist = await this.journalistRepository.findOne({
            where: { id: journalistId },
            relations: ['user']
        });
        if (!journalist) {
            throw new common_1.NotFoundException('Journalist not found');
        }
        if (updateData.mediaWorkType !== undefined) {
            journalist.mediaWorkType = updateData.mediaWorkType;
        }
        if (updateData.experienceLevel !== undefined) {
            journalist.experienceLevel = updateData.experienceLevel;
        }
        if (updateData.analystSpecialty !== undefined) {
            journalist.analystSpecialty = updateData.analystSpecialty;
        }
        if (updateData.hasCamera !== undefined) {
            journalist.hasCamera = updateData.hasCamera;
        }
        if (updateData.cameraType !== undefined) {
            journalist.cameraType = updateData.cameraType;
        }
        if (updateData.hasAudioEquipment !== undefined) {
            journalist.hasAudioEquipment = updateData.hasAudioEquipment;
        }
        if (updateData.audioEquipmentType !== undefined) {
            journalist.audioEquipmentType = updateData.audioEquipmentType;
        }
        if (updateData.canTravel !== undefined) {
            journalist.canTravel = updateData.canTravel;
        }
        if (updateData.isAvailable !== undefined) {
            journalist.isAvailable = updateData.isAvailable;
        }
        if (updateData.hourlyRate !== undefined) {
            journalist.hourlyRate = updateData.hourlyRate;
        }
        if (updateData.dailyRate !== undefined) {
            journalist.dailyRate = updateData.dailyRate;
        }
        if (updateData.projectRate !== undefined) {
            journalist.projectRate = updateData.projectRate;
        }
        if (updateData.rating !== undefined) {
            journalist.rating = updateData.rating;
        }
        if (updateData.totalReviews !== undefined) {
            journalist.totalReviews = updateData.totalReviews;
        }
        if (updateData.completedProjects !== undefined) {
            journalist.completedProjects = updateData.completedProjects;
        }
        if (updateData.skills !== undefined) {
            journalist.skills = updateData.skills;
        }
        if (updateData.languages !== undefined) {
            journalist.languages = updateData.languages;
        }
        if (updateData.certifications !== undefined) {
            journalist.certifications = updateData.certifications;
        }
        if (updateData.previousWorkLinks !== undefined) {
            journalist.previousWorkLinks = updateData.previousWorkLinks;
        }
        if (updateData.bio !== undefined) {
            journalist.bio = updateData.bio;
        }
        if (updateData.user && journalist.user) {
            if (updateData.user.firstName !== undefined) {
                journalist.user.firstName = updateData.user.firstName;
            }
            if (updateData.user.lastName !== undefined) {
                journalist.user.lastName = updateData.user.lastName;
            }
            if (updateData.user.email !== undefined) {
                journalist.user.email = updateData.user.email;
            }
            if (updateData.user.phone !== undefined) {
                journalist.user.phone = updateData.user.phone;
            }
            if (updateData.user.city !== undefined) {
                journalist.user.city = updateData.user.city;
            }
            if (updateData.user.country !== undefined) {
                journalist.user.country = updateData.user.country;
            }
            await this.userRepository.save(journalist.user);
        }
        return await this.journalistRepository.save(journalist);
    }
    async updateCompany(companyId, updateData, adminId) {
        const company = await this.companyRepository.findOne({
            where: { id: companyId },
            relations: ['user']
        });
        if (!company) {
            throw new common_1.NotFoundException('Company not found');
        }
        if (updateData.name !== undefined) {
            company.name = updateData.name;
        }
        if (updateData.description !== undefined) {
            company.description = updateData.description;
        }
        if (updateData.industry !== undefined) {
            company.industry = updateData.industry;
        }
        if (updateData.website !== undefined) {
            company.website = updateData.website;
        }
        if (updateData.mission !== undefined) {
            company.mission = updateData.mission;
        }
        if (updateData.vision !== undefined) {
            company.vision = updateData.vision;
        }
        if (updateData.logo !== undefined) {
            company.logo = updateData.logo;
        }
        if (updateData.companySize !== undefined) {
            company.companySize = updateData.companySize;
        }
        if (updateData.specializations !== undefined) {
            company.specializations = updateData.specializations;
        }
        if (updateData.languages !== undefined) {
            company.languages = updateData.languages;
        }
        if (updateData.locations !== undefined) {
            company.locations = updateData.locations;
        }
        if (updateData.socialMediaAccounts !== undefined) {
            company.socialMediaAccounts = updateData.socialMediaAccounts;
        }
        if (updateData.isVerified !== undefined) {
            company.isVerified = updateData.isVerified;
        }
        if (updateData.rating !== undefined) {
            company.rating = updateData.rating;
        }
        if (updateData.totalReviews !== undefined) {
            company.totalReviews = updateData.totalReviews;
        }
        if (updateData.completedProjects !== undefined) {
            company.completedProjects = updateData.completedProjects;
        }
        if (updateData.isActive !== undefined) {
            company.isActive = updateData.isActive;
        }
        if (updateData.contactPersons !== undefined) {
            company.contactPersons = updateData.contactPersons;
        }
        if (updateData.paymentMethods !== undefined) {
            company.paymentMethods = updateData.paymentMethods;
        }
        if (updateData.preferredCommunication !== undefined) {
            company.preferredCommunication = updateData.preferredCommunication;
        }
        if (updateData.user && company.user) {
            if (updateData.user.firstName !== undefined) {
                company.user.firstName = updateData.user.firstName;
            }
            if (updateData.user.lastName !== undefined) {
                company.user.lastName = updateData.user.lastName;
            }
            if (updateData.user.email !== undefined) {
                company.user.email = updateData.user.email;
            }
            if (updateData.user.phone !== undefined) {
                company.user.phone = updateData.user.phone;
            }
            if (updateData.user.city !== undefined) {
                company.user.city = updateData.user.city;
            }
            if (updateData.user.country !== undefined) {
                company.user.country = updateData.user.country;
            }
            await this.userRepository.save(company.user);
        }
        return await this.companyRepository.save(company);
    }
    async updateJob(jobId, updateData, adminId) {
        const job = await this.jobRepository.findOne({
            where: { id: jobId },
            relations: ['company']
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (updateData.title !== undefined) {
            job.title = updateData.title;
        }
        if (updateData.description !== undefined) {
            job.description = updateData.description;
        }
        if (updateData.jobType !== undefined) {
            job.jobType = updateData.jobType;
        }
        if (updateData.status !== undefined) {
            job.status = updateData.status;
        }
        if (updateData.mediaWorkType !== undefined) {
            job.mediaWorkType = updateData.mediaWorkType;
        }
        if (updateData.analystSpecialty !== undefined) {
            job.analystSpecialty = updateData.analystSpecialty;
        }
        if (updateData.experienceLevel !== undefined) {
            job.experienceLevel = updateData.experienceLevel;
        }
        if (updateData.requiredSkills !== undefined) {
            job.requiredSkills = updateData.requiredSkills;
        }
        if (updateData.preferredSkills !== undefined) {
            job.preferredSkills = updateData.preferredSkills;
        }
        if (updateData.requiredLanguages !== undefined) {
            job.requiredLanguages = updateData.requiredLanguages;
        }
        if (updateData.preferredLanguages !== undefined) {
            job.preferredLanguages = updateData.preferredLanguages;
        }
        if (updateData.locations !== undefined) {
            job.locations = updateData.locations;
        }
        if (updateData.salary !== undefined) {
            job.salary = updateData.salary;
        }
        if (updateData.benefits !== undefined) {
            job.benefits = updateData.benefits;
        }
        if (updateData.requirements !== undefined) {
            job.requirements = updateData.requirements;
        }
        if (updateData.projectDetails !== undefined) {
            job.projectDetails = updateData.projectDetails;
        }
        if (updateData.startDate !== undefined) {
            job.startDate = updateData.startDate;
        }
        if (updateData.endDate !== undefined) {
            job.endDate = updateData.endDate;
        }
        if (updateData.applicationDeadline !== undefined) {
            job.applicationDeadline = updateData.applicationDeadline;
        }
        if (updateData.numberOfPositions !== undefined) {
            job.numberOfPositions = updateData.numberOfPositions;
        }
        if (updateData.tags !== undefined) {
            job.tags = updateData.tags;
        }
        if (updateData.categories !== undefined) {
            job.categories = updateData.categories;
        }
        if (updateData.additionalInfo !== undefined) {
            job.additionalInfo = updateData.additionalInfo;
        }
        if (updateData.contactInfo !== undefined) {
            job.contactInfo = updateData.contactInfo;
        }
        if (updateData.isUrgent !== undefined) {
            job.isUrgent = updateData.isUrgent;
        }
        if (updateData.isFeatured !== undefined) {
            job.isFeatured = updateData.isFeatured;
        }
        if (updateData.isVerified !== undefined) {
            job.isVerified = updateData.isVerified;
        }
        return await this.jobRepository.save(job);
    }
    async updateMediaContent(mediaId, updateData, adminId) {
        const media = await this.mediaContentRepository.findOne({
            where: { id: mediaId },
            relations: ['journalist']
        });
        if (!media) {
            throw new common_1.NotFoundException('Media content not found');
        }
        if (updateData.title !== undefined) {
            media.title = updateData.title;
        }
        if (updateData.description !== undefined) {
            media.description = updateData.description;
        }
        if (updateData.mediaType !== undefined) {
            media.mediaType = updateData.mediaType;
        }
        if (updateData.status !== undefined) {
            media.status = updateData.status;
        }
        if (updateData.fileUrl !== undefined) {
            media.fileUrl = updateData.fileUrl;
        }
        if (updateData.thumbnailUrl !== undefined) {
            media.thumbnailUrl = updateData.thumbnailUrl;
        }
        if (updateData.previewUrl !== undefined) {
            media.previewUrl = updateData.previewUrl;
        }
        if (updateData.price !== undefined) {
            media.price = updateData.price;
        }
        if (updateData.licenseType !== undefined) {
            media.licenseType = updateData.licenseType;
        }
        if (updateData.tags !== undefined) {
            media.tags = updateData.tags;
        }
        if (updateData.categories !== undefined) {
            media.categories = updateData.categories;
        }
        if (updateData.location !== undefined) {
            media.location = updateData.location;
        }
        if (updateData.recordedDate !== undefined) {
            media.recordedDate = updateData.recordedDate;
        }
        if (updateData.duration !== undefined) {
            media.duration = updateData.duration;
        }
        if (updateData.resolution !== undefined) {
            media.resolution = updateData.resolution;
        }
        if (updateData.fileSize !== undefined) {
            media.fileSize = updateData.fileSize;
        }
        if (updateData.metadata !== undefined) {
            media.metadata = updateData.metadata;
        }
        if (updateData.usageRights !== undefined) {
            media.usageRights = updateData.usageRights;
        }
        if (updateData.rating !== undefined) {
            media.rating = updateData.rating;
        }
        if (updateData.totalViews !== undefined) {
            media.totalViews = updateData.totalViews;
        }
        if (updateData.totalDownloads !== undefined) {
            media.totalDownloads = updateData.totalDownloads;
        }
        if (updateData.totalSales !== undefined) {
            media.totalSales = updateData.totalSales;
        }
        if (updateData.totalRevenue !== undefined) {
            media.totalRevenue = updateData.totalRevenue;
        }
        if (updateData.reviews !== undefined) {
            media.reviews = updateData.reviews;
        }
        if (updateData.isFeatured !== undefined) {
            media.isFeatured = updateData.isFeatured;
        }
        if (updateData.isVerified !== undefined) {
            media.isVerified = updateData.isVerified;
        }
        if (updateData.isApproved !== undefined) {
            media.isApproved = updateData.isApproved;
        }
        if (updateData.approvedBy !== undefined) {
            media.approvedBy = updateData.approvedBy;
        }
        if (updateData.approvedAt !== undefined) {
            media.approvedAt = updateData.approvedAt;
        }
        if (updateData.approvalNotes !== undefined) {
            media.approvalNotes = updateData.approvalNotes;
        }
        if (updateData.watermarks !== undefined) {
            media.watermarks = updateData.watermarks;
        }
        if (updateData.alternativeFormats !== undefined) {
            media.alternativeFormats = updateData.alternativeFormats;
        }
        return await this.mediaContentRepository.save(media);
    }
    async getAllCompanies(page = 1, limit = 10, verified) {
        const query = this.companyRepository.createQueryBuilder('company')
            .leftJoinAndSelect('company.user', 'user');
        if (verified !== undefined) {
            query.andWhere('company.isVerified = :verified', { verified });
        }
        const [companies, total] = await query
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy('company.createdAt', 'DESC')
            .getManyAndCount();
        return {
            companies,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async approveCompany(companyId, approved, adminId, notes) {
        const company = await this.companyRepository.findOne({
            where: { id: companyId },
            relations: ['user']
        });
        if (!company) {
            throw new common_1.NotFoundException('Company not found');
        }
        company.isVerified = approved;
        if (approved && company.user) {
            company.user.status = user_entity_1.UserStatus.ACTIVE;
            await this.userRepository.save(company.user);
        }
        return await this.companyRepository.save(company);
    }
    async getAllJobs(page = 1, limit = 10, approved, status) {
        const query = this.jobRepository.createQueryBuilder('job')
            .leftJoinAndSelect('job.company', 'company')
            .leftJoinAndSelect('company.user', 'user');
        if (approved !== undefined) {
            query.andWhere('job.isApproved = :approved', { approved });
        }
        if (status) {
            query.andWhere('job.status = :status', { status });
        }
        const [jobs, total] = await query
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy('job.createdAt', 'DESC')
            .getManyAndCount();
        return {
            jobs,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async approveJob(jobId, approved, adminId, notes) {
        const job = await this.jobRepository.findOne({
            where: { id: jobId },
            relations: ['company']
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        job.isApproved = approved;
        job.approvedBy = adminId;
        job.approvedAt = new Date();
        job.approvalNotes = notes;
        if (approved) {
            job.status = job_entity_1.JobStatus.PUBLISHED;
        }
        return await this.jobRepository.save(job);
    }
    async getAllMediaContent(page = 1, limit = 10, approved, status) {
        const query = this.mediaContentRepository.createQueryBuilder('media')
            .leftJoinAndSelect('media.journalist', 'journalist')
            .leftJoinAndSelect('journalist.user', 'user');
        if (approved !== undefined) {
            query.andWhere('media.isApproved = :approved', { approved });
        }
        if (status) {
            query.andWhere('media.status = :status', { status });
        }
        const [mediaContent, total] = await query
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy('media.createdAt', 'DESC')
            .getManyAndCount();
        return {
            mediaContent,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async approveMediaContent(mediaId, approved, adminId, notes) {
        const media = await this.mediaContentRepository.findOne({
            where: { id: mediaId },
            relations: ['journalist']
        });
        if (!media) {
            throw new common_1.NotFoundException('Media content not found');
        }
        media.isApproved = approved;
        media.approvedBy = adminId;
        media.approvedAt = new Date();
        media.approvalNotes = notes;
        if (approved) {
            media.status = media_content_entity_1.MediaStatus.PUBLISHED;
        }
        return await this.mediaContentRepository.save(media);
    }
    async getAllApplications(page = 1, limit = 10) {
        const [applications, total] = await this.jobApplicationRepository
            .createQueryBuilder('application')
            .leftJoinAndSelect('application.job', 'job')
            .leftJoinAndSelect('application.journalist', 'journalist')
            .leftJoinAndSelect('journalist.user', 'user')
            .leftJoinAndSelect('application.company', 'company')
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy('application.createdAt', 'DESC')
            .getManyAndCount();
        return {
            applications,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getAllPurchases(page = 1, limit = 10) {
        const [purchases, total] = await this.mediaPurchaseRepository
            .createQueryBuilder('purchase')
            .leftJoinAndSelect('purchase.mediaContent', 'mediaContent')
            .leftJoinAndSelect('purchase.buyer', 'buyer')
            .leftJoinAndSelect('purchase.seller', 'seller')
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy('purchase.createdAt', 'DESC')
            .getManyAndCount();
        return {
            purchases,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async bulkApproveJournalists(journalistIds, approved, adminId) {
        const journalists = await this.journalistRepository.find({
            where: { id: (0, typeorm_2.In)(journalistIds) }
        });
        for (const journalist of journalists) {
            journalist.isApproved = approved;
            journalist.approvedBy = adminId;
            journalist.approvedAt = new Date();
            if (approved && journalist.user) {
                journalist.user.status = user_entity_1.UserStatus.ACTIVE;
                await this.userRepository.save(journalist.user);
            }
        }
        return await this.journalistRepository.save(journalists);
    }
    async bulkApproveCompanies(companyIds, approved, adminId) {
        const companies = await this.companyRepository.find({
            where: { id: (0, typeorm_2.In)(companyIds) }
        });
        for (const company of companies) {
            company.isVerified = approved;
            if (approved && company.user) {
                company.user.status = user_entity_1.UserStatus.ACTIVE;
                await this.userRepository.save(company.user);
            }
        }
        return await this.companyRepository.save(companies);
    }
    async bulkApproveJobs(jobIds, approved, adminId) {
        const jobs = await this.jobRepository.find({
            where: { id: (0, typeorm_2.In)(jobIds) }
        });
        for (const job of jobs) {
            job.isApproved = approved;
            job.approvedBy = adminId;
            job.approvedAt = new Date();
            if (approved) {
                job.status = job_entity_1.JobStatus.PUBLISHED;
            }
        }
        return await this.jobRepository.save(jobs);
    }
    async bulkApproveMediaContent(mediaIds, approved, adminId) {
        const mediaContent = await this.mediaContentRepository.find({
            where: { id: (0, typeorm_2.In)(mediaIds) }
        });
        for (const media of mediaContent) {
            media.isApproved = approved;
            media.approvedBy = adminId;
            media.approvedAt = new Date();
            if (approved) {
                media.status = media_content_entity_1.MediaStatus.PUBLISHED;
            }
        }
        return await this.mediaContentRepository.save(mediaContent);
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(journalist_entity_1.Journalist)),
    __param(2, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __param(3, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __param(4, (0, typeorm_1.InjectRepository)(media_content_entity_1.MediaContent)),
    __param(5, (0, typeorm_1.InjectRepository)(job_application_entity_1.JobApplication)),
    __param(6, (0, typeorm_1.InjectRepository)(media_purchase_entity_1.MediaPurchase)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AdminService);
//# sourceMappingURL=admin.service.js.map