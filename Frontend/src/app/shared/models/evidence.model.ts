export enum EvidenceParentType {
  COMPLAINT = 'COMPLAINT',
  APPEAL = 'APPEAL',
  CERTIFICATION_AUDIT = 'CERTIFICATION_AUDIT',
  AUDIT_FINDING = 'AUDIT_FINDING',
  CORRECTIVE_ACTION = 'CORRECTIVE_ACTION',
  MARK_MISUSE = 'MARK_MISUSE',
  MARK_LICENSE = 'MARK_LICENSE',
  CB_APPLICATION = 'CB_APPLICATION',
  CB_LICENSE = 'CB_LICENSE',
  OPERATOR_CONTRACT = 'OPERATOR_CONTRACT',
  OTHER = 'OTHER',
}

export interface EvidenceFile {
  id: string;
  parentType: EvidenceParentType;
  parentId: string;
  originalName: string;
  storedName: string;
  storedPath: string;
  mimeType: string;
  size: number;
  hash: string;
  uploadedBy?: string;
  description?: string;
  createdAt?: string;
}
