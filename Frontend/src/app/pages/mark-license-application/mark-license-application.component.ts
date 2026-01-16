import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { MarkLicenseApplicationService } from 'src/app/modules/mark-licensing/services/mark-license-application.service';
import { NsbService } from 'src/app/modules/nsb-management/services/nsb.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import {
  CreateMarkLicenseApplicationRequest,
  LicenseDurationType,
  MarkLicenseApplication,
  MarkLicenseStatus,
  MarkType,
  MarkLicenseType,
  SupportingDocument,
} from 'src/app/shared/models/mark-license.model';
import { Nsb } from 'src/app/shared/models/nsb.model';
import { UserRole } from 'src/app/shared/models/user.model';
import { CommunicationLogService } from 'src/app/shared/services/communication-log.service';

@Component({
  selector: 'app-mark-license-application',
  templateUrl: './mark-license-application.component.html',
  styleUrls: ['./mark-license-application.component.scss']
})
export class MarkLicenseApplicationComponent implements OnInit {
  currentStep = 1;
  applicationForm: FormGroup;
  nsbOptions: Nsb[] = [];
  selectedNsb: Nsb | null = null;
  loading = false;
  loadingNsbs = false;
  loadingDrafts = false;
  saving = false;
  submitting = false;
  error = '';
  successMessage = '';
  existingSupportingDocuments: SupportingDocument[] = [];
  selectedFiles: { [key: string]: File | null } = {};
  documentTypes = [
    {
      value: 'NSB_REGISTRATION_CERTIFICATE',
      label: 'NSB Registration Certificate',
      allowedExtensions: ['.pdf', '.png', '.jpg', '.jpeg'],
      maxSizeMb: 10,
    },
    {
      value: 'LETTER_OF_AUTHORIZATION',
      label: 'Letter of Authorization',
      allowedExtensions: ['.pdf', '.doc', '.docx'],
      maxSizeMb: 10,
    },
    {
      value: 'NSB_ORGANIZATIONAL_STRUCTURE',
      label: 'NSB Organizational Structure',
      allowedExtensions: ['.pdf', '.doc', '.docx'],
      maxSizeMb: 10,
    },
    {
      value: 'ADDITIONAL_SUPPORTING_DOCUMENT',
      label: 'Additional Supporting Document',
      allowedExtensions: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.jpg', '.jpeg', '.png'],
      maxSizeMb: 10,
    },
  ];
  existingApplication: MarkLicenseApplication | null = null;
  draftApplications: MarkLicenseApplication[] = [];
  viewMode: 'new' | 'draft' = 'new';
  acapSchemeOptions = [
    { code: 'A1', label: 'Scheme A1: Primary production (single farmers)' },
    { code: 'A2', label: 'Scheme A2: Primary production (groups of farmers)' },
    { code: 'B', label: 'Scheme B: Food processing' },
    { code: 'C', label: 'Scheme C: Chain of custody' },
    { code: 'D1', label: 'Scheme D1: Sustainability (single legal entity)' },
    { code: 'D2', label: 'Scheme D2: Sustainability (groups/multisite)' },
    { code: 'E', label: 'Scheme E: African traditional medicine' },
    { code: 'F', label: 'Scheme F: Sustainable capture fisheries' },
    { code: 'G', label: 'Scheme G: Good financial grant practice' },
    { code: 'H', label: 'Scheme H: Cosmetology and wellness' },
    { code: 'J', label: 'Scheme J: Sustainable mining' },
    { code: 'K', label: 'Scheme K: Ecological organic agriculture' },
    { code: 'L', label: 'Scheme L: Made in Africa' },
  ];
  ecoMarkRequirementOptions = [
    'Sustainability and eco-labelling standard compliance (ARS/AES)',
    'Environmental management plan and impact monitoring',
    'Social responsibility and labor compliance',
    'Traceability and product identity controls',
    'Annual surveillance audits and reporting',
  ];

  constructor(
    private fb: FormBuilder,
    private nsbService: NsbService,
    private authService: AuthService,
    private licenseService: MarkLicenseApplicationService,
    private communicationLogService: CommunicationLogService,
    private router: Router
  ) {
    this.initForm();
  }

