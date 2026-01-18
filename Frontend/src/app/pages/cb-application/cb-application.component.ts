import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from '../../shared/models/reference-data.model';
import {
  CbAccreditationStandard,
  CbApplication,
  CbApplicationStatus,
  CbDocumentType,
} from '../../shared/models/cb-application.model';
import { CbApplicationService } from '../../modules/cb-approval/services/cb-application.service';
import { CountryService } from '../../modules/nsb-management/services/country.service';

@Component({
  selector: 'app-cb-application',
  templateUrl: './cb-application.component.html',
  styleUrls: ['./cb-application.component.scss'],
})
export class CbApplicationComponent implements OnInit {
  form: FormGroup;
  loading = false;
  saving = false;
  error = '';
  success = false;
  existingApplication: CbApplication | null = null;

  countries: Country[] = [];
  regions: { id: string; code: string; name: string }[] = [];
  accreditationBodies: { id: string; name: string; isFracMraSignatory: boolean }[] = [];
  acapSchemes: { id: string; code: string; name: string }[] = [];

  uploadedDocumentTypes = new Set<CbDocumentType>();

  accreditationStandards = Object.values(CbAccreditationStandard);
  cbDocumentTypes = CbDocumentType;

  constructor(
    private fb: FormBuilder,
    private cbService: CbApplicationService,
    private countryService: CountryService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.loadLookupData();
    this.route.queryParams.subscribe((params) => {
      const applicationId = params['id'];
      if (applicationId) {
        this.loadApplicationById(applicationId);
      }
    });
    this.watchAccreditationToggle();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      legalName: ['', [Validators.required, Validators.maxLength(255)]],
      shortName: ['', Validators.maxLength(100)],
      contactPersonName: ['', [Validators.required, Validators.maxLength(150)]],
      contactPersonTitle: ['', Validators.maxLength(150)],
      contactEmail: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      contactPhone: ['', [Validators.required, Validators.maxLength(50)]],
      website: ['', Validators.maxLength(255)],
      physicalAddress: ['', Validators.required],
      postalAddress: [''],
      countryId: [''],
      regionsOfOperation: [[], Validators.required],
      regionsOther: [''],
      isAccredited: [true, Validators.required],
      accreditationStandard: [CbAccreditationStandard.ISO_IEC_17065],
      accreditationBodyId: [''],
      accreditationBodyName: [''],
      accreditationCertificateNumber: [''],
      accreditationScope: [''],
      accreditationValidUntil: [''],
      accreditationApplicationDate: [''],
      accreditationProgressNotes: [''],
      previousLicenseHeld: [false],
      previousLicenseGrantedAt: [''],
      previousLicenseTerminatedAt: [''],
      previousLicenseTerminationReason: [''],
      appliedSchemes: [[], Validators.required],
      declarations: this.fb.group({
        acceptTerms: [false, Validators.requiredTrue],
        dataSharingConsent: [false, Validators.requiredTrue],
      }),
    });
  }

  private loadLookupData(): void {
    this.countryService.getCountries().subscribe({
      next: (countries) => (this.countries = countries),
      error: () => (this.error = 'Failed to load countries'),
    });

    this.cbService.getRegions().subscribe({
      next: (regions) => (this.regions = regions),
      error: () => (this.error = 'Failed to load regions'),
    });

    this.cbService.getAccreditationBodies().subscribe({
      next: (bodies) => (this.accreditationBodies = bodies),
      error: () => (this.error = 'Failed to load accreditation bodies'),
    });

    this.cbService.getAcapSchemes().subscribe({
      next: (schemes) => (this.acapSchemes = schemes),
      error: () => (this.error = 'Failed to load ACAP schemes'),
    });
  }

  private watchAccreditationToggle(): void {
    this.form.get('isAccredited')?.valueChanges.subscribe((isAccredited) => {
      const accreditationBodyId = this.form.get('accreditationBodyId');
      const accreditationStandard = this.form.get('accreditationStandard');
      const accreditationApplicationDate = this.form.get('accreditationApplicationDate');

      if (isAccredited) {
        accreditationBodyId?.setValidators([Validators.required]);
        accreditationStandard?.setValidators([Validators.required]);
        accreditationApplicationDate?.clearValidators();
      } else {
        accreditationBodyId?.clearValidators();
        accreditationStandard?.clearValidators();
        accreditationApplicationDate?.setValidators([Validators.required]);
      }

      accreditationBodyId?.updateValueAndValidity();
      accreditationStandard?.updateValueAndValidity();
      accreditationApplicationDate?.updateValueAndValidity();
    });
  }

  loadApplicationById(id: string): void {
    this.cbService.getById(id).subscribe({
      next: (application) => {
        this.existingApplication = application;
        this.form.patchValue({
          ...application,
          declarations: application.declarations || {},
        });
        this.loadDocuments(application.id);
      },
      error: () => {
        this.error = 'Failed to load CB application';
      },
    });
  }

  private loadDocuments(applicationId: string): void {
    this.cbService.listDocuments(applicationId).subscribe({
      next: (documents) => {
        documents.forEach((doc) => this.uploadedDocumentTypes.add(doc.documentType));
      },
    });
  }

  toggleRegion(regionCode: string): void {
    const current = this.form.get('regionsOfOperation')?.value || [];
    const index = current.indexOf(regionCode);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(regionCode);
    }
    this.form.get('regionsOfOperation')?.setValue([...current]);
  }

  toggleScheme(schemeCode: string): void {
    const current = this.form.get('appliedSchemes')?.value || [];
    const index = current.indexOf(schemeCode);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(schemeCode);
    }
    this.form.get('appliedSchemes')?.setValue([...current]);
  }

  onFileSelected(event: Event, documentType: CbDocumentType): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    if (!this.existingApplication?.id) {
      this.error = 'Please save the draft before uploading documents.';
      return;
    }

    const file = input.files[0];
    this.cbService.uploadDocument(this.existingApplication.id, file, documentType).subscribe({
      next: () => {
        this.uploadedDocumentTypes.add(documentType);
      },
      error: () => {
        this.error = 'Failed to upload document';
      },
    });
  }

  saveDraft(): void {
    this.saving = true;
    this.error = '';
    const payload = this.form.value;

    const request = this.existingApplication?.id
      ? this.cbService.update(this.existingApplication.id, payload)
      : this.cbService.saveDraft(payload);

    request.subscribe({
      next: (application) => {
        this.existingApplication = application;
        this.saving = false;
      },
      error: (error) => {
        this.saving = false;
        this.error = error.error?.message || 'Failed to save draft';
      },
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error = 'Please fill in all required fields.';
      return;
    }

    if (!this.existingApplication?.id) {
      this.error = 'Please save the draft before submitting.';
      return;
    }

    const requiredDocs = [CbDocumentType.ACCREDITATION_CERTIFICATE, CbDocumentType.ACCREDITATION_SCOPE];
    const missingDocs = requiredDocs.filter((type) => !this.uploadedDocumentTypes.has(type));
    if (missingDocs.length > 0) {
      this.error = 'Please upload the accreditation certificate and scope documents before submitting.';
      return;
    }

    this.loading = true;
    this.cbService.update(this.existingApplication.id, this.form.value).subscribe({
      next: (application) => {
        this.existingApplication = application;
        this.cbService.submit(application.id).subscribe({
          next: () => {
            this.loading = false;
            this.success = true;
            setTimeout(() => this.router.navigate(['/portal/cb/applications']), 1500);
          },
          error: (error) => {
            this.loading = false;
            this.error = error.error?.message || 'Failed to submit application';
          },
        });
      },
      error: (error) => {
        this.loading = false;
        this.error = error.error?.message || 'Failed to update application';
      },
    });
  }

  getStatusLabel(status?: CbApplicationStatus): string {
    if (!status) return 'Draft';
    return status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  }
}
