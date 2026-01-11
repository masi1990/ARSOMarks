import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { NsbService } from '../../modules/nsb-management/services/nsb.service';
import { StakeholderRegistryService } from '../../modules/nsb-management/services/stakeholder-registry.service';
import { Nsb } from '../../shared/models/nsb.model';
import {
  StakeholderRegistry,
  MarketSurveillanceAuthority,
  CustomsBorderAgency,
  RegulatoryAgency,
  IndustryAssociation,
  TestingLaboratory,
  MsaJurisdiction,
  MouStatus,
  SystemAccessLevel,
  RegulatoryAgencyType,
  AccreditationStatus,
} from '../../shared/models/stakeholder-registry.model';
import { AuthService } from '../../modules/auth/services/auth.service';

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
  ];

  mouStatuses = [
    { value: MouStatus.SIGNED, label: 'Signed' },
    { value: MouStatus.PENDING, label: 'Pending' },
    { value: MouStatus.NOT_SIGNED, label: 'Not Signed' },
    { value: MouStatus.N_A, label: 'N/A' },
  ];

  systemAccessLevels = [
    { value: SystemAccessLevel.READ_ONLY, label: 'Read-only' },
    { value: SystemAccessLevel.FULL, label: 'Full' },
  ];

  regulatoryAgencyTypes = [
    { value: RegulatoryAgencyType.FOOD_DRUG_AUTHORITY, label: 'Food & Drug Authority' },
    { value: RegulatoryAgencyType.AGRICULTURE_MINISTRY, label: 'Agriculture Ministry' },
    { value: RegulatoryAgencyType.HEALTH_MINISTRY, label: 'Health Ministry' },
    { value: RegulatoryAgencyType.ENVIRONMENT_AGENCY, label: 'Environment Agency' },
    { value: RegulatoryAgencyType.INDUSTRY_TRADE_MINISTRY, label: 'Industry & Trade Ministry' },
    { value: RegulatoryAgencyType.OTHER, label: 'Other' },
  ];

  accreditationStatuses = [
    { value: AccreditationStatus.AFRAC_MRA, label: 'AFRAC MRA' },
    { value: AccreditationStatus.OTHER, label: 'Other' },
    { value: AccreditationStatus.NONE, label: 'None' },
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

  // Create form groups for each stakeholder type
  createMsaFormGroup(msa?: MarketSurveillanceAuthority): FormGroup {
    return this.fb.group({
      id: [msa?.id || ''],
      agencyName: [msa?.agencyName || '', Validators.required],
      jurisdiction: [msa?.jurisdiction || MsaJurisdiction.NATIONAL, Validators.required],
      contactPersonName: [msa?.contactPersonName || '', Validators.required],
      contactPersonEmail: [msa?.contactPersonEmail || '', Validators.email],
      contactPersonPhone: [msa?.contactPersonPhone || ''],
      scopeOfAuthority: [msa?.scopeOfAuthority || ''],
      mouStatus: [msa?.mouStatus || ''],
      systemAccessLevelRequested: [msa?.systemAccessLevelRequested || ''],
    });
  }

  createCustomsFormGroup(customs?: CustomsBorderAgency): FormGroup {
    return this.fb.group({
      id: [customs?.id || ''],
      agencyName: [customs?.agencyName || '', Validators.required],
      keyBorderPosts: [customs?.keyBorderPosts?.join(', ') || ''],
      acapVerificationContactName: [customs?.acapVerificationContactName || ''],
      acapVerificationContactEmail: [customs?.acapVerificationContactEmail || '', Validators.email],
      acapVerificationContactPhone: [customs?.acapVerificationContactPhone || ''],
      integrationWithNationalSingleWindow: [customs?.integrationWithNationalSingleWindow || false],
    });
  }

  createRegulatoryFormGroup(regulatory?: RegulatoryAgency): FormGroup {
    return this.fb.group({
      id: [regulatory?.id || ''],
      agencyName: [regulatory?.agencyName || '', Validators.required],
      agencyType: [regulatory?.agencyType || RegulatoryAgencyType.FOOD_DRUG_AUTHORITY, Validators.required],
      otherTypeDescription: [regulatory?.otherTypeDescription || ''],
      contactPersonName: [regulatory?.contactPersonName || ''],
      contactPersonEmail: [regulatory?.contactPersonEmail || '', Validators.email],
      contactPersonPhone: [regulatory?.contactPersonPhone || ''],
    });
  }

  createIndustryFormGroup(industry?: IndustryAssociation): FormGroup {
    return this.fb.group({
      id: [industry?.id || ''],
      associationName: [industry?.associationName || '', Validators.required],
      sectorIndustry: [industry?.sectorIndustry || ''],
      numberOfMembers: [industry?.numberOfMembers || null, Validators.min(0)],
      contactPersonName: [industry?.contactPersonName || ''],
      contactPersonEmail: [industry?.contactPersonEmail || '', Validators.email],
      contactPersonPhone: [industry?.contactPersonPhone || ''],
      willingnessToPromoteAcap: [industry?.willingnessToPromoteAcap || false],
    });
  }

  createLaboratoryFormGroup(lab?: TestingLaboratory): FormGroup {
    return this.fb.group({
      id: [lab?.id || ''],
      name: [lab?.name || '', Validators.required],
      accreditationStatus: [lab?.accreditationStatus || ''],
      otherAccreditationDescription: [lab?.otherAccreditationDescription || ''],
      scopeOfAccreditation: [lab?.scopeOfAccreditation || ''],
      contactForAcapReferralsName: [lab?.contactForAcapReferralsName || ''],
      contactForAcapReferralsEmail: [lab?.contactForAcapReferralsEmail || '', Validators.email],
      contactForAcapReferralsPhone: [lab?.contactForAcapReferralsPhone || ''],
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

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
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
      },
      error: () => {
        // If no registry exists yet, start with empty arrays
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid || !this.nsb?.id) {
      this.form.markAllAsTouched();
      this.error = 'Please fill in all required fields.';
      return;
    }

    this.saving = true;
    this.error = '';
    this.success = false;

    const formValue = this.form.getRawValue();

    // Build the stakeholder registry DTO
    const registry: StakeholderRegistry = {
      marketSurveillanceAuthorities: formValue.marketSurveillanceAuthorities
        .filter((msa: any) => msa.agencyName)
        .map((msa: any) => ({
          id: msa.id || undefined,
          agencyName: msa.agencyName,
          jurisdiction: msa.jurisdiction,
          contactPersonName: msa.contactPersonName,
          contactPersonEmail: msa.contactPersonEmail || undefined,
          contactPersonPhone: msa.contactPersonPhone || undefined,
          scopeOfAuthority: msa.scopeOfAuthority || undefined,
          mouStatus: msa.mouStatus || undefined,
          systemAccessLevelRequested: msa.systemAccessLevelRequested || undefined,
        })),
      customsBorderAgencies: formValue.customsBorderAgencies
        .filter((c: any) => c.agencyName)
        .map((c: any) => ({
          id: c.id || undefined,
          agencyName: c.agencyName,
          keyBorderPosts: c.keyBorderPosts ? c.keyBorderPosts.split(',').map((p: string) => p.trim()).filter((p: string) => p) : [],
          acapVerificationContactName: c.acapVerificationContactName || undefined,
          acapVerificationContactEmail: c.acapVerificationContactEmail || undefined,
          acapVerificationContactPhone: c.acapVerificationContactPhone || undefined,
          integrationWithNationalSingleWindow: c.integrationWithNationalSingleWindow || false,
        })),
      regulatoryAgencies: formValue.regulatoryAgencies
        .filter((r: any) => r.agencyName)
        .map((r: any) => ({
          id: r.id || undefined,
          agencyName: r.agencyName,
          agencyType: r.agencyType,
          otherTypeDescription: r.otherTypeDescription || undefined,
          contactPersonName: r.contactPersonName || undefined,
          contactPersonEmail: r.contactPersonEmail || undefined,
          contactPersonPhone: r.contactPersonPhone || undefined,
        })),
      industryAssociations: formValue.industryAssociations
        .filter((i: any) => i.associationName)
        .map((i: any) => ({
          id: i.id || undefined,
          associationName: i.associationName,
          sectorIndustry: i.sectorIndustry || undefined,
          numberOfMembers: i.numberOfMembers || undefined,
          contactPersonName: i.contactPersonName || undefined,
          contactPersonEmail: i.contactPersonEmail || undefined,
          contactPersonPhone: i.contactPersonPhone || undefined,
          willingnessToPromoteAcap: i.willingnessToPromoteAcap || false,
        })),
      testingLaboratories: formValue.testingLaboratories
        .filter((l: any) => l.name)
        .map((l: any) => ({
          id: l.id || undefined,
          name: l.name,
          accreditationStatus: l.accreditationStatus || undefined,
          otherAccreditationDescription: l.otherAccreditationDescription || undefined,
          scopeOfAccreditation: l.scopeOfAccreditation || undefined,
          contactForAcapReferralsName: l.contactForAcapReferralsName || undefined,
          contactForAcapReferralsEmail: l.contactForAcapReferralsEmail || undefined,
          contactForAcapReferralsPhone: l.contactForAcapReferralsPhone || undefined,
        })),
    };

    this.stakeholderRegistryService
      .updateStakeholderRegistry(this.nsb.id, registry)
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
      )
      .subscribe({
        next: () => {
          this.success = true;
          this.successMessage = 'Stakeholder registry saved successfully.';
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to save stakeholder registry. Please try again.';
        },
      });
  }

  goToDashboard(): void {
    this.router.navigate(['/nsb/dashboard']);
  }
}

