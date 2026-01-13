import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { NsbService } from '../../modules/nsb-management/services/nsb.service';
import { StakeholderRegistryService } from '../../modules/nsb-management/services/stakeholder-registry.service';
import { Nsb } from '../../shared/models/nsb.model';
import {
  StakeholderRegistry,
  MarketSurveillanceAuthority,
  CustomsBorderAgency,
  BorderPost,
  RegulatoryAgency,
  IndustryAssociation,
  TestingLaboratory,
  LaboratoryAccreditation,
  OtherStakeholderGroup,
  MsaJurisdiction,
  MsaScopeType,
  MouStatus,
  SystemAccessLevel,
  AcapTrainingStatus,
  CustomsIntegrationStatus,
  BorderPostType,
  RegulatoryAgencyType,
  EngagementLevel,
  LaboratoryType,
  LaboratoryLegalStatus,
  AccreditationStatus,
  DigitalCapability,
  StakeholderCategory,
  NsbPriorityLevel,
} from '../../shared/models/stakeholder-registry.model';
import { AuthService } from '../../modules/auth/services/auth.service';
import { UserRole } from '../../shared/models/user.model';

@Component({
  selector: 'app-nsb-stakeholder-registry',
  templateUrl: './nsb-stakeholder-registry.component.html',
  styleUrls: ['./nsb-stakeholder-registry.component.scss'],
})
export class NsbStakeholderRegistryComponent implements OnInit {
  form: FormGroup;
  loading = false;
  saving = false;
  error = '';
  success = false;
  successMessage = '';
  nsb: Nsb | null = null;

  // Enum options for dropdowns
  msaJurisdictions = [
    { value: MsaJurisdiction.NATIONAL, label: 'National' },
    { value: MsaJurisdiction.REGIONAL, label: 'Regional' },
    { value: MsaJurisdiction.PROVINCIAL, label: 'Provincial' },
    { value: MsaJurisdiction.COUNTY, label: 'County' },
    { value: MsaJurisdiction.MUNICIPAL, label: 'Municipal' },
    { value: MsaJurisdiction.SPECIAL_ECONOMIC_ZONE, label: 'Special Economic Zone' },
    { value: MsaJurisdiction.OTHER, label: 'Other' },
  ];

  msaScopeTypes = [
    { value: MsaScopeType.PRODUCT_SAFETY, label: 'Product Safety' },
    { value: MsaScopeType.QUALITY_CONTROL, label: 'Quality Control' },
    { value: MsaScopeType.METROLOGY, label: 'Metrology' },
    { value: MsaScopeType.CONSUMER_PROTECTION, label: 'Consumer Protection' },
    { value: MsaScopeType.ENVIRONMENTAL_COMPLIANCE, label: 'Environmental Compliance' },
    { value: MsaScopeType.HEALTH_STANDARDS, label: 'Health Standards' },
    { value: MsaScopeType.AGRICULTURE_STANDARDS, label: 'Agriculture Standards' },
    { value: MsaScopeType.IMPORT_EXPORT_CONTROL, label: 'Import/Export Control' },
    { value: MsaScopeType.OTHER, label: 'Other' },
  ];

  mouStatuses = [
    { value: MouStatus.NOT_REQUIRED, label: 'Not Required' },
    { value: MouStatus.PLANNED, label: 'Planned' },
    { value: MouStatus.DRAFT_UNDER_REVIEW, label: 'Draft Under Review' },
    { value: MouStatus.SIGNED_ACTIVE, label: 'Signed Active' },
    { value: MouStatus.EXPIRED, label: 'Expired' },
    { value: MouStatus.TERMINATED, label: 'Terminated' },
    { value: MouStatus.NOT_APPLICABLE, label: 'Not Applicable' },
  ];

  systemAccessLevels = [
    { value: SystemAccessLevel.NO_ACCESS, label: 'No Access' },
    { value: SystemAccessLevel.READ_ONLY_PORTAL, label: 'Read-only Portal' },
    { value: SystemAccessLevel.FULL_SUBMISSION_ACCESS, label: 'Full Submission Access' },
    { value: SystemAccessLevel.CUSTOM, label: 'Custom' },
  ];

  acapTrainingStatuses = [
    { value: AcapTrainingStatus.NOT_TRAINED, label: 'Not Trained' },
    { value: AcapTrainingStatus.BASIC_AWARENESS, label: 'Basic Awareness' },
    { value: AcapTrainingStatus.TECHNICAL_TRAINING_COMPLETED, label: 'Technical Training Completed' },
    { value: AcapTrainingStatus.TRAINER_CERTIFIED, label: 'Trainer Certified' },
  ];

