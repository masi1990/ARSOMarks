import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { MarkUsageReportService } from '../../modules/mark-licensing/services/mark-usage-report.service';
import { MarkLicenseAgreementService } from '../../modules/mark-licensing/services/mark-license-agreement.service';
import {
  MarkLicenseUsageReport,
  CreateMarkUsageReportRequest,
  PromotionalUsageMetrics,
  CertificationUsageMetrics,
  MediaType,
  MarkType,
} from '../../shared/models/mark-license.model';
import { MarkLicenseAgreement } from '../../shared/models/mark-license.model';

@Component({
  selector: 'app-mark-usage-report',
  templateUrl: './mark-usage-report.component.html',
  styleUrls: ['./mark-usage-report.component.scss'],
})
export class MarkUsageReportComponent implements OnInit {
  form: FormGroup;
  loading = false;
  saving = false;
  submitting = false;
  error = '';
  success = false;
  successMessage = '';
  licenseId: string | null = null;
  agreement: MarkLicenseAgreement | null = null;
  existingReport: MarkLicenseUsageReport | null = null;
  reportId: string | null = null;

  // Options
  mediaTypeOptions = [
    { value: MediaType.DIGITAL_ONLINE, label: 'Digital/Online' },
    { value: MediaType.PRINT, label: 'Print' },
    { value: MediaType.BROADCAST, label: 'Broadcast' },
    { value: MediaType.OUTDOOR, label: 'Outdoor' },
    { value: MediaType.EVENTS, label: 'Events' },
    { value: MediaType.SOCIAL_MEDIA, label: 'Social Media' },
    { value: MediaType.OTHER, label: 'Other' },
  ];

  markTypeOptions = [
    { value: MarkType.ARSO_QUALITY_MARK, label: 'ARSO Quality Mark' },
    { value: MarkType.ECO_MARK_AFRICA, label: 'Eco Mark Africa (EMA)' },
    { value: MarkType.BOTH, label: 'Both' },
  ];

  renewalIntentionOptions = [
    { value: 'YES', label: 'Yes' },
    { value: 'NO', label: 'No' },
    { value: 'UNDECIDED', label: 'Undecided' },
  ];

  evidenceTypeOptions = [
    { value: 'CAMPAIGN_PHOTOS', label: 'Campaign Photos' },
    { value: 'MEDIA_CLIPPINGS', label: 'Media Clippings' },
    { value: 'SCREENSHOTS', label: 'Screenshots' },
    { value: 'ANALYTICS_REPORTS', label: 'Analytics Reports' },
  ];

  sampleTypeOptions = [
    { value: 'BROCHURE', label: 'Brochure' },
    { value: 'ADVERTISEMENT', label: 'Advertisement' },
    { value: 'PRODUCT_LABEL', label: 'Product Label' },
  ];

  // File uploads
  supportingEvidenceFiles: { file: File; type: string }[] = [];
  sampleFiles: { file: File; type: string }[] = [];
  testimonialFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private reportService: MarkUsageReportService,
    private agreementService: MarkLicenseAgreementService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.licenseId = params['licenseId'];
      this.reportId = params['id'];
      
