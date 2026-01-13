import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductCertificationService } from '../../modules/product-certification/services/product-certification.service';
import { OperatorService } from '../../modules/operator/services/operator.service';
import { CountryService } from '../../modules/nsb-management/services/country.service';
import {
  ProductCertificationApplication,
  MarkRequestedType,
  MarkCombinationPreference,
  CertificationSchemeType,
  ApplicationScope,
  ProductCertificationType,
  PriorityProcessing,
  ExpectedTimeline,
  VolumeUnit,
  ProductCategory,
  TargetConsumerGroup,
  PackagingType,
  TechnicalDocsStatus,
  TestReportsAvailability,
  TraceabilityStatus,
  EnvironmentalBenefit,
  ThirdPartyVerificationStatus,
  LifecycleAssessmentType,
  LifecycleAspect,
  EnvironmentalManagementSystem,
  TakeBackProgramStatus,
  AuditLanguage,
  AuditTeamSize,
  CreateProductCertificationApplicationRequest,
  ProductCertificationStatus,
} from '../../shared/models/product-certification.model';
import { Operator } from '../../shared/models/operator.model';
import { Country } from '../../shared/models/reference-data.model';

@Component({
  selector: 'app-product-certification',
  templateUrl: './product-certification.component.html',
  styleUrls: ['./product-certification.component.scss'],
})
export class ProductCertificationComponent implements OnInit {
  certificationForm: FormGroup;
  currentStep = 1;
  totalSteps = 6;
  loading = false;
  saving = false;
  error = '';
  success = false;
  countries: Country[] = [];
  existingApplication: ProductCertificationApplication | null = null;
  operator: Operator | null = null;
  applicationId?: string;

