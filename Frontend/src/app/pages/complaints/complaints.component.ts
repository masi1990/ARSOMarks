import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Appeal,
  AppealStatus,
  Complaint,
  ComplaintStatus,
} from '../../shared/models/complaints.model';
import { ComplaintsService } from '../../modules/complaints/services/complaints.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss'],
})
export class ComplaintsComponent implements OnInit {
  complaints: Complaint[] = [];
  appeals: Appeal[] = [];
  error = '';
  loading = false;

  complaintForm: FormGroup;
  appealForm: FormGroup;
  reviewComplaintForm: FormGroup;
  reviewAppealForm: FormGroup;

  complaintStatuses = Object.values(ComplaintStatus);
  appealStatuses = Object.values(AppealStatus);

  selectedComplaintId = '';
  selectedAppealId = '';
  selectedEvidenceFile: File | null = null;

  constructor(private fb: FormBuilder, private complaintsService: ComplaintsService) {
    this.complaintForm = this.fb.group({
      complainantName: ['', Validators.required],
      complainantEmail: ['', [Validators.required, Validators.email]],
      complainantPhone: [''],
      subject: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      referenceType: [''],
      referenceId: [''],
    });

    this.appealForm = this.fb.group({
      complaintId: ['', Validators.required],
      appellantName: ['', Validators.required],
      appellantEmail: ['', [Validators.required, Validators.email]],
      appellantPhone: [''],
      reason: ['', [Validators.required, Validators.minLength(10)]],
    });

    this.reviewComplaintForm = this.fb.group({
      status: ['', Validators.required],
      decisionNotes: [''],
    });

    this.reviewAppealForm = this.fb.group({
      status: ['', Validators.required],
      decisionNotes: [''],
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.loading = true;
    this.complaintsService.listComplaints().subscribe({
      next: (complaints) => {
        this.complaints = complaints || [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load complaints';
        this.loading = false;
      },
    });

    this.complaintsService.listAppeals().subscribe({
      next: (appeals) => (this.appeals = appeals || []),
    });
  }

  submitComplaint(): void {
    if (this.complaintForm.invalid) {
      this.error = 'Please fill the required complaint fields';
      return;
    }
    this.complaintsService.createComplaint(this.complaintForm.value).subscribe({
      next: () => {
        this.complaintForm.reset();
        this.loadAll();
      },
      error: () => (this.error = 'Failed to submit complaint'),
    });
  }

  submitAppeal(): void {
    if (this.appealForm.invalid) {
      this.error = 'Please fill the required appeal fields';
      return;
    }
    this.complaintsService.createAppeal(this.appealForm.value).subscribe({
      next: () => {
        this.appealForm.reset();
        this.loadAll();
      },
      error: () => (this.error = 'Failed to submit appeal'),
    });
  }

  selectComplaint(id: string): void {
    this.selectedComplaintId = id;
    this.appealForm.patchValue({ complaintId: id });
  }

  selectAppeal(id: string): void {
    this.selectedAppealId = id;
  }

  reviewComplaint(): void {
    if (!this.selectedComplaintId || this.reviewComplaintForm.invalid) {
      this.error = 'Select a complaint and set a status';
      return;
    }
    this.complaintsService
      .reviewComplaint(this.selectedComplaintId, this.reviewComplaintForm.value)
      .subscribe({
        next: () => {
          this.reviewComplaintForm.reset();
          this.loadAll();
        },
        error: () => (this.error = 'Failed to review complaint'),
      });
  }

  reviewAppeal(): void {
    if (!this.selectedAppealId || this.reviewAppealForm.invalid) {
      this.error = 'Select an appeal and set a status';
      return;
    }
    this.complaintsService.reviewAppeal(this.selectedAppealId, this.reviewAppealForm.value).subscribe({
      next: () => {
        this.reviewAppealForm.reset();
        this.loadAll();
      },
      error: () => (this.error = 'Failed to review appeal'),
    });
  }

  onEvidenceSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedEvidenceFile = input.files && input.files.length > 0 ? input.files[0] : null;
  }

  uploadEvidence(): void {
    if (!this.selectedComplaintId || !this.selectedEvidenceFile) {
      this.error = 'Select a complaint and choose a file';
      return;
    }
    this.complaintsService.uploadComplaintEvidence(this.selectedComplaintId, this.selectedEvidenceFile).subscribe({
      next: () => {
        this.selectedEvidenceFile = null;
        this.loadAll();
      },
      error: () => (this.error = 'Failed to upload complaint evidence'),
    });
  }
}
