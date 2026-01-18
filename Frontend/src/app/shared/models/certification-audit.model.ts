export enum CertificationAuditType {
  DOCUMENT_REVIEW = 'DOCUMENT_REVIEW',
  INITIAL = 'INITIAL',
  SURVEILLANCE = 'SURVEILLANCE',
  RECERTIFICATION = 'RECERTIFICATION',
  FOLLOW_UP = 'FOLLOW_UP',
  UNANNOUNCED = 'UNANNOUNCED',
}

export enum AuditFindingType {
  MAJOR = 'MAJOR',
  MINOR = 'MINOR',
  OBSERVATION = 'OBSERVATION',
  CRITICAL = 'CRITICAL',
}

export enum AuditFindingStatus {
  OPEN = 'OPEN',
  UNDER_REVIEW = 'UNDER_REVIEW',
  CLOSED = 'CLOSED',
}

export enum CorrectiveActionStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
}

export enum SamplingStatus {
  PENDING = 'PENDING',
  COLLECTED = 'COLLECTED',
  TESTED = 'TESTED',
}

export enum TestResultStatus {
  PASS = 'PASS',
  FAIL = 'FAIL',
  CONDITIONAL_PASS = 'CONDITIONAL_PASS',
}

export interface CertificationAudit {
  id: string;
  applicationId: string;
  auditType: CertificationAuditType;
  status: string;
  plannedDate?: string;
  actualDate?: string;
  windowStart?: string;
  windowEnd?: string;
  isUnannounced: boolean;
  notes?: string;
  findings?: CertificationAuditFinding[];
  samplingRecords?: SamplingRecord[];
}

export interface CertificationAuditFinding {
  id: string;
  auditId: string;
  findingType: AuditFindingType;
  description: string;
  deadlineDate?: string;
  status: AuditFindingStatus;
}

export interface CorrectiveAction {
  id: string;
  findingId: string;
  actionPlan: string;
  evidenceNotes?: string;
  status: CorrectiveActionStatus;
}

export interface SamplingRecord {
  id: string;
  auditId: string;
  status: SamplingStatus;
  samplingMethod?: string;
  samplingLocation?: string;
  quantity?: number;
  quantityUnit?: string;
  traceability?: string;
  sampledAt?: string;
  testResults?: TestResult[];
}

export interface Laboratory {
  id: string;
  name: string;
  accreditationBodyId?: string;
  accreditationNumber?: string;
  isAccredited: boolean;
  scope?: string;
}

export interface TestResult {
  id: string;
  samplingId: string;
  laboratoryId?: string;
  parameters?: any;
  reportFilePath?: string;
  resultStatus: TestResultStatus;
  testedAt?: string;
}
