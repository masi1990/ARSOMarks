import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { NsbRegistrationRequestService } from '../../modules/nsb-management/services/nsb-registration-request.service';
import { CountryService } from '../../modules/nsb-management/services/country.service';
import { Country } from '../../shared/models/reference-data.model';
import {
  NsbRegistrationRequest,
  NsbRegistrationRequestStatus,
  NsbDocumentType,
} from '../../shared/models/nsb-registration-request.model';
import { AuthService } from '../../modules/auth/services/auth.service';

@Component({
  selector: 'app-nsb-registration-request',
  templateUrl: './nsb-registration-request.component.html',
  styleUrls: ['./nsb-registration-request.component.scss'],
})
export class NsbRegistrationRequestComponent implements OnInit {
  form: FormGroup;
  loading = false;
  saving = false;
  error = '';
  success = false;
  countries: Country[] = [];
  existingRequest: NsbRegistrationRequest | null = null;
  documentTypes = [
    { value: NsbDocumentType.NSB_ESTABLISHMENT_CHARTER, label: 'NSB Establishment Charter/Act' },
    { value: NsbDocumentType.ARSO_MEMBERSHIP_CERTIFICATE, label: 'ARSO Membership Certificate' },
    { value: NsbDocumentType.GOVERNMENT_GAZETTE_NOTICE, label: 'Government Gazette Notice' },
    { value: NsbDocumentType.DECLARATION_OF_AUTHORITY, label: 'Declaration of Authority' },
  ];
  selectedFiles: { [key: string]: File | null } = {};
  requestedRolesOptions = [
    { value: 'MARKET_SURVEILLANCE_OFFICER', label: 'Market Surveillance Officer' },
    { value: 'CERTIFICATION_LIAISON_OFFICER', label: 'Certification Liaison Officer' },
    { value: 'TRAINING_COORDINATOR', label: 'Training Coordinator' },
    { value: 'COMMUNICATIONS_OFFICER', label: 'Communications Officer' },
  ];

  constructor(
    private fb: FormBuilder,
    private requestService: NsbRegistrationRequestService,
    private countryService: CountryService,
    public router: Router,
    private authService: AuthService,
  ) {
    this.form = this.fb.group({
      countryId: ['', [Validators.required]],
      countryName: [{ value: '', disabled: true }, [Validators.required]],
      nsbOfficialName: ['', [Validators.required, Validators.maxLength(255)]],
      nsbAcronym: ['', [Validators.maxLength(50)]],
      isoCode: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      contactPersonName: ['', [Validators.required, Validators.maxLength(255)]],
      contactPersonTitle: ['', [Validators.maxLength(255)]],
      contactEmail: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      contactPhone: ['', [Validators.maxLength(50)]],
      contactMobile: ['', [Validators.maxLength(50)]],
      additionalUserSlotsRequested: [0, [Validators.min(0)]],
      requestedRoles: [[]],
    });
  }

  ngOnInit(): void {
    this.loadCountries();
    this.checkExistingRequest();
    this.setupCountryWatcher();
  }

  setupCountryWatcher(): void {
    this.form.get('countryId')?.valueChanges.subscribe((countryId) => {
      const country = this.countries.find((c) => c.id === countryId);
      if (country) {
        this.form.patchValue({
          countryName: country.name,
          isoCode: country.isoCode || '',
        });
      }
    });
  }

