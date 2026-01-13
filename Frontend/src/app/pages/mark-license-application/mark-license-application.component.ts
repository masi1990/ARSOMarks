import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { MarkLicenseApplicationService } from '../../modules/mark-licensing/services/mark-license-application.service';
import { NsbService } from '../../modules/nsb-management/services/nsb.service';
import {
  MarkLicenseType,
  MarkType,
  LicenseDurationType,
  MediaType,
  CreateMarkLicenseApplicationRequest,
  MarkLicenseApplication,
} from '../../shared/models/mark-license.model';
import { Nsb } from '../../shared/models/nsb.model';
import { AuthService } from '../../modules/auth/services/auth.service';

@Component({
  selector: 'app-mark-license-application',
  templateUrl: './mark-license-application.component.html',
  styleUrls: ['./mark-license-application.component.scss'],
})
export class MarkLicenseApplicationComponent implements OnInit {
  form: FormGroup;
  loading = false;
  saving = false;
  submitting = false;
  error = '';
  success = false;
  successMessage = '';
  nsb: Nsb | null = null;
  existingApplication: MarkLicenseApplication | null = null;

  // License type options
  licenseTypeOptions = [
    { value: MarkLicenseType.PROMOTIONAL_INSTITUTIONAL, label: 'Promotional/Institutional License' },
    { value: MarkLicenseType.CERTIFICATION_BODY, label: 'Certification Body License' },
    { value: MarkLicenseType.SPECIAL_PROJECT, label: 'Special Project License' },
  ];

  // Duration options
  durationOptions = [
    { value: LicenseDurationType.ONE_YEAR, label: '1 Year' },
    { value: LicenseDurationType.TWO_YEARS, label: '2 Years' },
    { value: LicenseDurationType.THREE_YEARS, label: '3 Years' },
    { value: LicenseDurationType.PROJECT_BASED, label: 'Project-based (specify)' },
    { value: LicenseDurationType.OTHER, label: 'Other' },
  ];

  // Mark type options
  markTypeOptions = [
    { value: MarkType.ARSO_QUALITY_MARK, label: 'ARSO Quality Mark' },
    { value: MarkType.ECO_MARK_AFRICA, label: 'Eco Mark Africa (EMA)' },
    { value: MarkType.BOTH, label: 'Both' },
  ];

  // Media type options
  mediaTypeOptions = [
    { value: MediaType.DIGITAL_ONLINE, label: 'Digital/Online' },
    { value: MediaType.PRINT, label: 'Print' },
    { value: MediaType.BROADCAST, label: 'Broadcast' },
    { value: MediaType.OUTDOOR, label: 'Outdoor' },
    { value: MediaType.EVENTS, label: 'Events' },
    { value: MediaType.SOCIAL_MEDIA, label: 'Social Media' },
    { value: MediaType.OTHER, label: 'Other' },
  ];

  // Promotional purpose options
  promotionalPurposeOptions = [
    { value: 'NATIONAL_AWARENESS_CAMPAIGN', label: 'National Awareness Campaign' },
    { value: 'GOVERNMENT_PUBLICATIONS', label: 'Government Publications' },
    { value: 'TRAINING_MATERIALS', label: 'Training Materials' },
    { value: 'WEBSITE_PROMOTION', label: 'Website Promotion' },
    { value: 'EVENT_MATERIALS', label: 'Event Materials' },
    { value: 'OTHER', label: 'Other' },
  ];

  // Target audience options
  targetAudienceOptions = [
    { value: 'INDUSTRY', label: 'Industry' },
    { value: 'CONSUMERS', label: 'Consumers' },
    { value: 'GOVERNMENT_OFFICIALS', label: 'Government Officials' },
    { value: 'STUDENTS', label: 'Students' },
    { value: 'MEDIA', label: 'Media' },
    { value: 'GENERAL_PUBLIC', label: 'General Public' },
  ];

  // Geographic scope options
  geographicScopeOptions = [
    { value: 'NATIONAL', label: 'National' },
    { value: 'REGIONAL', label: 'Regional' },
    { value: 'SPECIFIC_STATES_PROVINCES', label: 'Specific States/Provinces' },
    { value: 'LOCAL_CAMPAIGN', label: 'Local Campaign' },
  ];

