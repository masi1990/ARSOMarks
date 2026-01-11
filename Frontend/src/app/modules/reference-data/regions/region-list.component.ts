import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Region } from '../../../shared/models/reference-data.model';
import { RegionService } from '../services/region.service';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.scss'],
})
export class RegionListComponent implements OnInit {
  regions: Region[] = [];
  form: FormGroup;
  editingId: string | null = null;
  loading = false;
  error = '';

  constructor(private regionService: RegionService, private fb: FormBuilder) {
    this.form = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.regionService.list().subscribe({
      next: (data) => {
        this.regions = data || [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load regions';
        this.loading = false;
      },
    });
  }

  startEdit(region: Region): void {
    this.editingId = region.id;
    this.form.patchValue(region);
  }

  cancelEdit(): void {
    this.editingId = null;
    this.form.reset();
  }

  submit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    const payload = this.form.value;

    const obs = this.editingId
      ? this.regionService.update(this.editingId, payload)
      : this.regionService.create(payload);

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

  delete(region: Region): void {
    if (!confirm(`Delete region ${region.name}?`)) return;
    this.regionService.delete(region.id).subscribe({
      next: () => this.load(),
      error: () => (this.error = 'Delete failed'),
    });
  }
}