  customsIntegrationStatuses = [
    { value: CustomsIntegrationStatus.FULLY_INTEGRATED, label: 'Fully Integrated' },
    { value: CustomsIntegrationStatus.PARTIAL_INTEGRATION, label: 'Partial Integration' },
    { value: CustomsIntegrationStatus.PLANNED_INTEGRATION, label: 'Planned Integration' },
    { value: CustomsIntegrationStatus.NO_INTEGRATION, label: 'No Integration' },
    { value: CustomsIntegrationStatus.UNKNOWN, label: 'Unknown' },
  ];

  borderPostTypes = [
    { value: BorderPostType.AIRPORT, label: 'Airport' },
    { value: BorderPostType.SEAPORT, label: 'Seaport' },
    { value: BorderPostType.LAND_BORDER, label: 'Land Border' },
    { value: BorderPostType.DRY_PORT, label: 'Dry Port' },
    { value: BorderPostType.INLAND_DEPOT, label: 'Inland Depot' },
    { value: BorderPostType.OTHER, label: 'Other' },
  ];

  regulatoryAgencyTypes = [
    { value: RegulatoryAgencyType.FOOD_DRUG_AUTHORITY, label: 'Food & Drug Authority' },
    { value: RegulatoryAgencyType.AGRICULTURE_MINISTRY, label: 'Agriculture Ministry' },
    { value: RegulatoryAgencyType.HEALTH_MINISTRY, label: 'Health Ministry' },
    { value: RegulatoryAgencyType.ENVIRONMENT_AGENCY, label: 'Environment Agency' },
    { value: RegulatoryAgencyType.INDUSTRY_TRADE_MINISTRY, label: 'Industry & Trade Ministry' },
    { value: RegulatoryAgencyType.OTHER, label: 'Other' },
  ];

  engagementLevels = [
    { value: EngagementLevel.ACTIVE_PARTNER, label: 'Active Partner' },
    { value: EngagementLevel.INTERESTED, label: 'Interested' },
    { value: EngagementLevel.NEUTRAL, label: 'Neutral' },
    { value: EngagementLevel.RESISTANT, label: 'Resistant' },
    { value: EngagementLevel.NO_ENGAGEMENT, label: 'No Engagement' },
    { value: EngagementLevel.REGULAR_CONTACT, label: 'Regular Contact' },
    { value: EngagementLevel.OCCASIONAL_CONTACT, label: 'Occasional Contact' },
    { value: EngagementLevel.NEW_CONTACT, label: 'New Contact' },
    { value: EngagementLevel.DORMANT, label: 'Dormant' },
  ];

  laboratoryTypes = [
    { value: LaboratoryType.TESTING_LABORATORY, label: 'Testing Laboratory' },
    { value: LaboratoryType.CALIBRATION_LABORATORY, label: 'Calibration Laboratory' },
    { value: LaboratoryType.MEDICAL_LABORATORY, label: 'Medical Laboratory' },
    { value: LaboratoryType.INSPECTION_BODY, label: 'Inspection Body' },
    { value: LaboratoryType.CERTIFICATION_BODY, label: 'Certification Body' },
    { value: LaboratoryType.RESEARCH_INSTITUTE, label: 'Research Institute' },
  ];

  laboratoryLegalStatuses = [
    { value: LaboratoryLegalStatus.GOVERNMENT_OWNED, label: 'Government-owned' },
    { value: LaboratoryLegalStatus.PRIVATE_COMMERCIAL, label: 'Private Commercial' },
    { value: LaboratoryLegalStatus.UNIVERSITY_AFFILIATED, label: 'University-affiliated' },
    { value: LaboratoryLegalStatus.NON_PROFIT, label: 'Non-profit' },
    { value: LaboratoryLegalStatus.INTERNATIONAL_BRANCH, label: 'International Branch' },
  ];

  accreditationStatuses = [
    { value: AccreditationStatus.AFRAC_MRA_SIGNATORY, label: 'AFRAC MRA Signatory' },
    { value: AccreditationStatus.ILAC_MRA_SIGNATORY, label: 'ILAC MRA Signatory' },
    { value: AccreditationStatus.REGIONAL_MRA, label: 'Regional MRA' },
    { value: AccreditationStatus.NATIONAL_ACCREDITATION_ONLY, label: 'National Accreditation Only' },
    { value: AccreditationStatus.NOT_ACCREDITED, label: 'Not Accredited' },
    { value: AccreditationStatus.APPLICATION_IN_PROGRESS, label: 'Application in Progress' },
  ];