      if (this.licenseId) {
        this.loadAgreement();
      }
      if (this.reportId) {
        this.loadReport();
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      licenseId: ['', [Validators.required]],
      reportPeriodStart: ['', [Validators.required]],
      reportPeriodEnd: ['', [Validators.required]],
      nsbContactName: ['', [Validators.required]],
      nsbContactEmail: ['', [Validators.required, Validators.email]],
      
      // Promotional Usage Metrics Array
      promotionalUsageMetrics: this.fb.array([]),
      
      // Certification Usage Metrics Array
      certificationUsageMetrics: this.fb.array([]),
      
      // Impact Assessment
      impactAssessment: this.fb.group({
        awarenessIncrease: [''],
        inquiriesReceived: ['', [Validators.required]],
        partnershipsFormed: [''],
        mediaCoverage: [''],
        successStories: this.fb.array([]),
        challengesFaced: this.fb.array([]),
      }),
      
      // Compliance Declaration
      complianceChecks: this.fb.group({
        usedMarksOnlyAsAuthorized: [false, [Validators.requiredTrue]],
        followedBrandGuidelines: [false, [Validators.requiredTrue]],
        didNotModifyMarks: [false, [Validators.requiredTrue]],
        usedCurrentVersionOfMarks: [false, [Validators.requiredTrue]],
      }),
      
      nonComplianceIssues: [''],
      correctiveActionsTaken: [''],
      plannedUsageNextYear: ['', [Validators.required]],
      renewalIntention: ['', [Validators.required]],
    });
  }

  loadAgreement(): void {
    if (!this.licenseId) return;

    this.loading = true;
    this.agreementService
      .getAgreementById(this.licenseId)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: (agreement) => {
          this.agreement = agreement;
          this.form.patchValue({ licenseId: this.licenseId });
          
          // Set default report period (last 12 months)
          const endDate = new Date();
          const startDate = new Date();
          startDate.setFullYear(startDate.getFullYear() - 1);
          
          this.form.patchValue({
            reportPeriodStart: startDate.toISOString().split('T')[0],
            reportPeriodEnd: endDate.toISOString().split('T')[0],
            nsbContactName: agreement.nsbSignerName,
            nsbContactEmail: agreement.nsbSignerEmail,
          });
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to load license agreement.';
        },
      });
  }

  loadReport(): void {
    if (!this.reportId) return;

    this.loading = true;
    this.reportService
      .getReportById(this.reportId)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: (report) => {
          this.existingReport = report;
          this.licenseId = report.licenseId;
          this.loadAgreement();
          this.loadReportData(report);
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to load report.';
        },
      });
  }

  loadReportData(report: MarkLicenseUsageReport): void {
    this.form.patchValue({
      reportPeriodStart: report.reportPeriodStart.split('T')[0],
      reportPeriodEnd: report.reportPeriodEnd.split('T')[0],
      nsbContactName: report.nsbContactName,
      nsbContactEmail: report.nsbContactEmail,
      nonComplianceIssues: report.nonComplianceIssues,
      correctiveActionsTaken: report.correctiveActionsTaken,
      plannedUsageNextYear: report.plannedUsageNextYear,
      renewalIntention: report.renewalIntention,
    });

    if (report.impactAssessment) {
      this.form.get('impactAssessment')?.patchValue({
        awarenessIncrease: report.impactAssessment.awarenessIncrease,
        inquiriesReceived: report.impactAssessment.inquiriesReceived,
        partnershipsFormed: report.impactAssessment.partnershipsFormed,
        mediaCoverage: report.impactAssessment.mediaCoverage,
      });
    }

    if (report.complianceChecks) {
      this.form.get('complianceChecks')?.patchValue(report.complianceChecks);
    }

    // Load arrays
    if (report.promotionalUsageMetrics) {
      report.promotionalUsageMetrics.forEach((metric) => {
        this.addPromotionalUsage();
        const lastIndex = this.promotionalUsageArray.length - 1;
        this.promotionalUsageArray.at(lastIndex).patchValue(metric);
      });
    }

    if (report.certificationUsageMetrics) {
      report.certificationUsageMetrics.forEach((metric) => {
        this.addCertificationUsage();
        const lastIndex = this.certificationUsageArray.length - 1;
        this.certificationUsageArray.at(lastIndex).patchValue(metric);
      });
    }
  }

  // Getters for form arrays
  get promotionalUsageArray(): FormArray {
    return this.form.get('promotionalUsageMetrics') as FormArray;
  }

  get certificationUsageArray(): FormArray {
    return this.form.get('certificationUsageMetrics') as FormArray;
  }

  get successStoriesArray(): FormArray {
    return this.form.get('impactAssessment.successStories') as FormArray;
  }

  get challengesArray(): FormArray {
    return this.form.get('impactAssessment.challengesFaced') as FormArray;
  }

  // Add/Remove array items
  addPromotionalUsage(): void {
    const usageGroup = this.fb.group({
      mediaCampaignName: ['', [Validators.required]],
      mediaTypeReported: ['', [Validators.required]],
      markUsed: ['', [Validators.required]],
      usagePeriodStart: ['', [Validators.required]],
      usagePeriodEnd: ['', [Validators.required]],
      audienceReached: [''],
      impressions: [''],
      engagementMetrics: [''],
      campaignCost: [''],
    });
    this.promotionalUsageArray.push(usageGroup);
  }

  removePromotionalUsage(index: number): void {
    this.promotionalUsageArray.removeAt(index);
  }

  addCertificationUsage(): void {
    const usageGroup = this.fb.group({
      sector: ['', [Validators.required]],
      certificationsIssued: ['', [Validators.required]],
      markAppearances: ['', [Validators.required]],
      clientFeedback: [''],
      nonConformities: ['', [Validators.required]],
      correctiveActions: [''],
    });
    this.certificationUsageArray.push(usageGroup);
  }

  removeCertificationUsage(index: number): void {
    this.certificationUsageArray.removeAt(index);
  }

  addSuccessStory(): void {
    this.successStoriesArray.push(this.fb.control('', [Validators.required]));
  }

  removeSuccessStory(index: number): void {
    this.successStoriesArray.removeAt(index);
  }

  addChallenge(): void {
    this.challengesArray.push(this.fb.control('', [Validators.required]));
  }

  removeChallenge(index: number): void {
    this.challengesArray.removeAt(index);
  }

  // File upload handlers
  onSupportingEvidenceSelected(event: any, type: string): void {
    const file = event.target.files[0] as File;
    if (file) {
      this.supportingEvidenceFiles.push({ file, type });
    }
  }

  removeSupportingEvidence(index: number): void {
    this.supportingEvidenceFiles.splice(index, 1);
  }

  onSampleSelected(event: any, type: string): void {
    const file = event.target.files[0] as File;
    if (file) {
      this.sampleFiles.push({ file, type });
    }
  }

  removeSample(index: number): void {
    this.sampleFiles.splice(index, 1);
  }

  onTestimonialSelected(event: any): void {
    const files = Array.from(event.target.files) as File[];
    this.testimonialFiles = [...this.testimonialFiles, ...files];
  }

  removeTestimonial(index: number): void {
    this.testimonialFiles.splice(index, 1);
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
    const payload: CreateMarkUsageReportRequest = {
      ...formValue,
      supportingEvidence: this.supportingEvidenceFiles.map((doc) => ({
        fileName: doc.file.name,
        evidenceType: doc.type,
      })),
      samples: this.sampleFiles.map((doc) => ({
        fileName: doc.file.name,
        materialType: doc.type,
      })),
      testimonials: this.testimonialFiles.map((file) => ({
        fileName: file.name,
      })),
    };

    const operation = this.existingReport
      ? this.reportService.updateReport(this.existingReport.id, payload)
      : this.reportService.createReport(payload);

    operation
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
      )
      .subscribe({
        next: (report) => {
          this.existingReport = report;
          this.success = true;
          this.successMessage = 'Report saved as draft successfully.';
          setTimeout(() => {
            this.success = false;
          }, 3000);
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to save report. Please try again.';
        },
      });
  }

  submitReport(): void {
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      this.error = 'Please fill in all required fields correctly before submitting.';
      return;
    }

    if (!this.existingReport) {
      this.error = 'Please save the report as draft first.';
      return;
    }

    this.submitting = true;
    this.error = '';

    this.reportService
      .submitReport(this.existingReport.id)
      .pipe(
        finalize(() => {
          this.submitting = false;
        }),
      )
      .subscribe({
        next: () => {
          this.success = true;
          this.successMessage = 'Report submitted successfully!';
          setTimeout(() => {
            this.router.navigate(['/portal/mark-licenses/dashboard']);
          }, 2000);
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to submit report. Please try again.';
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