  get progressPercent(): number {
    return Math.round(((this.currentStep - 1) / 5) * 100);
  }

  ngOnInit(): void {
    this.loadNsbs();
  }

  initForm(): void {
    this.applicationForm = this.fb.group({
      nsbId: [''],
      // License Types - Default unchecked
      promotionalLicense: [false],
      certificationBodyLicense: [false],
      specialProjectLicense: [false],
      arsoQualityMark: [false],
      ecoMarkAfrica: [false],
      promotionalPrimaryPurpose: [''],
      promotionalPurposeOther: [''],
      promotionalTargetAudience: [''],
      promotionalGeographicScope: [''],
      promotionalBudgetEstimate: [''],
      cbUnitName: [''],
      cbAccreditationNumber: [''],
      cbAccreditationBody: [''],
      cbAccreditationScope: [''],
      cbAccreditationExpiry: [''],
      cbSchemesApplying: [[]],
      cbExpectedVolume: [''],
      acapSchemesApplying: [[]],
      ecoMarkRequirements: [[]],
      projectName: [''],
      projectFunder: [''],
      projectDurationStart: [''],
      projectDurationEnd: [''],
      projectDescription: [''],
      projectDeliverables: [''],
      projectBudget: [''],
      usageChannels: [''],
      annualUsageVolume: [''],
      targetMarkets: [''],
      usageDescription: [''],
      controlProcedures: [''],
      qualityManager: [''],
      qualityContactEmail: [''],
      finalConfirmation: [false],
      productCategories: [''],
      termsAgreement: [false],
      feesAgreement: [false],

      // Section C Compliance - Default unchecked
      agreementCompliance: [false],
      markUsageCompliance: [false],
      misleadingStatementsCompliance: [false],
      changesCompliance: [false],
      annualReportingCommitment: [false],
      complianceAuditConsent: [false],
      dataSharingConsent: [false],
    });
  }

  loadNsbs(): void {
    this.loadingNsbs = true;
    const user = this.authService.currentUserValue;
    const userRoles = user?.roles || (user?.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.ARSO_SECRETARIAT);

    if (isAdmin || user?.countryId) {
      const params = isAdmin
        ? { limit: 1000 }
        : { countryId: user?.countryId, limit: 1000 };

      this.nsbService
        .getNsbList(params)
        .pipe(
          finalize(() => {
            this.loadingNsbs = false;
          }),
        )
        .subscribe({
          next: (response) => {
            this.nsbOptions = response?.data || [];
          },
          error: () => {
            this.error = 'Unable to load NSB list.';
          },
        });
      return;
    }

    this.nsbService
      .getMyNsb()
      .pipe(
        finalize(() => {
          this.loadingNsbs = false;
        }),
      )
      .subscribe({
        next: (nsb) => {
          this.nsbOptions = nsb ? [nsb] : [];
        },
        error: () => {
          this.error = 'Unable to load NSB list.';
        },
      });
  }

  onNsbChange(nsbId: string): void {
    const selected = this.nsbOptions.find((nsb) => nsb.id === nsbId) || null;
    this.selectedNsb = selected;
    this.applicationForm.patchValue({ nsbId: nsbId || '' });
    if (this.viewMode === 'draft') {
      this.loadDrafts();
    }
  }

  goToStep(step: number): void {
    this.currentStep = step;
  }

  nextStep(): void {
    this.goToStep(this.currentStep + 1);
  }

  prevStep(): void {
    this.goToStep(this.currentStep - 1);
  }

  switchView(mode: 'new' | 'draft'): void {
    this.viewMode = mode;
    this.error = '';
    if (mode === 'new') {
      this.resetForm();
      return;
    }
    this.loadDrafts();
  }

