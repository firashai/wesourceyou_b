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
exports.MediaContentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const path = require("path");
const media_content_entity_1 = require("./entities/media-content.entity");
const media_purchase_entity_1 = require("./entities/media-purchase.entity");
let MediaContentService = class MediaContentService {
    constructor(mediaContentRepository, mediaPurchaseRepository) {
        this.mediaContentRepository = mediaContentRepository;
        this.mediaPurchaseRepository = mediaPurchaseRepository;
    }
    async generateThumbnail(file) {
        try {
            const filePath = file.path;
            const fileExtension = path.extname(file.originalname).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(fileExtension)) {
                return `/uploads/${file.filename}`;
            }
            if (['.mp4', '.avi', '.mov', '.wmv'].includes(fileExtension)) {
                return null;
            }
            if (['.mp3', '.wav', '.mpeg'].includes(fileExtension)) {
                return null;
            }
            if (['.pdf', '.doc', '.docx'].includes(fileExtension)) {
                return null;
            }
            return null;
        }
        catch (error) {
            console.error('Error generating thumbnail:', error);
            return null;
        }
    }
    async generateThumbnailFromUrl(fileUrl) {
        try {
            if (!fileUrl)
                return null;
            const fileExtension = path.extname(fileUrl).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(fileExtension)) {
                return fileUrl;
            }
            return null;
        }
        catch (error) {
            console.error('Error generating thumbnail from URL:', error);
            return null;
        }
    }
    async create(createMediaContentDto, file, user) {
        if (file) {
            createMediaContentDto.fileUrl = `/uploads/${file.filename}`;
        }
        else if (!createMediaContentDto.fileUrl) {
            throw new common_1.BadRequestException('Either a file must be uploaded or a fileUrl must be provided');
        }
        const mediaContent = this.mediaContentRepository.create({
            ...createMediaContentDto,
            status: media_content_entity_1.MediaStatus.PUBLISHED
        });
        return this.mediaContentRepository.save(mediaContent);
    }
    async createMyContent(createMediaContentDto, file, user) {
        if (file) {
            console.log('File upload details:', {
                originalname: file.originalname,
                filename: file.filename,
                mimetype: file.mimetype,
                size: file.size,
                path: file.path
            });
            if (file.filename) {
                createMediaContentDto.fileUrl = `/uploads/${file.filename}`;
                console.log('Set fileUrl to:', createMediaContentDto.fileUrl);
                const thumbnailUrl = await this.generateThumbnail(file);
                if (thumbnailUrl) {
                    createMediaContentDto.thumbnailUrl = thumbnailUrl;
                    console.log('Set thumbnailUrl to:', createMediaContentDto.thumbnailUrl);
                }
            }
            else {
                throw new common_1.BadRequestException('File upload failed - no filename generated');
            }
        }
        else if (!createMediaContentDto.fileUrl) {
            throw new common_1.BadRequestException('Either a file must be uploaded or a fileUrl must be provided');
        }
        const mediaContent = this.mediaContentRepository.create({
            ...createMediaContentDto,
            status: media_content_entity_1.MediaStatus.DRAFT,
            isApproved: false,
            isVerified: false
        });
        if (user.role === 'journalist') {
            mediaContent.journalist = { id: user.profile?.id };
            mediaContent.company = null;
        }
        else if (user.role === 'company') {
            mediaContent.company = { id: user.profile?.id };
            mediaContent.journalist = null;
        }
        return this.mediaContentRepository.save(mediaContent);
    }
    async findAll(query) {
        const mediaContent = await this.mediaContentRepository.find({
            relations: ['journalist'],
            where: { status: media_content_entity_1.MediaStatus.PUBLISHED },
            order: { createdAt: 'DESC' },
        });
        for (const media of mediaContent) {
            if (!media.thumbnailUrl && media.fileUrl) {
                const thumbnailUrl = await this.generateThumbnailFromUrl(media.fileUrl);
                if (thumbnailUrl && thumbnailUrl !== media.thumbnailUrl) {
                    media.thumbnailUrl = thumbnailUrl;
                    await this.mediaContentRepository.save(media);
                    console.log(`Generated thumbnail for media ${media.id}:`, thumbnailUrl);
                }
            }
        }
        return mediaContent;
    }
    async findOne(id) {
        const mediaContent = await this.mediaContentRepository.findOne({
            where: { id },
            relations: ['journalist', 'purchases'],
        });
        if (!mediaContent) {
            throw new common_1.NotFoundException(`Media content with ID ${id} not found`);
        }
        return mediaContent;
    }
    async findByJournalist(journalistId) {
        return this.mediaContentRepository.find({
            where: { journalist: { id: journalistId } },
            relations: ['journalist'],
            order: { createdAt: 'DESC' },
        });
    }
    async findMyContent(user) {
        let whereCondition = {};
        if (user.role === 'journalist') {
            whereCondition.journalist = { id: user.profile?.id };
        }
        else if (user.role === 'company') {
            whereCondition.company = { id: user.profile?.id };
        }
        const mediaContent = await this.mediaContentRepository.find({
            where: whereCondition,
            relations: ['journalist', 'company'],
            order: { createdAt: 'DESC' },
        });
        for (const media of mediaContent) {
            if (!media.thumbnailUrl && media.fileUrl) {
                const thumbnailUrl = await this.generateThumbnailFromUrl(media.fileUrl);
                if (thumbnailUrl && thumbnailUrl !== media.thumbnailUrl) {
                    media.thumbnailUrl = thumbnailUrl;
                    await this.mediaContentRepository.save(media);
                    console.log(`Generated thumbnail for media ${media.id}:`, thumbnailUrl);
                }
            }
        }
        return mediaContent;
    }
    async update(id, updateMediaContentDto, user) {
        const mediaContent = await this.findOne(id);
        Object.assign(mediaContent, updateMediaContentDto);
        return this.mediaContentRepository.save(mediaContent);
    }
    async updateMyContent(id, updateMediaContentDto, file, user) {
        const mediaContent = await this.findOne(id);
        console.log('Updating media content:', id);
        console.log('Current media content:', mediaContent);
        console.log('Update DTO:', updateMediaContentDto);
        console.log('File:', file);
        if (user.role === 'journalist' && mediaContent.journalist?.id !== user.profile?.id) {
            throw new common_1.ForbiddenException('You can only update your own media content');
        }
        if (user.role === 'company' && mediaContent.company?.id !== user.profile?.id) {
            throw new common_1.ForbiddenException('You can only update your own media content');
        }
        if (file) {
            console.log('File upload details for update:', {
                originalname: file.originalname,
                filename: file.filename,
                mimetype: file.mimetype,
                size: file.size,
                path: file.path
            });
            if (file.filename) {
                updateMediaContentDto.fileUrl = `/uploads/${file.filename}`;
                console.log('Set fileUrl to:', updateMediaContentDto.fileUrl);
                const thumbnailUrl = await this.generateThumbnail(file);
                if (thumbnailUrl) {
                    updateMediaContentDto.thumbnailUrl = thumbnailUrl;
                    console.log('Set thumbnailUrl to:', updateMediaContentDto.thumbnailUrl);
                }
            }
            else {
                throw new common_1.BadRequestException('File upload failed - no filename generated');
            }
        }
        updateMediaContentDto.isApproved = false;
        updateMediaContentDto.status = media_content_entity_1.MediaStatus.DRAFT;
        if (!updateMediaContentDto.usageRights && mediaContent.usageRights) {
            updateMediaContentDto.usageRights = mediaContent.usageRights;
        }
        if (!updateMediaContentDto.fileUrl && mediaContent.fileUrl) {
            updateMediaContentDto.fileUrl = mediaContent.fileUrl;
        }
        if (!updateMediaContentDto.thumbnailUrl && mediaContent.thumbnailUrl) {
            updateMediaContentDto.thumbnailUrl = mediaContent.thumbnailUrl;
        }
        console.log('Final update DTO:', updateMediaContentDto);
        Object.assign(mediaContent, updateMediaContentDto);
        const savedContent = await this.mediaContentRepository.save(mediaContent);
        console.log('Saved media content:', savedContent);
        return savedContent;
    }
    async remove(id, user) {
        const mediaContent = await this.findOne(id);
        await this.mediaContentRepository.remove(mediaContent);
    }
    async removeMyContent(id, user) {
        const mediaContent = await this.findOne(id);
        if (user.role === 'journalist' && mediaContent.journalist?.id !== user.profile?.id) {
            throw new common_1.ForbiddenException('You can only delete your own media content');
        }
        if (user.role === 'company' && mediaContent.company?.id !== user.profile?.id) {
            throw new common_1.ForbiddenException('You can only delete your own media content');
        }
        await this.mediaContentRepository.remove(mediaContent);
    }
    async purchase(id, purchaseDto, user) {
        const { mediaContentId, buyerId, paymentMethod, transactionId, notes } = purchaseDto;
        const mediaContent = await this.findOne(+mediaContentId);
        if (mediaContent.status !== media_content_entity_1.MediaStatus.PUBLISHED) {
            throw new common_1.BadRequestException('Media content is not available for purchase');
        }
        const platformFee = mediaContent.price * 0.1;
        const sellerAmount = mediaContent.price - platformFee;
        const finalTransactionId = transactionId || `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const purchase = this.mediaPurchaseRepository.create({
            transactionId: finalTransactionId,
            amount: mediaContent.price,
            platformFee,
            sellerAmount,
            paymentMethod,
            mediaContent,
            buyer: { id: +buyerId },
            seller: { id: mediaContent.journalist.user.id },
            status: media_purchase_entity_1.PurchaseStatus.COMPLETED,
        });
        const savedPurchase = await this.mediaPurchaseRepository.save(purchase);
        mediaContent.totalSales += 1;
        mediaContent.totalRevenue += sellerAmount;
        await this.mediaContentRepository.save(mediaContent);
        return savedPurchase;
    }
    async getFeaturedContent() {
        const mediaContent = await this.mediaContentRepository.find({
            relations: ['journalist'],
            where: { isFeatured: true, status: media_content_entity_1.MediaStatus.PUBLISHED },
            order: { rating: 'DESC' },
            take: 10,
        });
        for (const media of mediaContent) {
            if (!media.thumbnailUrl && media.fileUrl) {
                const thumbnailUrl = await this.generateThumbnailFromUrl(media.fileUrl);
                if (thumbnailUrl && thumbnailUrl !== media.thumbnailUrl) {
                    media.thumbnailUrl = thumbnailUrl;
                    await this.mediaContentRepository.save(media);
                    console.log(`Generated thumbnail for featured media ${media.id}:`, thumbnailUrl);
                }
            }
        }
        return mediaContent;
    }
    async findFeatured() {
        return this.getFeaturedContent();
    }
    async search(query) {
        const mediaContent = await this.mediaContentRepository.find({
            relations: ['journalist'],
            where: { status: media_content_entity_1.MediaStatus.PUBLISHED },
            order: { rating: 'DESC' },
        });
        for (const media of mediaContent) {
            if (!media.thumbnailUrl && media.fileUrl) {
                const thumbnailUrl = await this.generateThumbnailFromUrl(media.fileUrl);
                if (thumbnailUrl && thumbnailUrl !== media.thumbnailUrl) {
                    media.thumbnailUrl = thumbnailUrl;
                    await this.mediaContentRepository.save(media);
                    console.log(`Generated thumbnail for search media ${media.id}:`, thumbnailUrl);
                }
            }
        }
        return mediaContent;
    }
    async searchByType(mediaType) {
        const mediaContent = await this.mediaContentRepository.find({
            relations: ['journalist'],
            where: { mediaType, status: media_content_entity_1.MediaStatus.PUBLISHED },
            order: { rating: 'DESC' },
        });
        for (const media of mediaContent) {
            if (!media.thumbnailUrl && media.fileUrl) {
                const thumbnailUrl = await this.generateThumbnailFromUrl(media.fileUrl);
                if (thumbnailUrl && thumbnailUrl !== media.thumbnailUrl) {
                    media.thumbnailUrl = thumbnailUrl;
                    await this.mediaContentRepository.save(media);
                    console.log(`Generated thumbnail for type search media ${media.id}:`, thumbnailUrl);
                }
            }
        }
        return mediaContent;
    }
    async searchByPriceRange(minPrice, maxPrice) {
        const mediaContent = await this.mediaContentRepository.find({
            relations: ['journalist'],
            where: {
                price: (0, typeorm_2.Between)(minPrice, maxPrice),
                status: media_content_entity_1.MediaStatus.PUBLISHED,
            },
            order: { price: 'ASC' },
        });
        for (const media of mediaContent) {
            if (!media.thumbnailUrl && media.fileUrl) {
                const thumbnailUrl = await this.generateThumbnailFromUrl(media.fileUrl);
                if (thumbnailUrl && thumbnailUrl !== media.thumbnailUrl) {
                    media.thumbnailUrl = thumbnailUrl;
                    await this.mediaContentRepository.save(media);
                    console.log(`Generated thumbnail for price range search media ${media.id}:`, thumbnailUrl);
                }
            }
        }
        return mediaContent;
    }
    async incrementViews(id) {
        await this.mediaContentRepository.increment({ id }, 'totalViews', 1);
    }
    async updateRating(id, newRating) {
        const mediaContent = await this.findOne(id);
        const totalRating = mediaContent.rating * mediaContent.reviews.length + newRating;
        mediaContent.reviews.push({
            userId: 0,
            rating: newRating,
            comment: '',
            date: new Date(),
        });
        mediaContent.rating = totalRating / mediaContent.reviews.length;
        return this.mediaContentRepository.save(mediaContent);
    }
};
exports.MediaContentService = MediaContentService;
exports.MediaContentService = MediaContentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(media_content_entity_1.MediaContent)),
    __param(1, (0, typeorm_1.InjectRepository)(media_purchase_entity_1.MediaPurchase)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MediaContentService);
//# sourceMappingURL=media-content.service.js.map