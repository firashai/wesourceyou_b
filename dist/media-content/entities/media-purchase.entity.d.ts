export declare enum PurchaseStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed",
    REFUNDED = "refunded"
}
export declare enum PaymentMethod {
    CREDIT_CARD = "credit_card",
    BANK_TRANSFER = "bank_transfer",
    PAYPAL = "paypal",
    CRYPTO = "crypto"
}
export declare class MediaPurchase {
    id: number;
    transactionId: string;
    amount: number;
    platformFee: number;
    sellerAmount: number;
    status: PurchaseStatus;
    paymentMethod: PaymentMethod;
    paymentReference: string;
    licenseDetails: {
        type: string;
        usage: string[];
        restrictions: string[];
        expirationDate?: Date;
    };
    buyerInfo: {
        name: string;
        email: string;
        company?: string;
        usage: string;
    };
    notes: string;
    downloadUrl: string;
    downloadExpiryDate: Date;
    isDownloaded: boolean;
    downloadedAt: Date;
    refundReason: string;
    createdAt: Date;
    updatedAt: Date;
    mediaContent: any;
    buyer: any;
    seller: any;
}
