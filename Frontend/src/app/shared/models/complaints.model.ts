export enum ComplaintStatus {
  RECEIVED = 'RECEIVED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  CLOSED = 'CLOSED',
  REJECTED = 'REJECTED',
}

export enum AppealStatus {
  RECEIVED = 'RECEIVED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  DECIDED = 'DECIDED',
  REJECTED = 'REJECTED',
}

export interface Complaint {
  id: string;
  complaintNumber: string;
  complainantName: string;
  complainantEmail: string;
  complainantPhone?: string;
  subject: string;
  description: string;
  referenceType?: string;
  referenceId?: string;
  status: ComplaintStatus;
  decisionNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateComplaintRequest {
  complainantName: string;
  complainantEmail: string;
  complainantPhone?: string;
  subject: string;
  description: string;
  referenceType?: string;
  referenceId?: string;
}

export interface Appeal {
  id: string;
  appealNumber: string;
  complaintId: string;
  appellantName: string;
  appellantEmail: string;
  appellantPhone?: string;
  reason: string;
  status: AppealStatus;
  decisionNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppealRequest {
  complaintId: string;
  appellantName: string;
  appellantEmail: string;
  appellantPhone?: string;
  reason: string;
}
