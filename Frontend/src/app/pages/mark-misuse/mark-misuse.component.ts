import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MarkMisuseIncident,
  MarkMisuseStatus,
  MarkSanctionType,
} from '../../shared/models/mark-license.model';
import { MarkMisuseService } from '../../modules/mark-licensing/services/mark-misuse.service';

@Component({
  selector: 'app-mark-misuse',
  templateUrl: './mark-misuse.component.html',
  styleUrls: ['./mark-misuse.component.scss'],
})
export class MarkMisuseComponent implements OnInit {
  incidents: MarkMisuseIncident[] = [];
  error = '';
  loading = false;

  reportForm: FormGroup;
  reviewForm: FormGroup;
  sanctionForm: FormGroup;

  misuseStatuses = Object.values(MarkMisuseStatus);
  sanctionTypes = Object.values(MarkSanctionType);

  selectedIncidentId = '';
  selectedEvidenceFile: File | null = null;

  constructor(private fb: FormBuilder, private misuseService: MarkMisuseService) {
    this.reportForm = this.fb.group({
      licenseId: [''],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });

    this.reviewForm = this.fb.group({
      status: ['', Validators.required],
      decisionNotes: [''],
    });

    this.sanctionForm = this.fb.group({
      sanctionType: ['', Validators.required],
      startDate: [''],
      endDate: [''],
      notes: [''],
    });
  }

  ngOnInit(): void {
    this.loadIncidents();
  }

  loadIncidents(): void {
    this.loading = true;
    this.misuseService.listMisuse().subscribe({
      next: (incidents) => {
        this.incidents = incidents || [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load misuse incidents';
        this.loading = false;
      },
    });
  }

  submitReport(): void {
    if (this.reportForm.invalid) {
      this.error = 'Please provide a description for the report';
      return;
    }
    this.misuseService.reportMisuse(this.reportForm.value).subscribe({
      next: () => {
        this.reportForm.reset();
        this.loadIncidents();
      },
      error: () => (this.error = 'Failed to report misuse incident'),
    });
  }

  selectIncident(incidentId: string): void {
    this.selectedIncidentId = incidentId;
  }

  onEvidenceSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedEvidenceFile = input.files && input.files.length > 0 ? input.files[0] : null;
  }

  submitReview(): void {
    if (!this.selectedIncidentId || this.reviewForm.invalid) {
      this.error = 'Select an incident and set a status';
      return;
    }
    this.misuseService.reviewMisuse(this.selectedIncidentId, this.reviewForm.value).subscribe({
      next: () => {
        this.reviewForm.reset();
        this.loadIncidents();
      },
      error: () => (this.error = 'Failed to review incident'),
    });
  }

  submitSanction(): void {
    if (!this.selectedIncidentId || this.sanctionForm.invalid) {
      this.error = 'Select an incident and provide a sanction';
      return;
    }
    this.misuseService.addSanction(this.selectedIncidentId, this.sanctionForm.value).subscribe({
      next: () => {
        this.sanctionForm.reset();
        this.loadIncidents();
      },
      error: () => (this.error = 'Failed to add sanction'),
    });
  }

  uploadEvidence(): void {
    if (!this.selectedIncidentId || !this.selectedEvidenceFile) {
      this.error = 'Select an incident and choose a file';
      return;
    }
    this.misuseService.uploadEvidence(this.selectedIncidentId, this.selectedEvidenceFile).subscribe({
      next: () => {
        this.selectedEvidenceFile = null;
        this.loadIncidents();
      },
      error: () => (this.error = 'Failed to upload evidence'),
    });
  }
}