  digitalCapabilities = [
    { value: DigitalCapability.PDF_REPORTS_ONLY, label: 'PDF Reports Only' },
    { value: DigitalCapability.DIGITAL_SIGNATURES, label: 'Digital Signatures' },
    { value: DigitalCapability.API_INTEGRATION, label: 'API Integration' },
    { value: DigitalCapability.BLOCKCHAIN_ENABLED, label: 'Blockchain-enabled' },
    { value: DigitalCapability.NONE, label: 'None' },
  ];

  stakeholderCategories = [
    { value: StakeholderCategory.ACADEMIC_RESEARCH, label: 'Academic/Research Institutions' },
    { value: StakeholderCategory.CONSUMER_ORGANIZATIONS, label: 'Consumer Organizations' },
    { value: StakeholderCategory.DEVELOPMENT_PARTNERS, label: 'Development Partners' },
    { value: StakeholderCategory.FINANCIAL_INSTITUTIONS, label: 'Financial Institutions' },
    { value: StakeholderCategory.MEDIA_ORGANIZATIONS, label: 'Media Organizations' },
    { value: StakeholderCategory.PROFESSIONAL_BODIES, label: 'Professional Bodies' },
    { value: StakeholderCategory.TRADE_UNIONS, label: 'Trade Unions' },
    { value: StakeholderCategory.OTHER, label: 'Other' },
  ];

  nsbPriorityLevels = [
    { value: NsbPriorityLevel.HIGH_PRIORITY, label: 'High Priority' },
    { value: NsbPriorityLevel.MEDIUM_PRIORITY, label: 'Medium Priority' },
    { value: NsbPriorityLevel.LOW_PRIORITY, label: 'Low Priority' },
    { value: NsbPriorityLevel.MONITOR_ONLY, label: 'Monitor Only' },
  ];

  constructor(
    private fb: FormBuilder,
    private nsbService: NsbService,
    private stakeholderRegistryService: StakeholderRegistryService,
    private router: Router,
    private authService: AuthService,
  ) {
    this.form = this.fb.group({
      marketSurveillanceAuthorities: this.fb.array([]),
      customsBorderAgencies: this.fb.array([]),
      regulatoryAgencies: this.fb.array([]),
      industryAssociations: this.fb.array([]),
      testingLaboratories: this.fb.array([]),
      otherStakeholderGroups: this.fb.array([]),
    });
  }

  // FormArray getters
  get msaFormArray(): FormArray {
    return this.form.get('marketSurveillanceAuthorities') as FormArray;
  }

  get customsFormArray(): FormArray {
    return this.form.get('customsBorderAgencies') as FormArray;
  }

  get regulatoryFormArray(): FormArray {
    return this.form.get('regulatoryAgencies') as FormArray;
  }

  get industryFormArray(): FormArray {
    return this.form.get('industryAssociations') as FormArray;
  }

  get laboratoryFormArray(): FormArray {
    return this.form.get('testingLaboratories') as FormArray;
  }

  get otherStakeholderFormArray(): FormArray {
    return this.form.get('otherStakeholderGroups') as FormArray;
  }

  // Create form groups for each stakeholder type
  createMsaFormGroup(msa?: MarketSurveillanceAuthority): FormGroup {
    return this.fb.group({
      id: [msa?.id || ''],
      agencyName: [msa?.agencyName || '', Validators.required],
      agencyNameEnglish: [msa?.agencyNameEnglish || ''],
      acronym: [msa?.acronym || ''],
      jurisdiction: [msa?.jurisdiction || MsaJurisdiction.NATIONAL, Validators.required],
      jurisdictionOther: [msa?.jurisdictionOther || ''],
      parentMinistry: [msa?.parentMinistry || ''],
      contactPersonName: [msa?.contactPersonName || '', Validators.required],
      contactPersonTitle: [msa?.contactPersonTitle || ''],
      contactEmail: [msa?.contactEmail || '', [Validators.required, Validators.email]],
      contactPhone: [msa?.contactPhone || '', Validators.required],
      contactAlt: [msa?.contactAlt || ''],
      scopeOfAuthority: [msa?.scopeOfAuthority || []],
      scopeOther: [msa?.scopeOther || ''],
      productsCovered: [msa?.productsCovered || []],
      mouStatus: [msa?.mouStatus || MouStatus.NOT_APPLICABLE, Validators.required],
      mouStartDate: [msa?.mouStartDate || ''],
      mouEndDate: [msa?.mouEndDate || ''],
      accessLevel: [msa?.accessLevel || SystemAccessLevel.NO_ACCESS, Validators.required],
      customAccessRequirements: [msa?.customAccessRequirements || ''],
      trainingStatus: [msa?.trainingStatus || AcapTrainingStatus.NOT_TRAINED, Validators.required],
      lastTrainingDate: [msa?.lastTrainingDate || ''],
      isNationalFocalPoint: [msa?.isNationalFocalPoint || false],
      notes: [msa?.notes || ''],
    });
  }

