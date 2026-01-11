import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegionalEconomicCommunity } from '../../../shared/models/reference-data.model';
import { RecService } from '../services/rec.service';

@Component({
  selector: 'app-rec-list',
  templateUrl: './rec-list.component.html',
  styleUrls: ['./rec-list.component.scss'],
})
export class RecListComponent implements OnInit {
  recs: RegionalEconomicCommunity[] = [];
  form: FormGroup;
  editingId: string | null = null;
  loading = false;
  error = '';

  constructor(private recService: RecService, private fb: FormBuilder) {
    this.form = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.recService.list().subscribe({
      next: (data) => {
        this.recs = data || [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load RECs';
        this.loading = false;
      },
    });
  }

  startEdit(rec: RegionalEconomicCommunity): void {
    this.editingId = rec.id;
    this.form.patchValue(rec);
  }

  cancelEdit(): void {
    this.editingId = null;
    this.form.reset();
  }

  submit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    const payload = this.form.value;

    const obs = this.editingId ? this.recService.update(this.editingId, payload) : this.recService.create(payload);
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

  delete(rec: RegionalEconomicCommunity): void {
    if (!confirm(`Delete REC ${rec.name}?`)) return;
    this.recService.delete(rec.id).subscribe({
      next: () => this.load(),
      error: () => (this.error = 'Delete failed'),
    });
  }
}

