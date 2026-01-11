import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country, Region, RegionalEconomicCommunity } from '../../../shared/models/reference-data.model';
import { CountryService } from '../../nsb-management/services/country.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit {
  countries: Country[] = [];
  regions: Region[] = [];
  recs: RegionalEconomicCommunity[] = [];
  form: FormGroup;
  editingId: string | null = null;
  loading = false;
  error = '';

  constructor(private countryService: CountryService, private fb: FormBuilder) {
    this.form = this.fb.group({
      isoCode: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      name: ['', Validators.required],
      regionId: ['', Validators.required],
      recIds: [[]],
      continent: [''],
    });
  }

  ngOnInit(): void {
    this.load();
    this.loadRegions();
    this.loadRecs();
  }

  load(): void {
    this.loading = true;
    this.countryService.getCountries().subscribe({
      next: (data) => {
        this.countries = data || [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load countries';
        this.loading = false;
      },
    });
  }

  loadRegions(): void {
    this.countryService.getRegions().subscribe({
      next: (data) => (this.regions = data || []),
      error: () => (this.regions = []),
    });
  }

  loadRecs(): void {
    this.countryService.getRecs().subscribe({
      next: (data) => (this.recs = data || []),
      error: () => (this.recs = []),
    });
  }

  startEdit(country: Country): void {
    this.editingId = country.id;
    this.form.patchValue({
      isoCode: country.isoCode,
      name: country.name,
      regionId: country.regionId,
      continent: country.continent,
      recIds: (country as any).recIds || [],
    });
  }

  cancelEdit(): void {
    this.editingId = null;
    this.form.reset({ recIds: [] });
  }

  submit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    const payload = this.form.value;

    const obs = this.editingId
      ? this.countryService.updateCountry(this.editingId, payload)
      : this.countryService.createCountry(payload);

    obs.subscribe({
      next: () => {
        this.cancelEdit();
        this.load();
      },
      error: () => {
        this.error = 'Save failed';
        this.loading = false;
      },
    });
  }

  delete(country: Country): void {
    if (!confirm(`Delete country ${country.name}?`)) return;
    this.countryService.deleteCountry(country.id).subscribe({
      next: () => this.load(),
      error: () => (this.error = 'Delete failed'),
    });
  }

  trackById(_: number, item: any) {
    return item.id;
  }

  getRegionName(regionId?: string): string {
    return this.regions.find((r) => r.id === regionId)?.name || '';
  }

  hasRec(country: Country, recId: string): boolean {
    const recIds = (country as any).recIds as string[] | undefined;
    return Array.isArray(recIds) ? recIds.includes(recId) : false;
  }
}

