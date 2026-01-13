import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentUploadService } from '../../modules/document-upload/services/document-upload.service';
import { OperatorService } from '../../modules/operator/services/operator.service';
import { ProductCertificationService } from '../../modules/product-certification/services/product-certification.service';
import {
  OperatorDocument,
  ProductTestReport,
  ProductExistingCertificate,
  SupplyChainDocument,
  EnvironmentalDocument,
  DocumentCategory,
  OperatorDocumentType,
  DocumentVerificationStatus,
  TestReportStatus,
  PassFailStatus,
  FileFormat,
  UploadDocumentRequest,
  UploadTestReportRequest,
  UploadCertificateRequest,
} from '../../shared/models/document-upload.model';
import { Operator } from '../../shared/models/operator.model';
import { ProductCertificationApplication, MarkRequestedType } from '../../shared/models/product-certification.model';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss'],
})
export class DocumentUploadComponent implements OnInit {
  currentSection = 'A'; // A, B, C, D
  loading = false;
  error = '';
  success = '';
  operator: Operator | null = null;
  application: ProductCertificationApplication | null = null;
  applicationId?: string;
  productId?: string;

  // Documents
  operatorDocuments: OperatorDocument[] = [];
  testReports: ProductTestReport[] = [];
  existingCertificates: ProductExistingCertificate[] = [];
  supplyChainDocuments: SupplyChainDocument[] = [];
  environmentalDocuments: EnvironmentalDocument[] = [];

  // Forms
  operatorDocumentForm: FormGroup;
  testReportForm: FormGroup;
  certificateForm: FormGroup;
  supplyChainForm: FormGroup;
  environmentalForm: FormGroup;

  // File uploads
  selectedFile: File | null = null;
  uploading = false;
  uploadProgress = 0;

