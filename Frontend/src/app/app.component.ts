import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ARSO Marks';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Load user profile if token exists
    if (this.authService.token && !this.authService.currentUserValue) {
      this.authService.getProfile().subscribe({
        error: () => {
          // Token invalid, logout
          this.authService.logout();
        },
      });
    }
  }
}

