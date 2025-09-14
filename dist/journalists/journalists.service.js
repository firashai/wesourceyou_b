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
exports.JournalistsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const journalist_entity_1 = require("./entities/journalist.entity");
let JournalistsService = class JournalistsService {
    constructor(journalistRepository) {
        this.journalistRepository = journalistRepository;
    }
    async create(createJournalistDto) {
        const journalist = this.journalistRepository.create(createJournalistDto);
        return this.journalistRepository.save(journalist);
    }
    async findAll(searchDto) {
        if (searchDto) {
            return this.search(searchDto);
        }
        return this.journalistRepository.find({
            relations: ['user', 'mediaContent'],
        });
    }
    async findOne(id) {
        const journalist = await this.journalistRepository.findOne({
            where: { id },
            relations: ['user', 'mediaContent'],
        });
        if (!journalist) {
            throw new common_1.NotFoundException(`Journalist with ID ${id} not found`);
        }
        return journalist;
    }
    async findByUserId(userId) {
        const journalist = await this.journalistRepository.findOne({
            where: { user: { id: userId } },
            relations: ['user', 'mediaContent'],
        });
        if (!journalist) {
            throw new common_1.NotFoundException(`Journalist with user ID ${userId} not found`);
        }
        return journalist;
    }
    async update(id, updateJournalistDto, user) {
        const journalist = await this.findOne(id);
        if (journalist.user.id !== user.id && user.role !== 'admin') {
            throw new common_1.ForbiddenException('You can only update your own journalist profile');
        }
        Object.assign(journalist, updateJournalistDto);
        return this.journalistRepository.save(journalist);
    }
    async remove(id, user) {
        const journalist = await this.findOne(id);
        if (journalist.user.id !== user.id && user.role !== 'admin') {
            throw new common_1.ForbiddenException('You can only delete your own journalist profile');
        }
        await this.journalistRepository.remove(journalist);
    }
    async getMyProfile(userId) {
        return this.findByUserId(userId);
    }
    async updateMyProfile(userId, updateJournalistDto) {
        const journalist = await this.findByUserId(userId);
        Object.assign(journalist, updateJournalistDto);
        return this.journalistRepository.save(journalist);
    }
    async getMyMediaContent(userId) {
        return this.journalistRepository.findOne({
            where: { user: { id: userId } },
            relations: ['user', 'mediaContent'],
        });
    }
    async getMyApplications(userId) {
        return this.journalistRepository.findOne({
            where: { user: { id: userId } },
            relations: ['user', 'jobApplications', 'jobApplications.job'],
        });
    }
    async search(searchDto) {
        const { location, mediaWorkType, analystSpecialty, hasCamera, canTravel, skills, languages, limit = 20, offset = 0, } = searchDto;
        const queryBuilder = this.journalistRepository
            .createQueryBuilder('journalist')
            .leftJoinAndSelect('journalist.user', 'user')
            .leftJoinAndSelect('journalist.mediaContent', 'mediaContent')
            .where('journalist.isAvailable = :isAvailable', { isAvailable: true })
            .andWhere('user.status = :status', { status: 'active' });
        if (location) {
            queryBuilder.andWhere('(journalist.country LIKE :location OR journalist.cityOfResidence LIKE :location)', { location: `%${location}%` });
        }
        if (mediaWorkType) {
            queryBuilder.andWhere('journalist.mediaWorkType = :mediaWorkType', { mediaWorkType });
        }
        if (analystSpecialty) {
            queryBuilder.andWhere('journalist.analystSpecialty = :analystSpecialty', { analystSpecialty });
        }
        if (hasCamera !== undefined) {
            queryBuilder.andWhere('journalist.hasCamera = :hasCamera', { hasCamera });
        }
        if (canTravel !== undefined) {
            queryBuilder.andWhere('journalist.canTravel = :canTravel', { canTravel });
        }
        if (skills && skills.length > 0) {
            queryBuilder.andWhere('JSON_CONTAINS(journalist.skills, :skills)', { skills: JSON.stringify(skills) });
        }
        if (languages && languages.length > 0) {
            queryBuilder.andWhere('JSON_CONTAINS(journalist.languages, :languages)', { languages: JSON.stringify(languages) });
        }
        queryBuilder
            .orderBy('journalist.rating', 'DESC')
            .addOrderBy('journalist.completedProjects', 'DESC')
            .limit(limit)
            .offset(offset);
        return queryBuilder.getMany();
    }
    async getTopRated(limit = 10) {
        return this.journalistRepository.find({
            relations: ['user'],
            where: { isAvailable: true },
            order: { rating: 'DESC', completedProjects: 'DESC' },
            take: limit,
        });
    }
    async getByMediaWorkType(mediaWorkType) {
        return this.journalistRepository.find({
            relations: ['user'],
            where: {
                mediaWorkType,
                isAvailable: true,
            },
            order: { rating: 'DESC' },
        });
    }
    async getByLocation(country, city) {
        const whereCondition = {
            country,
            isAvailable: true,
        };
        if (city) {
            whereCondition.cityOfResidence = city;
        }
        return this.journalistRepository.find({
            relations: ['user'],
            where: whereCondition,
            order: { rating: 'DESC' },
        });
    }
    async updateRating(id, newRating) {
        const journalist = await this.findOne(id);
        const totalRating = journalist.rating * journalist.totalReviews + newRating;
        journalist.totalReviews += 1;
        journalist.rating = totalRating / journalist.totalReviews;
        return this.journalistRepository.save(journalist);
    }
    async updateCompletedProjects(id) {
        const journalist = await this.findOne(id);
        journalist.completedProjects += 1;
        return this.journalistRepository.save(journalist);
    }
};
exports.JournalistsService = JournalistsService;
exports.JournalistsService = JournalistsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(journalist_entity_1.Journalist)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], JournalistsService);
//# sourceMappingURL=journalists.service.js.map