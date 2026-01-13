// Document Upload Center Models (OP-003)

export enum DocumentCategory {
  COMPANY_LEGAL = 'COMPANY_LEGAL',
  QUALITY_MANAGEMENT = 'QUALITY_MANAGEMENT',
  TECHNICAL_PRODUCTION = 'TECHNICAL_PRODUCTION',
  TEST_REPORTS = 'TEST_REPORTS',
  CERTIFICATES = 'CERTIFICATES',
  SUPPLY_CHAIN = 'SUPPLY_CHAIN',
  ENVIRONMENTAL = 'ENVIRONMENTAL',
  OTHER = 'OTHER',
}

export enum OperatorDocumentType {
  // Company & Legal Documents
  BUSINESS_REGISTRATION = 'BUSINESS_REGISTRATION',
  TAX_CERTIFICATE = 'TAX_CERTIFICATE',
  MEMORANDUM_ARTICLES = 'MEMORANDUM_ARTICLES',
  DIRECTORS_LIST = 'DIRECTORS_LIST',
  OWNERSHIP_STRUCTURE = 'OWNERSHIP_STRUCTURE',
  AUTHORIZED_SIGNATORY = 'AUTHORIZED_SIGNATORY',

  // Quality Management Documents
  QUALITY_MANUAL = 'QUALITY_MANUAL',
  PROCEDURES_MANUAL = 'PROCEDURES_MANUAL',
  ORGANIZATIONAL_CHART = 'ORGANIZATIONAL_CHART',
  JOB_DESCRIPTIONS = 'JOB_DESCRIPTIONS',
  TRAINING_RECORDS = 'TRAINING_RECORDS',
  INTERNAL_AUDIT_RECORDS = 'INTERNAL_AUDIT_RECORDS',
  MANAGEMENT_REVIEW = 'MANAGEMENT_REVIEW',

  // Technical & Production Documents
  FACTORY_LAYOUT = 'FACTORY_LAYOUT',
  EQUIPMENT_LIST = 'EQUIPMENT_LIST',
  CALIBRATION_CERTIFICATES = 'CALIBRATION_CERTIFICATES',
  MAINTENANCE_RECORDS = 'MAINTENANCE_RECORDS',
  PROCESS_FLOW_DIAGRAMS = 'PROCESS_FLOW_DIAGRAMS',
  CONTROL_PLANS = 'CONTROL_PLANS',
  RAW_MATERIAL_SPECS = 'RAW_MATERIAL_SPECS',
  FINISHED_PRODUCT_SPECS = 'FINISHED_PRODUCT_SPECS',

  // Test Reports
  TEST_REPORT = 'TEST_REPORT',

  // Certificates
  EXISTING_CERTIFICATE = 'EXISTING_CERTIFICATE',

  // Supply Chain Documents
  SUPPLIER_LIST = 'SUPPLIER_LIST',
  SUPPLIER_EVALUATION = 'SUPPLIER_EVALUATION',
  MATERIAL_CERTIFICATE = 'MATERIAL_CERTIFICATE',
  TRACEABILITY_RECORDS = 'TRACEABILITY_RECORDS',
  BATCH_RECORDS = 'BATCH_RECORDS',
  RECALL_PROCEDURE = 'RECALL_PROCEDURE',

  // Environmental Documents (EMA)
  ENVIRONMENTAL_POLICY = 'ENVIRONMENTAL_POLICY',
  ENVIRONMENTAL_MANUAL = 'ENVIRONMENTAL_MANUAL',
  LCA_REPORT = 'LCA_REPORT',
  CARBON_FOOTPRINT_REPORT = 'CARBON_FOOTPRINT_REPORT',
  ENERGY_AUDIT = 'ENERGY_AUDIT',
  WASTE_AUDIT = 'WASTE_AUDIT',
  RECYCLING_CERTIFICATE = 'RECYCLING_CERTIFICATE',
  SUSTAINABLE_SOURCING = 'SUSTAINABLE_SOURCING',

  // Other
  OTHER = 'OTHER',
}

export enum DocumentVerificationStatus {
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
  REQUIRES_REVISION = 'REQUIRES_REVISION',
}

export enum TestReportStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  EXPIRED = 'EXPIRED',
  REJECTED = 'REJECTED',
}

