import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationRegistrationService } from '../../modules/application-registration/services/application-registration.service';
import { CountryService } from '../../modules/nsb-management/services/country.service';
import {
  ApplicationRegistration,
  ApplicationRegistrationStatus,
  CreateApplicationRegistrationRequest,
} from '../../shared/models/application-registration.model';
import { Country } from '../../shared/models/reference-data.model';
import {
  OperatorType,
  LegalStructure,
  EmployeeCountRange,
  AnnualTurnoverRange,
  OwnershipType,
  OwnershipStatus,
} from '../../shared/models/operator.model';

@Component({
  selector: 'app-application-registration',
  templateUrl: './application-registration.component.html',
  styleUrls: ['./application-registration.component.scss'],
})
export class ApplicationRegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  currentStep = 1;
  totalSteps = 9; // 4 steps for Part A, 5 steps for Part B
  loading = false;
  saving = false;
  error = '';
  success = false;
  draftSaveSuccess = false;
  countries: Country[] = [];
  existingApplication: ApplicationRegistration | null = null;
  currentYear: number = new Date().getFullYear();
  partAPrefilled = false; // Track if Part A was pre-filled from previous application

  // Part B: Lookup data
  acapSchemes: any[] = [];
  arsoStandards: any[] = [];
  certificationBodies: any[] = [];
  productionTypes: any[] = [];
  targetMarkets: any[] = [];
  loadingLookupData = false;

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
    private applicationRegistrationService: ApplicationRegistrationService,
    private countryService: CountryService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.registrationForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadCountries();
    this.loadPartBLookupData();
    this.route.queryParams.subscribe((params) => {
      const applicationId = params['id'];
      if (applicationId) {
        this.loadApplicationById(applicationId);
      } else {
        this.checkExistingApplication();
      }
    });
    this.setupAutoCalculations();
  }

  loadApplicationById(id: string): void {
    this.applicationRegistrationService.getApplicationById(id).subscribe({
      next: (application) => {
        this.existingApplication = application;
        this.loadApplicationData(application);
      },
      error: (error) => {
        console.error('Error loading application:', error);
        this.error = 'Failed to load application. Redirecting to list...';
        setTimeout(() => {
          this.router.navigate(['/portal/application-registrations']);
        }, 2000);
      },
    });
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
          this.currentYear,
          [Validators.required, Validators.min(1900), Validators.max(this.currentYear)],
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
        exportStartYear: [null, [Validators.min(1900), Validators.max(this.currentYear)]],
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

      // Part B: Product & Certification Details
      // Step 5: Product & Certification Details
      productCertification: this.fb.group({
        markAppliedFor: ['', Validators.required],
        acapScheme: ['', Validators.required],
        productBrandName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
        productModelTypeNumber: ['', [Validators.required, Validators.maxLength(100)]],
        applicableArsoStandards: [[], Validators.required],
        scopeOfCertification: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(2000)]],
        expectedAnnualCertifiedVolume: ['', [Validators.required, Validators.maxLength(50)]],
        expectedAnnualCertifiedVolumeUnit: [''],
        targetMarkets: [[], Validators.required],
      }),

      // Step 6: Manufacturer Information
      manufacturerInfo: this.fb.group({
        manufacturerLegalName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
        manufacturerAddress: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
        manufacturerCountryId: ['', Validators.required],
        productionSiteGpsCoordinates: ['', [Validators.required, Validators.maxLength(100)]],
        typeOfProduction: ['', [Validators.required, Validators.maxLength(100)]],
      }),

      // Step 7: Conformity Evidence
      conformityEvidence: this.fb.group({
        testReportFileId: ['', Validators.required],
        testReportIssuingBody: ['', [Validators.required, Validators.maxLength(200)]],
        testReportCertificateNo: ['', [Validators.required, Validators.maxLength(100)]],
        qmsCertificateFileId: [''],
        qmsCertificateIssuingBody: ['', Validators.maxLength(200)],
        qmsCertificateNo: ['', Validators.maxLength(100)],
        otherEvidenceFileId: [''],
        otherEvidenceIssuingBody: ['', Validators.maxLength(200)],
        otherEvidenceCertificateNo: ['', Validators.maxLength(100)],
        productPhotographsFileIds: [[], Validators.required],
        labelArtworkFileId: ['', Validators.required],
        declarationOfConformityFileId: ['', Validators.required],
      }),

      // Step 8: Post-Certification Commitments
      postCertification: this.fb.group({
        productRecallProcedureFileId: ['', Validators.required],
        complaintsManagementProcedureFileId: ['', Validators.required],
        agreementToSurveillance: [false, Validators.requiredTrue],
        traceabilityUndertaking: [false, Validators.requiredTrue],
      }),

      // Step 9: Certification Body Selection
      cbSelection: this.fb.group({
        selectedCertificationBodyId: ['', Validators.required],
        finalDeclarationSignature: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
        finalDeclarationDate: ['', Validators.required],
      }),
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
      sectorStartYear: [null, [Validators.min(1900), Validators.max(this.currentYear)]],
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

  loadPartBLookupData(): void {
    this.loadingLookupData = true;
    // Load ACAP schemes
    this.applicationRegistrationService.getAcapSchemes().subscribe({
      next: (schemes) => {
        this.acapSchemes = schemes;
      },
      error: (error) => {
        console.error('Error loading ACAP schemes:', error);
      },
    });

    // Load ARSO standards
    this.applicationRegistrationService.getArsoStandards().subscribe({
      next: (standards) => {
        this.arsoStandards = standards;
      },
      error: (error) => {
        console.error('Error loading ARSO standards:', error);
      },
    });

    // Load Certification Bodies
    this.applicationRegistrationService.getCertificationBodies().subscribe({
      next: (bodies) => {
        this.certificationBodies = bodies;
      },
      error: (error) => {
        console.error('Error loading certification bodies:', error);
      },
    });

    // Load Production Types
    this.applicationRegistrationService.getProductionTypes().subscribe({
      next: (types) => {
        this.productionTypes = types;
      },
      error: (error) => {
        console.error('Error loading production types:', error);
      },
    });

    // Load Target Markets
    this.applicationRegistrationService.getTargetMarkets().subscribe({
      next: (markets) => {
        this.targetMarkets = markets;
        this.loadingLookupData = false;
      },
      error: (error) => {
        console.error('Error loading target markets:', error);
        this.loadingLookupData = false;
      },
    });
  }

  checkExistingApplication(): void {
    // For new applications, check if user has any existing applications
    // If yes, pre-fill Part A (company info) from the most recent one
    this.applicationRegistrationService.getMyApplications().subscribe({
      next: (applications) => {
        if (applications && applications.length > 0) {
          // Get the most recent application (they're ordered by createdAt DESC)
          const mostRecentApp = applications[0];
          
          // Pre-fill only Part A data (company info, contact, business activities, preferences)
          // Leave Part B empty for the new product
          this.prefillPartAFromApplication(mostRecentApp);
          this.partAPrefilled = true;
        }
      },
      error: (error) => {
        console.log('No existing applications found');
      },
    });
  }

  prefillPartAFromApplication(application: ApplicationRegistration): void {
    // Pre-fill only Part A sections (steps 1-4)
    // Company Info, Contact & Location, Business Activities, Preferences & Consent
    const appData = application as any;
    
    // Step 1: Company Information
    if (appData.companyInfo) {
      this.registrationForm.get('companyInfo')?.patchValue(appData.companyInfo);
    }
    if (appData.companySize) {
      this.registrationForm.get('companySize')?.patchValue(appData.companySize);
    }
    if (appData.ownershipInfo) {
      this.registrationForm.get('ownershipInfo')?.patchValue(appData.ownershipInfo);
    }
    
    // Step 2: Contact & Location
    if (appData.primaryContact) {
      this.registrationForm.get('primaryContact')?.patchValue(appData.primaryContact);
    }
    
    // Load locations array
    if (appData.locations && appData.locations.length > 0) {
      // Clear existing locations
      while (this.locationsFormArray.length > 0) {
        this.locationsFormArray.removeAt(0);
      }
      // Add locations from data
      appData.locations.forEach((loc: any) => {
        const locationGroup = this.createLocationFormGroup();
        locationGroup.patchValue(loc);
        this.locationsFormArray.push(locationGroup);
      });
    }
    
    // Step 3: Business Activities
    if (appData.businessSectors && appData.businessSectors.length > 0) {
      // Clear existing business sectors
      while (this.businessSectorsFormArray.length > 0) {
        this.businessSectorsFormArray.removeAt(0);
      }
      // Add business sectors from data
      appData.businessSectors.forEach((sector: any) => {
        const sectorGroup = this.createBusinessSectorFormGroup();
        sectorGroup.patchValue(sector);
        this.businessSectorsFormArray.push(sectorGroup);
      });
    }
    if (appData.marketInfo) {
      this.registrationForm.get('marketInfo')?.patchValue(appData.marketInfo);
    }
    if (appData.productionCapacity) {
      this.registrationForm.get('productionCapacity')?.patchValue(appData.productionCapacity);
    }
    
    // Step 4: Preferences & Consent
    if (appData.preferences) {
      this.registrationForm.get('preferences')?.patchValue(appData.preferences);
    }
    if (appData.accessibility) {
      this.registrationForm.get('accessibility')?.patchValue(appData.accessibility);
    }
    // Note: We don't pre-fill consents as they need to be re-accepted for each application
    
    // Country
    if (application.countryId || appData.countryId) {
      this.registrationForm.patchValue({ countryId: application.countryId || appData.countryId });
    }
    
    // Note: Part B (productCertification, manufacturerInfo, etc.) is NOT pre-filled
    // as each product has different details
  }

  loadApplicationData(application: ApplicationRegistration): void {
    // Load existing application data into form
    // Handle both flat fields and nested JSON structures
    const appData = application as any;
    
    // Load nested structures
    if (appData.companyInfo) {
      this.registrationForm.get('companyInfo')?.patchValue(appData.companyInfo);
    }
    if (appData.companySize) {
      this.registrationForm.get('companySize')?.patchValue(appData.companySize);
    }
    if (appData.ownershipInfo) {
      this.registrationForm.get('ownershipInfo')?.patchValue(appData.ownershipInfo);
    }
    if (appData.primaryContact) {
      this.registrationForm.get('primaryContact')?.patchValue(appData.primaryContact);
    }
    if (appData.marketInfo) {
      this.registrationForm.get('marketInfo')?.patchValue(appData.marketInfo);
    }
    if (appData.productionCapacity) {
      this.registrationForm.get('productionCapacity')?.patchValue(appData.productionCapacity);
    }
    if (appData.preferences) {
      this.registrationForm.get('preferences')?.patchValue(appData.preferences);
    }
    if (appData.accessibility) {
      this.registrationForm.get('accessibility')?.patchValue(appData.accessibility);
    }
    if (appData.consents) {
      this.registrationForm.get('consents')?.patchValue(appData.consents);
    }
    // Part B: Load Product & Certification Details
    if (appData.productCertification) {
      this.registrationForm.get('productCertification')?.patchValue(appData.productCertification);
    }
    if (appData.manufacturerInfo) {
      this.registrationForm.get('manufacturerInfo')?.patchValue(appData.manufacturerInfo);
    }
    if (appData.conformityEvidence) {
      this.registrationForm.get('conformityEvidence')?.patchValue(appData.conformityEvidence);
    }
    if (appData.postCertification) {
      this.registrationForm.get('postCertification')?.patchValue(appData.postCertification);
    }
    if (appData.cbSelection) {
      this.registrationForm.get('cbSelection')?.patchValue(appData.cbSelection);
    }
    if (application.countryId || appData.countryId) {
      this.registrationForm.patchValue({ countryId: application.countryId || appData.countryId });
    }
    
    // Load locations array
    if (appData.locations && appData.locations.length > 0) {
      // Clear existing locations
      while (this.locationsFormArray.length > 0) {
        this.locationsFormArray.removeAt(0);
      }
      // Add locations from data
      appData.locations.forEach((loc: any) => {
        const locationGroup = this.createLocationFormGroup();
        locationGroup.patchValue(loc);
        this.locationsFormArray.push(locationGroup);
      });
    }
    
    // Load business sectors array
    if (appData.businessSectors && appData.businessSectors.length > 0) {
      // Clear existing sectors
      while (this.businessSectorsFormArray.length > 0) {
        this.businessSectorsFormArray.removeAt(0);
      }
      // Add sectors from data
      appData.businessSectors.forEach((sector: any) => {
        const sectorGroup = this.createBusinessSectorFormGroup();
        sectorGroup.patchValue(sector);
        this.businessSectorsFormArray.push(sectorGroup);
      });
    }
  }

  setupAutoCalculations(): void {
    // Auto-calculate company age
    this.registrationForm.get('companyInfo.yearEstablished')?.valueChanges.subscribe((year) => {
      if (year) {
        const age = this.currentYear - year;
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

    if (Math.abs(total - 100) > 0.01) {
      this.businessSectorsFormArray.setErrors({ totalNot100: true });
    } else {
      this.businessSectorsFormArray.setErrors(null);
    }
  }

  /**
   * Cleans form data by converting empty strings to undefined
   */
  private cleanFormData(data: any): any {
    if (data === null || data === undefined) {
      return undefined;
    }

    if (typeof data === 'string' && data.trim() === '') {
      return undefined;
    }

    if (Array.isArray(data)) {
      const cleaned = data.map(item => this.cleanFormData(item)).filter(item => item !== undefined);
      return cleaned.length > 0 ? cleaned : undefined;
    }

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

    return data;
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
          countryId: this.registrationForm.get('countryId') as AbstractControl,
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
    this.saving = true;
    this.error = '';
    this.success = false;
    this.draftSaveSuccess = false;

    const formValue = this.registrationForm.value;
    const cleanedValue = this.cleanFormData(formValue);

    if (this.existingApplication && this.existingApplication.id) {
      this.applicationRegistrationService.updateApplication(this.existingApplication.id, cleanedValue).subscribe({
        next: (application) => {
          this.existingApplication = application;
          this.saving = false;
          this.draftSaveSuccess = true;
          // Show notification for 5 seconds
          setTimeout(() => {
            this.draftSaveSuccess = false;
          }, 5000);
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
      this.applicationRegistrationService.saveDraft(cleanedValue).subscribe({
        next: (application) => {
          this.existingApplication = application;
          this.saving = false;
          this.draftSaveSuccess = true;
          // Show notification for 5 seconds
          setTimeout(() => {
            this.draftSaveSuccess = false;
          }, 5000);
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

    this.validateRevenuePercentages();
    if (this.businessSectorsFormArray.errors?.['totalNot100']) {
      this.error = 'Total revenue percentage across all sectors must equal 100%';
      return;
    }

    this.loading = true;
    this.error = '';

    const formValue = this.registrationForm.value;
    const cleanedValue = this.cleanFormData(formValue);

    if (this.existingApplication && this.existingApplication.id) {
      this.applicationRegistrationService.updateApplication(this.existingApplication.id, cleanedValue).subscribe({
        next: (application) => {
          this.existingApplication = application;
          this.submitApplication(application.id);
        },
        error: (error) => {
          this.loading = false;
          this.error = error.error?.message || 'Failed to update registration';
        },
      });
    } else {
      this.applicationRegistrationService.createApplicationRegistration(cleanedValue as any).subscribe({
        next: (application) => {
          this.existingApplication = application;
          this.submitApplication(application.id);
        },
        error: (error) => {
          this.loading = false;
          this.error = error.error?.message || 'Failed to create registration';
        },
      });
    }
  }

  submitApplication(applicationId: string): void {
    this.applicationRegistrationService.submitApplication(applicationId).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;
        setTimeout(() => {
          this.router.navigate(['/portal/application-registrations']);
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
      1: 'Company Info',
      2: 'Contact & Location',
      3: 'Business Activities',
      4: 'Preferences & Consent',
      5: 'Product Details',
      6: 'Manufacturer Info',
      7: 'Conformity Evidence',
      8: 'Post-Certification',
      9: 'CB Selection',
    };
    return titles[step as keyof typeof titles] || '';
  }

  formatEnumLabel(value: string): string {
    return value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  }

  // Part B: Helper methods
  toggleArsoStandard(standardCode: string): void {
    const currentStandards = this.registrationForm.get('productCertification.applicableArsoStandards')?.value || [];
    const index = currentStandards.indexOf(standardCode);
    if (index > -1) {
      currentStandards.splice(index, 1);
    } else {
      currentStandards.push(standardCode);
    }
    this.registrationForm.get('productCertification.applicableArsoStandards')?.setValue(currentStandards);
  }

  toggleTargetMarket(marketValue: string): void {
    const currentMarkets = this.registrationForm.get('productCertification.targetMarkets')?.value || [];
    const index = currentMarkets.indexOf(marketValue);
    if (index > -1) {
      currentMarkets.splice(index, 1);
    } else {
      currentMarkets.push(marketValue);
    }
    this.registrationForm.get('productCertification.targetMarkets')?.setValue(currentMarkets);
  }

  onFileSelected(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // In production, upload the file and get the file ID
      // For now, store a placeholder
      const fileId = `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      this.registrationForm.get(`conformityEvidence.${controlName}`)?.setValue(fileId);
      
      // If it's in postCertification group
      if (controlName.includes('Procedure')) {
        this.registrationForm.get(`postCertification.${controlName}`)?.setValue(fileId);
      }
    }
  }

  onMultipleFilesSelected(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const fileIds: string[] = [];
      Array.from(input.files).forEach((file) => {
        const fileId = `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        fileIds.push(fileId);
      });
      this.registrationForm.get(`conformityEvidence.${controlName}`)?.setValue(fileIds);
    }
  }
}
