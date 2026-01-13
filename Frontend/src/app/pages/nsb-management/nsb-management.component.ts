import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { NsbService } from '../../modules/nsb-management/services/nsb.service';
import { Nsb } from '../../shared/models/nsb.model';
import { AuthService } from '../../modules/auth/services/auth.service';
import { UserRole } from '../../shared/models/user.model';

@Component({
  selector: 'app-nsb-management',
  templateUrl: './nsb-management.component.html',
  styleUrls: ['./nsb-management.component.scss'],
})
export class NsbManagementComponent implements OnInit {
  nsb: Nsb | null = null;
  loading = false;
  error = '';
  saving = false;
  saveError = '';
  saveSuccess = '';
  isEditing = false;
  editForm: Partial<Nsb> = {};

  constructor(
    private nsbService: NsbService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadMyNsb();
  }

  loadMyNsb(): void {
    this.loading = true;
    this.error = '';
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
          this.editForm = { ...nsb };
        },
        error: (err) => {
          this.error = err?.error?.message || 'Failed to load NSB information.';
          this.nsb = null;
        },
      });
  }

  startEdit(): void {
    this.isEditing = true;
    this.editForm = this.nsb ? { ...this.nsb } : {};
    this.saveError = '';
    this.saveSuccess = '';
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editForm = this.nsb ? { ...this.nsb } : {};
    this.saveError = '';
    this.saveSuccess = '';
  }

  saveChanges(): void {
    if (!this.nsb) {
      return;
    }

    this.saving = true;
    this.saveError = '';
    this.saveSuccess = '';

    this.nsbService
      .updateNsb(this.nsb.id, this.editForm)
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
      )
      .subscribe({
        next: (updatedNsb) => {
          this.nsb = updatedNsb;
          this.isEditing = false;
          this.saveSuccess = 'NSB information updated successfully.';
        },
        error: (err) => {
          this.saveError = err?.error?.message || 'Failed to update NSB information.';
        },
      });
  }

  isNsbAdmin(): boolean {
    const user = this.authService.currentUserValue;
    const roles = user?.roles || (user?.role ? [user.role] : []);
    return roles.includes(UserRole.NSB_ADMIN) || roles.includes(UserRole.SUPER_ADMIN) || roles.includes(UserRole.ARSO_SECRETARIAT);
  }
}


