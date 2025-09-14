import { MediaWorkType, AnalystSpecialty } from '../entities/journalist.entity';
export declare class SearchJournalistDto {
    location?: string;
    mediaWorkType?: MediaWorkType;
    analystSpecialty?: AnalystSpecialty;
    hasCamera?: boolean;
    canTravel?: boolean;
    skills?: string[];
    languages?: string[];
    limit?: number;
    offset?: number;
}
