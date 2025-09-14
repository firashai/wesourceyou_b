import { MediaWorkType, AnalystSpecialty } from '../../journalists/entities/journalist.entity';
export declare class RegisterCompanyDto {
    email: string;
    password: string;
    name: string;
    country: string;
    city: string;
    phoneNumber: string;
    website?: string;
    requiredServices?: {
        serviceType: MediaWorkType;
        analystSpecialty?: AnalystSpecialty;
        description?: string;
    }[];
}
