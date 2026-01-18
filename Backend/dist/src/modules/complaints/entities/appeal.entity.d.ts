import { AppealStatus } from '../../../shared/enums';
import { Complaint } from './complaint.entity';
export declare class Appeal {
    id: string;
    appealNumber: string;
    complaintId: string;
    complaint: Complaint;
    appellantName: string;
    appellantEmail: string;
    appellantPhone?: string;
    reason: string;
    status: AppealStatus;
    decisionNotes?: string;
    createdAt: Date;
    updatedAt: Date;
}