  // Language options
  languageOptions = [
    { value: 'ENGLISH', label: 'English' },
    { value: 'FRENCH', label: 'French' },
    { value: 'PORTUGUESE', label: 'Portuguese' },
    { value: 'ARABIC', label: 'Arabic' },
    { value: 'LOCAL_LANGUAGE', label: 'Local Language(s)' },
  ];

  // Color variation options
  colorOptions = [
    { value: 'FULL_COLOR', label: 'Full Color' },
    { value: 'BLACK_WHITE', label: 'Black & White' },
    { value: 'GRAYSCALE', label: 'Grayscale' },
    { value: 'REVERSED', label: 'Reversed (white on dark)' },
    { value: 'PANTONE', label: 'Specific Pantone Colors' },
  ];

  // Document type options
  documentTypeOptions = [
    { value: 'ACCREDITATION_CERTIFICATE', label: 'Accreditation Certificate' },
    { value: 'NSB_BOARD_RESOLUTION', label: 'NSB Board/Management Resolution' },
    { value: 'CAMPAIGN_PROPOSAL', label: 'Campaign Proposal' },
    { value: 'BUDGET_APPROVAL', label: 'Budget Approval' },
    { value: 'PROJECT_DOCUMENT', label: 'Project Document' },
    { value: 'OTHER', label: 'Other' },
  ];

