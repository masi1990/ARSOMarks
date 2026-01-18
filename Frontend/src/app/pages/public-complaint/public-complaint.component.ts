import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComplaintsService } from '../../modules/complaints/services/complaints.service';

@Component({
  selector: 'app-public-complaint',
  templateUrl: './public-complaint.component.html',
  styleUrls: ['./public-complaint.component.scss'],
})
export class PublicComplaintComponent {
  complaintForm: FormGroup;
  error = '';
  success = '';
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
  }

  onEvidenceSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedEvidenceFile = input.files && input.files.length > 0 ? input.files[0] : null;
  }

  submitComplaint(): void {
    this.error = '';
    this.success = '';
    if (this.complaintForm.invalid) {
      this.error = 'Please complete the required fields';
      return;
    }

    this.complaintsService.createComplaint(this.complaintForm.value).subscribe({
      next: (complaint) => {
        if (this.selectedEvidenceFile) {
          this.complaintsService
            .uploadComplaintEvidence(complaint.id, this.selectedEvidenceFile)
            .subscribe({
              next: () => {
                this.success = `Complaint submitted: ${complaint.complaintNumber}`;
                this.complaintForm.reset();
                this.selectedEvidenceFile = null;
              },
              error: () => {
                this.success = `Complaint submitted: ${complaint.complaintNumber}`;
                this.error = 'Complaint created but evidence upload failed';
              },
            });
        } else {
          this.success = `Complaint submitted: ${complaint.complaintNumber}`;
          this.complaintForm.reset();
        }
      },
      error: () => {
        this.error = 'Failed to submit complaint';
      },
    });
  }
}