  createCustomsFormGroup(customs?: CustomsBorderAgency): FormGroup {
    return this.fb.group({
      id: [customs?.id || ''],
      agencyName: [customs?.agencyName || '', Validators.required],
      parentMinistry: [customs?.parentMinistry || '', Validators.required],
      primaryContactName: [customs?.primaryContactName || '', Validators.required],
      coordinatorEmail: [customs?.coordinatorEmail || '', [Validators.required, Validators.email]],
      coordinatorPhone: [customs?.coordinatorPhone || '', Validators.required],
      integrationStatus: [customs?.integrationStatus || CustomsIntegrationStatus.UNKNOWN, Validators.required],
      integrationDetails: [customs?.integrationDetails || ''],
      apiAvailable: [customs?.apiAvailable || 'NO'],
      borderPosts: this.fb.array(customs?.borderPosts?.map(bp => this.createBorderPostFormGroup(bp)) || []),
    });
  }

  createBorderPostFormGroup(bp?: BorderPost): FormGroup {
    return this.fb.group({
      id: [bp?.id || ''],
      borderPostName: [bp?.borderPostName || '', Validators.required],
      postType: [bp?.postType || BorderPostType.LAND_BORDER, Validators.required],
      location: [bp?.location || '', Validators.required],
      gpsCoordinates: [bp?.gpsCoordinates || ''],
      contactName: [bp?.contactName || '', Validators.required],
      contactPhone: [bp?.contactPhone || '', Validators.required],
      contactEmail: [bp?.contactEmail || ''],
      operatingHours: [bp?.operatingHours || '', Validators.required],
      verificationEquipment: [bp?.verificationEquipment || []],
      trainingNeeds: [bp?.trainingNeeds || []],
      estimatedAnnualTraffic: [bp?.estimatedAnnualTraffic || ''],
    });
  }

  createRegulatoryFormGroup(regulatory?: RegulatoryAgency): FormGroup {
    return this.fb.group({
      id: [regulatory?.id || ''],
      agencyType: [regulatory?.agencyType || RegulatoryAgencyType.OTHER, Validators.required],
      agencyName: [regulatory?.agencyName || '', Validators.required],
      specificDepartment: [regulatory?.specificDepartment || ''],
      contactPersonName: [regulatory?.contactPersonName || ''],
      contactEmail: [regulatory?.contactEmail || ''],
      contactPhone: [regulatory?.contactPhone || ''],
      engagementLevel: [regulatory?.engagementLevel || EngagementLevel.NO_ENGAGEMENT],
      relevantMandate: [regulatory?.relevantMandate || ''],
    });
  }

  createIndustryFormGroup(industry?: IndustryAssociation): FormGroup {
    return this.fb.group({
      id: [industry?.id || ''],
      associationName: [industry?.associationName || '', Validators.required],
      acronym: [industry?.acronym || ''],
      registrationNumber: [industry?.registrationNumber || '', Validators.required],
      primarySector: [industry?.primarySector || [], Validators.required],
      subSectors: [industry?.subSectors || []],
      membershipType: [industry?.membershipType || [], Validators.required],
      memberCount: [industry?.memberCount || null, [Validators.required, Validators.min(0)]],
      estimatedSmeMembers: [industry?.estimatedSmeMembers || null],
      contactPersonName: [industry?.contactPersonName || '', Validators.required],
      contactTitle: [industry?.contactTitle || '', Validators.required],
      contactEmail: [industry?.contactEmail || '', [Validators.required, Validators.email]],
      contactPhone: [industry?.contactPhone || '', Validators.required],
      website: [industry?.website || ''],
      willingnessToPromoteAcap: [industry?.willingnessToPromoteAcap || ''],
      promotionMethods: [industry?.promotionMethods || []],
      trainingNeeds: [industry?.trainingNeeds || []],
      memberChallenges: [industry?.memberChallenges || []],
      annualEvents: [industry?.annualEvents || ''],
      notes: [industry?.notes || ''],
    });
  }

