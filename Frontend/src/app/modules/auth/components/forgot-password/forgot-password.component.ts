import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  loading = false;
  error = '';
  success = false;
  message = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = false;

    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
      next: (response) => {
        this.success = true;
        this.message = response.message;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to send password reset email. Please try again.';
        this.loading = false;
      },
    });
  }
}

