import { PaymentMethod } from '../entities/media-purchase.entity';
export declare class PurchaseMediaContentDto {
    mediaContentId: string;
    buyerId: string;
    amount: number;
    paymentMethod?: PaymentMethod;
    transactionId?: string;
    notes?: string;
}
