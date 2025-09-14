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
exports.MediaContentController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const media_content_service_1 = require("./media-content.service");
const create_media_content_dto_1 = require("./dto/create-media-content.dto");
const update_media_content_dto_1 = require("./dto/update-media-content.dto");
const purchase_media_content_dto_1 = require("./dto/purchase-media-content.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const media_content_transform_interceptor_1 = require("./interceptors/media-content-transform.interceptor");
const multer_1 = require("multer");
const path_1 = require("path");
let MediaContentController = class MediaContentController {
    constructor(mediaContentService) {
        this.mediaContentService = mediaContentService;
    }
    static getFileUploadConfig() {
        return {
            storage: (0, multer_1.diskStorage)({
                destination: (req, file, cb) => {
                    const fs = require('fs');
                    const path = require('path');
                    const uploadsDir = path.join(process.cwd(), 'uploads');
                    if (!fs.existsSync(uploadsDir)) {
                        fs.mkdirSync(uploadsDir, { recursive: true });
                    }
                    cb(null, uploadsDir);
                },
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                    const extension = (0, path_1.extname)(file.originalname);
                    cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
                }
            }),
            fileFilter: (req, file, cb) => {
                const allowedMimeTypes = [
                    'image/jpeg',
                    'image/png',
                    'image/gif',
                    'image/webp',
                    'video/mp4',
                    'video/avi',
                    'video/mov',
                    'video/wmv',
                    'audio/mpeg',
                    'audio/wav',
                    'audio/mp3',
                    'application/pdf',
                    'application/msword',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                ];
                if (allowedMimeTypes.includes(file.mimetype)) {
                    cb(null, true);
                }
                else {
                    cb(new Error('Invalid file type'), false);
                }
            },
            limits: {
                fileSize: 100 * 1024 * 1024,
            }
        };
    }
    create(createMediaContentDto, file, req) {
        return this.mediaContentService.create(createMediaContentDto, file, req.user);
    }
    findAll(query) {
        return this.mediaContentService.findAll(query);
    }
    findFeatured() {
        return this.mediaContentService.findFeatured();
    }
    search(query) {
        return this.mediaContentService.search(query);
    }
    findOne(id) {
        return this.mediaContentService.findOne(+id);
    }
    update(id, updateMediaContentDto, req) {
        return this.mediaContentService.update(+id, updateMediaContentDto, req.user);
    }
    remove(id, req) {
        return this.mediaContentService.remove(+id, req.user);
    }
    purchase(id, purchaseDto, req) {
        return this.mediaContentService.purchase(+id, purchaseDto, req.user);
    }
    findMyContent(req) {
        return this.mediaContentService.findMyContent(req.user);
    }
    async uploadMyContent(createMediaContentDto, file, req) {
        try {
            console.log('Upload request received:', { file: file?.filename, dto: createMediaContentDto });
            const result = await this.mediaContentService.createMyContent(createMediaContentDto, file, req.user);
            console.log('Upload successful:', result);
            return result;
        }
        catch (error) {
            console.error('Upload failed:', error);
            throw error;
        }
    }
    async updateMyContent(id, updateMediaContentDto, file, req) {
        try {
            console.log('Update request received:', { id, file: file?.filename, dto: updateMediaContentDto });
            const result = await this.mediaContentService.updateMyContent(+id, updateMediaContentDto, file, req.user);
            console.log('Update successful:', result);
            return result;
        }
        catch (error) {
            console.error('Update failed:', error);
            throw error;
        }
    }
    removeMyContent(id, req) {
        return this.mediaContentService.removeMyContent(+id, req.user);
    }
};
exports.MediaContentController = MediaContentController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', MediaContentController.getFileUploadConfig()), media_content_transform_interceptor_1.MediaContentTransformInterceptor),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_media_content_dto_1.CreateMediaContentDto, Object, Object]),
    __metadata("design:returntype", void 0)
], MediaContentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MediaContentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('featured'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MediaContentController.prototype, "findFeatured", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MediaContentController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MediaContentController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)(media_content_transform_interceptor_1.MediaContentTransformInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_media_content_dto_1.UpdateMediaContentDto, Object]),
    __metadata("design:returntype", void 0)
], MediaContentController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MediaContentController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':id/purchase'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, purchase_media_content_dto_1.PurchaseMediaContentDto, Object]),
    __metadata("design:returntype", void 0)
], MediaContentController.prototype, "purchase", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('my/content'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MediaContentController.prototype, "findMyContent", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('my/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', MediaContentController.getFileUploadConfig()), media_content_transform_interceptor_1.MediaContentTransformInterceptor),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_media_content_dto_1.CreateMediaContentDto, Object, Object]),
    __metadata("design:returntype", Promise)
], MediaContentController.prototype, "uploadMyContent", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('my/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', MediaContentController.getFileUploadConfig()), media_content_transform_interceptor_1.MediaContentTransformInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_media_content_dto_1.UpdateMediaContentDto, Object, Object]),
    __metadata("design:returntype", Promise)
], MediaContentController.prototype, "updateMyContent", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('my/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MediaContentController.prototype, "removeMyContent", null);
exports.MediaContentController = MediaContentController = __decorate([
    (0, common_1.Controller)('media-content'),
    __metadata("design:paramtypes", [media_content_service_1.MediaContentService])
], MediaContentController);
//# sourceMappingURL=media-content.controller.js.map