  createLaboratoryFormGroup(lab?: TestingLaboratory): FormGroup {
    return this.fb.group({
      id: [lab?.id || ''],
      name: [lab?.name || '', Validators.required],
      organizationType: [lab?.organizationType || LaboratoryType.TESTING_LABORATORY, Validators.required],
      legalStatus: [lab?.legalStatus || LaboratoryLegalStatus.PRIVATE_COMMERCIAL, Validators.required],
      accreditationStatus: [lab?.accreditationStatus || AccreditationStatus.NOT_ACCREDITED, Validators.required],
      acapContactName: [lab?.acapContactName || '', Validators.required],
      contactEmail: [lab?.contactEmail || '', [Validators.required, Validators.email]],
      contactPhone: [lab?.contactPhone || '', Validators.required],
      emergencyContact: [lab?.emergencyContact || ''],
      testingCategories: [lab?.testingCategories || [], Validators.required],
      specificTestMethods: [lab?.specificTestMethods || []],
      productsCovered: [lab?.productsCovered || [], Validators.required],
      reportLanguages: [lab?.reportLanguages || []],
      digitalCapability: [lab?.digitalCapability || DigitalCapability.PDF_REPORTS_ONLY, Validators.required],
      typicalTurnaroundTime: [lab?.typicalTurnaroundTime || ''],
      feeStructureType: [lab?.feeStructureType || ''],
      willingAcapListing: [lab?.willingAcapListing || 'NO', Validators.required],
      listingConditions: [lab?.listingConditions || ''],
      notes: [lab?.notes || ''],
      accreditations: this.fb.array(lab?.accreditations?.map(acc => this.createAccreditationFormGroup(acc)) || []),
    });
  }

  createAccreditationFormGroup(acc?: LaboratoryAccreditation): FormGroup {
    return this.fb.group({
      id: [acc?.id || ''],
      accreditationBody: [acc?.accreditationBody || '', Validators.required],
      certificateNumber: [acc?.certificateNumber || '', Validators.required],
      scopeOfAccreditation: [acc?.scopeOfAccreditation || '', Validators.required],
      accreditationExpiryDate: [acc?.accreditationExpiryDate || '', Validators.required],
    });
  }

  createOtherStakeholderFormGroup(stakeholder?: OtherStakeholderGroup): FormGroup {
    return this.fb.group({
      id: [stakeholder?.id || ''],
      stakeholderCategory: [stakeholder?.stakeholderCategory || StakeholderCategory.OTHER, Validators.required],
      categoryOther: [stakeholder?.categoryOther || ''],
      primaryContactName: [stakeholder?.primaryContactName || '', Validators.required],
      contactEmail: [stakeholder?.contactEmail || '', [Validators.required, Validators.email]],
      contactPhone: [stakeholder?.contactPhone || '', Validators.required],
      engagementLevel: [stakeholder?.engagementLevel || EngagementLevel.NEW_CONTACT, Validators.required],
      nsbPriorityLevel: [stakeholder?.nsbPriorityLevel || NsbPriorityLevel.MEDIUM_PRIORITY, Validators.required],
      categorySpecificData: [stakeholder?.categorySpecificData || {}],
      notes: [stakeholder?.notes || ''],
    });
  }

  // Add/Remove methods
  addMsa(): void {
    this.msaFormArray.push(this.createMsaFormGroup());
  }

  removeMsa(index: number): void {
    this.msaFormArray.removeAt(index);
  }

  addCustoms(): void {
    this.customsFormArray.push(this.createCustomsFormGroup());
  }

  removeCustoms(index: number): void {
    this.customsFormArray.removeAt(index);
  }

  addBorderPost(customsIndex: number): void {
    const customsGroup = this.customsFormArray.at(customsIndex) as FormGroup;
    const borderPostsArray = customsGroup.get('borderPosts') as FormArray;
    borderPostsArray.push(this.createBorderPostFormGroup());
  }

  removeBorderPost(customsIndex: number, borderPostIndex: number): void {
    const customsGroup = this.customsFormArray.at(customsIndex) as FormGroup;
    const borderPostsArray = customsGroup.get('borderPosts') as FormArray;
    borderPostsArray.removeAt(borderPostIndex);
  }

  getBorderPostsArray(customsIndex: number): FormArray {
    const customsGroup = this.customsFormArray.at(customsIndex) as FormGroup;
    return customsGroup.get('borderPosts') as FormArray;
  }

  addRegulatory(): void {
    this.regulatoryFormArray.push(this.createRegulatoryFormGroup());
  }

  removeRegulatory(index: number): void {
    this.regulatoryFormArray.removeAt(index);
  }

  addIndustry(): void {
    this.industryFormArray.push(this.createIndustryFormGroup());
  }

  removeIndustry(index: number): void {
    this.industryFormArray.removeAt(index);
  }