  loadCountries(): void {
    this.loading = true;
    this.countryService
      .getCountries()
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: (data) => {
          this.countries = data;
        },
        error: () => {
          this.error = 'Failed to load countries. Please try again.';
        },
      });
  }

  checkExistingRequest(): void {
    const user = this.authService.currentUserValue;
    if (user?.countryId) {
      this.requestService.getMyRequest(user.countryId).subscribe({
        next: (request) => {
          if (request) {
            this.existingRequest = request;
            this.loadRequestData(request);
          }
        },
        error: () => {
          // No existing request, continue
        },
      });
    }
  }

  loadRequestData(request: NsbRegistrationRequest): void {
    this.form.patchValue({
      countryId: request.countryId,
      countryName: request.countryName,
      nsbOfficialName: request.nsbOfficialName,
      nsbAcronym: request.nsbAcronym,
      isoCode: request.isoCode,
      contactPersonName: request.contactPersonName,
      contactPersonTitle: request.contactPersonTitle,
      contactEmail: request.contactEmail,
      contactPhone: request.contactPhone,
      contactMobile: request.contactMobile,
      additionalUserSlotsRequested: request.additionalUserSlotsRequested || 0,
      requestedRoles: request.requestedRoles || [],
    });
  }

  onFileSelected(event: Event, documentType: NsbDocumentType): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFiles[documentType] = file;

      // Upload file immediately if request exists
      if (this.existingRequest?.id) {
        this.uploadFile(documentType, file);
      }
    }
  }

  uploadFile(documentType: NsbDocumentType, file: File): void {
    if (!this.existingRequest?.id) {
      return;
    }

    this.requestService.uploadDocument(this.existingRequest.id, file, documentType).subscribe({
      next: () => {
        // File uploaded successfully, reload request to get updated documents
        this.loadRequest();
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to upload file. Please try again.';
        delete this.selectedFiles[documentType];
      },
    });
  }

  removeFile(documentType: NsbDocumentType): void {
    if (!this.existingRequest?.id) {
      delete this.selectedFiles[documentType];
      return;
    }

    // Find document ID
    const document = this.existingRequest.documents?.find((d) => d.documentType === documentType);
    if (document?.id) {
      this.requestService.deleteDocument(this.existingRequest.id, document.id).subscribe({
        next: () => {
          delete this.selectedFiles[documentType];
          this.loadRequest();
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to delete file. Please try again.';
        },
      });
    } else {
      delete this.selectedFiles[documentType];
    }
  }

  loadRequest(): void {
    if (!this.existingRequest?.id) {
      return;
    }

    this.requestService.get(this.existingRequest.id).subscribe({
      next: (request) => {
        this.existingRequest = request;
        this.loadRequestData(request);
      },
      error: () => {
        // Error loading request
      },
    });
  }

  onSubmit(): void {
    // Allow saving draft even if form is invalid
    // Only mark fields as touched to show validation errors, but don't prevent saving
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      // Continue with save anyway for draft
    }

    this.saving = true;
    this.error = '';

    const formValue = this.form.getRawValue();
    // Exclude documents from DTO - they are uploaded separately via file upload endpoint
    const { documents, ...formDataWithoutDocuments } = formValue as any;
    const dto = {
      ...formDataWithoutDocuments,
    };

    const request$ = this.existingRequest
      ? this.requestService.update(this.existingRequest.id!, dto)
      : this.requestService.create(dto);

    request$
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
      )
      .subscribe({
        next: (request) => {
          this.existingRequest = request;
          this.success = true;
          // Reload request to get updated documents
          this.loadRequest();
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to save registration request. Please try again.';
        },
      });
  }

  onSubmitForReview(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error = 'Please complete all required fields before submitting.';
      return;
    }

    // First save the request if it doesn't exist
    if (!this.existingRequest?.id) {
      this.onSubmit();
      // Wait for onSubmit to complete before checking documents
      setTimeout(() => {
        if (this.existingRequest?.id) {
          this.checkAndSubmitDocuments();
        }
      }, 500);
      return;
    }

    this.checkAndSubmitDocuments();
  }

  checkAndSubmitDocuments(): void {
    // Check if required documents are uploaded
    const requiredDocs = [
      NsbDocumentType.NSB_ESTABLISHMENT_CHARTER,
      NsbDocumentType.ARSO_MEMBERSHIP_CERTIFICATE,
      NsbDocumentType.GOVERNMENT_GAZETTE_NOTICE,
      NsbDocumentType.DECLARATION_OF_AUTHORITY,
    ];
    const uploadedDocTypes = this.existingRequest?.documents?.map((d) => d.documentType) || [];
    const missingDocs = requiredDocs.filter((doc) => !uploadedDocTypes.includes(doc));

    if (missingDocs.length > 0) {
      this.error = 'Please upload all required documents before submitting.';
      return;
    }

    if (!this.existingRequest?.id) {
      this.error = 'Please save the request first before submitting.';
      return;
    }

    this.saving = true;
    this.requestService
      .submit(this.existingRequest.id)
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
      )
      .subscribe({
        next: (request) => {
          this.existingRequest = request;
          this.success = true;
          this.error = '';
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to submit request. Please try again.';
        },
      });
  }

  getDocumentLabel(documentType: NsbDocumentType): string {
    const doc = this.documentTypes.find((d) => d.value === documentType);
    return doc?.label || documentType;
  }

  getFileName(documentType: NsbDocumentType): string {
    const file = this.selectedFiles[documentType];
    return file ? file.name : '';
  }

  getUploadedDocument(documentType: NsbDocumentType): any {
    return this.existingRequest?.documents?.find((d) => d.documentType === documentType);
  }

  toggleRole(roleValue: string): void {
    const currentRoles = this.form.get('requestedRoles')?.value || [];
    const index = currentRoles.indexOf(roleValue);
    if (index > -1) {
      currentRoles.splice(index, 1);
    } else {
      currentRoles.push(roleValue);
    }
    this.form.patchValue({ requestedRoles: currentRoles });
  }

  viewDocument(documentType: NsbDocumentType): void {
    const document = this.getUploadedDocument(documentType);
    if (document?.id && this.existingRequest?.id) {
      // Fetch document via HTTP client (includes auth headers) and open as blob URL
      this.requestService.getDocumentBlob(this.existingRequest.id, document.id).subscribe({
        next: (blob) => {
          const url = URL.createObjectURL(blob);
          window.open(url, '_blank');
          // Clean up the blob URL after a delay (optional, but good practice)
          setTimeout(() => URL.revokeObjectURL(url), 100);
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to load document. Please try again.';
        },
      });
    } else if (this.selectedFiles[documentType]) {
      // Preview local file that hasn't been uploaded yet
      const file = this.selectedFiles[documentType];
      if (file) {
        const url = URL.createObjectURL(file);
        window.open(url, '_blank');
      }
    }
  }
}

