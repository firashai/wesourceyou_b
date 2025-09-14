import { MediaWorkType, AnalystSpecialty } from '../../journalists/entities/journalist.entity';
export declare class Company {
    id: number;
    name: string;
    website: string;
    description: string;
    mission: string;
    vision: string;
    logo: string;
    requiredServices: {
        serviceType: MediaWorkType;
        analystSpecialty?: AnalystSpecialty;
        description?: string;
    }[];
    companySize: {
        employees: number;
        range: string;
    };
    industry: string[];
    specializations: string[];
    languages: string[];
    locations: {
        country: string;
        city: string;
        address: string;
    }[];
    socialMediaAccounts: {
        platform: string;
        url: string;
    }[];
    rating: number;
    totalReviews: number;
    completedProjects: number;
    isActive: boolean;
    isVerified: boolean;
    contactPersons: {
        name: string;
        position: string;
        email: string;
        phone: string;
    }[];
    paymentMethods: string[];
    preferredCommunication: string[];
    createdAt: Date;
    updatedAt: Date;
    user: any;
    jobs: any[];
    applications: any[];
}
