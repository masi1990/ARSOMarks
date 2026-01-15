import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.scss'],
})
export class PublicLayoutComponent {
  currentYear = new Date().getFullYear();

  constructor(private router: Router) {}

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}

