export declare enum ApplicationStatus {
    PENDING = "pending",
    REVIEWING = "reviewing",
    SHORTLISTED = "shortlisted",
    INTERVIEWED = "interviewed",
    ACCEPTED = "accepted",
    REJECTED = "rejected",
    WITHDRAWN = "withdrawn"
}
export declare class JobApplication {
    id: number;
    coverLetter: string;
    resumeUrl: string;
    resumeFilename: string;
    resumeSize: number;
    portfolio: string;
    samples: string;
    status: ApplicationStatus;
    proposedRate: number;
    proposedRateCurrency: string;
    proposedRatePeriod: string;
    availableStartDate: Date;
    availability: string;
    answers: string;
    references: string;
    additionalInfo: string;
    skills: string;
    languages: string;
    equipment: string;
    experience: string;
    education: string;
    notes: string;
    rejectionReason: string;
    rejectedAt: Date;
    rejectedBy: number;
    acceptanceNotes: string;
    acceptedAt: Date;
    acceptedBy: number;
    createdAt: Date;
    updatedAt: Date;
    job: any;
    journalist: any;
    company: any;
}
