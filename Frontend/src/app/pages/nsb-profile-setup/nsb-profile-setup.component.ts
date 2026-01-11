import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { NsbService } from '../../modules/nsb-management/services/nsb.service';
import { CountryService } from '../../modules/nsb-management/services/country.service';
import { NsbRegistrationRequestService } from '../../modules/nsb-management/services/nsb-registration-request.service';
import { Nsb, NsbContact, NsbDocument, NsbProfileDocumentType } from '../../shared/models/nsb.model';
import { Country } from '../../shared/models/reference-data.model';
import { NsbRegistrationRequest, NsbRegistrationRequestStatus } from '../../shared/models/nsb-registration-request.model';
import { AuthService } from '../../modules/auth/services/auth.service';

@Component({
  selector: 'app-nsb-profile-setup',
  templateUrl: './nsb-profile-setup.component.html',
  styleUrls: ['./nsb-profile-setup.component.scss'],
})
export class NsbProfileSetupComponent implements OnInit {
  form: FormGroup;
  loading = false;
  saving = false;
  error = '';
  success = false;
  successMessage = '';
  nsb: Nsb | null = null;
  registrationRequest: NsbRegistrationRequest | null = null;
  countries: Country[] = [];
  
  // Document uploads
  selectedDocuments: { [key: string]: File | null } = {};
  uploadedDocuments: NsbDocument[] = [];
  
  // Document types
  documentTypes = [
    { value: NsbProfileDocumentType.NATIONAL_STANDARDS_ACT_DOCUMENT, label: 'National Standards Act/Regulation' },
    { value: NsbProfileDocumentType.NATIONAL_CONFORMITY_ASSESSMENT_POLICY_DOCUMENT, label: 'National Conformity Assessment Policy' },
    { value: NsbProfileDocumentType.NATIONAL_QUALITY_POLICY_DOCUMENT, label: 'National Quality Policy' },
  ];
  
  // Focal point types
  focalPointTypes = [
    { type: 'ACAP_COORDINATOR', label: 'Designated ACAP Coordinator', formArrayName: 'acapCoordinators' },
    { type: 'MARKET_SURVEILLANCE_FOCAL_POINT', label: 'Market Surveillance Focal Point', formArrayName: 'marketSurveillanceContacts' },
    { type: 'CUSTOMS_TRADE_FOCAL_POINT', label: 'Customs/Trade Focal Point', formArrayName: 'customsTradeContacts' },
    { type: 'CONSUMER_AFFAIRS_FOCAL_POINT', label: 'Consumer Affairs Focal Point', formArrayName: 'consumerAffairsContacts' },
  ];

  constructor(
    private fb: FormBuilder,
    private nsbService: NsbService,
    private countryService: CountryService,
    private requestService: NsbRegistrationRequestService,
    private router: Router,
    private authService: AuthService,
  ) {
    this.form = this.fb.group({
      // Auto-populated from Stage 1.1 (read-only)
      countryId: [{ value: '', disabled: true }],
      countryName: [{ value: '', disabled: true }],
      name: [{ value: '', disabled: true }],
      shortName: [{ value: '', disabled: true }],

      // Official Address Details
      headquartersAddress: [''],
      mailingAddress: [''],
      gpsCoordinates: [''],
      regionalOffices: [''],

      // Organizational Structure
      totalStaff: [null, [Validators.min(0)]],
      keyDepartments: [''],
      websiteUrl: ['', [Validators.pattern(/^https?:\/\/.+/)]],
      socialMediaTwitter: [''],
      socialMediaLinkedIn: [''],
      socialMediaFacebook: [''],

      // National Legal Framework
      nationalStandardsActLink: [''],
      nationalConformityAssessmentPolicyLink: [''],
      nationalQualityPolicyLink: [''],

      // ACAP National Focal Points - using FormArray for multiple contacts
      acapCoordinators: this.fb.array([]),
      marketSurveillanceContacts: this.fb.array([]),
      customsTradeContacts: this.fb.array([]),
      consumerAffairsContacts: this.fb.array([]),
    });
  }
  
  // Helper methods for FormArrays
  get acapCoordinators(): FormArray {
    return this.form.get('acapCoordinators') as FormArray;
  }
  
  get marketSurveillanceContacts(): FormArray {
    return this.form.get('marketSurveillanceContacts') as FormArray;
  }
  