  loadDrafts(): void {
    const nsbId = this.applicationForm.get('nsbId')?.value;
    if (!nsbId) {
      this.draftApplications = [];
      return;
    }
    this.loadingDrafts = true;
    this.licenseService
      .getApplicationsByNsb(nsbId, true)
      .pipe(
        finalize(() => {
          this.loadingDrafts = false;
        }),
      )
      .subscribe({
        next: (applications) => {
          this.draftApplications = (applications || []).filter((app) => app.status === MarkLicenseStatus.DRAFT);
        },
        error: () => {
          this.error = 'Failed to load drafts.';
          this.draftApplications = [];
        },
      });
  }

  applyDraft(draft: MarkLicenseApplication): void {
    this.existingApplication = draft;
    this.applicationForm.patchValue({
      nsbId: draft.nsbId,
      promotionalLicense: draft.licenseTypes?.includes(MarkLicenseType.PROMOTIONAL_INSTITUTIONAL) || false,
      certificationBodyLicense: draft.licenseTypes?.includes(MarkLicenseType.CERTIFICATION_BODY) || false,
      specialProjectLicense: draft.licenseTypes?.includes(MarkLicenseType.SPECIAL_PROJECT) || false,
      arsoQualityMark: draft.marksRequested?.includes(MarkType.ARSO_QUALITY_MARK) || false,
      ecoMarkAfrica: draft.marksRequested?.includes(MarkType.ECO_MARK_AFRICA) || false,
      promotionalPrimaryPurpose: draft.promotionalLicenseDetails?.primaryPurpose || '',
      promotionalPurposeOther: draft.promotionalLicenseDetails?.promoPurposeOther || '',
      promotionalTargetAudience: draft.promotionalLicenseDetails?.targetAudience?.join(', ') || '',
      promotionalGeographicScope: draft.promotionalLicenseDetails?.geographicScope || '',
      promotionalBudgetEstimate: draft.promotionalLicenseDetails?.budgetEstimate || '',
      cbUnitName: draft.certificationBodyDetails?.cbUnitName || '',
      cbAccreditationNumber: draft.certificationBodyDetails?.cbAccreditationNumber || '',
      cbAccreditationBody: draft.certificationBodyDetails?.cbAccreditationBody || '',
      cbAccreditationScope: draft.certificationBodyDetails?.cbAccreditationScope || '',
      cbAccreditationExpiry: draft.certificationBodyDetails?.cbAccreditationExpiry || '',
      cbSchemesApplying: draft.certificationBodyDetails?.cbSchemesApplying || [],
      cbExpectedVolume: draft.certificationBodyDetails?.cbExpectedVolume || '',
      acapSchemesApplying: draft.markLanguages || [],
      ecoMarkRequirements: draft.markColorsNeeded || [],
      projectName: draft.specialProjectDetails?.projectName || '',
      projectFunder: draft.specialProjectDetails?.projectFunder || '',
      projectDurationStart: draft.specialProjectDetails?.projectDurationStart || '',
      projectDurationEnd: draft.specialProjectDetails?.projectDurationEnd || '',
      projectDescription: draft.specialProjectDetails?.projectDescription || '',
      projectDeliverables: draft.specialProjectDetails?.projectDeliverables?.join(', ') || '',
      projectBudget: draft.specialProjectDetails?.projectBudget || '',
      agreementCompliance: draft.annexBCompliance ?? false,
      markUsageCompliance: draft.brandGuidelinesAck ?? false,
      misleadingStatementsCompliance: draft.modificationPolicyAcceptance ?? false,
      changesCompliance: draft.auditRightsAcceptance ?? false,
      annualReportingCommitment: draft.annualReportingCommitment ?? false,
      dataSharingConsent: draft.dataSharingConsent ?? false,
    });
    this.existingSupportingDocuments = draft.supportingDocuments || [];
    this.viewMode = 'new';
    this.currentStep = 2;
  }

