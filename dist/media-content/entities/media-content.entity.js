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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaContent = exports.LicenseType = exports.MediaStatus = exports.MediaType = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
var MediaType;
(function (MediaType) {
    MediaType["VIDEO"] = "video";
    MediaType["PHOTO"] = "photo";
    MediaType["AUDIO"] = "audio";
    MediaType["DOCUMENT"] = "document";
    MediaType["FOOTAGE"] = "footage";
})(MediaType || (exports.MediaType = MediaType = {}));
var MediaStatus;
(function (MediaStatus) {
    MediaStatus["DRAFT"] = "draft";
    MediaStatus["PUBLISHED"] = "published";
    MediaStatus["SOLD"] = "sold";
    MediaStatus["ARCHIVED"] = "archived";
})(MediaStatus || (exports.MediaStatus = MediaStatus = {}));
var LicenseType;
(function (LicenseType) {
    LicenseType["EXCLUSIVE"] = "exclusive";
    LicenseType["NON_EXCLUSIVE"] = "non_exclusive";
    LicenseType["LIMITED_USE"] = "limited_use";
    LicenseType["CUSTOM"] = "custom";
})(LicenseType || (exports.LicenseType = LicenseType = {}));
let MediaContent = class MediaContent {
};
exports.MediaContent = MediaContent;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MediaContent.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MediaContent.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], MediaContent.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: MediaType,
    }),
    __metadata("design:type", String)
], MediaContent.prototype, "mediaType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: MediaStatus,
        default: MediaStatus.DRAFT,
    }),
    __metadata("design:type", String)
], MediaContent.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MediaContent.prototype, "fileUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MediaContent.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MediaContent.prototype, "previewUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], MediaContent.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: LicenseType,
        default: LicenseType.NON_EXCLUSIVE,
    }),
    __metadata("design:type", String)
], MediaContent.prototype, "licenseType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], MediaContent.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], MediaContent.prototype, "categories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MediaContent.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], MediaContent.prototype, "recordedDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MediaContent.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MediaContent.prototype, "resolution", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MediaContent.prototype, "fileSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], MediaContent.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], MediaContent.prototype, "usageRights", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 3, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], MediaContent.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], MediaContent.prototype, "totalViews", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], MediaContent.prototype, "totalDownloads", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], MediaContent.prototype, "totalSales", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], MediaContent.prototype, "totalRevenue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], MediaContent.prototype, "reviews", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], MediaContent.prototype, "isFeatured", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], MediaContent.prototype, "isVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], MediaContent.prototype, "isApproved", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], MediaContent.prototype, "approvedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], MediaContent.prototype, "approvedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], MediaContent.prototype, "approvalNotes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], MediaContent.prototype, "watermarks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], MediaContent.prototype, "alternativeFormats", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MediaContent.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], MediaContent.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('Journalist', 'mediaContent'),
    (0, typeorm_1.JoinColumn)({ name: 'journalistId' }),
    __metadata("design:type", Object)
], MediaContent.prototype, "journalist", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('Company', 'mediaContent'),
    (0, typeorm_1.JoinColumn)({ name: 'companyId' }),
    __metadata("design:type", Object)
], MediaContent.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('MediaPurchase', 'mediaContent'),
    __metadata("design:type", Array)
], MediaContent.prototype, "purchases", void 0);
exports.MediaContent = MediaContent = __decorate([
    (0, typeorm_1.Entity)('media_content')
], MediaContent);
//# sourceMappingURL=media-content.entity.js.map