  addLaboratory(): void {
    this.laboratoryFormArray.push(this.createLaboratoryFormGroup());
  }

  removeLaboratory(index: number): void {
    this.laboratoryFormArray.removeAt(index);
  }

  addAccreditation(labIndex: number): void {
    const labGroup = this.laboratoryFormArray.at(labIndex) as FormGroup;
    const accreditationsArray = labGroup.get('accreditations') as FormArray;
    accreditationsArray.push(this.createAccreditationFormGroup());
  }

  removeAccreditation(labIndex: number, accIndex: number): void {
    const labGroup = this.laboratoryFormArray.at(labIndex) as FormGroup;
    const accreditationsArray = labGroup.get('accreditations') as FormArray;
    accreditationsArray.removeAt(accIndex);
  }

  getAccreditationsArray(labIndex: number): FormArray {
    const labGroup = this.laboratoryFormArray.at(labIndex) as FormGroup;
    return labGroup.get('accreditations') as FormArray;
  }

  addOtherStakeholder(): void {
    this.otherStakeholderFormArray.push(this.createOtherStakeholderFormGroup());
  }

  removeOtherStakeholder(index: number): void {
    this.otherStakeholderFormArray.removeAt(index);
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    const user = this.authService.currentUserValue;
    const userRoles = user?.roles || (user?.role ? [user.role] : []);
    const isSuperAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.ARSO_SECRETARIAT);
    