  // Options
  documentCategories = Object.values(DocumentCategory).map((value) => ({
    value,
    label: value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  documentTypes = Object.values(OperatorDocumentType).map((value) => ({
    value,
    label: value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  passFailStatuses = Object.values(PassFailStatus).map((value) => ({
    value,
    label: value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  // Mandatory document types checklist
  mandatoryDocumentTypes: OperatorDocumentType[] = [
    OperatorDocumentType.BUSINESS_REGISTRATION,
    OperatorDocumentType.TAX_CERTIFICATE,
    OperatorDocumentType.QUALITY_MANUAL,
    OperatorDocumentType.FACTORY_LAYOUT,
    OperatorDocumentType.PROCESS_FLOW_DIAGRAMS,
  ];

  constructor(
    private fb: FormBuilder,
    private documentUploadService: DocumentUploadService,
    private operatorService: OperatorService,
    private productCertificationService: ProductCertificationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.operatorDocumentForm = this.createOperatorDocumentForm();
    this.testReportForm = this.createTestReportForm();
    this.certificateForm = this.createCertificateForm();
    this.supplyChainForm = this.createSupplyChainForm();
    this.environmentalForm = this.createEnvironmentalForm();
  }

  ngOnInit(): void {
    this.loadOperator();
    this.route.params.subscribe((params) => {
      if (params['applicationId']) {
        this.applicationId = params['applicationId'];
        this.loadApplication();
      }
      if (params['productId']) {
        this.productId = params['productId'];
      }
    });
  }

  createOperatorDocumentForm(): FormGroup {
    return this.fb.group({
      documentCategory: ['', Validators.required],
      documentType: ['', Validators.required],
      documentName: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', Validators.maxLength(1000)],
      expiryDate: [''],
      file: [null, Validators.required],
    });
  }

  createTestReportForm(): FormGroup {
    return this.fb.group({
      testLabName: ['', [Validators.required, Validators.maxLength(255)]],
      labAccreditation: ['', [Validators.required, Validators.maxLength(255)]],
      testStandard: ['', [Validators.required, Validators.maxLength(100)]],
      testDate: ['', Validators.required],
      sampleDescription: ['', [Validators.required, Validators.maxLength(1000)]],
      testParameters: ['', [Validators.required, Validators.maxLength(2000)]],
      testResultsSummary: ['', [Validators.required, Validators.maxLength(2000)]],
      passFail: ['', Validators.required],
      file: [null, Validators.required],
    });
  }

  createCertificateForm(): FormGroup {
    return this.fb.group({
      certificateName: ['', [Validators.required, Validators.maxLength(255)]],
      certificateNumber: ['', [Validators.required, Validators.maxLength(50)]],
      issuingBody: ['', [Validators.required, Validators.maxLength(255)]],
      issueDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
      certificateScope: ['', [Validators.required, Validators.maxLength(1000)]],
      file: [null, Validators.required],
    });
  }

  createSupplyChainForm(): FormGroup {
    return this.fb.group({
      documentType: ['', Validators.required],
      documentName: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', Validators.maxLength(1000)],
      file: [null, Validators.required],
    });
  }

  createEnvironmentalForm(): FormGroup {
    return this.fb.group({
      documentType: ['', Validators.required],
      documentName: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', Validators.maxLength(1000)],
      file: [null, Validators.required],
    });
  }

  loadOperator(): void {
    this.operatorService.getMyOperator().subscribe({
      next: (operator) => {
        this.operator = operator;
        if (operator) {
          this.loadOperatorDocuments(operator.id);
        }
      },
      error: (error) => {
        console.error('Error loading operator:', error);
      },
    });
  }

  loadApplication(): void {
    if (this.applicationId) {
      this.productCertificationService.getApplicationById(this.applicationId).subscribe({
        next: (application) => {
          this.application = application;
          if (application.products && application.products.length > 0) {
            this.productId = application.products[0].id;
          }
          this.loadTestReports();
          this.loadCertificates();
          this.loadEnvironmentalDocuments();
        },
        error: (error) => {
          console.error('Error loading application:', error);
        },
      });
    }
  }

  loadOperatorDocuments(operatorId: string): void {
    this.loading = true;
    this.documentUploadService.getOperatorDocuments(operatorId).subscribe({
      next: (documents) => {
        this.operatorDocuments = documents;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        console.error('Error loading operator documents:', error);
      },
    });
  }

  loadTestReports(): void {
    const params: any = {};
    if (this.productId) params.productId = this.productId;
    if (this.applicationId) params.applicationId = this.applicationId;

    this.documentUploadService.getTestReports(params).subscribe({
      next: (reports) => {
        this.testReports = reports;
      },
      error: (error) => {
        console.error('Error loading test reports:', error);
      },
    });
  }

  loadCertificates(): void {
    const params: any = {};
    if (this.productId) params.productId = this.productId;
    if (this.applicationId) params.applicationId = this.applicationId;

    this.documentUploadService.getExistingCertificates(params).subscribe({
      next: (certificates) => {
        this.existingCertificates = certificates;
      },
      error: (error) => {
        console.error('Error loading certificates:', error);
      },
    });
  }

  loadSupplyChainDocuments(): void {
    const params: any = {};
    if (this.operator?.id) params.operatorId = this.operator.id;
    if (this.productId) params.productId = this.productId;

    this.documentUploadService.getSupplyChainDocuments(params).subscribe({
      next: (documents) => {
        this.supplyChainDocuments = documents;
      },
      error: (error) => {
        console.error('Error loading supply chain documents:', error);
      },
    });
  }

  loadEnvironmentalDocuments(): void {
    const params: any = {};
    if (this.productId) params.productId = this.productId;
    if (this.applicationId) params.applicationId = this.applicationId;

    this.documentUploadService.getEnvironmentalDocuments(params).subscribe({
      next: (documents) => {
        this.environmentalDocuments = documents;
      },
      error: (error) => {
        console.error('Error loading environmental documents:', error);
      },
    });
  }

  onFileSelected(event: any, form: FormGroup): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        this.error = 'File size must be less than 10MB';
        return;
      }

      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        this.error = 'Invalid file type. Allowed types: PDF, JPG, PNG, DOC, DOCX';
        return;
      }

      form.patchValue({ file });
      this.selectedFile = file;
      this.error = '';
    }
  }

  uploadOperatorDocument(): void {
    if (this.operatorDocumentForm.invalid || !this.operator) {
      this.markFormGroupTouched(this.operatorDocumentForm);
      return;
    }

    this.uploading = true;
    this.error = '';
    this.success = '';

    const formValue = this.operatorDocumentForm.value;
    const request: UploadDocumentRequest = {
      documentCategory: formValue.documentCategory,
      documentType: formValue.documentType,
      documentName: formValue.documentName,
      description: formValue.description,
      expiryDate: formValue.expiryDate,
      file: formValue.file,
      operatorId: this.operator.id,
    };

    this.documentUploadService.uploadOperatorDocument(this.operator.id, request).subscribe({
      next: () => {
        this.uploading = false;
        this.success = 'Document uploaded successfully';
        this.operatorDocumentForm.reset();
        this.selectedFile = null;
        this.loadOperatorDocuments(this.operator!.id);
        setTimeout(() => {
          this.success = '';
        }, 3000);
      },
      error: (error) => {
        this.uploading = false;
        this.error = error.error?.message || 'Failed to upload document';
      },
    });
  }

  uploadTestReport(): void {
    if (this.testReportForm.invalid) {
      this.markFormGroupTouched(this.testReportForm);
      return;
    }

    this.uploading = true;
    this.error = '';
    this.success = '';

    const formValue = this.testReportForm.value;
    const request: UploadTestReportRequest = {
      testLabName: formValue.testLabName,
      labAccreditation: formValue.labAccreditation,
      testStandard: formValue.testStandard,
      testDate: formValue.testDate,
      sampleDescription: formValue.sampleDescription,
      testParameters: formValue.testParameters,
      testResultsSummary: formValue.testResultsSummary,
      passFail: formValue.passFail,
      file: formValue.file,
      productId: this.productId,
      applicationId: this.applicationId,
    };

    this.documentUploadService.uploadTestReport(request).subscribe({
      next: () => {
        this.uploading = false;
        this.success = 'Test report uploaded successfully';
        this.testReportForm.reset();
        this.selectedFile = null;
        this.loadTestReports();
        setTimeout(() => {
          this.success = '';
        }, 3000);
      },
      error: (error) => {
        this.uploading = false;
        this.error = error.error?.message || 'Failed to upload test report';
      },
    });
  }

  uploadCertificate(): void {
    if (this.certificateForm.invalid) {
      this.markFormGroupTouched(this.certificateForm);
      return;
    }

    this.uploading = true;
    this.error = '';
    this.success = '';

    const formValue = this.certificateForm.value;
    const request: UploadCertificateRequest = {
      certificateName: formValue.certificateName,
      certificateNumber: formValue.certificateNumber,
      issuingBody: formValue.issuingBody,
      issueDate: formValue.issueDate,
      expiryDate: formValue.expiryDate,
      certificateScope: formValue.certificateScope,
      file: formValue.file,
      productId: this.productId,
      applicationId: this.applicationId,
    };

    this.documentUploadService.uploadCertificate(request).subscribe({
      next: () => {
        this.uploading = false;
        this.success = 'Certificate uploaded successfully';
        this.certificateForm.reset();
        this.selectedFile = null;
        this.loadCertificates();
        setTimeout(() => {
          this.success = '';
        }, 3000);
      },
      error: (error) => {
        this.uploading = false;
        this.error = error.error?.message || 'Failed to upload certificate';
      },
    });
  }

  uploadSupplyChainDocument(): void {
    if (this.supplyChainForm.invalid || !this.operator) {
      this.markFormGroupTouched(this.supplyChainForm);
      return;
    }

    this.uploading = true;
    this.error = '';
    this.success = '';

    const formValue = this.supplyChainForm.value;
    const request: UploadDocumentRequest = {
      documentCategory: DocumentCategory.SUPPLY_CHAIN,
      documentType: formValue.documentType,
      documentName: formValue.documentName,
      description: formValue.description,
      file: formValue.file,
      operatorId: this.operator.id,
      productId: this.productId,
    };

    this.documentUploadService.uploadSupplyChainDocument(request).subscribe({
      next: () => {
        this.uploading = false;
        this.success = 'Supply chain document uploaded successfully';
        this.supplyChainForm.reset();
        this.selectedFile = null;
        this.loadSupplyChainDocuments();
        setTimeout(() => {
          this.success = '';
        }, 3000);
      },
      error: (error) => {
        this.uploading = false;
        this.error = error.error?.message || 'Failed to upload document';
      },
    });
  }

  uploadEnvironmentalDocument(): void {
    if (this.environmentalForm.invalid) {
      this.markFormGroupTouched(this.environmentalForm);
      return;
    }

    this.uploading = true;
    this.error = '';
    this.success = '';

    const formValue = this.environmentalForm.value;
    const request: UploadDocumentRequest = {
      documentCategory: DocumentCategory.ENVIRONMENTAL,
      documentType: formValue.documentType,
      documentName: formValue.documentName,
      description: formValue.description,
      file: formValue.file,
      productId: this.productId,
      applicationId: this.applicationId,
    };

    this.documentUploadService.uploadEnvironmentalDocument(request).subscribe({
      next: () => {
        this.uploading = false;
        this.success = 'Environmental document uploaded successfully';
        this.environmentalForm.reset();
        this.selectedFile = null;
        this.loadEnvironmentalDocuments();
        setTimeout(() => {
          this.success = '';
        }, 3000);
      },
      error: (error) => {
        this.uploading = false;
        this.error = error.error?.message || 'Failed to upload document';
      },
    });
  }

  deleteDocument(documentId: string, section: string): void {
    if (!confirm('Are you sure you want to delete this document?')) {
      return;
    }

    let deleteObservable;
    switch (section) {
      case 'operator':
        if (this.operator) {
          deleteObservable = this.documentUploadService.deleteOperatorDocument(this.operator.id, documentId);
        }
        break;
      case 'test-report':
        deleteObservable = this.documentUploadService.deleteTestReport(documentId);
        break;
      case 'certificate':
        deleteObservable = this.documentUploadService.deleteCertificate(documentId);
        break;
      case 'supply-chain':
        deleteObservable = this.documentUploadService.deleteSupplyChainDocument(documentId);
        break;
      case 'environmental':
        deleteObservable = this.documentUploadService.deleteEnvironmentalDocument(documentId);
        break;
    }

    if (deleteObservable) {
      deleteObservable.subscribe({
        next: () => {
          this.success = 'Document deleted successfully';
          // Reload documents
          if (this.operator) this.loadOperatorDocuments(this.operator.id);
          this.loadTestReports();
          this.loadCertificates();
          this.loadSupplyChainDocuments();
          this.loadEnvironmentalDocuments();
          setTimeout(() => {
            this.success = '';
          }, 3000);
        },
        error: (error) => {
          this.error = error.error?.message || 'Failed to delete document';
        },
      });
    }
  }

  downloadDocument(documentId: string, fileName: string): void {
    if (this.operator) {
      this.documentUploadService.downloadOperatorDocument(this.operator.id, documentId).subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = fileName;
          link.click();
          window.URL.revokeObjectURL(url);
        },
        error: (error) => {
          this.error = 'Failed to download document';
        },
      });
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case DocumentVerificationStatus.APPROVED:
      case TestReportStatus.VERIFIED:
        return 'text-green-600 bg-green-100';
      case DocumentVerificationStatus.REJECTED:
      case TestReportStatus.REJECTED:
        return 'text-red-600 bg-red-100';
      case DocumentVerificationStatus.EXPIRED:
      case TestReportStatus.EXPIRED:
        return 'text-orange-600 bg-orange-100';
      case DocumentVerificationStatus.UNDER_REVIEW:
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  }

  isMandatoryDocumentUploaded(documentType: OperatorDocumentType): boolean {
    return this.operatorDocuments.some(
      (doc) => doc.documentType === documentType && doc.isCurrentVersion && doc.verificationStatus === DocumentVerificationStatus.APPROVED,
    );
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  hasEmaApplication(): boolean {
    if (!this.application?.markRequested) return false;
    return (
      this.application.markRequested.includes(MarkRequestedType.ECO_MARK_AFRICA) ||
      this.application.markRequested.includes(MarkRequestedType.BOTH)
    );
  }

  switchSection(section: string): void {
    this.currentSection = section;
    if (section === 'C') {
      this.loadSupplyChainDocuments();
    }
  }

  formatEnumLabel(value: string): string {
    return value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  }
}

