import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { OperatorService } from '../../modules/operator/services/operator.service';
import { CountryService } from '../../modules/nsb-management/services/country.service';
import {
  Operator,
  OperatorType,
  LegalStructure,
  EmployeeCountRange,
  AnnualTurnoverRange,
  OwnershipType,
  OwnershipStatus,
  OperatorStatus,
  CreateOperatorRegistrationRequest,
} from '../../shared/models/operator.model';
import { Country } from '../../shared/models/reference-data.model';

@Component({
  selector: 'app-operator-registration',
  templateUrl: './operator-registration.component.html',
  styleUrls: ['./operator-registration.component.scss'],
})
export class OperatorRegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  currentStep = 1;
  totalSteps = 4;
  loading = false;
  saving = false;
  error = '';
  success = false;
  draftSaveSuccess = false;
  countries: Country[] = [];
  existingOperator: Operator | null = null;

  // Options for dropdowns
  operatorTypes = Object.values(OperatorType).map((value) => ({
    value,
    label: value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  legalStructures = Object.values(LegalStructure).map((value) => ({
    value,
    label: value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  employeeCountRanges = [
    { value: EmployeeCountRange.MICRO_1_9, label: 'Micro (1-9 employees)' },
    { value: EmployeeCountRange.SMALL_10_49, label: 'Small (10-49 employees)' },
    { value: EmployeeCountRange.MEDIUM_50_249, label: 'Medium (50-249 employees)' },
    { value: EmployeeCountRange.LARGE_250_PLUS, label: 'Large (250+ employees)' },
  ];

  annualTurnoverRanges = [
    { value: AnnualTurnoverRange.UNDER_50K, label: '< $50K' },
    { value: AnnualTurnoverRange['50K_100K'], label: '$50K - $100K' },
    { value: AnnualTurnoverRange['100K_500K'], label: '$100K - $500K' },
    { value: AnnualTurnoverRange['500K_1M'], label: '$500K - $1M' },
    { value: AnnualTurnoverRange['1M_5M'], label: '$1M - $5M' },
    { value: AnnualTurnoverRange['5M_10M'], label: '$5M - $10M' },
    { value: AnnualTurnoverRange.OVER_10M, label: '> $10M' },
  ];

  ownershipTypes = Object.values(OwnershipType).map((value) => ({
    value,
    label: value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  ownershipStatuses = Object.values(OwnershipStatus).map((value) => ({
    value,
    label: value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  mainBusinessSectors = [
    'AGRICULTURE',
    'MANUFACTURING',
    'SERVICES',
    'CONSTRUCTION',
    'MINING',
    'RETAIL',
    'WHOLESALE',
    'TRANSPORT',
    'ENERGY',
    'TELECOMMUNICATIONS',
    'OTHER',
  ];

  domesticMarketTypes = ['NATIONAL', 'REGIONAL', 'LOCAL'];

  afcftaAwarenessLevels = ['HIGH', 'MEDIUM', 'LOW', 'NONE'];

  qualityManagementOptions = ['YES', 'NO', 'IN_PROGRESS'];

  qmsTypes = ['ISO_9001', 'HACCP', 'GMP', 'INTERNAL_SYSTEM', 'NONE', 'IN_PROGRESS'];

  preferredLanguages = ['ENGLISH', 'FRENCH', 'PORTUGUESE', 'ARABIC', 'SWAHILI', 'OTHER'];

  communicationPreferences = ['EMAIL', 'SMS', 'PHONE', 'WHATSAPP', 'POSTAL_MAIL', 'IN_PERSON'];

  notificationFrequencies = ['REAL_TIME', 'DAILY_DIGEST', 'WEEKLY_SUMMARY', 'MONTHLY_SUMMARY'];

  digitalLiteracyLevels = ['BASIC', 'INTERMEDIATE', 'ADVANCED'];

  internetAccessTypes = ['HIGH_SPEED', 'MOBILE_DATA', 'LIMITED', 'INTERMITTENT'];

  deviceTypes = ['DESKTOP', 'LAPTOP', 'SMARTPHONE', 'TABLET', 'FEATURE_PHONE'];

  constructor(
    private fb: FormBuilder,
    private operatorService: OperatorService,
    private countryService: CountryService,
    private router: Router,
  ) {
    this.registrationForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadCountries();
    this.checkExistingOperator();
    this.setupAutoCalculations();
  }

  createForm(): FormGroup {
    return this.fb.group({
      // Section A: Company Info
      companyInfo: this.fb.group({
        operatorType: ['', Validators.required],
        companyLegalName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
        tradingName: ['', Validators.maxLength(150)],
        registrationNumberBusiness: ['', [Validators.required, Validators.maxLength(50)]],
        taxId: ['', Validators.maxLength(30)],
        vatNumber: ['', Validators.maxLength(30)],
        yearEstablished: [
          new Date().getFullYear(),
          [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())],
        ],
        legalStructure: ['', Validators.required],
        businessActivity: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      }),

      // Section A: Company Size
      companySize: this.fb.group({
        employeeCount: ['', Validators.required],
        annualTurnover: ['', Validators.required],
        annualRevenue: [null, Validators.min(0)],
        exportPercentage: [null, [Validators.min(0), Validators.max(100)]],
        importPercentage: [null, [Validators.min(0), Validators.max(100)]],
        capitalInvestment: [null, Validators.min(0)],
      }),

      // Section A: Ownership
      ownershipInfo: this.fb.group({
        ownershipType: ['', Validators.required],
        majorityOwnerNationality: ['', Validators.maxLength(50)],
        womenOwned: ['', Validators.required],
        youthOwned: ['', Validators.required],
        blackOwnedPercentage: [null, [Validators.min(0), Validators.max(100)]],
        beneficialOwnersCount: [1, [Validators.required, Validators.min(1)]],
        pepInvolved: [false, Validators.required],
        pepDetails: ['', Validators.maxLength(500)],
      }),

      // Section B: Contact
      primaryContact: this.fb.group({
        primaryContact: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        contactPosition: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
        contactEmail: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
        contactPhone: ['', [Validators.required, Validators.maxLength(20)]],
        altContact: ['', Validators.maxLength(100)],
        altEmail: ['', [Validators.email, Validators.maxLength(150)]],
        altPhone: ['', Validators.maxLength(20)],
      }),

      // Section B: Locations (Array)
      locations: this.fb.array([this.createLocationFormGroup()]),

      // Section C: Business Sectors (Array)
      businessSectors: this.fb.array([this.createBusinessSectorFormGroup()]),

      // Section C: Markets
      marketInfo: this.fb.group({
        domesticMarkets: [[], Validators.required],
        exportMarkets: [[]],
        primaryExportMarket: ['', Validators.required],
        exportStartYear: [null, [Validators.min(1900), Validators.max(new Date().getFullYear())]],
        importSources: [[]],
        afcftaAwareness: ['', Validators.required],
        tradeChallenges: ['', Validators.maxLength(1000)],
      }),

      // Section C: Production Capacity
      productionCapacity: this.fb.group({
        productionCapacity: [null, [Validators.required, Validators.min(0)]],
        capacityUnit: ['', [Validators.required, Validators.maxLength(20)]],
        capacityUtilization: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
        qualityManagement: ['', Validators.required],
        qmsType: ['', Validators.required],
        certificationCount: [0, [Validators.required, Validators.min(0)]],
        existingCertifications: ['', Validators.maxLength(1000)],
        technicalStaff: [0, [Validators.required, Validators.min(0)]],
      }),

      // Section D: Preferences
      preferences: this.fb.group({
        preferredLanguage: ['ENGLISH', Validators.required],
        communicationPreferences: [[], Validators.required],
        notificationFrequency: ['DAILY_DIGEST', Validators.required],
        timezone: ['', Validators.required],
        currency: ['USD', Validators.required],
      }),

      // Section D: Accessibility
      accessibility: this.fb.group({
        assistiveTech: [false, Validators.required],
        disabilityTypes: [[]],
        specialAssistance: ['', Validators.maxLength(500)],
        literacyLevel: ['BASIC', Validators.required],
        internetAccess: ['', Validators.required],
        deviceType: ['', Validators.required],
      }),

      // Section D: Consents
      consents: this.fb.group({
        dataConsent: [false, Validators.requiredTrue],
        dataSharingConsent: [false, Validators.requiredTrue],
        crossBorderData: [false, Validators.requiredTrue],
        marketingConsent: [false],
        smsConsent: [false],
        whatsappConsent: [false],
        termsAcceptance: [false, Validators.requiredTrue],
        declarationSignature: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      }),

      countryId: ['', Validators.required],
    });
  }

  createLocationFormGroup(): FormGroup {
    return this.fb.group({
      locationType: ['REGISTERED_ADDRESS'],
      physicalAddress: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      addressLine1: ['', [Validators.required, Validators.maxLength(100)]],
      addressLine2: ['', Validators.maxLength(100)],
      postalCode: ['', [Validators.required, Validators.maxLength(20)]],
      cityTown: ['', [Validators.required, Validators.maxLength(100)]],
      regionState: ['', [Validators.required, Validators.maxLength(100)]],
      countryId: ['', Validators.required],
      gpsCoordinates: ['', Validators.maxLength(50)],
      factoryLocationSame: [null],
      factoryName: ['', Validators.maxLength(200)],
      factoryType: [''],
      factorySize: [null, Validators.min(0)],
      isPrimary: [true],
    });
  }

  createBusinessSectorFormGroup(): FormGroup {
    return this.fb.group({
      mainSector: ['', Validators.required],
      subSector: [[]],
      isicCode: ['', Validators.maxLength(10)],
      productCategories: [[]],
      percentageRevenue: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      sectorStartYear: [null, [Validators.min(1900), Validators.max(new Date().getFullYear())]],
    });
  }

  get locationsFormArray(): FormArray {
    return this.registrationForm.get('locations') as FormArray;
  }

  get businessSectorsFormArray(): FormArray {
    return this.registrationForm.get('businessSectors') as FormArray;
  }

  addLocation(): void {
    this.locationsFormArray.push(this.createLocationFormGroup());
  }

  removeLocation(index: number): void {
    if (this.locationsFormArray.length > 1) {
      this.locationsFormArray.removeAt(index);
    }
  }

  addBusinessSector(): void {
    this.businessSectorsFormArray.push(this.createBusinessSectorFormGroup());
  }

  removeBusinessSector(index: number): void {
    if (this.businessSectorsFormArray.length > 1) {
      this.businessSectorsFormArray.removeAt(index);
    }
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe({
      next: (countries) => {
        this.countries = countries;
      },
      error: (error) => {
        console.error('Error loading countries:', error);
      },
    });
  }

  checkExistingOperator(): void {
    this.operatorService.getMyOperator().subscribe({
      next: (operator) => {
        if (operator) {
          this.existingOperator = operator;
          if (operator.status === OperatorStatus.DRAFT) {
            this.loadOperatorData(operator);
          }
        }
      },
      error: (error) => {
        // No existing operator, that's fine
        console.log('No existing operator found');
      },
    });
  }

  loadOperatorData(operator: Operator): void {
    // Load existing operator data into form
    // This is a simplified version - you may need to expand this
    if (operator.contacts && operator.contacts.length > 0) {
      this.registrationForm.patchValue({
        primaryContact: operator.contacts[0],
      });
    }
    // Add more field mappings as needed
  }

  setupAutoCalculations(): void {
    // Auto-calculate company age
    this.registrationForm.get('companyInfo.yearEstablished')?.valueChanges.subscribe((year) => {
      if (year) {
        const currentYear = new Date().getFullYear();
        const age = currentYear - year;
        // Display only - not stored in form
      }
    });

    // Validate revenue percentages sum to 100%
    this.businessSectorsFormArray.valueChanges.subscribe(() => {
      this.validateRevenuePercentages();
    });
  }

  validateRevenuePercentages(): void {
    const total = this.businessSectorsFormArray.controls.reduce((sum, control) => {
      const percentage = control.get('percentageRevenue')?.value || 0;
      return sum + percentage;
    }, 0);

    // Set custom error if total doesn't equal 100
    if (Math.abs(total - 100) > 0.01) {
      this.businessSectorsFormArray.setErrors({ totalNot100: true });
    } else {
      this.businessSectorsFormArray.setErrors(null);
    }
  }

  /**
   * Cleans form data by converting empty strings to undefined and validating UUIDs/emails
   * This ensures the backend receives undefined for optional fields instead of empty strings
   */
  private cleanFormData(data: any): any {
    if (data === null || data === undefined) {
      return undefined;
    }

    // Convert empty strings to undefined
    if (typeof data === 'string' && data.trim() === '') {
      return undefined;
    }

    // Handle arrays
    if (Array.isArray(data)) {
      const cleaned = data.map(item => this.cleanFormData(item)).filter(item => item !== undefined);
      return cleaned.length > 0 ? cleaned : undefined;
    }

    // Handle objects
    if (typeof data === 'object' && !(data instanceof Date)) {
      const cleaned: any = {};
      let hasValues = false;

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const cleanedValue = this.cleanFormData(data[key]);
          if (cleanedValue !== undefined) {
            cleaned[key] = cleanedValue;
            hasValues = true;
          }
        }
      }

      return hasValues ? cleaned : undefined;
    }

    // Return other types as-is (numbers, booleans, dates, etc.)
    return data;
  }

  /**
   * Validates if a string is a valid UUID format
   */
  private isValidUUID(value: string): boolean {
    if (!value || typeof value !== 'string') {
      return false;
    }
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
  }

  /**
   * Validates if a string is a valid email format
   */
  private isValidEmail(value: string): boolean {
    if (!value || typeof value !== 'string') {
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  nextStep(): void {
    if (this.isCurrentStepValid()) {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
      }
    } else {
      this.markFormGroupTouched(this.getCurrentStepFormGroup());
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number): void {
    if (step >= 1 && step <= this.totalSteps) {
      this.currentStep = step;
    }
  }

  isCurrentStepValid(): boolean {
    const stepFormGroup = this.getCurrentStepFormGroup();
    return stepFormGroup.valid;
  }

  getCurrentStepFormGroup(): FormGroup {
    switch (this.currentStep) {
      case 1:
        return this.fb.group({
          companyInfo: this.registrationForm.get('companyInfo') as FormGroup,
          companySize: this.registrationForm.get('companySize') as FormGroup,
          ownershipInfo: this.registrationForm.get('ownershipInfo') as FormGroup,
        });
      case 2:
        return this.fb.group({
          primaryContact: this.registrationForm.get('primaryContact') as FormGroup,
          locations: this.registrationForm.get('locations') as FormArray,
        });
      case 3:
        return this.fb.group({
          businessSectors: this.registrationForm.get('businessSectors') as FormArray,
          marketInfo: this.registrationForm.get('marketInfo') as FormGroup,
          productionCapacity: this.registrationForm.get('productionCapacity') as FormGroup,
        });
      case 4:
        return this.fb.group({
          preferences: this.registrationForm.get('preferences') as FormGroup,
          accessibility: this.registrationForm.get('accessibility') as FormGroup,
          consents: this.registrationForm.get('consents') as FormGroup,
        });
      default:
        return this.registrationForm;
    }
  }

  markFormGroupTouched(formGroup: FormGroup | FormArray): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      }
    });
  }

  saveDraft(): void {
    // Save draft without validation - allow partial data
    this.saving = true;
    this.error = '';
    this.success = false;

    const formValue = this.registrationForm.value;
    const cleanedValue = this.cleanFormData(formValue);
    
    const payload: CreateOperatorRegistrationRequest = {
      companyInfo: cleanedValue.companyInfo,
      companySize: cleanedValue.companySize,
      ownershipInfo: cleanedValue.ownershipInfo,
      primaryContact: cleanedValue.primaryContact,
      locations: cleanedValue.locations,
      businessSectors: cleanedValue.businessSectors,
      marketInfo: cleanedValue.marketInfo,
      productionCapacity: cleanedValue.productionCapacity,
      preferences: cleanedValue.preferences,
      accessibility: cleanedValue.accessibility,
      consents: cleanedValue.consents,
      countryId: cleanedValue.countryId,
    };

    if (this.existingOperator && this.existingOperator.id) {
      // Update existing draft
      this.operatorService.updateOperator(this.existingOperator.id, payload).subscribe({
        next: (operator) => {
          this.existingOperator = operator;
          this.saving = false;
          this.draftSaveSuccess = true;
          setTimeout(() => {
            this.draftSaveSuccess = false;
          }, 3000);
        },
        error: (error) => {
          this.saving = false;
          this.error = error.error?.message || 'Failed to save draft. Please try again.';
          setTimeout(() => {
            this.error = '';
          }, 5000);
        },
      });
    } else {
      // Create new draft
      this.operatorService.createOperatorRegistration(payload).subscribe({
        next: (operator) => {
          this.existingOperator = operator;
          this.saving = false;
          this.draftSaveSuccess = true;
          setTimeout(() => {
            this.draftSaveSuccess = false;
          }, 3000);
        },
        error: (error) => {
          this.saving = false;
          this.error = error.error?.message || 'Failed to save draft. Please try again.';
          setTimeout(() => {
            this.error = '';
          }, 5000);
        },
      });
    }
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      this.markFormGroupTouched(this.registrationForm);
      this.error = 'Please fill in all required fields correctly';
      return;
    }

    // Validate revenue percentages
    this.validateRevenuePercentages();
    if (this.businessSectorsFormArray.errors?.['totalNot100']) {
      this.error = 'Total revenue percentage across all sectors must equal 100%';
      return;
    }

    this.loading = true;
    this.error = '';

    const formValue = this.registrationForm.value;
    const cleanedValue = this.cleanFormData(formValue);
    
    // Validate UUID fields before submission
    if (cleanedValue.countryId && !this.isValidUUID(cleanedValue.countryId)) {
      this.loading = false;
      this.error = 'Invalid country selection. Please select a valid country.';
      return;
    }

    if (cleanedValue.locations && Array.isArray(cleanedValue.locations)) {
      for (const location of cleanedValue.locations) {
        if (location.countryId && !this.isValidUUID(location.countryId)) {
          this.loading = false;
          this.error = 'Invalid country selection in location. Please select a valid country.';
          return;
        }
      }
    }

    if (cleanedValue.marketInfo?.primaryExportMarket && !this.isValidUUID(cleanedValue.marketInfo.primaryExportMarket)) {
      this.loading = false;
      this.error = 'Invalid primary export market selection. Please select a valid market.';
      return;
    }

    // Validate email fields
    if (cleanedValue.primaryContact?.contactEmail && !this.isValidEmail(cleanedValue.primaryContact.contactEmail)) {
      this.loading = false;
      this.error = 'Invalid primary contact email address.';
      return;
    }

    if (cleanedValue.primaryContact?.altEmail && !this.isValidEmail(cleanedValue.primaryContact.altEmail)) {
      this.loading = false;
      this.error = 'Invalid alternate email address.';
      return;
    }

    const payload: CreateOperatorRegistrationRequest = {
      companyInfo: cleanedValue.companyInfo,
      companySize: cleanedValue.companySize,
      ownershipInfo: cleanedValue.ownershipInfo,
      primaryContact: cleanedValue.primaryContact,
      locations: cleanedValue.locations,
      businessSectors: cleanedValue.businessSectors,
      marketInfo: cleanedValue.marketInfo,
      productionCapacity: cleanedValue.productionCapacity,
      preferences: cleanedValue.preferences,
      accessibility: cleanedValue.accessibility,
      consents: cleanedValue.consents,
      countryId: cleanedValue.countryId,
    };

    if (this.existingOperator && this.existingOperator.id) {
      // Update existing
      this.operatorService.updateOperator(this.existingOperator.id, payload).subscribe({
        next: (operator) => {
          this.existingOperator = operator;
          this.submitOperator(operator.id);
        },
        error: (error) => {
          this.loading = false;
          this.error = error.error?.message || 'Failed to update registration';
        },
      });
    } else {
      // Create new
      this.operatorService.createOperatorRegistration(payload).subscribe({
        next: (operator) => {
          this.existingOperator = operator;
          this.submitOperator(operator.id);
        },
        error: (error) => {
          this.loading = false;
          this.error = error.error?.message || 'Failed to create registration';
        },
      });
    }
  }

  submitOperator(operatorId: string): void {
    this.operatorService.submitOperator(operatorId).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      error: (error) => {
        this.loading = false;
        this.error = error.error?.message || 'Failed to submit registration';
      },
    });
  }

  getStepTitle(step: number): string {
    const titles = {
      1: 'Company Information',
      2: 'Contact & Location',
      3: 'Business Activities',
      4: 'Preferences & Consent',
    };
    return titles[step as keyof typeof titles] || '';
  }

  formatEnumLabel(value: string): string {
    return value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  }
}

