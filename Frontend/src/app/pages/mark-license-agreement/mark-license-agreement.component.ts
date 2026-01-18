import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { MarkLicenseAgreementService } from '../../modules/mark-licensing/services/mark-license-agreement.service';
import { MarkAssetService } from '../../modules/mark-licensing/services/mark-asset.service';
import {
  MarkLicenseAgreement,
  SignAgreementRequest,
  RequestAssetsRequest,
  AssetDeliveryMethod,
} from '../../shared/models/mark-license.model';
import { AuthService } from '../../modules/auth/services/auth.service';

@Component({
  selector: 'app-mark-license-agreement',
  templateUrl: './mark-license-agreement.component.html',
  styleUrls: ['./mark-license-agreement.component.scss'],
})
export class MarkLicenseAgreementComponent implements OnInit {
  agreement: MarkLicenseAgreement | null = null;
  loading = false;
  signing = false;
  requestingAssets = false;
  error = '';
  success = false;
  successMessage = '';
  agreementId: string | null = null;
  showAssetRequest = false;

  signForm: FormGroup;
  assetRequestForm: FormGroup;

  // Asset delivery method options
  deliveryMethodOptions = [
    { value: AssetDeliveryMethod.PORTAL_DOWNLOAD, label: 'Download from Portal' },
    { value: AssetDeliveryMethod.EMAIL_DELIVERY, label: 'Email Delivery' },
    { value: AssetDeliveryMethod.PHYSICAL_MEDIA, label: 'Physical Media' },
    { value: AssetDeliveryMethod.OTHER, label: 'Other' },
  ];

  // Requested asset options
  assetOptions = [
    { value: 'VECTOR_AI', label: 'Vector Files (AI)' },
    { value: 'VECTOR_EPS', label: 'Vector Files (EPS)' },
    { value: 'PNG', label: 'PNG Files' },
    { value: 'JPEG', label: 'JPEG Files' },
    { value: 'BRAND_GUIDELINES_PDF', label: 'Brand Guidelines PDF' },
    { value: 'USAGE_EXAMPLES', label: 'Usage Examples' },
    { value: 'SOCIAL_MEDIA_KIT', label: 'Social Media Kit' },
    { value: 'VIDEO_FILES', label: 'Video Files' },
  ];

  constructor(
    private fb: FormBuilder,
    private agreementService: MarkLicenseAgreementService,
    private assetService: MarkAssetService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
    this.signForm = this.fb.group({
      nsbSignerName: ['', [Validators.required]],
      nsbSignerTitle: ['', [Validators.required]],
      nsbSignerEmail: ['', [Validators.required, Validators.email]],
      nsbSignerConsent: [false, [Validators.requiredTrue]],
    });

    this.assetRequestForm = this.fb.group({
      requestedAssets: [[], [Validators.required]],
      assetDeliveryMethod: ['', [Validators.required]],
      assetRecipientName: ['', [Validators.required]],
      assetRecipientEmail: ['', [Validators.required, Validators.email]],
      assetUseConfirmation: [false, [Validators.requiredTrue]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.agreementId = params['id'];
      if (this.agreementId) {
        this.loadAgreement();
      }
    });
  }

  loadAgreement(): void {
    if (!this.agreementId) return;

    this.loading = true;
    this.agreementService
      .getAgreementById(this.agreementId)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: (agreement) => {
          this.agreement = agreement;
          // Pre-fill sign form if agreement is pending NSB signature
          if (agreement.agreementStatus === 'PENDING_NSB') {
            this.signForm.patchValue({
              nsbSignerName: agreement.nsbSignerName,
              nsbSignerTitle: agreement.nsbSignerTitle,
              nsbSignerEmail: agreement.nsbSignerEmail,
            });
          }
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to load agreement.';
        },
      });
  }

  signAgreement(): void {
    if (this.signForm.invalid || !this.agreementId) {
      this.markFormGroupTouched(this.signForm);
      this.error = 'Please fill in all required fields correctly.';
      return;
    }

    this.signing = true;
    this.error = '';

    const payload: SignAgreementRequest = this.signForm.value;

    this.agreementService
      .signAgreement(this.agreementId, payload)
      .pipe(
        finalize(() => {
          this.signing = false;
        }),
      )
      .subscribe({
        next: (agreement) => {
          this.agreement = agreement;
          this.success = true;
          this.successMessage = 'Agreement signed successfully! Waiting for ARSO signature.';
          setTimeout(() => {
            this.success = false;
          }, 5000);
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to sign agreement. Please try again.';
        },
      });
  }

  requestAssets(): void {
    if (this.assetRequestForm.invalid || !this.agreementId) {
      this.markFormGroupTouched(this.assetRequestForm);
      this.error = 'Please fill in all required fields correctly.';
      return;
    }

    this.requestingAssets = true;
    this.error = '';

    const payload: RequestAssetsRequest = {
      agreementId: this.agreementId,
      ...this.assetRequestForm.value,
    };

    this.assetService
      .requestAssets(payload)
      .pipe(
        finalize(() => {
          this.requestingAssets = false;
        }),
      )
      .subscribe({
        next: () => {
          this.success = true;
          this.successMessage = 'Asset request submitted successfully!';
          this.showAssetRequest = false;
          this.assetRequestForm.reset();
          setTimeout(() => {
            this.success = false;
          }, 5000);
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to request assets. Please try again.';
        },
      });
  }

  canSign(): boolean {
    return this.agreement?.agreementStatus === 'PENDING_NSB';
  }

  isExecuted(): boolean {
    return this.agreement?.agreementStatus === 'EXECUTED';
  }

  isPendingArso(): boolean {
    return this.agreement?.agreementStatus === 'PENDING_ARSO';
  }

  getStatusBadgeClass(): string {
    if (!this.agreement) return '';
    switch (this.agreement.agreementStatus) {
      case 'EXECUTED':
        return 'bg-emerald-100 text-emerald-800';
      case 'PENDING_NSB':
        return 'bg-amber-100 text-amber-800';
      case 'PENDING_ARSO':
        return 'bg-blue-100 text-blue-800';
      case 'DRAFT':
        return 'bg-slate-100 text-slate-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusLabel(): string {
    if (!this.agreement) return '';
    switch (this.agreement.agreementStatus) {
      case 'EXECUTED':
        return 'Executed';
      case 'PENDING_NSB':
        return 'Pending NSB Signature';
      case 'PENDING_ARSO':
        return 'Pending ARSO Signature';
      case 'DRAFT':
        return 'Draft';
      default:
        return this.agreement.agreementStatus;
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  calculateDaysRemaining(): number {
    if (!this.agreement?.licenseEndDate) return 0;
    const endDate = new Date(this.agreement.licenseEndDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  toggleAssetRequest(): void {
    this.showAssetRequest = !this.showAssetRequest;
    if (this.showAssetRequest && this.agreement) {
      // Pre-fill recipient info from agreement
      this.assetRequestForm.patchValue({
        assetRecipientName: this.agreement.nsbSignerName,
        assetRecipientEmail: this.agreement.nsbSignerEmail,
      });
    }
  }

  downloadAgreement(): void {
    if (this.agreement?.agreementDocumentPath) {
      // In a real implementation, this would download the PDF
      window.open(this.agreement.agreementDocumentPath, '_blank');
    }
  }

  navigateToDashboard(): void {
    this.router.navigate(['/portal/mark-licenses/dashboard']);
  }
}

