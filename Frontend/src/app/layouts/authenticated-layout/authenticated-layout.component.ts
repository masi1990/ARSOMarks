import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../modules/auth/services/auth.service';
import { User, UserRole } from '../../shared/models/user.model';

type NavItem = {
  label: string;
  route: string;
  roles?: UserRole[];
};

@Component({
  selector: 'app-authenticated-layout',
  templateUrl: './authenticated-layout.component.html',
  styleUrls: ['./authenticated-layout.component.scss'],
})
export class AuthenticatedLayoutComponent {
  user$: Observable<User | null> = this.authService.currentUser$;
  user: User | null = null;
  navItems: NavItem[] = [
    { label: 'Dashboard', route: '/dashboard' },
    {
      label: 'Approvals Console',
      route: '/approvals',
      roles: [UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT],
    },
    {
      label: 'NSB Dashboard',
      route: '/nsb/dashboard',
      roles: [UserRole.NSB_ADMIN, UserRole.NSB_USER, UserRole.PUBLIC],
    },
    {
      label: 'Stakeholder Registry',
      route: '/nsb/stakeholder-registry',
      roles: [UserRole.NSB_ADMIN, UserRole.NSB_USER],
    },
    {
      label: 'NSB Registration',
      route: '/nsb-registration/request',
      roles: [UserRole.PUBLIC, UserRole.NSB_ADMIN, UserRole.NSB_USER],
    },
    {
      label: 'NSB Review',
      route: '/nsb-review',
      roles: [UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT],
    },
    {
      label: 'Countries',
      route: '/reference-data/countries',
      roles: [UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT],
    },
    {
      label: 'Regions',
      route: '/reference-data/regions',
      roles: [UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT],
    },
    {
      label: 'RECs',
      route: '/reference-data/recs',
      roles: [UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT],
    },
    { label: 'Roles', route: '/roles', roles: [UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT] },
  ];

  constructor(private authService: AuthService, private router: Router) {
    // Initialize user from current value
    this.user = this.authService.currentUserValue;
    // Subscribe to user changes
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
    });
  }

  canShow(item: NavItem, user: User | null): boolean {
    if (!item.roles || item.roles.length === 0) return true;
    const roles = user?.roles || (user?.role ? [user.role] : []);
    return roles.some((r) => item.roles!.includes(r as UserRole));
  }

  logout(): void {
    this.authService.logout();
  }
}