    if (isSuperAdmin) {
      // For super admins, get the list of NSBs and use the first one
      this.nsbService.getNsbList({ limit: 1 })
        .pipe(
          finalize(() => {
            this.loading = false;
          }),
        )
        .subscribe({
          next: (response) => {
            if (response.data && response.data.length > 0) {
              this.nsb = response.data[0];
              this.loadStakeholderRegistry(this.nsb.id);
            } else {
              this.error = 'No NSBs found.';
            }
          },
          error: () => {
            this.error = 'Failed to load NSBs.';
          },
        });
    } else {
      // For NSB admins/users, get their own NSB
      this.nsbService
        .getMyNsb()
        .pipe(
          finalize(() => {
            this.loading = false;
          }),
        )
        .subscribe({
          next: (nsb) => {
            this.nsb = nsb;
            this.loadStakeholderRegistry(nsb.id);
          },
          error: () => {
            this.error = 'NSB profile not found. Please contact ARSO Secretariat.';
          },
        });
    }
  }

  loadStakeholderRegistry(nsbId: string): void {
    this.stakeholderRegistryService.getStakeholderRegistry(nsbId).subscribe({
      next: (registry) => {
        // Load Market Surveillance Authorities
        if (registry.marketSurveillanceAuthorities) {
          registry.marketSurveillanceAuthorities.forEach((msa) => {
            this.msaFormArray.push(this.createMsaFormGroup(msa));
          });
        }

        // Load Customs/Border Agencies
        if (registry.customsBorderAgencies) {
          registry.customsBorderAgencies.forEach((customs) => {
            this.customsFormArray.push(this.createCustomsFormGroup(customs));
          });
        }

        // Load Regulatory Agencies
        if (registry.regulatoryAgencies) {
          registry.regulatoryAgencies.forEach((regulatory) => {
            this.regulatoryFormArray.push(this.createRegulatoryFormGroup(regulatory));
          });
        }

        // Load Industry Associations
        if (registry.industryAssociations) {
          registry.industryAssociations.forEach((industry) => {
            this.industryFormArray.push(this.createIndustryFormGroup(industry));
          });
        }

        // Load Testing Laboratories
        if (registry.testingLaboratories) {
          registry.testingLaboratories.forEach((lab) => {
            this.laboratoryFormArray.push(this.createLaboratoryFormGroup(lab));
          });
        }

        // Load Other Stakeholder Groups
        if (registry.otherStakeholderGroups) {
          registry.otherStakeholderGroups.forEach((stakeholder) => {
            this.otherStakeholderFormArray.push(this.createOtherStakeholderFormGroup(stakeholder));
          });
        }
      },
      error: () => {
        // If no registry exists yet, start with empty arrays
      },
    });
  }

  saveDraft(): void {
    if (!this.nsb?.id) {
      this.error = 'NSB not found.';
      return;
    }

    this.saving = true;
    this.error = '';
    this.success = false;

    const formValue = this.form.getRawValue();

    // Build the stakeholder registry DTO (no validation for draft)
    const registry: StakeholderRegistry = this.buildRegistryDto(formValue);

    this.stakeholderRegistryService
      .saveDraft(this.nsb.id, registry)
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
      )
      .subscribe({
        next: () => {
          this.success = true;
          this.successMessage = 'Stakeholder registry saved as draft successfully.';
          setTimeout(() => {
            this.success = false;
          }, 5000);
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to save draft. Please try again.';
        },
      });
  }

  submitRegistry(): void {
    if (this.form.invalid || !this.nsb?.id) {
      this.form.markAllAsTouched();
      this.error = 'Please fill in all required fields before submitting.';
      return;
    }

    if (!confirm('Are you sure you want to submit this stakeholder registry? Once submitted, you cannot edit it until it is reviewed.')) {
      return;
    }

    this.saving = true;
    this.error = '';
    this.success = false;

    const formValue = this.form.getRawValue();

    // Build the stakeholder registry DTO (with validation)
    const registry: StakeholderRegistry = this.buildRegistryDto(formValue);

    this.stakeholderRegistryService
      .submitRegistry(this.nsb.id, registry)
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
      )
      .subscribe({
        next: () => {
          this.success = true;
          this.successMessage = 'Stakeholder registry submitted successfully.';
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to submit stakeholder registry. Please check all required fields and try again.';
        },
      });
  }

  private buildRegistryDto(formValue: any): StakeholderRegistry {
    return {
      marketSurveillanceAuthorities: formValue.marketSurveillanceAuthorities
        .filter((msa: any) => msa.agencyName)
        .map((msa: any) => ({
          id: msa.id || undefined,
          agencyName: msa.agencyName,
          agencyNameEnglish: msa.agencyNameEnglish || undefined,
          acronym: msa.acronym || undefined,
          jurisdiction: msa.jurisdiction,
          jurisdictionOther: msa.jurisdiction === MsaJurisdiction.OTHER ? msa.jurisdictionOther : undefined,
          parentMinistry: msa.parentMinistry || undefined,
          contactPersonName: msa.contactPersonName,
          contactPersonTitle: msa.contactPersonTitle || undefined,
          contactEmail: msa.contactEmail,
          contactPhone: msa.contactPhone,
          contactAlt: msa.contactAlt || undefined,
          scopeOfAuthority: msa.scopeOfAuthority || undefined,
          scopeOther: msa.scopeOther || undefined,
          productsCovered: msa.productsCovered || undefined,
          mouStatus: msa.mouStatus,
          mouStartDate: msa.mouStartDate || undefined,
          mouEndDate: msa.mouEndDate || undefined,
          accessLevel: msa.accessLevel,
          customAccessRequirements: msa.accessLevel === SystemAccessLevel.CUSTOM ? msa.customAccessRequirements : undefined,
          trainingStatus: msa.trainingStatus,
          lastTrainingDate: msa.lastTrainingDate || undefined,
          isNationalFocalPoint: msa.isNationalFocalPoint || false,
          notes: msa.notes || undefined,
        })),
      customsBorderAgencies: formValue.customsBorderAgencies
        .filter((c: any) => c.agencyName)
        .map((c: any) => ({
          id: c.id || undefined,
          agencyName: c.agencyName,
          parentMinistry: c.parentMinistry,
          primaryContactName: c.primaryContactName,
          coordinatorEmail: c.coordinatorEmail,
          coordinatorPhone: c.coordinatorPhone,
          integrationStatus: c.integrationStatus,
          integrationDetails: c.integrationDetails || undefined,
          apiAvailable: c.apiAvailable || undefined,
          borderPosts: c.borderPosts
            ?.filter((bp: any) => bp.borderPostName)
            .map((bp: any) => ({
              id: bp.id || undefined,
              borderPostName: bp.borderPostName,
              postType: bp.postType,
              location: bp.location,
              gpsCoordinates: bp.gpsCoordinates || undefined,
              contactName: bp.contactName,
              contactPhone: bp.contactPhone,
              contactEmail: bp.contactEmail || undefined,
              operatingHours: bp.operatingHours,
              verificationEquipment: bp.verificationEquipment || undefined,
              trainingNeeds: bp.trainingNeeds || undefined,
              estimatedAnnualTraffic: bp.estimatedAnnualTraffic || undefined,
            })),
        })),
      regulatoryAgencies: formValue.regulatoryAgencies
        .filter((r: any) => r.agencyName)
        .map((r: any) => ({
          id: r.id || undefined,
          agencyType: r.agencyType,
          agencyName: r.agencyName,
          specificDepartment: r.specificDepartment || undefined,
          contactPersonName: r.contactPersonName || undefined,
          contactEmail: r.contactEmail || undefined,
          contactPhone: r.contactPhone || undefined,
          engagementLevel: r.engagementLevel || undefined,
          relevantMandate: r.relevantMandate || undefined,
        })),
      industryAssociations: formValue.industryAssociations
        .filter((i: any) => i.associationName)
        .map((i: any) => ({
          id: i.id || undefined,
          associationName: i.associationName,
          acronym: i.acronym || undefined,
          registrationNumber: i.registrationNumber,
          primarySector: i.primarySector,
          subSectors: i.subSectors || undefined,
          membershipType: i.membershipType,
          memberCount: i.memberCount,
          estimatedSmeMembers: i.estimatedSmeMembers || undefined,
          contactPersonName: i.contactPersonName,
          contactTitle: i.contactTitle,
          contactEmail: i.contactEmail,
          contactPhone: i.contactPhone,
          website: i.website || undefined,
          willingnessToPromoteAcap: i.willingnessToPromoteAcap || undefined,
          promotionMethods: i.promotionMethods || undefined,
          trainingNeeds: i.trainingNeeds || undefined,
          memberChallenges: i.memberChallenges || undefined,
          annualEvents: i.annualEvents || undefined,
          notes: i.notes || undefined,
        })),
      testingLaboratories: formValue.testingLaboratories
        .filter((l: any) => l.name)
        .map((l: any) => ({
          id: l.id || undefined,
          name: l.name,
          organizationType: l.organizationType,
          legalStatus: l.legalStatus,
          accreditationStatus: l.accreditationStatus,
          acapContactName: l.acapContactName,
          contactEmail: l.contactEmail,
          contactPhone: l.contactPhone,
          emergencyContact: l.emergencyContact || undefined,
          testingCategories: l.testingCategories,
          specificTestMethods: l.specificTestMethods || undefined,
          productsCovered: l.productsCovered,
          reportLanguages: l.reportLanguages || undefined,
          digitalCapability: l.digitalCapability,
          typicalTurnaroundTime: l.typicalTurnaroundTime || undefined,
          feeStructureType: l.feeStructureType || undefined,
          willingAcapListing: l.willingAcapListing,
          listingConditions: l.willingAcapListing === 'CONDITIONAL' ? l.listingConditions : undefined,
          notes: l.notes || undefined,
          accreditations: l.accreditations
            ?.filter((acc: any) => acc.accreditationBody)
            .map((acc: any) => ({
              id: acc.id || undefined,
              accreditationBody: acc.accreditationBody,
              certificateNumber: acc.certificateNumber,
              scopeOfAccreditation: acc.scopeOfAccreditation,
              accreditationExpiryDate: acc.accreditationExpiryDate,
            })),
        })),
      otherStakeholderGroups: formValue.otherStakeholderGroups
        .filter((s: any) => s.primaryContactName)
        .map((s: any) => ({
          id: s.id || undefined,
          stakeholderCategory: s.stakeholderCategory,
          categoryOther: s.stakeholderCategory === StakeholderCategory.OTHER ? s.categoryOther : undefined,
          primaryContactName: s.primaryContactName,
          contactEmail: s.contactEmail,
          contactPhone: s.contactPhone,
          engagementLevel: s.engagementLevel,
          nsbPriorityLevel: s.nsbPriorityLevel,
          categorySpecificData: s.categorySpecificData || undefined,
          notes: s.notes || undefined,
        })),
    };
  }

  goToDashboard(): void {
    this.router.navigate(['/nsb/dashboard']);
  }

  // Helper methods for multi-select checkboxes
  toggleMultiSelectValue(control: AbstractControl, value: string): void {
    if (!(control instanceof FormControl)) return;
    const currentValue = control.value || [];
    const index = currentValue.indexOf(value);
    if (index > -1) {
      currentValue.splice(index, 1);
    } else {
      currentValue.push(value);
    }
    control.setValue([...currentValue]);
  }

  isMultiSelectChecked(control: AbstractControl, value: string): boolean {
    if (!control) return false;
    const currentValue = control.value || [];
    return Array.isArray(currentValue) && currentValue.indexOf(value) > -1;
  }

  // Helper methods for tag input (comma-separated to array conversion)
  getTagInputValue(control: AbstractControl): string {
    if (!control) return '';
    const value = control.value || [];
    return Array.isArray(value) ? value.join(', ') : (value || '');
  }

  setTagInputValue(control: AbstractControl, value: string): void {
    if (!(control instanceof FormControl)) return;
    const tags = value
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    control.setValue(tags);
  }

  // Helper to check if field should be shown conditionally
  shouldShowField(control: AbstractControl | null, condition: any): boolean {
    return control?.value === condition;
  }
}
