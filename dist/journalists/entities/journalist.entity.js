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
exports.Journalist = exports.ExperienceLevel = exports.SocialMediaPlatform = exports.AnalystSpecialty = exports.MediaWorkType = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
var MediaWorkType;
(function (MediaWorkType) {
    MediaWorkType["VIDEO_PRODUCTION"] = "video_production";
    MediaWorkType["PHOTO_JOURNALISM"] = "photo_journalism";
    MediaWorkType["WRITTEN_CONTENT"] = "written_content";
    MediaWorkType["AUDIO_PRODUCTION"] = "audio_production";
})(MediaWorkType || (exports.MediaWorkType = MediaWorkType = {}));
var AnalystSpecialty;
(function (AnalystSpecialty) {
    AnalystSpecialty["ARABIC_AFFAIRS"] = "arabic_affairs";
    AnalystSpecialty["KURDISH_AFFAIRS"] = "kurdish_affairs";
    AnalystSpecialty["PERSIAN_AFFAIRS"] = "persian_affairs";
    AnalystSpecialty["MIDDLE_EASTERN_AFFAIRS"] = "middle_eastern_affairs";
    AnalystSpecialty["EUROPEAN_AFFAIRS"] = "european_affairs";
    AnalystSpecialty["AMERICAN_AFFAIRS"] = "american_affairs";
    AnalystSpecialty["OTHER"] = "other";
})(AnalystSpecialty || (exports.AnalystSpecialty = AnalystSpecialty = {}));
var SocialMediaPlatform;
(function (SocialMediaPlatform) {
    SocialMediaPlatform["FACEBOOK"] = "facebook";
    SocialMediaPlatform["TWITTER"] = "twitter";
    SocialMediaPlatform["YOUTUBE"] = "youtube";
    SocialMediaPlatform["OTHER"] = "other";
})(SocialMediaPlatform || (exports.SocialMediaPlatform = SocialMediaPlatform = {}));
var ExperienceLevel;
(function (ExperienceLevel) {
    ExperienceLevel["JUNIOR"] = "junior";
    ExperienceLevel["MID_LEVEL"] = "mid_level";
    ExperienceLevel["SENIOR"] = "senior";
    ExperienceLevel["EXPERT"] = "expert";
})(ExperienceLevel || (exports.ExperienceLevel = ExperienceLevel = {}));
let Journalist = class Journalist {
};
exports.Journalist = Journalist;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Journalist.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Journalist.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Journalist.prototype, "hasCamera", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Journalist.prototype, "cameraType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Journalist.prototype, "hasAudioEquipment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Journalist.prototype, "audioEquipmentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Journalist.prototype, "canTravel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: MediaWorkType,
    }),
    __metadata("design:type", String)
], Journalist.prototype, "mediaWorkType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: AnalystSpecialty,
        nullable: true,
    }),
    __metadata("design:type", String)
], Journalist.prototype, "analystSpecialty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ExperienceLevel,
        nullable: true,
    }),
    __metadata("design:type", String)
], Journalist.prototype, "experienceLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Journalist.prototype, "socialMediaAccounts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Journalist.prototype, "previousWorkLinks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 3, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Journalist.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Journalist.prototype, "totalReviews", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Journalist.prototype, "completedProjects", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Journalist.prototype, "skills", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Journalist.prototype, "languages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Journalist.prototype, "certifications", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Journalist.prototype, "portfolio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Journalist.prototype, "isAvailable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Journalist.prototype, "isApproved", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Journalist.prototype, "approvedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Journalist.prototype, "approvedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Journalist.prototype, "approvalNotes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Journalist.prototype, "hourlyRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Journalist.prototype, "dailyRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Journalist.prototype, "projectRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Journalist.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Journalist.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)('User', 'journalist'),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", Object)
], Journalist.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('MediaContent', 'journalist'),
    __metadata("design:type", Array)
], Journalist.prototype, "mediaContent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('JobApplication', 'journalist'),
    __metadata("design:type", Array)
], Journalist.prototype, "jobApplications", void 0);
exports.Journalist = Journalist = __decorate([
    (0, typeorm_1.Entity)('journalists')
], Journalist);
//# sourceMappingURL=journalist.entity.js.map