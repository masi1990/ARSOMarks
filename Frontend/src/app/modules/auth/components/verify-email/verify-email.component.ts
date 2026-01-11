import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {
  token = '';
  loading = true;
  message = '';
  error = '';

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'] || '';
      if (!this.token) {
        this.error = 'Verification token is missing.';
        this.loading = false;
        return;
      }

      this.authService.verifyEmail({ token: this.token }).subscribe({
        next: (res) => {
          this.message = res.message || 'Email verified successfully. You can now log in.';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/auth/login']), 2000);
        },
        error: (err) => {
          this.error = err.error?.message || 'Verification failed. The token may be invalid or expired.';
          this.loading = false;
        },
      });
    });
  }
}
