export declare enum MediaType {
    VIDEO = "video",
    PHOTO = "photo",
    AUDIO = "audio",
    DOCUMENT = "document",
    FOOTAGE = "footage"
}
export declare enum MediaStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    SOLD = "sold",
    ARCHIVED = "archived"
}
export declare enum LicenseType {
    EXCLUSIVE = "exclusive",
    NON_EXCLUSIVE = "non_exclusive",
    LIMITED_USE = "limited_use",
    CUSTOM = "custom"
}
export declare class MediaContent {
    id: number;
    title: string;
    description: string;
    mediaType: MediaType;
    status: MediaStatus;
    fileUrl: string;
    thumbnailUrl: string;
    previewUrl: string;
    price: number;
    licenseType: LicenseType;
    tags: string[];
    categories: string[];
    location: string;
    recordedDate: Date;
    duration: string;
    resolution: string;
    fileSize: string;
    metadata: {
        camera?: string;
        settings?: string;
        location?: string;
        [key: string]: any;
    };
    usageRights: {
        allowedUses: string[];
        restrictions: string[];
        attribution: boolean;
    };
    rating: number;
    totalViews: number;
    totalDownloads: number;
    totalSales: number;
    totalRevenue: number;
    reviews: {
        userId: number;
        rating: number;
        comment: string;
        date: Date;
    }[];
    isFeatured: boolean;
    isVerified: boolean;
    isApproved: boolean;
    approvedBy: number;
    approvedAt: Date;
    approvalNotes: string;
    watermarks: {
        position: string;
        opacity: number;
        text: string;
    }[];
    alternativeFormats: {
        format: string;
        url: string;
        price: number;
    }[];
    createdAt: Date;
    updatedAt: Date;
    journalist: any;
    company: any;
    purchases: any[];
}