  get customsTradeContacts(): FormArray {
    return this.form.get('customsTradeContacts') as FormArray;
  }
  
  get consumerAffairsContacts(): FormArray {
    return this.form.get('consumerAffairsContacts') as FormArray;
  }
  
  createContactFormGroup(contact?: NsbContact): FormGroup {
    return this.fb.group({
      id: [contact?.id || ''],
      name: [contact?.name || '', Validators.required],
      email: [contact?.email || '', [Validators.required, Validators.email]],
      phone: [contact?.phone || ''],
      mobile: [contact?.mobile || ''],
      designation: [contact?.designation || ''],
    });
  }
  
  addContact(contactType: string): void {
    const formArrayMap: { [key: string]: FormArray } = {
      ACAP_COORDINATOR: this.acapCoordinators,
      MARKET_SURVEILLANCE_FOCAL_POINT: this.marketSurveillanceContacts,
      CUSTOMS_TRADE_FOCAL_POINT: this.customsTradeContacts,
      CONSUMER_AFFAIRS_FOCAL_POINT: this.consumerAffairsContacts,
    };
    
    const formArray = formArrayMap[contactType];
    formArray.push(this.createContactFormGroup());
  }
  
  removeContact(contactType: string, index: number): void {
    const formArrayMap: { [key: string]: FormArray } = {
      ACAP_COORDINATOR: this.acapCoordinators,
      MARKET_SURVEILLANCE_FOCAL_POINT: this.marketSurveillanceContacts,
      CUSTOMS_TRADE_FOCAL_POINT: this.customsTradeContacts,
      CONSUMER_AFFAIRS_FOCAL_POINT: this.consumerAffairsContacts,
    };
    
    const formArray = formArrayMap[contactType];
    formArray.removeAt(index);
  }
  
  onDocumentSelected(event: Event, documentType: NsbProfileDocumentType): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedDocuments[documentType] = file;
      
