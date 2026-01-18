import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CbComplianceService } from '../../modules/cb-approval/services/cb-compliance.service';

@Component({
  selector: 'app-cb-compliance',
  templateUrl: './cb-compliance.component.html',
  styleUrls: ['./cb-compliance.component.scss'],
})
export class CbComplianceComponent implements OnInit {
  form: FormGroup;
  cbApplicationId = '';
  error = '';
  success = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cbComplianceService: CbComplianceService,
  ) {
    this.form = this.fb.group({
      responsiblePersonsJson: [''],
      auditorQualificationsJson: [''],
      countriesOfCertification: [''],
      localOfficesJson: [''],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.cbApplicationId = params['applicationId'] || '';
      if (this.cbApplicationId) {
        this.loadProfile();
      }
    });
  }

  loadProfile(): void {
    this.cbComplianceService.getProfile(this.cbApplicationId).subscribe({
      next: (profile) => {
        this.form.patchValue({
          responsiblePersonsJson: profile.responsiblePersons ? JSON.stringify(profile.responsiblePersons, null, 2) : '',
          auditorQualificationsJson: profile.auditorQualifications
            ? JSON.stringify(profile.auditorQualifications, null, 2)
            : '',
          countriesOfCertification: (profile.countriesOfCertification || []).join(', '),
          localOfficesJson: profile.localOffices ? JSON.stringify(profile.localOffices, null, 2) : '',
        });
      },
      error: () => (this.error = 'Failed to load compliance profile'),
    });
  }

  saveProfile(): void {
    this.error = '';
    this.success = '';

    const payload: any = {};
    const responsiblePersons = this.tryParseJson(this.form.value.responsiblePersonsJson, 'responsible persons');
    if (responsiblePersons === null) return;
    if (responsiblePersons !== undefined) payload.responsiblePersons = responsiblePersons;

    const auditorQualifications = this.tryParseJson(
      this.form.value.auditorQualificationsJson,
      'auditor qualifications',
    );
    if (auditorQualifications === null) return;
    if (auditorQualifications !== undefined) payload.auditorQualifications = auditorQualifications;
    if (this.form.value.countriesOfCertification) {
      payload.countriesOfCertification = this.form.value.countriesOfCertification
        .split(',')
        .map((item: string) => item.trim())
        .filter(Boolean);
    }
    const localOffices = this.tryParseJson(this.form.value.localOfficesJson, 'local offices');
    if (localOffices === null) return;
    if (localOffices !== undefined) payload.localOffices = localOffices;

    if (!this.cbApplicationId) {
      this.error = 'Missing CB application id';
      return;
    }

    this.cbComplianceService.upsertProfile(this.cbApplicationId, payload).subscribe({
      next: () => {
        this.success = 'Compliance profile saved';
      },
      error: () => (this.error = 'Failed to save compliance profile'),
    });
  }

  private tryParseJson(value: string | undefined, label: string) {
    if (!value) return undefined;
    try {
      return JSON.parse(value);
    } catch (error) {
      this.error = `Invalid JSON for ${label}`;
      return null;
    }
  }
}