export enum PassFailStatus {
  PASS = 'PASS',
  FAIL = 'FAIL',
  CONDITIONAL_PASS = 'CONDITIONAL_PASS',
}

export enum FileFormat {
  PDF = 'PDF',
  JPG = 'JPG',
  PNG = 'PNG',
  DOC = 'DOC',
  DOCX = 'DOCX',
  XLS = 'XLS',
  XLSX = 'XLSX',
  CSV = 'CSV',
  DWG = 'DWG',
  AI = 'AI',
  EPS = 'EPS',
  OTHER = 'OTHER',
}

export interface OperatorDocument {
  id: string;
  operatorId: string;
  documentCategory: DocumentCategory;
  documentType: OperatorDocumentType;
  documentName: string;
  description?: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  fileFormat: FileFormat;
  mimeType?: string;
  isRequired: boolean;
  isMandatory: boolean;
  verificationStatus: DocumentVerificationStatus;
  verifiedBy?: string;
  verifiedAt?: string;
  verificationNotes?: string;
  expiryDate?: string;
  isExpired: boolean;
  expiryNotificationSent: boolean;
  versionNumber: number;
  isCurrentVersion: boolean;
  previousVersionId?: string;
  uploadedBy?: string;
  uploadedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductTestReport {
  id?: string;
  productId?: string;
  applicationId?: string;
  testLabName: string;
  labAccreditation: string;
  testStandard: string;
  testDate: string;
  sampleDescription: string;
  testParameters: string;
  testResultsSummary: string;
  passFail: PassFailStatus;
  fileName: string;
  filePath: string;
  fileSize: number;
  fileFormat: FileFormat;
  mimeType?: string;
  verificationStatus: TestReportStatus;
  verifiedBy?: string;
  verifiedAt?: string;
  verificationNotes?: string;
  uploadedBy?: string;
  uploadedAt?: string;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductExistingCertificate {
  id?: string;
  productId?: string;
  applicationId?: string;
  certificateName: string;
  certificateNumber: string;
  issuingBody: string;
  issueDate: string;
  expiryDate: string;
  certificateScope: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  fileFormat: FileFormat;
  mimeType?: string;
  verificationStatus: DocumentVerificationStatus;
  verifiedBy?: string;
  verifiedAt?: string;
  verificationNotes?: string;
  isExpired: boolean;
  daysUntilExpiry?: number;
  expiryNotificationSent: boolean;
  uploadedBy?: string;
  uploadedAt?: string;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface SupplyChainDocument {
  id?: string;
  operatorId?: string;
  productId?: string;
  documentType: OperatorDocumentType;
  documentName: string;
  description?: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  fileFormat: FileFormat;
  mimeType?: string;
  verificationStatus: DocumentVerificationStatus;
  verifiedBy?: string;
  verifiedAt?: string;
  verificationNotes?: string;
  uploadedBy?: string;
  uploadedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EnvironmentalDocument {
  id?: string;
  productId?: string;
  applicationId?: string;
  documentType: OperatorDocumentType;
  documentName: string;
  description?: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  fileFormat: FileFormat;
  mimeType?: string;
  verificationStatus: DocumentVerificationStatus;
  verifiedBy?: string;
  verifiedAt?: string;
  verificationNotes?: string;
  uploadedBy?: string;
  uploadedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UploadDocumentRequest {
  documentCategory: DocumentCategory;
  documentType: OperatorDocumentType;
  documentName: string;
  description?: string;
  file: File;
  expiryDate?: string;
  operatorId?: string;
  productId?: string;
  applicationId?: string;
}

export interface UploadTestReportRequest {
  productId?: string;
  applicationId?: string;
  testLabName: string;
  labAccreditation: string;
  testStandard: string;
  testDate: string;
  sampleDescription: string;
  testParameters: string;
  testResultsSummary: string;
  passFail: PassFailStatus;
  file: File;
}

export interface UploadCertificateRequest {
  productId?: string;
  applicationId?: string;
  certificateName: string;
  certificateNumber: string;
  issuingBody: string;
  issueDate: string;
  expiryDate: string;
  certificateScope: string;
  file: File;
}

export interface DocumentUploadResponse {
  id: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  uploadedAt: string;
}

