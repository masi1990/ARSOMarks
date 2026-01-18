import { ComplaintStatus } from '../../../shared/enums';
export declare class Complaint {
    id: string;
    complaintNumber: string;
    complainantName: string;
    complainantEmail: string;
    complainantPhone?: string;
    subject: string;
    description: string;
    evidenceFiles?: Record<string, any>[];
    referenceType?: string;
    referenceId?: string;
    status: ComplaintStatus;
    decisionNotes?: string;
    createdAt: Date;
    updatedAt: Date;
}
