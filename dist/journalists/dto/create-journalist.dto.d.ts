import { MediaWorkType, AnalystSpecialty } from '../entities/journalist.entity';
declare class SocialMediaDto {
    facebook?: string;
    twitter?: string;
    youtube?: string;
    other?: string;
}
export declare class CreateJournalistDto {
    name: string;
    email: string;
    password: string;
    country: string;
    cityOfResidence: string;
    phoneNumber: string;
    dateOfBirth: Date;
    mediaWorkStartDate: Date;
    mediaWorkType: MediaWorkType;
    analystSpecialty?: AnalystSpecialty;
    bio?: string;
    skills?: string[];
    languages?: string[];
    previousWorkLinks?: string[];
    socialMedia?: SocialMediaDto;
    hasCamera?: boolean;
    cameraType?: string;
    hasAudioEquipment?: boolean;
    audioEquipmentType?: string;
    canTravel?: boolean;
}
export {};
