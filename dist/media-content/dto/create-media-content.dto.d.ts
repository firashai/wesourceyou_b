import { MediaType, MediaStatus, LicenseType } from '../entities/media-content.entity';
export declare class UsageRightsDto {
    allowedUses?: string[];
    restrictions?: string[];
    attribution?: boolean;
}
export declare class CreateMediaContentDto {
    title: string;
    description: string;
    mediaType: MediaType;
    status?: MediaStatus;
    fileUrl?: string;
    thumbnailUrl?: string;
    previewUrl?: string;
    price: number;
    licenseType: LicenseType;
    tags?: string[];
    categories?: string[];
    location?: string;
    duration?: string;
    resolution?: string;
    fileSize?: string;
    isExclusive?: boolean;
    isFeatured?: boolean;
    isApproved?: boolean;
    isVerified?: boolean;
    usageRights?: UsageRightsDto;
}
