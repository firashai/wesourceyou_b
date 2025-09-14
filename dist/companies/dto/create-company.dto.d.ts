import { MediaWorkType, AnalystSpecialty } from '../../journalists/entities/journalist.entity';
declare class RequiredServiceDto {
    serviceType: MediaWorkType;
    analystSpecialty?: AnalystSpecialty;
    description?: string;
}
declare class CompanySizeDto {
    employees: number;
    range: string;
}
declare class LocationDto {
    country: string;
    city: string;
    address: string;
}
declare class SocialMediaAccountDto {
    platform: string;
    url: string;
}
export declare class CreateCompanyDto {
    name: string;
    contactName: string;
    email: string;
    password: string;
    country: string;
    city: string;
    phoneNumber: string;
    website?: string;
    companySize: CompanySizeDto;
    industry?: string[];
    description: string;
    mission?: string;
    vision?: string;
    requiredServices: RequiredServiceDto[];
    locations?: LocationDto[];
    socialMediaAccounts?: SocialMediaAccountDto[];
    contactPersons?: any[];
    paymentMethods?: string[];
    preferredCommunication?: string[];
}
export {};