      // Upload immediately if NSB exists
      if (this.nsb?.id) {
        this.uploadDocument(documentType, file);
      } else {
        // Show error if NSB doesn't exist yet
        this.error = 'Please save the profile first before uploading documents.';
      }
    }
  }
  
  uploadDocument(documentType: NsbProfileDocumentType, file: File): void {
    if (!this.nsb?.id) return;
    
    this.nsbService.uploadDocument(this.nsb.id, file, documentType).subscribe({
      next: (document) => {
        this.loadDocuments();
        delete this.selectedDocuments[documentType];
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to upload document. Please try again.';
        delete this.selectedDocuments[documentType];
      },
    });
  }
  
  removeDocument(documentId: string, documentType: NsbProfileDocumentType, fileInput?: HTMLInputElement): void {
    if (!this.nsb?.id) return;
    
    this.nsbService.deleteDocument(this.nsb.id, documentId).subscribe({
      next: () => {
        this.loadDocuments();
        if (fileInput) {
          fileInput.value = '';
        }
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to delete document. Please try again.';
      },
    });
  }
  
  viewDocument(documentId: string): void {
    if (!this.nsb?.id) return;
    window.open(this.nsbService.viewDocument(this.nsb.id, documentId), '_blank');
  }
  
  loadDocuments(): void {
    if (!this.nsb?.id) return;
    
    this.nsbService.getDocuments(this.nsb.id).subscribe({
      next: (documents) => {
        this.uploadedDocuments = documents;
      },
      error: () => {
        // Error loading documents
      },
    });
  }
  
  getUploadedDocument(documentType: NsbProfileDocumentType): NsbDocument | undefined {
    return this.uploadedDocuments.find(d => d.documentType === documentType);
  }
  
  getSelectedFileName(documentType: NsbProfileDocumentType): string {
    return this.selectedDocuments[documentType]?.name || '';
  }
  
  getFormArray(formArrayName: string): FormArray {
    return this.form.get(formArrayName) as FormArray;
  }

  ngOnInit(): void {
    this.loadData();
    this.loadCountries();
  }

  loadData(): void {
    this.loading = true;
    const user = this.authService.currentUserValue;

    // Load registration request first
    if (user?.countryId) {
      this.requestService.getMyRequest(user.countryId).subscribe({
        next: (request) => {
          this.registrationRequest = request;
          if (request?.status === NsbRegistrationRequestStatus.APPROVED && request.nsbId) {
            this.loadNsb(request.nsbId);
          } else if (request?.status === NsbRegistrationRequestStatus.APPROVED) {
            // Request approved but NSB not found - this shouldn't happen
            this.error = 'NSB profile not found. Please contact ARSO Secretariat.';
            this.loading = false;
          } else {
            this.error = 'Your registration request has not been approved yet.';
            this.loading = false;
          }
        },
        error: () => {
          this.error = 'No approved registration request found.';
          this.loading = false;
        },
      });
    } else {
      // Try to load NSB directly
      this.nsbService.getMyNsb().subscribe({
        next: (nsb) => {
          this.nsb = nsb;
          this.loadNsbData(nsb);
          this.loading = false;
        },
        error: () => {
          this.error = 'NSB profile not found.';
          this.loading = false;
        },
      });
    }
  }

  loadNsb(nsbId: string): void {
    this.nsbService
      .getNsbById(nsbId)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: (nsb) => {
          this.nsb = nsb;
          this.loadNsbData(nsb);
        },
        error: () => {
          this.error = 'Failed to load NSB profile.';
        },
      });
  }

  loadNsbData(nsb: Nsb): void {
    // Load data from registration request if available
    if (this.registrationRequest) {
      this.form.patchValue({
        countryId: this.registrationRequest.countryId,
        countryName: this.registrationRequest.countryName,
        name: this.registrationRequest.nsbOfficialName,
        shortName: this.registrationRequest.nsbAcronym,
      });
    } else if (nsb) {
      this.form.patchValue({
        countryId: nsb.countryId,
        countryName: nsb.country?.name || '',
        name: nsb.name,
        shortName: nsb.shortName,
      });
    }

    // Load NSB profile fields
    if (nsb) {
      const headquarters = nsb.locations?.find((l) => l.locationType === 'HEADQUARTERS');
      const socialMedia = nsb.socialMediaHandles || {};

      this.form.patchValue({
        totalStaff: nsb.totalStaff,
        keyDepartments: nsb.keyDepartments?.join(', ') || '',
        websiteUrl: nsb.websiteUrl,
        socialMediaTwitter: socialMedia.twitter || '',
        socialMediaLinkedIn: socialMedia.linkedin || '',
        socialMediaFacebook: socialMedia.facebook || '',
        nationalStandardsActLink: nsb.nationalStandardsActLink || '',
        nationalConformityAssessmentPolicyLink: nsb.nationalConformityAssessmentPolicyLink || '',
        nationalQualityPolicyLink: nsb.nationalQualityPolicyLink,
      });

      if (headquarters) {
        this.form.patchValue({
          headquartersAddress: headquarters.addressLine1 || '',
          mailingAddress: headquarters.addressLine2 || '',
        });
      }
      
      // Load focal point contacts
      this.loadFocalPointContacts(nsb);
      
      // Load documents
      this.loadDocuments();
    }
  }
  
  loadFocalPointContacts(nsb: Nsb): void {
    if (!nsb.contacts) return;
    
    // Clear existing form arrays
    while (this.acapCoordinators.length) this.acapCoordinators.removeAt(0);
    while (this.marketSurveillanceContacts.length) this.marketSurveillanceContacts.removeAt(0);
    while (this.customsTradeContacts.length) this.customsTradeContacts.removeAt(0);
    while (this.consumerAffairsContacts.length) this.consumerAffairsContacts.removeAt(0);
    
    // Load contacts by type
    const acapContacts = nsb.contacts.filter(c => c.contactType === 'ACAP_COORDINATOR');
    const marketContacts = nsb.contacts.filter(c => c.contactType === 'MARKET_SURVEILLANCE_FOCAL_POINT');
    const customsContacts = nsb.contacts.filter(c => c.contactType === 'CUSTOMS_TRADE_FOCAL_POINT');
    const consumerContacts = nsb.contacts.filter(c => c.contactType === 'CONSUMER_AFFAIRS_FOCAL_POINT');
    
    // Populate form arrays
    acapContacts.forEach(contact => {
      this.acapCoordinators.push(this.createContactFormGroup(contact));
    });
    
    marketContacts.forEach(contact => {
      this.marketSurveillanceContacts.push(this.createContactFormGroup(contact));
    });
    
    customsContacts.forEach(contact => {
      this.customsTradeContacts.push(this.createContactFormGroup(contact));
    });
    
    consumerContacts.forEach(contact => {
      this.consumerAffairsContacts.push(this.createContactFormGroup(contact));
    });
    
    // If no contacts exist, add one empty contact for each type
    if (this.acapCoordinators.length === 0) {
      this.acapCoordinators.push(this.createContactFormGroup());
    }
    if (this.marketSurveillanceContacts.length === 0) {
      this.marketSurveillanceContacts.push(this.createContactFormGroup());
    }
    if (this.customsTradeContacts.length === 0) {
      this.customsTradeContacts.push(this.createContactFormGroup());
    }
    if (this.consumerAffairsContacts.length === 0) {
      this.consumerAffairsContacts.push(this.createContactFormGroup());
    }
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe({
      next: (data) => {
        this.countries = data;
      },
      error: () => {
        // Error loading countries
      },
    });
  }

  // Action for "Save Draft"
  saveDraft(): void {
    this.executeSave(true);
  }

  // Action for "Save & Submit" (Final Save)
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error = 'Please fill in all required fields before completing the profile.';
      return;
    }

    this.executeSave(false);
  }

  executeSave(isDraft: boolean): void {
    this.saving = true;
    this.error = '';
    this.success = false;

    const formValue = this.form.getRawValue();
    const keyDepartments = formValue.keyDepartments
      ? formValue.keyDepartments.split(',').map((d: string) => d.trim()).filter((d: string) => d)
      : [];

    const socialMediaHandles: Record<string, string> = {};
    if (formValue.socialMediaTwitter) socialMediaHandles.twitter = formValue.socialMediaTwitter;
    if (formValue.socialMediaLinkedIn) socialMediaHandles.linkedin = formValue.socialMediaLinkedIn;
    if (formValue.socialMediaFacebook) socialMediaHandles.facebook = formValue.socialMediaFacebook;

    // Build contacts array from form arrays
    const contacts: Partial<NsbContact>[] = [];
    
    // Helper to collect contacts
    const collectContacts = (source: any[], type: string) => {
      source.forEach((contact: any) => {
        // For draft, we might save even incomplete contacts if they have at least a name
        // For final, validation ensures required fields
        if (contact.name) { 
          contacts.push({
            id: contact.id || undefined,
            contactType: type as any,
            name: contact.name,
            email: contact.email,
            phone: contact.phone || undefined,
            mobile: contact.mobile || undefined,
            designation: contact.designation || undefined,
          });
        }
      });
    };
    
    collectContacts(formValue.acapCoordinators, 'ACAP_COORDINATOR');
    collectContacts(formValue.marketSurveillanceContacts, 'MARKET_SURVEILLANCE_FOCAL_POINT');
    collectContacts(formValue.customsTradeContacts, 'CUSTOMS_TRADE_FOCAL_POINT');
    collectContacts(formValue.consumerAffairsContacts, 'CONSUMER_AFFAIRS_FOCAL_POINT');

    const dto: any = {
      websiteUrl: formValue.websiteUrl,
      socialMediaHandles: Object.keys(socialMediaHandles).length > 0 ? socialMediaHandles : undefined,
      totalStaff: formValue.totalStaff ? parseInt(formValue.totalStaff, 10) : undefined,
      keyDepartments: keyDepartments.length > 0 ? keyDepartments : undefined,
      nationalStandardsActLink: formValue.nationalStandardsActLink,
      nationalConformityAssessmentPolicyLink: formValue.nationalConformityAssessmentPolicyLink,
      nationalQualityPolicyLink: formValue.nationalQualityPolicyLink,
      contacts: contacts.length > 0 ? contacts : undefined,
    };

    if (!this.nsb?.id) {
      this.error = 'NSB profile not found. Please contact ARSO Secretariat.';
      this.saving = false;
      return;
    }

    this.nsbService
      .updateNsb(this.nsb.id, dto)
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
      )
      .subscribe({
        next: (nsb) => {
          this.nsb = nsb;
          this.success = true;
          this.successMessage = isDraft 
            ? 'Draft saved successfully.' 
            : 'Profile saved and updated successfully.';
          this.loadDocuments();
          
          // Upload any pending documents after profile is saved
          Object.keys(this.selectedDocuments).forEach((docType) => {
            const file = this.selectedDocuments[docType as NsbProfileDocumentType];
            if (file && this.nsb?.id) {
              this.uploadDocument(docType as NsbProfileDocumentType, file);
            }
          });
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to save profile. Please try again.';
        },
      });
  }

  goToDashboard(): void {
    this.router.navigate(['/nsb/dashboard']);
  }
}

