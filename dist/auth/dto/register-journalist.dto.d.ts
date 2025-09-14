import { MediaWorkType, AnalystSpecialty, SocialMediaPlatform } from '../../journalists/entities/journalist.entity';
export declare class RegisterJournalistDto {
    email: string;
    password: string;
    name: string;
    country: string;
    cityOfResidence: string;
    phoneNumber: string;
    dateOfBirth: string;
    mediaWorkStartDate: string;
    hasCamera: boolean;
    cameraType?: string;
    hasAudioEquipment: boolean;
    audioEquipmentType?: string;
    canTravel: boolean;
    mediaWorkType: MediaWorkType;
    analystSpecialty?: AnalystSpecialty;
    socialMediaAccounts?: {
        platform: SocialMediaPlatform;
        url: string;
    }[];
    previousWorkLinks?: string[];
}
