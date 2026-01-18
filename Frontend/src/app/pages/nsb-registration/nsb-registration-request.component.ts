import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { NsbRegistrationRequestService } from '../../modules/nsb-management/services/nsb-registration-request.service';
import { CountryService } from '../../modules/nsb-management/services/country.service';
import { NsbService } from '../../modules/nsb-management/services/nsb.service';
import { Country } from '../../shared/models/reference-data.model';
import { Nsb } from '../../shared/models/nsb.model';
import {
  NsbRegistrationRequest,
  NsbRegistrationRequestStatus,
  NsbDocumentType,
} from '../../shared/models/nsb-registration-request.model';
import { AuthService } from '../../modules/auth/services/auth.service';
import { UserRole } from '../../shared/models/user.model';
import { environment } from '../../../environments/environment';

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
  activeTab: 'form' | 'list' | 'drafts' = 'form';
  registeredNsbs: any[] = [];
  loadingNsbs = false;
  formMode: 'view' | 'edit' = 'edit';
  draftRequests: NsbRegistrationRequest[] = [];
  loadingDrafts = false;
  customSectorInput = '';
  customMandateInput = '';
  activeStep = 0;
  steps = [
    { label: 'Country & Legal' },
    { label: 'Contacts & Governance' },
    { label: 'Addresses & Locations' },
    { label: 'Sectors & Mandate' },
    { label: 'Documents & Roles' },
    { label: 'Review & Submit' },
  ];
  documentTypes = [
    { value: NsbDocumentType.NSB_ESTABLISHMENT_CHARTER, label: 'NSB Establishment Charter/Act' },
    { value: NsbDocumentType.ARSO_MEMBERSHIP_CERTIFICATE, label: 'ARSO Membership Certificate' },
    { value: NsbDocumentType.GOVERNMENT_GAZETTE_NOTICE, label: 'Government Gazette Notice' },
    { value: NsbDocumentType.DECLARATION_OF_AUTHORITY, label: 'Declaration of Authority' },
    { value: NsbDocumentType.NATIONAL_STANDARDS_ACT, label: 'National Standards Act' },
    { value: NsbDocumentType.NATIONAL_CONFORMITY_ASSESSMENT_POLICY, label: 'National Conformity Assessment Policy' },
    { value: NsbDocumentType.ORGANIZATIONAL_CHART, label: 'Organizational Chart' },
    { value: NsbDocumentType.OTHER, label: 'Other Supporting Document' },
  ];
  selectedFiles: { [key: string]: File | null } = {};
  selectedSectors: string[] = [];
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
    private nsbService: NsbService,
    public router: Router,
    private authService: AuthService,
  ) {
    this.form = this.fb.group({
      countryId: ['', [Validators.required]],
      countryName: [{ value: '', disabled: true }, [Validators.required]],
      nsbOfficialName: ['', [Validators.required, Validators.maxLength(255)]],
      nsbAcronym: ['', [Validators.maxLength(50)]],
      isoCode: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      legalStatus: [''],
      establishmentActName: [''],
      establishmentActNumber: [''],
      establishmentActDate: [''],
      registrationNumber: [''],
      registrationAuthority: [''],
      taxIdentificationNumber: [''],
      vatNumber: [''],
      yearEstablished: [null],
      website: [''],
      contactPersonName: ['', [Validators.required, Validators.maxLength(255)]],
      contactPersonTitle: ['', [Validators.maxLength(255)]],
      contactEmail: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      contactPhone: ['', [Validators.maxLength(50)]],
      contactMobile: ['', [Validators.maxLength(50)]],
      directorGeneralName: [''],
      directorGeneralTitle: [''],
      directorGeneralEmail: [''],
      directorGeneralPhone: [''],
      boardChairName: [''],
      boardChairEmail: [''],
      boardChairPhone: [''],
      headquartersAddress: this.createAddressGroup(),
      postalAddress: this.createAddressGroup(),
      additionalAddresses: this.fb.array([]),
      additionalContacts: this.fb.array([]),
      keyOfficials: this.fb.array([]),
      internationalMemberships: this.fb.array([]),
      mandateAreas: this.fb.array([]),
      additionalUserSlotsRequested: [0, [Validators.min(0)]],
      requestedRoles: [[]],
      sectors: [[]],
    });
  }

  ngOnInit(): void {
    this.resetFormState();
    this.loadCountries();
    this.setupCountryWatcher();
    this.loadRegisteredNsbs();
  }

  onTabChange(tab: 'form' | 'list' | 'drafts'): void {
    this.activeTab = tab;
    if (tab === 'form') {
      this.resetFormState();
      this.activeStep = 0;
    }
    if (tab === 'drafts') {
      this.loadDraftRequests();
    }
  }

  goToStep(index: number): void {
    if (index >= 0 && index < this.steps.length) {
      this.activeStep = index;
    }
  }

  nextStep(): void {
    if (this.activeStep < this.steps.length - 1) {
      this.activeStep += 1;
    }
  }

  previousStep(): void {
    if (this.activeStep > 0) {
      this.activeStep -= 1;
    }
  }

  loadRegisteredNsbs(): void {
    this.loadingNsbs = true;
    // Show all submitted requests (any non-draft status)
    this.requestService.list({ limit: 1000 }).subscribe({
      next: (response) => {
        this.registeredNsbs = (response.data || [])
          .filter((req) => req.status !== NsbRegistrationRequestStatus.DRAFT)
          .map((req) => ({
            requestId: req.id,
            name: req.nsbOfficialName,
            countryName: req.countryName || req.country?.name || 'N/A',
            status: req.status,
            approvalStatus: req.status,
            request: req,
          }));
        this.loadingNsbs = false;
      },
      error: (err) => {
        if (err.status !== 403 && err.status !== 404) {
          console.warn('Failed to load submitted NSB requests:', err);
        }
        this.registeredNsbs = [];
        this.loadingNsbs = false;
      },
    });
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
      legalStatus: request.legalStatus,
      establishmentActName: request.establishmentActName,
      establishmentActNumber: request.establishmentActNumber,
      establishmentActDate: request.establishmentActDate,
      registrationNumber: request.registrationNumber,
      registrationAuthority: request.registrationAuthority,
      taxIdentificationNumber: request.taxIdentificationNumber,
      vatNumber: request.vatNumber,
      yearEstablished: request.yearEstablished,
      website: request.website,
      contactPersonName: request.contactPersonName,
      contactPersonTitle: request.contactPersonTitle,
      contactEmail: request.contactEmail,
      contactPhone: request.contactPhone,
      contactMobile: request.contactMobile,
      directorGeneralName: request.directorGeneralName,
      directorGeneralTitle: request.directorGeneralTitle,
      directorGeneralEmail: request.directorGeneralEmail,
      directorGeneralPhone: request.directorGeneralPhone,
      boardChairName: request.boardChairName,
      boardChairEmail: request.boardChairEmail,
      boardChairPhone: request.boardChairPhone,
      headquartersAddress: request.headquartersAddress || {},
      postalAddress: request.postalAddress || {},
      additionalUserSlotsRequested: request.additionalUserSlotsRequested || 0,
      requestedRoles: request.requestedRoles || [],
      sectors: request.sectors || [],
    });
    this.selectedSectors = request.sectors || [];
    this.setFormArray(this.additionalAddressesArray, request.additionalAddresses, (value) => this.createAddressGroup(value));
    this.setFormArray(this.additionalContactsArray, request.additionalContacts, (value) => this.createContactGroup(value));
    this.setFormArray(this.keyOfficialsArray, request.keyOfficials, (value) => this.createOfficialGroup(value));
    this.setFormArray(this.internationalMembershipsArray, request.internationalMemberships, (value) => this.createMembershipGroup(value));
    this.setFormArray(this.mandateAreasArray, request.mandateAreas, (value) => new FormControl(value || ''));
  }

  onFileSelected(event: Event, documentType: NsbDocumentType): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      
      // Validate file size (10MB max)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file.size > maxSize) {
        this.error = `File size exceeds 10MB limit. Please select a smaller file.`;
        input.value = ''; // Clear the input
        return;
      }

      // Validate file type
      const allowedTypes = ['.pdf', '.doc', '.docx'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!allowedTypes.includes(fileExtension)) {
        this.error = `Invalid file type. Please upload PDF, DOC, or DOCX files only.`;
        input.value = ''; // Clear the input
        return;
      }

      this.selectedFiles[documentType] = file;
      this.error = ''; // Clear any previous errors

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
        // Clear the selected file since it's now uploaded
        delete this.selectedFiles[documentType];
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to upload file. Please try again.';
        // Don't delete selectedFiles here - user might want to retry
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

    const dto = this.buildRequestDto();
    this.debugLog('Saving NSB request draft payload', dto);

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
          this.debugLog('Draft save response', request);
          this.existingRequest = request;
          this.success = true;
          // Reload request to get updated documents
          this.loadRequest();
        },
        error: (err) => {
          this.debugLog('Draft save error', err);
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
      this.saving = true;
      this.error = '';
      const dto = this.buildRequestDto();
      this.debugLog('Submitting new NSB request payload', dto);

      this.requestService
        .create(dto)
        .pipe(
          finalize(() => {
            this.saving = false;
          }),
        )
        .subscribe({
          next: (request) => {
            this.debugLog('Submit save response', request);
            this.existingRequest = request;
            // Upload any selected files that haven't been uploaded yet
            this.uploadPendingFiles().then(() => {
              // Reload request to get updated documents, then check and submit
              this.loadRequest();
              setTimeout(() => {
                this.checkAndSubmitDocuments();
              }, 500);
            });
          },
          error: (err) => {
            this.debugLog('Submit save error', err);
            this.error = err.error?.message || 'Failed to save registration request. Please try again.';
          },
        });
      return;
    }

    // Update the existing draft with current form values before submitting
    this.saving = true;
    this.error = '';
    const dto = this.buildRequestDto();
    this.debugLog('Updating draft before submit payload', dto);
    this.requestService
      .update(this.existingRequest.id, dto)
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
      )
      .subscribe({
        next: (request) => {
          this.debugLog('Update before submit response', request);
          this.existingRequest = request;
          // Upload any pending files first
          this.uploadPendingFiles().then(() => {
            // Reload request to get updated documents, then check and submit
            this.loadRequest();
            setTimeout(() => {
              this.checkAndSubmitDocuments();
            }, 500);
          });
        },
        error: (err) => {
          this.debugLog('Update before submit error', err);
          this.error = err.error?.message || 'Failed to save registration request. Please try again.';
        },
      });
  }

  uploadPendingFiles(): Promise<void> {
    const uploadPromises: Promise<void>[] = [];
    const requiredDocs = [
      NsbDocumentType.NSB_ESTABLISHMENT_CHARTER,
      NsbDocumentType.ARSO_MEMBERSHIP_CERTIFICATE,
      NsbDocumentType.GOVERNMENT_GAZETTE_NOTICE,
      NsbDocumentType.DECLARATION_OF_AUTHORITY,
    ];

    // Upload any selected files that haven't been uploaded yet
    requiredDocs.forEach((docType) => {
      const file = this.selectedFiles[docType];
      if (file && this.existingRequest?.id) {
        // Check if this document type is already uploaded
        const isAlreadyUploaded = this.existingRequest.documents?.some((d) => d.documentType === docType);
        if (!isAlreadyUploaded) {
          const uploadPromise = new Promise<void>((resolve, reject) => {
            this.uploadFile(docType, file);
            // Wait a bit for upload to complete
            setTimeout(() => {
              resolve();
            }, 1000);
          });
          uploadPromises.push(uploadPromise);
        }
      }
    });

    return Promise.all(uploadPromises).then(() => {
      // All uploads initiated, wait a bit more for them to complete
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1500);
      });
    });
  }

  checkAndSubmitDocuments(): void {
    // Check if required documents are uploaded
    const requiredDocs = [
      NsbDocumentType.NSB_ESTABLISHMENT_CHARTER,
      NsbDocumentType.ARSO_MEMBERSHIP_CERTIFICATE,
      NsbDocumentType.GOVERNMENT_GAZETTE_NOTICE,
      NsbDocumentType.DECLARATION_OF_AUTHORITY,
    ];
    
    // Reload request to ensure we have the latest documents
    if (!this.existingRequest?.id) {
      this.error = 'Please save the request first before submitting.';
      return;
    }

    // Get fresh request data
    this.requestService.get(this.existingRequest.id).subscribe({
      next: (request) => {
        this.existingRequest = request;
        const uploadedDocTypes = request.documents?.map((d) => d.documentType) || [];
        const missingDocs = requiredDocs.filter((doc) => !uploadedDocTypes.includes(doc));

        if (missingDocs.length > 0) {
          const missingLabels = missingDocs.map((doc) => {
            const docType = this.documentTypes.find((d) => d.value === doc);
            return docType?.label || doc;
          });
          this.error = `Please upload all required documents before submitting. Missing: ${missingLabels.join(', ')}`;
          return;
        }

        // All documents uploaded, proceed with submission
        this.saving = true;
        this.requestService
          .submit(this.existingRequest.id)
          .pipe(
            finalize(() => {
              this.saving = false;
            }),
          )
          .subscribe({
            next: (submittedRequest) => {
              this.existingRequest = submittedRequest;
              this.success = true;
              this.error = '';
            },
            error: (err) => {
              this.error = err.error?.message || 'Failed to submit request. Please try again.';
            },
          });
      },
      error: () => {
        this.error = 'Failed to load request. Please try again.';
      },
    });
  }

  private buildRequestDto(): any {
    const formValue = this.form.getRawValue();
    // Exclude documents from DTO - they are uploaded separately via file upload endpoint
    const {
      documents,
      additionalAddresses: _additionalAddresses,
      additionalContacts: _additionalContacts,
      keyOfficials: _keyOfficials,
      internationalMemberships: _internationalMemberships,
      mandateAreas: _mandateAreas,
      sectors: _sectors,
      ...formDataWithoutDocuments
    } = formValue as any;

    const additionalAddresses = this.serializeFormArray(this.additionalAddressesArray, [
      'addressLine1',
      'addressLine2',
      'city',
      'stateProvince',
      'postalCode',
      'country',
      'type',
    ]);
    const additionalContacts = this.serializeFormArray(this.additionalContactsArray, [
      'name',
      'title',
      'email',
      'phone',
      'mobile',
      'contactType',
    ]);
    const keyOfficials = this.serializeFormArray(this.keyOfficialsArray, [
      'name',
      'designation',
      'email',
      'phone',
    ]);
    const internationalMemberships = this.serializeFormArray(this.internationalMembershipsArray, [
      'organization',
      'membershipStatus',
      'yearJoined',
    ]);

    return {
      ...formDataWithoutDocuments,
      additionalAddresses,
      additionalContacts,
      keyOfficials,
      internationalMemberships,
      mandateAreas: this.mandateAreasArray.getRawValue(),
      sectors: this.selectedSectors,
    };
  }

  saveAdditionalContacts(): void {
    this.saveSection({
      additionalContacts: this.serializeFormArray(this.additionalContactsArray, [
        'name',
        'title',
        'email',
        'phone',
        'mobile',
        'contactType',
      ]),
    }, 'additionalContacts');
  }

  saveKeyOfficials(): void {
    this.saveSection({
      keyOfficials: this.serializeFormArray(this.keyOfficialsArray, [
        'name',
        'designation',
        'email',
        'phone',
      ]),
    }, 'keyOfficials');
  }

  saveAdditionalLocations(): void {
    this.saveSection({
      additionalAddresses: this.serializeFormArray(this.additionalAddressesArray, [
        'addressLine1',
        'addressLine2',
        'city',
        'stateProvince',
        'postalCode',
        'country',
        'type',
      ]),
    }, 'additionalAddresses');
  }

  saveInternationalMemberships(): void {
    this.saveSection({
      internationalMemberships: this.serializeFormArray(this.internationalMembershipsArray, [
        'organization',
        'membershipStatus',
        'yearJoined',
      ]),
    }, 'internationalMemberships');
  }

  private saveSection(payload: Record<string, any>, sectionName: string): void {
    if (!this.existingRequest?.id) {
      this.onSubmit();
      return;
    }

    this.saving = true;
    this.error = '';
    this.debugLog(`Saving section: ${sectionName}`, payload);

    this.requestService
      .update(this.existingRequest.id, payload)
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
      )
      .subscribe({
        next: (request) => {
          this.debugLog(`Section save response: ${sectionName}`, request);
          this.existingRequest = request;
          this.success = true;
          this.loadRequest();
        },
        error: (err) => {
          this.debugLog(`Section save error: ${sectionName}`, err);
          this.error = err.error?.message || 'Failed to save section. Please try again.';
        },
      });
  }

  private serializeFormArray(array: FormArray, allowedKeys: string[]): Record<string, any>[] {
    return array.controls.map((control) => {
      const value = control.getRawValue?.() ?? control.value ?? {};
      const normalized: Record<string, any> = {};
      allowedKeys.forEach((key) => {
        normalized[key] = value?.[key] ?? '';
      });
      return normalized;
    });
  }

  private debugLog(message: string, payload?: any): void {
    if (!environment.production) {
      console.log(`[NSB Registration] ${message}`, payload ?? '');
    }
  }

  get additionalAddressesArray(): FormArray {
    return this.form.get('additionalAddresses') as FormArray;
  }

  get additionalContactsArray(): FormArray {
    return this.form.get('additionalContacts') as FormArray;
  }

  get keyOfficialsArray(): FormArray {
    return this.form.get('keyOfficials') as FormArray;
  }

  get internationalMembershipsArray(): FormArray {
    return this.form.get('internationalMemberships') as FormArray;
  }

  get mandateAreasArray(): FormArray {
    return this.form.get('mandateAreas') as FormArray;
  }

  addAdditionalAddress(value?: any): void {
    this.additionalAddressesArray.push(this.createAddressGroup(value));
  }

  removeAdditionalAddress(index: number): void {
    this.additionalAddressesArray.removeAt(index);
  }

  addAdditionalContact(value?: any): void {
    this.additionalContactsArray.push(this.createContactGroup(value));
  }

  removeAdditionalContact(index: number): void {
    this.additionalContactsArray.removeAt(index);
  }

  addKeyOfficial(value?: any): void {
    this.keyOfficialsArray.push(this.createOfficialGroup(value));
  }

  removeKeyOfficial(index: number): void {
    this.keyOfficialsArray.removeAt(index);
  }

  addInternationalMembership(value?: any): void {
    this.internationalMembershipsArray.push(this.createMembershipGroup(value));
  }

  removeInternationalMembership(index: number): void {
    this.internationalMembershipsArray.removeAt(index);
  }

  addMandateArea(value?: string): void {
    this.mandateAreasArray.push(new FormControl(value || ''));
  }

  removeMandateArea(index: number): void {
    this.mandateAreasArray.removeAt(index);
  }

  onMandateInputKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addMandateAreaFromInput();
    }
  }

  addMandateAreaFromInput(): void {
    const value = this.customMandateInput.trim();
    if (value) {
      this.addMandateArea(value);
      this.customMandateInput = '';
    }
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

  addCustomSector(): void {
    const sector = this.customSectorInput.trim();
    if (sector && !this.selectedSectors.includes(sector)) {
      this.selectedSectors.push(sector);
      this.form.patchValue({ sectors: this.selectedSectors });
      this.customSectorInput = '';
    }
  }

  removeSector(sector: string): void {
    const index = this.selectedSectors.indexOf(sector);
    if (index > -1) {
      this.selectedSectors.splice(index, 1);
      this.form.patchValue({ sectors: this.selectedSectors });
    }
  }

  onSectorInputKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addCustomSector();
    }
  }

  loadDraftRequests(): void {
    this.loadingDrafts = true;
    this.draftRequests = [];
    const user = this.authService.currentUserValue;
    const userRoles = user?.roles || (user?.role ? [user.role] : []);
    const isSuperAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.ARSO_SECRETARIAT);

    if (isSuperAdmin) {
      // Super admins can see all draft requests
      this.requestService.list({ status: NsbRegistrationRequestStatus.DRAFT, limit: 1000 }).subscribe({
        next: (response) => {
          this.draftRequests = (response.data || []).filter(req => req.status === NsbRegistrationRequestStatus.DRAFT);
          this.loadingDrafts = false;
        },
        error: (err) => {
          console.error('Failed to load draft requests:', err);
          this.draftRequests = [];
          this.loadingDrafts = false;
        },
      });
    } else {
      // Regular users should use getMyRequest directly (they don't have permission to list)
      const countryId = user?.countryId || this.existingRequest?.countryId || this.form.get('countryId')?.value;
      if (countryId) {
        this.requestService.getMyRequest(countryId).subscribe({
          next: (request) => {
            this.draftRequests = request && request.status === NsbRegistrationRequestStatus.DRAFT ? [request] : [];
            this.loadingDrafts = false;
          },
          error: (err) => {
            // 404 is expected if no request exists - not an error
            if (err.status === 404) {
              this.draftRequests = [];
            } else {
              console.error('Failed to load draft request:', err);
              if (this.existingRequest?.status === NsbRegistrationRequestStatus.DRAFT) {
                this.draftRequests = [this.existingRequest];
              }
            }
            this.loadingDrafts = false;
          },
        });
      } else {
        if (this.existingRequest?.status === NsbRegistrationRequestStatus.DRAFT) {
          this.draftRequests = [this.existingRequest];
        }
        this.loadingDrafts = false;
      }
    }
  }

  loadDraftRequest(request: NsbRegistrationRequest): void {
    this.existingRequest = request;
    this.loadRequestData(request);
    this.setFormMode('edit');
    this.activeTab = 'form';
  }

  deleteDraftRequest(request: NsbRegistrationRequest): void {
    if (!request.id) {
      this.error = 'Cannot delete request: ID is missing.';
      return;
    }

    if (confirm(`Are you sure you want to delete the draft request for "${request.nsbOfficialName}"? This action cannot be undone.`)) {
      this.loadingDrafts = true;
      this.requestService.delete(request.id).subscribe({
        next: () => {
          // Remove from list
          this.draftRequests = this.draftRequests.filter(r => r.id !== request.id);
          this.loadingDrafts = false;
          // If this was the current request, clear it
          if (this.existingRequest?.id === request.id) {
            this.existingRequest = null;
            this.form.reset();
            this.selectedSectors = [];
            this.selectedFiles = {};
          }
        },
        error: (err) => {
          console.error('Failed to delete draft request:', err);
          this.error = err.error?.message || 'Failed to delete draft request. Please try again.';
          this.loadingDrafts = false;
        },
      });
    }
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

  getApprovalStatus(nsb: any): string {
    // Check if NSB has an associated registration request
    // This is a simplified version - in reality, you'd check the request status
    if (nsb.status === 'ACTIVE') {
      return 'APPROVED';
    } else if (nsb.status === 'SUSPENDED') {
      return 'SUSPENDED';
    } else if (nsb.status === 'PENDING') {
      return 'PENDING_APPROVAL';
    }
    return 'UNKNOWN';
  }

  editNsb(nsbId: string): void {
    // Navigate to NSB edit page or open edit modal
    this.router.navigate(['/portal/nsb/dashboard'], { queryParams: { edit: nsbId } });
  }

  viewNsb(nsbId: string): void {
    // Navigate to NSB view page
    this.router.navigate(['/portal/nsb/dashboard'], { queryParams: { view: nsbId } });
  }

  deleteNsb(nsbId: string): void {
    if (confirm('Are you sure you want to delete this NSB? This action cannot be undone.')) {
      // TODO: Implement delete API call
      alert(`Delete functionality for NSBs will be implemented soon.`);
    }
  }

  suspendNsb(nsbId: string): void {
    if (confirm('Are you sure you want to suspend this NSB?')) {
      // TODO: Implement suspend API call
      alert(`Suspend functionality for NSBs will be implemented soon.`);
    }
  }

  viewRequest(requestId: string): void {
    this.loadRequestForAction(requestId, 'view');
  }

  editRequest(requestId: string): void {
    this.loadRequestForAction(requestId, 'edit');
  }

  suspendRequest(requestId: string): void {
    if (!confirm('Are you sure you want to suspend this registration request?')) {
      return;
    }
    this.requestService
      .updateStatus(requestId, NsbRegistrationRequestStatus.REJECTED, 'Suspended by admin')
      .subscribe({
        next: () => {
          this.loadRegisteredNsbs();
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to suspend registration request.';
        },
      });
  }

  deleteRequest(requestId: string): void {
    if (!confirm('Are you sure you want to delete this registration request? This action cannot be undone.')) {
      return;
    }
    this.requestService.delete(requestId).subscribe({
      next: () => {
        this.loadRegisteredNsbs();
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to delete registration request.';
      },
    });
  }

  private loadRequestForAction(requestId: string, mode: 'view' | 'edit'): void {
    this.requestService.get(requestId).subscribe({
      next: (request) => {
        this.existingRequest = request;
        this.loadRequestData(request);
        this.setFormMode(mode);
        this.activeTab = 'form';
        this.activeStep = 0;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to load registration request.';
      },
    });
  }

  private setFormMode(mode: 'view' | 'edit'): void {
    this.formMode = mode;
    if (mode === 'view') {
      this.form.disable({ emitEvent: false });
    } else {
      this.form.enable({ emitEvent: false });
    }
    // Keep derived fields read-only
    this.form.get('countryName')?.disable({ emitEvent: false });
  }

  viewNotifications(nsbId: string): void {
    this.router.navigate(['/portal/nsb/communication'], { queryParams: { nsbId } });
  }

  private createAddressGroup(value?: any): FormGroup {
    return this.fb.group({
      addressLine1: [value?.addressLine1 || ''],
      addressLine2: [value?.addressLine2 || ''],
      city: [value?.city || ''],
      stateProvince: [value?.stateProvince || ''],
      postalCode: [value?.postalCode || ''],
      country: [value?.country || ''],
      type: [value?.type || value?.addressType || ''],
    });
  }

  private createContactGroup(value?: any): FormGroup {
    return this.fb.group({
      name: [value?.name || ''],
      title: [value?.title || ''],
      email: [value?.email || ''],
      phone: [value?.phone || ''],
      mobile: [value?.mobile || ''],
      contactType: [value?.contactType || ''],
    });
  }

  private createOfficialGroup(value?: any): FormGroup {
    return this.fb.group({
      name: [value?.name || ''],
      designation: [value?.designation || value?.title || value?.department || ''],
      email: [value?.email || ''],
      phone: [value?.phone || ''],
    });
  }

  private createMembershipGroup(value?: any): FormGroup {
    return this.fb.group({
      organization: [value?.organization || ''],
      membershipStatus: [value?.membershipStatus || value?.status || ''],
      yearJoined: [value?.yearJoined || value?.memberSince || ''],
    });
  }

  private setFormArray(array: FormArray, values: any[] | undefined, createFn: (value?: any) => any): void {
    array.clear();
    (values || []).forEach((value) => array.push(createFn(value)));
  }

  private resetFormState(): void {
    this.existingRequest = null;
    this.setFormMode('edit');
    this.success = false;
    this.error = '';
    this.selectedFiles = {};
    this.selectedSectors = [];
    this.customSectorInput = '';
    this.customMandateInput = '';
    this.activeStep = 0;
    this.form.reset({
      countryId: '',
      countryName: '',
      nsbOfficialName: '',
      nsbAcronym: '',
      isoCode: '',
      legalStatus: '',
      establishmentActName: '',
      establishmentActNumber: '',
      establishmentActDate: '',
      registrationNumber: '',
      registrationAuthority: '',
      taxIdentificationNumber: '',
      vatNumber: '',
      yearEstablished: null,
      website: '',
      contactPersonName: '',
      contactPersonTitle: '',
      contactEmail: '',
      contactPhone: '',
      contactMobile: '',
      directorGeneralName: '',
      directorGeneralTitle: '',
      directorGeneralEmail: '',
      directorGeneralPhone: '',
      boardChairName: '',
      boardChairEmail: '',
      boardChairPhone: '',
      headquartersAddress: {},
      postalAddress: {},
      additionalUserSlotsRequested: 0,
      requestedRoles: [],
      sectors: [],
    });
    this.additionalAddressesArray.clear();
    this.additionalContactsArray.clear();
    this.keyOfficialsArray.clear();
    this.internationalMembershipsArray.clear();
    this.mandateAreasArray.clear();
  }
}

