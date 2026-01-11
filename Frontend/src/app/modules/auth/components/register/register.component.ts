import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CountryService } from '../../../nsb-management/services/country.service';
import { Country } from '../../../../shared/models/reference-data.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  error = '';
  success = false;
  countries: Country[] = [];
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private countryService: CountryService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
      phone: [''],
      countryId: ['', [Validators.required]],
    });

    // Add custom validator for password confirmation
    this.registerForm.addValidators(this.passwordMatchValidator);
  }

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }

    this.loadCountries();
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe({
      next: (data) => (this.countries = data),
      error: () => {
        this.countries = [];
        this.error = 'Failed to load countries. Please try again.';
      },
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      if (confirmPassword?.hasError('passwordMismatch')) {
        confirmPassword.setErrors(null);
      }
      return null;
    }
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    const { confirmPassword, ...registerData } = this.registerForm.value;

    this.authService.register(registerData).subscribe({
      next: (res) => {
        this.success = true;
        this.successMessage =
          res?.message || 'Registration successful. Please check your email to verify your account before logging in.';
        this.error = '';
        this.loading = false;
        this.registerForm.disable();
      },
      error: (error) => {
        this.error = error.error?.message || 'Registration failed. Please try again.';
        this.loading = false;
      },
    });
  }
}

