import { MediaWorkType, AnalystSpecialty } from '../../journalists/entities/journalist.entity';
export declare enum JobType {
    FULL_TIME = "full_time",
    PART_TIME = "part_time",
    FREELANCE = "freelance",
    CONTRACT = "contract",
    INTERNSHIP = "internship"
}
export declare enum JobStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    CLOSED = "closed",
    FILLED = "filled",
    EXPIRED = "expired"
}
export declare enum ExperienceLevel {
    ENTRY = "entry",
    JUNIOR = "junior",
    MID = "mid",
    SENIOR = "senior",
    EXPERT = "expert"
}
export declare class Job {
    id: number;
    title: string;
    description: string;
    jobType: JobType;
    status: JobStatus;
    mediaWorkType: MediaWorkType;
    analystSpecialty: AnalystSpecialty;
    experienceLevel: ExperienceLevel;
    requiredSkills: string[];
    preferredSkills: string[];
    requiredLanguages: string[];
    preferredLanguages: string[];
    locations: {
        country: string;
        city: string;
        isRemote: boolean;
        travelRequired: boolean;
    }[];
    salary: {
        min: number;
        max: number;
        currency: string;
        period: string;
        isNegotiable: boolean;
    };
    benefits: string[];
    requirements: {
        hasCamera: boolean;
        cameraType?: string;
        hasAudioEquipment: boolean;
        audioEquipmentType?: string;
        canTravel: boolean;
        certifications?: string[];
        portfolio?: boolean;
    };
    projectDetails: string;
    startDate: Date;
    endDate: Date;
    applicationDeadline: Date;
    numberOfPositions: number;
    applicationsCount: number;
    viewsCount: number;
    tags: string[];
    categories: string[];
    additionalInfo: string;
    contactInfo: {
        name: string;
        email: string;
        phone: string;
        preferredContact: string;
    };
    isUrgent: boolean;
    isFeatured: boolean;
    isVerified: boolean;
    isApproved: boolean;
    approvedBy: number;
    approvedAt: Date;
    approvalNotes: string;
    applicationQuestions: {
        question: string;
        type: string;
        required: boolean;
    }[];
    createdAt: Date;
    updatedAt: Date;
    company: any;
    applications: any[];
}
