import { JobType, ExperienceLevel } from '../entities/job.entity';
import { MediaWorkType, AnalystSpecialty } from '../../journalists/entities/journalist.entity';
declare class RequirementsDto {
    hasCamera: boolean;
    cameraType?: string;
    hasAudioEquipment: boolean;
    audioEquipmentType?: string;
    canTravel: boolean;
    certifications?: string[];
    portfolio?: boolean;
}
export declare class CreateJobDto {
    title: string;
    description: string;
    jobType: JobType;
    mediaWorkType: MediaWorkType;
    analystSpecialty?: AnalystSpecialty;
    experienceLevel: ExperienceLevel;
    requiredSkills: string[];
    preferredSkills?: string[];
    requiredLanguages: string[];
    preferredLanguages?: string[];
    salaryMin?: number;
    salaryMax?: number;
    requirements?: RequirementsDto;
    benefits?: string[];
    applicationDeadline?: Date;
    contactEmail?: string;
    contactPhone?: string;
    locations?: {
        country: string;
        city: string;
        address: string;
    }[];
}
export {};
