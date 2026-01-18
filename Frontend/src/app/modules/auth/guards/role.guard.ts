import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'] as string[];

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    // Super Admin can access everything
    if (this.authService.hasRole(UserRole.SUPER_ADMIN)) {
      return true;
    }

    const hasRole = this.authService.hasAnyRole(requiredRoles);
    if (!hasRole) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }
}

