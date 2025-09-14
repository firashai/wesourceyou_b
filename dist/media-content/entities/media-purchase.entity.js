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
exports.MediaPurchase = exports.PaymentMethod = exports.PurchaseStatus = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
var PurchaseStatus;
(function (PurchaseStatus) {
    PurchaseStatus["PENDING"] = "pending";
    PurchaseStatus["COMPLETED"] = "completed";
    PurchaseStatus["FAILED"] = "failed";
    PurchaseStatus["REFUNDED"] = "refunded";
})(PurchaseStatus || (exports.PurchaseStatus = PurchaseStatus = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CREDIT_CARD"] = "credit_card";
    PaymentMethod["BANK_TRANSFER"] = "bank_transfer";
    PaymentMethod["PAYPAL"] = "paypal";
    PaymentMethod["CRYPTO"] = "crypto";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
let MediaPurchase = class MediaPurchase {
};
exports.MediaPurchase = MediaPurchase;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MediaPurchase.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MediaPurchase.prototype, "transactionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], MediaPurchase.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], MediaPurchase.prototype, "platformFee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], MediaPurchase.prototype, "sellerAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PurchaseStatus,
        default: PurchaseStatus.PENDING,
    }),
    __metadata("design:type", String)
], MediaPurchase.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PaymentMethod,
    }),
    __metadata("design:type", String)
], MediaPurchase.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MediaPurchase.prototype, "paymentReference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], MediaPurchase.prototype, "licenseDetails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], MediaPurchase.prototype, "buyerInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], MediaPurchase.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MediaPurchase.prototype, "downloadUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], MediaPurchase.prototype, "downloadExpiryDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], MediaPurchase.prototype, "isDownloaded", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], MediaPurchase.prototype, "downloadedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", String)
], MediaPurchase.prototype, "refundReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MediaPurchase.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], MediaPurchase.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('MediaContent', 'purchases'),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], MediaPurchase.prototype, "mediaContent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('User', 'purchases'),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], MediaPurchase.prototype, "buyer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('User', 'sales'),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], MediaPurchase.prototype, "seller", void 0);
exports.MediaPurchase = MediaPurchase = __decorate([
    (0, typeorm_1.Entity)('media_purchases')
], MediaPurchase);
//# sourceMappingURL=media-purchase.entity.js.map