  saveDraft(): void {
    this.saving = true;
    this.error = '';
    this.successMessage = '';

    const nsbId =
      this.applicationForm.get('nsbId')?.value ||
      this.selectedNsb?.id ||
      this.existingApplication?.nsbId;
    if (!nsbId) {
      this.saving = false;
      this.error = 'Please select an NSB before saving.';
      return;
    }
    if (!this.applicationForm.get('nsbId')?.value) {
      this.applicationForm.patchValue({ nsbId });
    }

    const payload = this.buildPayload();
    const operation = this.existingApplication
      ? this.licenseService.updateApplication(this.existingApplication.id, payload)
      : this.licenseService.createApplication(payload);

    operation
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
      )
      .subscribe({
        next: (application) => {
          this.existingApplication = application;
          this.existingSupportingDocuments = application.supportingDocuments || [];
          this.selectedFiles = {};
          this.setSuccessMessage('Draft saved successfully.');
          this.communicationLogService.addLog({
            type: 'SYSTEM',
            subject: 'Draft saved',
            message: `Draft ${application.applicationNumber || ''} saved successfully.`,
            recipient: this.getRecipientLabel(),
            status: 'DELIVERED',
          });
          this.uploadPendingDocuments();
        },
        error: (err) => {
          const message = err?.error?.message || '';
          if (err?.status === 400 && message.toLowerCase().includes('draft application')) {
            this.error = 'A draft already exists. Please update or delete it first.';
            return;
          }
          this.error = 'Failed to save draft.';
        },
      });
  }

  submitApplication(): void {
    if (!this.existingApplication) {
      this.error = 'Please save the application as draft first.';
      return;
    }

    this.submitting = true;
    this.error = '';
    this.successMessage = '';
    this.uploadPendingDocuments().finally(() => {
      this.licenseService
        .submitApplication(this.existingApplication!.id)
        .pipe(
          finalize(() => {
            this.submitting = false;
          }),
        )
        .subscribe({
          next: () => {
            this.communicationLogService.addLog({
              type: 'EMAIL',
              subject: 'Mark license application submitted',
              message: 'Your mark license application has been submitted. A confirmation email has been sent.',
              recipient: this.getRecipientLabel(),
              status: 'DELIVERED',
            });
            this.communicationLogService.addLog({
              type: 'SYSTEM',
              subject: 'Application submitted',
              message: 'Mark license application submitted successfully.',
              recipient: this.getRecipientLabel(),
              status: 'DELIVERED',
            });
            this.setSuccessMessage('Application submitted successfully.');
            setTimeout(() => {
              this.router.navigate(['/portal/mark-licenses/dashboard']);
            }, 800);
          },
          error: () => {
            this.error = 'Failed to submit application.';
          },
        });
    });
    }

  deleteDraft(draft: MarkLicenseApplication): void {
    if (!draft?.id) {
      return;
    }
    const confirmed = window.confirm(
      `Are you sure you want to delete draft ${draft.applicationNumber || ''}? This action cannot be undone.`,
    );
    if (!confirmed) {
      return;
    }
    this.loadingDrafts = true;
    this.licenseService.deleteDraft(draft.id).subscribe({
      next: () => {
        this.communicationLogService.addLog({
          type: 'SYSTEM',
          subject: 'Draft deleted',
          message: `Draft ${draft.applicationNumber || ''} deleted successfully.`,
          recipient: this.getRecipientLabel(),
          status: 'DELIVERED',
        });
        this.draftApplications = this.draftApplications.filter((item) => item.id !== draft.id);
        if (this.existingApplication?.id === draft.id) {
          this.resetForm();
        }
        this.loadingDrafts = false;
      },
      error: () => {
        this.error = 'Failed to delete draft.';
        this.loadingDrafts = false;
      },
    });
  }

  private buildPayload(): CreateMarkLicenseApplicationRequest {
    return {
      nsbId: this.applicationForm.get('nsbId')?.value || '',
      licenseTypes: this.getSelectedLicenseTypes(),
      licenseDuration: LicenseDurationType.OTHER,
      licenseDurationOther: '',
      marksRequested: this.getSelectedMarks(),
      markColorsNeeded: this.getSelectedEcoRequirements(),
      markLanguages: this.getSelectedAcapSchemes(),
      promotionalLicenseDetails: this.isLicenseSelected(MarkLicenseType.PROMOTIONAL_INSTITUTIONAL)
        ? {
            primaryPurpose: this.applicationForm.get('promotionalPrimaryPurpose')?.value || '',
            promoPurposeOther: this.getOptionalValue(this.applicationForm.get('promotionalPurposeOther')?.value),
            targetAudience: this.parseList(this.applicationForm.get('promotionalTargetAudience')?.value),
            geographicScope: this.applicationForm.get('promotionalGeographicScope')?.value || '',
            budgetEstimate: this.getOptionalValue(this.applicationForm.get('promotionalBudgetEstimate')?.value),
          }
        : undefined,
      certificationBodyDetails: this.isLicenseSelected(MarkLicenseType.CERTIFICATION_BODY)
        ? {
            cbUnitName: this.applicationForm.get('cbUnitName')?.value || '',
            cbAccreditationNumber: this.applicationForm.get('cbAccreditationNumber')?.value || '',
            cbAccreditationBody: this.applicationForm.get('cbAccreditationBody')?.value || '',
            cbAccreditationScope: this.applicationForm.get('cbAccreditationScope')?.value || '',
            cbAccreditationExpiry: this.applicationForm.get('cbAccreditationExpiry')?.value || '',
            cbSchemesApplying: this.getSelectedSchemes(),
            cbExpectedVolume: this.getOptionalValue(this.applicationForm.get('cbExpectedVolume')?.value),
          }
        : undefined,
      specialProjectDetails: this.isLicenseSelected(MarkLicenseType.SPECIAL_PROJECT)
        ? {
            projectName: this.applicationForm.get('projectName')?.value || '',
            projectFunder: this.getOptionalValue(this.applicationForm.get('projectFunder')?.value),
            projectDurationStart: this.applicationForm.get('projectDurationStart')?.value || '',
            projectDurationEnd: this.applicationForm.get('projectDurationEnd')?.value || '',
            projectDescription: this.applicationForm.get('projectDescription')?.value || '',
            projectDeliverables: this.parseList(this.applicationForm.get('projectDeliverables')?.value),
            projectBudget: this.getOptionalValue(this.applicationForm.get('projectBudget')?.value),
          }
        : undefined,
      annexBCompliance: this.applicationForm.get('agreementCompliance')?.value ?? false,
      brandGuidelinesAck: this.applicationForm.get('markUsageCompliance')?.value ?? false,
      modificationPolicyAcceptance: this.applicationForm.get('misleadingStatementsCompliance')?.value ?? false,
      declarationSignatory: '',
      signatoryTitle: '',
      signatoryEmail: '',
      auditRightsAcceptance: this.applicationForm.get('changesCompliance')?.value ?? false,
      annualReportingCommitment: this.applicationForm.get('annualReportingCommitment')?.value ?? false,
      dataSharingConsent: this.applicationForm.get('dataSharingConsent')?.value ?? false,
    };
  }

  private getSelectedLicenseTypes(): MarkLicenseType[] {
    const selected: MarkLicenseType[] = [];
    if (this.applicationForm.get('promotionalLicense')?.value) {
      selected.push(MarkLicenseType.PROMOTIONAL_INSTITUTIONAL);
    }
    if (this.applicationForm.get('certificationBodyLicense')?.value) {
      selected.push(MarkLicenseType.CERTIFICATION_BODY);
    }
    if (this.applicationForm.get('specialProjectLicense')?.value) {
      selected.push(MarkLicenseType.SPECIAL_PROJECT);
    }
    return selected;
  }

  private getSelectedMarks(): MarkType[] {
    const selected: MarkType[] = [];
    if (this.applicationForm.get('arsoQualityMark')?.value) {
      selected.push(MarkType.ARSO_QUALITY_MARK);
    }
    if (this.applicationForm.get('ecoMarkAfrica')?.value) {
      selected.push(MarkType.ECO_MARK_AFRICA);
    }
    return selected;
  }

  toggleAcapSchemeSelection(code: string, checked: boolean): void {
    const control = this.applicationForm.get('acapSchemesApplying');
    const current = (control?.value as string[]) || [];
    const next = checked
      ? [...new Set([...current, code])]
      : current.filter((item) => item !== code);
    control?.setValue(next);
  }

  isAcapSchemeSelected(code: string): boolean {
    const selected = (this.applicationForm.get('acapSchemesApplying')?.value as string[]) || [];
    return selected.includes(code);
  }

  private getSelectedAcapSchemes(): string[] {
    const selected = this.applicationForm.get('acapSchemesApplying')?.value as string[] | null;
    return (selected || []).filter((item) => item?.trim().length > 0);
  }

  toggleEcoRequirementSelection(requirement: string, checked: boolean): void {
    const control = this.applicationForm.get('ecoMarkRequirements');
    const current = (control?.value as string[]) || [];
    const next = checked
      ? [...new Set([...current, requirement])]
      : current.filter((item) => item !== requirement);
    control?.setValue(next);
  }

  isEcoRequirementSelected(requirement: string): boolean {
    const selected = (this.applicationForm.get('ecoMarkRequirements')?.value as string[]) || [];
    return selected.includes(requirement);
  }

  private getSelectedEcoRequirements(): string[] {
    const selected = this.applicationForm.get('ecoMarkRequirements')?.value as string[] | null;
    return (selected || []).filter((item) => item?.trim().length > 0);
  }

  toggleSchemeSelection(code: string, checked: boolean): void {
    const control = this.applicationForm.get('cbSchemesApplying');
    const current = (control?.value as string[]) || [];
    const next = checked
      ? [...new Set([...current, code])]
      : current.filter((item) => item !== code);
    control?.setValue(next);
  }

  isSchemeSelected(code: string): boolean {
    const selected = (this.applicationForm.get('cbSchemesApplying')?.value as string[]) || [];
    return selected.includes(code);
  }

  private getSelectedSchemes(): string[] {
    const selected = this.applicationForm.get('cbSchemesApplying')?.value as string[] | null;
    return (selected || []).filter((item) => item?.trim().length > 0);
  }

  private isLicenseSelected(type: MarkLicenseType): boolean {
    return this.getSelectedLicenseTypes().includes(type);
  }

  private parseList(value: string | null | undefined): string[] {
    if (!value) {
      return [];
    }
    return value
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  private getOptionalValue(value: string | null | undefined): string | undefined {
    const trimmed = (value || '').trim();
    return trimmed ? trimmed : undefined;
  }

  private resetForm(): void {
    this.applicationForm.reset({
      nsbId: '',
      promotionalLicense: false,
      certificationBodyLicense: false,
      specialProjectLicense: false,
      arsoQualityMark: false,
      ecoMarkAfrica: false,
      promotionalPrimaryPurpose: '',
      promotionalPurposeOther: '',
      promotionalTargetAudience: '',
      promotionalGeographicScope: '',
      promotionalBudgetEstimate: '',
      cbUnitName: '',
      cbAccreditationNumber: '',
      cbAccreditationBody: '',
      cbAccreditationScope: '',
      cbAccreditationExpiry: '',
      cbSchemesApplying: [],
      cbExpectedVolume: '',
      acapSchemesApplying: [],
      ecoMarkRequirements: [],
      projectName: '',
      projectFunder: '',
      projectDurationStart: '',
      projectDurationEnd: '',
      projectDescription: '',
      projectDeliverables: '',
      projectBudget: '',
      usageChannels: '',
      annualUsageVolume: '',
      targetMarkets: '',
      usageDescription: '',
      controlProcedures: '',
      qualityManager: '',
      qualityContactEmail: '',
      finalConfirmation: false,
      productCategories: '',
      termsAgreement: false,
      feesAgreement: false,
      agreementCompliance: false,
      markUsageCompliance: false,
      misleadingStatementsCompliance: false,
      changesCompliance: false,
      annualReportingCommitment: false,
      complianceAuditConsent: false,
      dataSharingConsent: false,
    });
    this.selectedNsb = null;
    this.existingApplication = null;
    this.existingSupportingDocuments = [];
    this.selectedFiles = {};
    this.currentStep = 1;
  }

  get applicationPreview() {
    return {
      ...this.applicationForm.getRawValue(),
      supportingDocuments: this.existingSupportingDocuments,
    };
  }

  onDocumentSelected(event: Event, documentType: string): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    const docConfig = this.documentTypes.find((doc) => doc.value === documentType);
    const maxSize = (docConfig?.maxSizeMb || 10) * 1024 * 1024;
    if (file.size > maxSize) {
      this.error = `File size exceeds ${docConfig?.maxSizeMb || 10}MB limit.`;
      input.value = '';
      return;
    }

    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (docConfig?.allowedExtensions && !docConfig.allowedExtensions.includes(extension)) {
      this.error = `Invalid file type. Allowed: ${docConfig.allowedExtensions.join(', ')}`;
      input.value = '';
      return;
    }

    this.selectedFiles[documentType] = file;
    this.error = '';

    if (this.existingApplication?.id) {
      this.uploadDocument(documentType, file);
    }
  }

  uploadDocument(documentType: string, file: File): void {
    if (!this.existingApplication?.id) {
      return;
    }

    this.licenseService
      .uploadSupportingDocument(this.existingApplication.id, {
        documentType,
        fileName: file.name,
      })
      .subscribe({
        next: (doc) => {
          this.existingSupportingDocuments = [...this.existingSupportingDocuments, doc];
          delete this.selectedFiles[documentType];
        },
        error: (err) => {
          this.error = err?.error?.message || 'Failed to upload document.';
        },
      });
  }

  uploadPendingDocuments(): Promise<void> {
    if (!this.existingApplication?.id) {
      return Promise.resolve();
    }

    const uploads = this.documentTypes
      .map((docType) => {
        const file = this.selectedFiles[docType.value];
        const alreadyUploaded = this.getUploadedDocument(docType.value);
        if (!file || alreadyUploaded) {
          return null;
        }
        return new Promise<void>((resolve) => {
          this.licenseService
            .uploadSupportingDocument(this.existingApplication!.id, {
              documentType: docType.value,
              fileName: file.name,
            })
            .subscribe({
              next: (doc) => {
                this.existingSupportingDocuments = [...this.existingSupportingDocuments, doc];
                delete this.selectedFiles[docType.value];
                resolve();
              },
              error: () => {
                resolve();
              },
            });
        });
      })
      .filter(Boolean) as Promise<void>[];

    return Promise.all(uploads).then(() => undefined);
  }

  removeDocument(documentType: string): void {
    const uploaded = this.getUploadedDocument(documentType);
    if (!this.existingApplication?.id || !uploaded?.id) {
      delete this.selectedFiles[documentType];
      return;
    }

    this.licenseService.deleteSupportingDocument(this.existingApplication.id, uploaded.id).subscribe({
      next: () => {
        this.existingSupportingDocuments = this.existingSupportingDocuments.filter((doc) => doc.id !== uploaded.id);
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to delete document.';
      },
    });
  }

  viewDocument(documentType: string): void {
    const file = this.selectedFiles[documentType];
    if (file) {
      const url = URL.createObjectURL(file);
      window.open(url, '_blank');
      setTimeout(() => URL.revokeObjectURL(url), 100);
      return;
    }

    const uploaded = this.getUploadedDocument(documentType);
    if (uploaded?.filePath) {
      window.open(uploaded.filePath, '_blank');
    }
  }

  getUploadedDocument(documentType: string): SupportingDocument | undefined {
    return this.existingSupportingDocuments.find((doc) => doc.documentType === documentType);
  }

  getFileName(documentType: string): string {
    return this.selectedFiles[documentType]?.name || '';
  }

  getAcceptAttribute(documentType: string): string {
    const doc = this.documentTypes.find((item) => item.value === documentType);
    return doc?.allowedExtensions?.join(',') || '';
  }

  private setSuccessMessage(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 4000);
  }

  private getRecipientLabel(): string {
    const user = this.authService.currentUserValue;
    return user?.email || user?.fullName || 'Current user';
  }

}