  // Options for dropdowns
  markRequestedTypes = Object.values(MarkRequestedType).map((value) => ({
    value,
    label: value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  markCombinationPreferences = Object.values(MarkCombinationPreference).map((value) => ({
    value,
    label: value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  certificationSchemeTypes = Object.values(CertificationSchemeType).map((value) => ({
    value,
    label: value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  applicationScopes = Object.values(ApplicationScope).map((value) => ({
    value,
    label: value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  certificationTypes = Object.values(ProductCertificationType).map((value) => ({
    value,
    label: value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  priorityProcessings = Object.values(PriorityProcessing).map((value) => ({
    value,
    label: value === PriorityProcessing.YES ? 'Yes (additional fee applies)' : 'No',
  }));

  expectedTimelines = [
    { value: ExpectedTimeline.URGENT_1_2_MONTHS, label: 'Urgent (1-2 months)' },
    { value: ExpectedTimeline.STANDARD_3_4_MONTHS, label: 'Standard (3-4 months)' },
    { value: ExpectedTimeline.FLEXIBLE_5_6_MONTHS, label: 'Flexible (5-6 months)' },
  ];

  volumeUnits = Object.values(VolumeUnit).map((value) => ({
    value,
    label: value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  productCategories = Object.values(ProductCategory).map((value) => ({
    value,
    label: value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  targetConsumerGroups = Object.values(TargetConsumerGroup).map((value) => ({
    value,
    label: value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  packagingTypes = Object.values(PackagingType).map((value) => ({
    value,
    label: value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  technicalDocsStatuses = Object.values(TechnicalDocsStatus).map((value) => ({
    value,
    label: value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  testReportsAvailabilities = Object.values(TestReportsAvailability).map((value) => ({
    value,
    label: value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  traceabilityStatuses = Object.values(TraceabilityStatus).map((value) => ({
    value,
    label: value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  environmentalBenefits = Object.values(EnvironmentalBenefit).map((value) => ({
    value,
    label: value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  thirdPartyVerificationStatuses = Object.values(ThirdPartyVerificationStatus).map((value) => ({
    value,
    label: value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  lifecycleAssessmentTypes = Object.values(LifecycleAssessmentType).map((value) => ({
    value,
    label: value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  lifecycleAspects = Object.values(LifecycleAspect).map((value) => ({
    value,
    label: value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  environmentalManagementSystems = Object.values(EnvironmentalManagementSystem).map((value) => ({
    value,
    label: value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  takeBackProgramStatuses = Object.values(TakeBackProgramStatus).map((value) => ({
    value,
    label: value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  auditLanguages = Object.values(AuditLanguage).map((value) => ({
    value,
    label: value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  auditTeamSizes = Object.values(AuditTeamSize).map((value) => ({
    value,
    label: value === AuditTeamSize.ONE_AUDITOR ? '1 Auditor' : value === AuditTeamSize.TWO_AUDITORS ? '2 Auditors' : 'Flexible',
  }));

  months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  constructor(
    private fb: FormBuilder,
    private productCertificationService: ProductCertificationService,
    private operatorService: OperatorService,
    private countryService: CountryService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.certificationForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadCountries();
    this.loadOperator();
    this.checkExistingApplication();
    this.setupConditionalFields();
  }

  createForm(): FormGroup {
    return this.fb.group({
      // Section A: Application Type Selection
      markSelection: this.fb.group({
        markRequested: [[], Validators.required],
        arsoQualityMark: [false],
        ecoMarkAfrica: [false],
        markCombination: [''],
      }),

      certificationScheme: this.fb.group({
        schemeType: ['', Validators.required],
        applicationScope: ['', Validators.required],
        certificationType: ['', Validators.required],
      }),

      volumePriority: this.fb.group({
        estimatedVolume: [null, [Validators.required, Validators.min(0)]],
        volumeUnit: ['', Validators.required],
        peakMonth: [null, [Validators.min(1), Validators.max(12)]],
        priorityProcessing: [PriorityProcessing.NO, Validators.required],
        priorityReason: ['', Validators.maxLength(500)],
        expectedTimeline: ['', Validators.required],
      }),

      // Section B: Products (Array)
      products: this.fb.array([this.createProductFormGroup()]),

      // Section C: Technical Specs (per product - optional in form, handled in service)
      technicalSpecs: this.fb.array([this.createTechnicalSpecFormGroup()]),

      // Section D: Environmental Claims (Conditional - EMA only)
      environmentalClaims: this.fb.array([this.createEnvironmentalClaimFormGroup()]),

      // Section E: CB Selection
      cbSelection: this.fb.group({
        preferredCb: [''],
        cbSelectionReason: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
        previousCb: [false, Validators.required],
        previousCbName: ['', Validators.maxLength(200)],
        previousCertificateNumber: ['', Validators.maxLength(50)],
        auditLanguage: ['', Validators.required],
        auditTiming: ['', [Validators.required, Validators.maxLength(500)]],
        peakPeriods: ['', [Validators.required, Validators.maxLength(500)]],
        specialRequirements: ['', Validators.maxLength(500)],
        auditTeamSize: ['', Validators.required],
      }),

      // Section F: Declarations
      declaration: this.fb.group({
        truthDeclaration: [false, Validators.requiredTrue],
        complianceCommitment: [false, Validators.requiredTrue],
        surveillanceAcceptance: [false, Validators.requiredTrue],
        correctiveActionCommitment: [false, Validators.requiredTrue],
        marketSurveillanceAcceptance: [false, Validators.requiredTrue],
        markUsageCommitment: [false, Validators.requiredTrue],
        feesAcceptance: [false, Validators.requiredTrue],
        feeBreakdownAcknowledged: [false, Validators.requiredTrue],
        paymentTermsAccepted: [false, Validators.requiredTrue],
        additionalCostsUnderstood: [false, Validators.requiredTrue],
        applicantName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        applicantPosition: ['', [Validators.required, Validators.maxLength(100)]],
        applicantSignature: [''],
      }),
    });
  }

  createProductFormGroup(): FormGroup {
    return this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      productScientificName: ['', Validators.maxLength(200)],
      brandName: ['', [Validators.required, Validators.maxLength(100)]],
      modelVariant: ['', [Validators.required, Validators.maxLength(100)]],
      productCode: ['', Validators.maxLength(50)],
      hsCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      productCategory: ['', Validators.required],
      productDescription: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(2000)]],
      intendedUse: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      keyFeatures: [[]],
      uniqueSellingPoint: ['', Validators.maxLength(500)],
      intendedMarkets: [[]],
      primaryTargetMarket: [''],
      targetConsumers: [[], Validators.required],
      consumerWarnings: ['', Validators.maxLength(1000)],
      shelfLife: ['', Validators.maxLength(50)],
      storageConditions: ['', Validators.maxLength(500)],
      unitWeight: ['', Validators.maxLength(50)],
      dimensions: ['', Validators.maxLength(100)],
      color: [[]],
      materialComposition: ['', Validators.maxLength(1000)],
      packagingType: ['', Validators.required],
      packagingMaterial: ['', [Validators.required, Validators.maxLength(100)]],
      packagingWeight: ['', Validators.maxLength(50)],
      unitsPerPackage: [null, Validators.min(1)],
      displayOrder: [0],
    });
  }

  createTechnicalSpecFormGroup(): FormGroup {
    return this.fb.group({
      applicableStandards: [[], Validators.required],
      mandatoryStandards: [[], Validators.required],
      voluntaryStandards: [[]],
      regulatoryBody: ['', [Validators.required, Validators.maxLength(200)]],
      regulatoryApproval: ['', Validators.maxLength(1000)],
      technicalDocsAvailable: ['', Validators.required],
      missingDocuments: ['', Validators.maxLength(1000)],
      testReportsAvailable: ['', Validators.required],
      testCoverage: [null, [Validators.min(0), Validators.max(100)]],
      manufacturingProcess: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(2000)]],
      processFlowDiagram: [false, Validators.required],
      keyComponents: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
      criticalComponents: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      componentSources: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      supplierListAvailable: [''],
      traceabilitySystem: ['', Validators.required],
      batchTraceability: ['', Validators.required],
    });
  }

  createEnvironmentalClaimFormGroup(): FormGroup {
    return this.fb.group({
      environmentalBenefits: [[], Validators.required],
      ecoClaimsSupporting: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(2000)]],
      thirdPartyVerification: ['', Validators.required],
      verifierName: ['', Validators.maxLength(200)],
      lifecycleAspects: [[], Validators.required],
      lifecycleAssessment: ['', Validators.required],
      carbonFootprint: [false, Validators.required],
      carbonValue: [null, Validators.min(0)],
      environmentalManagement: ['', Validators.required],
      environmentalPolicy: [false, Validators.required],
      wasteManagement: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      recyclingInfo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      takeBackProgram: ['', Validators.required],
    });
  }

  get productsFormArray(): FormArray {
    return this.certificationForm.get('products') as FormArray;
  }

  get technicalSpecsFormArray(): FormArray {
    return this.certificationForm.get('technicalSpecs') as FormArray;
  }

  get environmentalClaimsFormArray(): FormArray {
    return this.certificationForm.get('environmentalClaims') as FormArray;
  }

  addProduct(): void {
    this.productsFormArray.push(this.createProductFormGroup());
    // Add corresponding technical spec if needed
    this.technicalSpecsFormArray.push(this.createTechnicalSpecFormGroup());
    // Add environmental claim if EMA is selected
    if (this.hasEmaMark()) {
      this.environmentalClaimsFormArray.push(this.createEnvironmentalClaimFormGroup());
    }
  }

  removeProduct(index: number): void {
    if (this.productsFormArray.length > 1) {
      this.productsFormArray.removeAt(index);
      if (this.technicalSpecsFormArray.length > index) {
        this.technicalSpecsFormArray.removeAt(index);
      }
      if (this.environmentalClaimsFormArray.length > index && this.hasEmaMark()) {
        this.environmentalClaimsFormArray.removeAt(index);
      }
    }
  }

  hasEmaMark(): boolean {
    const markRequested = this.certificationForm.get('markSelection.markRequested')?.value || [];
    return (
      markRequested.includes(MarkRequestedType.ECO_MARK_AFRICA) || markRequested.includes(MarkRequestedType.BOTH)
    );
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

  loadOperator(): void {
    this.operatorService.getMyOperator().subscribe({
      next: (operator) => {
        if (operator) {
          this.operator = operator;
          if (operator.status === 'APPROVED' || operator.status === 'ACTIVE') {
            // Operator is approved, can proceed
          } else {
            this.error = 'Your operator registration must be approved before applying for product certification';
          }
        } else {
          this.error = 'Please complete your operator registration first';
        }
      },
      error: (error) => {
        this.error = 'Please complete your operator registration first';
      },
    });
  }

  checkExistingApplication(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.applicationId = params['id'];
        this.productCertificationService.getApplicationById(params['id']).subscribe({
          next: (application) => {
            this.existingApplication = application;
            if (application.status === ProductCertificationStatus.DRAFT) {
              this.loadApplicationData(application);
            }
          },
          error: (error) => {
            console.error('Error loading application:', error);
          },
        });
      }
    });
  }

  loadApplicationData(application: ProductCertificationApplication): void {
    // Load existing application data into form
    if (application.products && application.products.length > 0) {
      // Clear existing arrays
      while (this.productsFormArray.length > 0) {
        this.productsFormArray.removeAt(0);
      }
      while (this.technicalSpecsFormArray.length > 0) {
        this.technicalSpecsFormArray.removeAt(0);
      }
      while (this.environmentalClaimsFormArray.length > 0) {
        this.environmentalClaimsFormArray.removeAt(0);
      }

      // Load products
      application.products.forEach((product, index) => {
        this.productsFormArray.push(this.createProductFormGroup());
        this.productsFormArray.at(index).patchValue(product);

        // Load technical spec if exists
        if (product.technicalSpec) {
          if (this.technicalSpecsFormArray.length <= index) {
            this.technicalSpecsFormArray.push(this.createTechnicalSpecFormGroup());
          }
          this.technicalSpecsFormArray.at(index).patchValue(product.technicalSpec);
        }

        // Load environmental claim if exists
        if (product.environmentalClaim) {
          if (this.environmentalClaimsFormArray.length <= index) {
            this.environmentalClaimsFormArray.push(this.createEnvironmentalClaimFormGroup());
          }
          this.environmentalClaimsFormArray.at(index).patchValue(product.environmentalClaim);
        }
      });
    }

    // Load other sections
    if (application.cbSelection) {
      this.certificationForm.patchValue({
        cbSelection: application.cbSelection,
      });
    }

    if (application.declaration) {
      this.certificationForm.patchValue({
        declaration: application.declaration,
      });
    }
  }

  setupConditionalFields(): void {
    // Show/hide environmental claims section based on EMA mark
    this.certificationForm.get('markSelection.markRequested')?.valueChanges.subscribe(() => {
      const hasEma = this.hasEmaMark();
      if (hasEma) {
        // Ensure we have environmental claims for each product
        while (this.environmentalClaimsFormArray.length < this.productsFormArray.length) {
          this.environmentalClaimsFormArray.push(this.createEnvironmentalClaimFormGroup());
        }
      } else {
        // Remove environmental claims if EMA not selected
        while (this.environmentalClaimsFormArray.length > 0) {
          this.environmentalClaimsFormArray.removeAt(0);
        }
      }
    });

    // Show priority reason if priority processing is YES
    this.certificationForm.get('volumePriority.priorityProcessing')?.valueChanges.subscribe((value) => {
      const priorityReasonControl = this.certificationForm.get('volumePriority.priorityReason');
      if (value === PriorityProcessing.YES) {
        priorityReasonControl?.setValidators([Validators.required, Validators.maxLength(500)]);
      } else {
        priorityReasonControl?.clearValidators();
        priorityReasonControl?.setValue('');
      }
      priorityReasonControl?.updateValueAndValidity();
    });

    // Show previous CB fields if previousCb is true
    this.certificationForm.get('cbSelection.previousCb')?.valueChanges.subscribe((value) => {
      const previousCbNameControl = this.certificationForm.get('cbSelection.previousCbName');
      const previousCertNumberControl = this.certificationForm.get('cbSelection.previousCertificateNumber');
      if (value === true) {
        previousCbNameControl?.setValidators([Validators.required, Validators.maxLength(200)]);
        previousCertNumberControl?.setValidators([Validators.required, Validators.maxLength(50)]);
      } else {
        previousCbNameControl?.clearValidators();
        previousCertNumberControl?.clearValidators();
        previousCbNameControl?.setValue('');
        previousCertNumberControl?.setValue('');
      }
      previousCbNameControl?.updateValueAndValidity();
      previousCertNumberControl?.updateValueAndValidity();
    });

    // Show verifier name if third-party verification is YES
    this.environmentalClaimsFormArray.controls.forEach((control, index) => {
      control.get('thirdPartyVerification')?.valueChanges.subscribe((value) => {
        const verifierNameControl = control.get('verifierName');
        if (value === ThirdPartyVerificationStatus.YES) {
          verifierNameControl?.setValidators([Validators.required, Validators.maxLength(200)]);
        } else {
          verifierNameControl?.clearValidators();
          verifierNameControl?.setValue('');
        }
        verifierNameControl?.updateValueAndValidity();
      });
    });
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

  getCurrentStepFormGroup(): FormGroup | FormArray {
    switch (this.currentStep) {
      case 1:
        return this.fb.group({
          markSelection: this.certificationForm.get('markSelection') as FormGroup,
          certificationScheme: this.certificationForm.get('certificationScheme') as FormGroup,
          volumePriority: this.certificationForm.get('volumePriority') as FormGroup,
        });
      case 2:
        return this.productsFormArray;
      case 3:
        return this.technicalSpecsFormArray;
      case 4:
        return this.environmentalClaimsFormArray;
      case 5:
        return this.certificationForm.get('cbSelection') as FormGroup;
      case 6:
        return this.certificationForm.get('declaration') as FormGroup;
      default:
        return this.certificationForm;
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
    if (this.existingApplication && this.existingApplication.id) {
      this.saving = true;
      this.productCertificationService.updateApplication(this.existingApplication.id, this.certificationForm.value).subscribe({
        next: () => {
          this.saving = false;
          // Show success message
        },
        error: (error) => {
          this.saving = false;
          this.error = error.error?.message || 'Failed to save draft';
        },
      });
    }
  }

  onSubmit(): void {
    if (this.certificationForm.invalid) {
      this.markFormGroupTouched(this.certificationForm);
      this.error = 'Please fill in all required fields correctly';
      return;
    }

    if (!this.operator) {
      this.error = 'Operator registration is required';
      return;
    }

    this.loading = true;
    this.error = '';

    const formValue = this.certificationForm.value;
    const payload: CreateProductCertificationApplicationRequest = {
      operatorId: this.operator.id,
      markSelection: {
        markRequested: formValue.markSelection.markRequested,
        arsoQualityMark: formValue.markSelection.arsoQualityMark,
        ecoMarkAfrica: formValue.markSelection.ecoMarkAfrica,
        markCombination: formValue.markSelection.markCombination,
      },
      certificationScheme: formValue.certificationScheme,
      volumePriority: formValue.volumePriority,
      products: formValue.products.map((product: any, index: number) => ({
        ...product,
        displayOrder: index,
      })),
      technicalSpecs: formValue.technicalSpecs,
      environmentalClaims: this.hasEmaMark() ? formValue.environmentalClaims : undefined,
      cbSelection: formValue.cbSelection,
      declaration: formValue.declaration,
    };

    if (this.existingApplication && this.existingApplication.id) {
      // Update existing
      this.productCertificationService.updateApplication(this.existingApplication.id, payload).subscribe({
        next: (application) => {
          this.existingApplication = application;
          this.submitApplication(application.id);
        },
        error: (error) => {
          this.loading = false;
          this.error = error.error?.message || 'Failed to update application';
        },
      });
    } else {
      // Create new
      this.productCertificationService.createApplication(payload).subscribe({
        next: (application) => {
          this.existingApplication = application;
          this.submitApplication(application.id);
        },
        error: (error) => {
          this.loading = false;
          this.error = error.error?.message || 'Failed to create application';
        },
      });
    }
  }

  submitApplication(applicationId: string): void {
    this.productCertificationService.submitApplication(applicationId).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      error: (error) => {
        this.loading = false;
        this.error = error.error?.message || 'Failed to submit application';
      },
    });
  }

  getStepTitle(step: number): string {
    const titles = {
      1: 'Application Type',
      2: 'Product Information',
      3: 'Technical Specs',
      4: 'Environmental Claims',
      5: 'CB Selection',
      6: 'Declarations',
    };
    return titles[step as keyof typeof titles] || '';
  }

  navigateToOperatorRegistration(): void {
    this.router.navigate(['/operator/register']);
  }

  onMarkSelectionChange(event: any, markValue: string): void {
    const markRequestedControl = this.certificationForm.get('markSelection.markRequested');
    const currentValue: string[] = markRequestedControl?.value || [];
    
    if (event.target.checked) {
      if (!currentValue.includes(markValue)) {
        markRequestedControl?.setValue([...currentValue, markValue]);
      }
    } else {
      markRequestedControl?.setValue(currentValue.filter((v: string) => v !== markValue));
    }

    // Update arsoQualityMark and ecoMarkAfrica flags
    const updatedValue = markRequestedControl?.value || [];
    this.certificationForm.patchValue({
      markSelection: {
        arsoQualityMark: updatedValue.includes(MarkRequestedType.ARSO_QUALITY_MARK) || updatedValue.includes(MarkRequestedType.BOTH),
        ecoMarkAfrica: updatedValue.includes(MarkRequestedType.ECO_MARK_AFRICA) || updatedValue.includes(MarkRequestedType.BOTH),
      },
    });
  }

  isMarkSelected(markValue: string): boolean {
    const markRequested: string[] = this.certificationForm.get('markSelection.markRequested')?.value || [];
    return markRequested.includes(markValue);
  }

  onStandardsBlur(event: any, control: AbstractControl, fieldName: string): void {
    const value = event.target.value;
    if (value && typeof value === 'string') {
      // Convert comma-separated string to array
      const standardsArray = value.split(',').map((s: string) => s.trim()).filter((s: string) => s.length > 0);
      control.patchValue({ [fieldName]: standardsArray });
    }
  }
}

