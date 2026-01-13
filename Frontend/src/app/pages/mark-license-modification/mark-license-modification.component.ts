import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { MarkLicenseModificationService } from '../../modules/mark-licensing/services/mark-license-modification.service';
import { MarkLicenseAgreementService } from '../../modules/mark-licensing/services/mark-license-agreement.service';
import {
  MarkLicenseModification,
  CreateLicenseModificationRequest,
  MarkLicenseAgreement,
} from '../../shared/models/mark-license.model';

@Component({
  selector: 'app-mark-license-modification',
  templateUrl: './mark-license-modification.component.html',
  styleUrls: ['./mark-license-modification.component.scss'],
})
export class MarkLicenseModificationComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitting = false;
  error = '';
  success = false;
  successMessage = '';
  licenseId: string | null = null;
  agreement: MarkLicenseAgreement | null = null;
  existingModification: MarkLicenseModification | null = null;
  modificationId: string | null = null;

  // Modification type options
  modificationTypeOptions = [
    { value: 'EXTEND_DURATION', label: 'Extend Duration' },
    { value: 'CHANGE_SCOPE', label: 'Change Scope' },
    { value: 'ADD_NEW_MARKS', label: 'Add New Marks' },
    { value: 'CHANGE_MEDIA', label: 'Change Media' },
    { value: 'UPDATE_CONTACT', label: 'Update Contact' },
    { value: 'OTHER', label: 'Other' },
  ];

  // Fee adjustment options
  feeAdjustmentOptions = [
    { value: 'YES', label: 'Yes' },
    { value: 'NO', label: 'No' },
    { value: 'TO_BE_DETERMINED', label: 'To Be Determined' },
  ];

  // File upload
  justificationFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private modificationService: MarkLicenseModificationService,
    private agreementService: MarkLicenseAgreementService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.licenseId = params['licenseId'];
      this.modificationId = params['id'];
      
      if (this.licenseId) {
        this.loadAgreement();
      }
      if (this.modificationId) {
        this.loadModification();
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      originalLicenseId: ['', [Validators.required]],
      modificationTypes: [[], [Validators.required, this.arrayNotEmptyValidator]],
      modificationReason: ['', [Validators.required]],
      proposedChanges: ['', [Validators.required]],
      effectiveDateRequest: ['', [Validators.required]],
      supportingJustificationPath: [''],
      impactAssessment: [''],
      feeAdjustmentNeeded: ['', [Validators.required]],
    });
  }

  arrayNotEmptyValidator(control: any) {
    if (!control.value || !Array.isArray(control.value) || control.value.length === 0) {
      return { arrayNotEmpty: true };
    }
    return null;
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
          this.form.patchValue({ originalLicenseId: this.licenseId });
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to load license agreement.';
        },
      });
  }

  loadModification(): void {
    if (!this.modificationId) return;

    this.loading = true;
    this.modificationService
      .getModificationById(this.modificationId)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: (modification) => {
          this.existingModification = modification;
          this.licenseId = modification.originalLicenseId;
          this.loadAgreement();
          this.loadModificationData(modification);
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to load modification request.';
        },
      });
  }

  loadModificationData(modification: MarkLicenseModification): void {
    this.form.patchValue({
      modificationTypes: modification.modificationTypes,
      modificationReason: modification.modificationReason,
      proposedChanges: modification.proposedChanges,
      effectiveDateRequest: modification.effectiveDateRequest.split('T')[0],
      impactAssessment: modification.impactAssessment,
      feeAdjustmentNeeded: modification.feeAdjustmentNeeded,
    });
  }

  onJustificationFileSelected(event: any): void {
    const file = event.target.files[0] as File;
    if (file) {
      this.justificationFile = file;
    }
  }

  removeJustificationFile(): void {
    this.justificationFile = null;
  }

  submitModification(): void {
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      this.error = 'Please fill in all required fields correctly.';
      return;
    }

    this.submitting = true;
    this.error = '';

    const formValue = this.form.getRawValue();
    const payload: CreateLicenseModificationRequest = {
      ...formValue,
      supportingJustificationPath: this.justificationFile?.name || undefined,
    };

    const operation = this.existingModification
      ? // Update not supported in current API, would need to add
        this.modificationService.requestModification(payload)
      : this.modificationService.requestModification(payload);

    operation
      .pipe(
        finalize(() => {
          this.submitting = false;
        }),
      )
      .subscribe({
        next: (modification) => {
          this.existingModification = modification;
          this.success = true;
          this.successMessage = 'Modification request submitted successfully!';
          setTimeout(() => {
            this.router.navigate(['/mark-licenses/dashboard']);
          }, 2000);
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to submit modification request. Please try again.';
        },
      });
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'APPROVED':
        return 'bg-emerald-100 text-emerald-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      case 'PENDING':
        return 'bg-amber-100 text-amber-800';
      case 'UNDER_REVIEW':
        return 'bg-blue-100 text-blue-800';
      case 'IMPLEMENTED':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  navigateToDashboard(): void {
    this.router.navigate(['/mark-licenses/dashboard']);
  }
}