  // File uploads
  placementFiles: File[] = [];
  supportingDocuments: { file: File; type: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private applicationService: MarkLicenseApplicationService,
    private nsbService: NsbService,
    private router: Router,
    private authService: AuthService,
  ) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.loadNsb();
    this.checkExistingApplication();
  }

  createForm(): FormGroup {
    return this.fb.group({
      // Section A: Applicant & License Type Information
      nsbId: ['', [Validators.required]],
      applicationReference: [''],
      licenseTypes: [[], [Validators.required, this.arrayNotEmptyValidator]],
      licenseDuration: ['', [Validators.required]],
      licenseDurationOther: [''],

      // Promotional License Details
      promotionalLicenseDetails: this.fb.group({
        primaryPurpose: [''],
        promoPurposeOther: [''],
        targetAudience: [[], [Validators.required]],
        geographicScope: [''],
        budgetEstimate: [''],
      }),

      // Certification Body License Details
      certificationBodyDetails: this.fb.group({
        cbUnitName: [''],
        cbAccreditationNumber: [''],
        cbAccreditationBody: [''],
        cbAccreditationScope: [''],
        cbAccreditationExpiry: [''],
        cbSchemesApplying: [[], [Validators.required]],
        cbExpectedVolume: [''],
      }),

      // Special Project License Details
      specialProjectDetails: this.fb.group({
        projectName: [''],
        projectFunder: [''],
        projectDurationStart: [''],
        projectDurationEnd: [''],
        projectDescription: [''],
        projectDeliverables: this.fb.array([]),
        projectBudget: [''],
      }),

      // Section B: Intended Use Details
      mediaUsage: this.fb.array([]),
      campaignTimeline: this.fb.array([]),
      expectedImpactMetrics: this.fb.group({
        expectedIndustryAwareness: [''],
        expectedConsumerAwareness: [''],
        expectedCbApplications: [''],
        expectedCertifications: [''],
        expectedMediaCoverage: [''],
        kpiMeasurementMethod: [''],
      }),

      // Section C: Mark Usage Specifications
      marksRequested: [[], [Validators.required, this.arrayNotEmptyValidator]],
      markColorsNeeded: [[]],
      markSizesNeeded: [''],
      markLanguages: [[], [Validators.required]],

      // Compliance Declarations
      annexBCompliance: [false, [Validators.requiredTrue]],
      brandGuidelinesAck: [false, [Validators.requiredTrue]],
      modificationPolicyAcceptance: [false, [Validators.requiredTrue]],

      // Section D: Declarations
      declarationSignatory: ['', [Validators.required]],
      signatoryTitle: ['', [Validators.required]],
      signatoryEmail: ['', [Validators.required, Validators.email]],
      auditRightsAcceptance: [false, [Validators.requiredTrue]],
      annualReportingCommitment: [false, [Validators.requiredTrue]],
      dataSharingConsent: [false, [Validators.requiredTrue]],
    });
  }

  arrayNotEmptyValidator(control: any) {
    if (!control.value || !Array.isArray(control.value) || control.value.length === 0) {
      return { arrayNotEmpty: true };
    }
    return null;
  }

  loadNsb(): void {
    this.loading = true;
    this.nsbService
      .getMyNsb()
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: (nsb) => {
          this.nsb = nsb;
          this.form.patchValue({ nsbId: nsb.id });
        },
        error: () => {
          this.error = 'Failed to load NSB information. Please ensure you have an NSB profile.';
        },
      });
  }

  checkExistingApplication(): void {
    if (!this.nsb) return;

    this.applicationService.getApplicationsByNsb(this.nsb.id, true).subscribe({
      next: (applications) => {
        const draft = applications.find((app) => app.status === 'DRAFT');
        if (draft) {
          this.existingApplication = draft;
          this.loadApplicationData(draft);
        }
      },
      error: () => {
        // Ignore error, proceed with new application
      },
    });
  }

  loadApplicationData(application: MarkLicenseApplication): void {
    // Load existing application data into form
    this.form.patchValue({
      applicationReference: application.applicationReference,
      licenseTypes: application.licenseTypes,
      licenseDuration: application.licenseDuration,
      licenseDurationOther: application.licenseDurationOther,
      marksRequested: application.marksRequested,
      markColorsNeeded: application.markColorsNeeded,
      markSizesNeeded: application.markSizesNeeded,
      markLanguages: application.markLanguages,
      declarationSignatory: application.declarationSignatory,
      signatoryTitle: application.signatoryTitle,
      signatoryEmail: application.signatoryEmail,
      annexBCompliance: application.annexBCompliance,
      brandGuidelinesAck: application.brandGuidelinesAck,
      modificationPolicyAcceptance: application.modificationPolicyAcceptance,
      auditRightsAcceptance: application.auditRightsAcceptance,
      annualReportingCommitment: application.annualReportingCommitment,
      dataSharingConsent: application.dataSharingConsent,
    });

    // Load nested objects
    if (application.promotionalLicenseDetails) {
      this.form.get('promotionalLicenseDetails')?.patchValue(application.promotionalLicenseDetails);
    }
    if (application.certificationBodyDetails) {
      this.form.get('certificationBodyDetails')?.patchValue(application.certificationBodyDetails);
    }
    if (application.specialProjectDetails) {
      this.form.get('specialProjectDetails')?.patchValue(application.specialProjectDetails);
      // Load deliverables array
      if (application.specialProjectDetails.projectDeliverables) {
        const deliverablesArray = this.form.get('specialProjectDetails.projectDeliverables') as FormArray;
        application.specialProjectDetails.projectDeliverables.forEach((deliverable) => {
          deliverablesArray.push(this.fb.control(deliverable));
        });
      }
    }
    if (application.expectedImpactMetrics) {
      this.form.get('expectedImpactMetrics')?.patchValue(application.expectedImpactMetrics);
    }

    // Load media usage array
    if (application.mediaUsage) {
      application.mediaUsage.forEach((media) => {
        this.addMediaUsage();
        const lastIndex = this.mediaUsageArray.length - 1;
        this.mediaUsageArray.at(lastIndex).patchValue(media);
      });
    }

    // Load campaign timeline array
    if (application.campaignTimeline) {
      application.campaignTimeline.forEach((timeline) => {
        this.addCampaignTimeline();
        const lastIndex = this.campaignTimelineArray.length - 1;
        this.campaignTimelineArray.at(lastIndex).patchValue(timeline);
      });
    }
  }

  // Getters for form arrays
  get mediaUsageArray(): FormArray {
    return this.form.get('mediaUsage') as FormArray;
  }

  get campaignTimelineArray(): FormArray {
    return this.form.get('campaignTimeline') as FormArray;
  }

  get projectDeliverablesArray(): FormArray {
    return this.form.get('specialProjectDetails.projectDeliverables') as FormArray;
  }

  // Helper methods for conditional validation
  hasLicenseType(type: string): boolean {
    const types = this.form.get('licenseTypes')?.value || [];
    return types.includes(type);
  }

  isDurationOther(): boolean {
    return this.form.get('licenseDuration')?.value === LicenseDurationType.OTHER;
  }

  isPromotionalPurposeOther(): boolean {
    return this.form.get('promotionalLicenseDetails.primaryPurpose')?.value === 'OTHER';
  }

  // Add/Remove array items
  addMediaUsage(): void {
    const mediaGroup = this.fb.group({
      mediaType: ['', [Validators.required]],
      mediaSpecific: ['', [Validators.required]],
      mediaLanguage: [[], [Validators.required]],
      mediaAudienceSize: [''],
      mediaDuration: ['', [Validators.required]],
      mediaBudgetAllocation: [''],
    });
    this.mediaUsageArray.push(mediaGroup);
  }

  removeMediaUsage(index: number): void {
    this.mediaUsageArray.removeAt(index);
  }

  addCampaignTimeline(): void {
    const timelineGroup = this.fb.group({
      timelinePhase: ['', [Validators.required]],
      timelineStart: ['', [Validators.required]],
      timelineEnd: ['', [Validators.required]],
      timelineMetrics: [''],
    });
    this.campaignTimelineArray.push(timelineGroup);
  }

  removeCampaignTimeline(index: number): void {
    this.campaignTimelineArray.removeAt(index);
  }

  addProjectDeliverable(): void {
    this.projectDeliverablesArray.push(this.fb.control('', [Validators.required]));
  }

  removeProjectDeliverable(index: number): void {
    this.projectDeliverablesArray.removeAt(index);
  }

  // File upload handlers
  onPlacementFileSelected(event: any): void {
    const files = Array.from(event.target.files) as File[];
    this.placementFiles = [...this.placementFiles, ...files];
  }

  removePlacementFile(index: number): void {
    this.placementFiles.splice(index, 1);
  }

  onSupportingDocumentSelected(event: any, type: string): void {
    const file = event.target.files[0] as File;
    if (file) {
      this.supportingDocuments.push({ file, type });
    }
  }

  removeSupportingDocument(index: number): void {
    this.supportingDocuments.splice(index, 1);
  }

  // Form submission
  saveDraft(): void {
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      this.error = 'Please fill in all required fields correctly.';
      return;
    }

    this.saving = true;
    this.error = '';

    const formValue = this.form.getRawValue();
    const payload: CreateMarkLicenseApplicationRequest = {
      ...formValue,
      supportingDocuments: this.supportingDocuments.map((doc) => ({
        documentType: doc.type,
        fileName: doc.file.name,
      })),
    };

    const operation = this.existingApplication
      ? this.applicationService.updateApplication(this.existingApplication.id, payload)
      : this.applicationService.createApplication(payload);

    operation
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
      )
      .subscribe({
        next: (application) => {
          this.existingApplication = application;
          this.success = true;
          this.successMessage = 'Application saved as draft successfully.';
          setTimeout(() => {
            this.success = false;
          }, 3000);
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to save application. Please try again.';
        },
      });
  }

  submitApplication(): void {
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      this.error = 'Please fill in all required fields correctly before submitting.';
      return;
    }

    if (!this.existingApplication) {
      this.error = 'Please save the application as draft first.';
      return;
    }

    this.submitting = true;
    this.error = '';

    this.applicationService
      .submitApplication(this.existingApplication.id)
      .pipe(
        finalize(() => {
          this.submitting = false;
        }),
      )
      .subscribe({
        next: () => {
          this.success = true;
          this.successMessage = 'Application submitted successfully!';
          setTimeout(() => {
            this.router.navigate(['/mark-licenses/dashboard']);
          }, 2000);
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to submit application. Please try again.';
        },
      });
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach((arrayControl) => {
          if (arrayControl instanceof FormGroup) {
            this.markFormGroupTouched(arrayControl);
          } else {
            arrayControl.markAsTouched();
          }
        });
      }
    });
  }
}

