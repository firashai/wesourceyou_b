export declare enum MediaWorkType {
    VIDEO_PRODUCTION = "video_production",
    PHOTO_JOURNALISM = "photo_journalism",
    WRITTEN_CONTENT = "written_content",
    AUDIO_PRODUCTION = "audio_production"
}
export declare enum AnalystSpecialty {
    ARABIC_AFFAIRS = "arabic_affairs",
    KURDISH_AFFAIRS = "kurdish_affairs",
    PERSIAN_AFFAIRS = "persian_affairs",
    MIDDLE_EASTERN_AFFAIRS = "middle_eastern_affairs",
    EUROPEAN_AFFAIRS = "european_affairs",
    AMERICAN_AFFAIRS = "american_affairs",
    OTHER = "other"
}
export declare enum SocialMediaPlatform {
    FACEBOOK = "facebook",
    TWITTER = "twitter",
    YOUTUBE = "youtube",
    OTHER = "other"
}
export declare enum ExperienceLevel {
    JUNIOR = "junior",
    MID_LEVEL = "mid_level",
    SENIOR = "senior",
    EXPERT = "expert"
}
export declare class Journalist {
    id: number;
    bio: string;
    hasCamera: boolean;
    cameraType: string;
    hasAudioEquipment: boolean;
    audioEquipmentType: string;
    canTravel: boolean;
    mediaWorkType: MediaWorkType;
    analystSpecialty: AnalystSpecialty;
    experienceLevel: ExperienceLevel;
    socialMediaAccounts: {
        platform: SocialMediaPlatform;
        url: string;
    }[];
    previousWorkLinks: string[];
    rating: number;
    totalReviews: number;
    completedProjects: number;
    skills: string[];
    languages: string[];
    certifications: string[];
    portfolio: {
        title: string;
        description: string;
        url: string;
        type: string;
    }[];
    isAvailable: boolean;
    isApproved: boolean;
    approvedBy: number;
    approvedAt: Date;
    approvalNotes: string;
    hourlyRate: number;
    dailyRate: number;
    projectRate: number;
    createdAt: Date;
    updatedAt: Date;
    user: any;
    mediaContent: any[];
    jobApplications: any[];
}
