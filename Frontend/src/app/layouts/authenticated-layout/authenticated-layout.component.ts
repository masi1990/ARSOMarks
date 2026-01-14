import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../modules/auth/services/auth.service';
import { User, UserRole } from '../../shared/models/user.model';

type NavItem = {
  label: string;
  route: string;
  roles?: UserRole[];
  section?: string;
  icon?: string;
  badge?: string;
};

type NavSection = {
  id: string;
  title: string;
  icon?: string;
  collapsed?: boolean;
};

@Component({
  selector: 'app-authenticated-layout',
  templateUrl: './authenticated-layout.component.html',
  styleUrls: ['./authenticated-layout.component.scss'],
})
export class AuthenticatedLayoutComponent {
  user$: Observable<User | null> = this.authService.currentUser$;
  user: User | null = null;
  collapsedSections: Set<string> = new Set();
  
  navItems: NavItem[] = [
    { 
      label: 'Dashboard', 
      route: '/dashboard', 
      section: 'main',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
    },
    
    // Operator Registration (Operator, NSB Admin, Super Admin & Public)
    {
      label: 'Operator Registration',
      route: '/operator/register',
      roles: [UserRole.OPERATOR, UserRole.NSB_ADMIN, UserRole.SUPER_ADMIN, UserRole.PUBLIC],
      section: 'operator',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
    },
    // Application Registration (Operator, NSB Admin, Super Admin & Public)
    {
      label: 'My Applications',
      route: '/application-registrations',
      roles: [UserRole.OPERATOR, UserRole.NSB_ADMIN, UserRole.SUPER_ADMIN, UserRole.PUBLIC],
      section: 'operator',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    },
    {
      label: 'New Application',
      route: '/application-registration',
      roles: [UserRole.OPERATOR, UserRole.NSB_ADMIN, UserRole.SUPER_ADMIN, UserRole.PUBLIC],
      section: 'operator',
      icon: 'M12 4v16m8-8H4'
    },
    
    // Mark License Management (NSB Admin, Super Admin & Public)
    {
      label: 'Mark License Dashboard',
      route: '/mark-licenses/dashboard',
      roles: [UserRole.NSB_ADMIN, UserRole.NSB_USER, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT, UserRole.PUBLIC],
      section: 'mark-licenses',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
    },
    {
      label: 'New License Application',
      route: '/mark-licenses/apply',
      roles: [UserRole.NSB_ADMIN, UserRole.NSB_USER, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT, UserRole.PUBLIC],
      section: 'mark-licenses',
      icon: 'M12 4v16m8-8H4'
    },
    {
      label: 'Usage Reports',
      route: '/mark-licenses/reports',
      roles: [UserRole.NSB_ADMIN, UserRole.NSB_USER, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT, UserRole.PUBLIC],
      section: 'mark-licenses',
      icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    },
    {
      label: 'Modifications',
      route: '/mark-licenses/modifications',
      roles: [UserRole.NSB_ADMIN, UserRole.NSB_USER, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT, UserRole.PUBLIC],
      section: 'mark-licenses',
      icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
    },
    
    // NSB Management
    {
      label: 'NSB Dashboard',
      route: '/nsb/dashboard',
      roles: [UserRole.NSB_ADMIN, UserRole.NSB_USER],
      section: 'nsb',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
    },
    {
      label: 'NSB Profile Setup',
      route: '/nsb/profile-setup',
      roles: [UserRole.NSB_ADMIN, UserRole.NSB_USER, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT],
      section: 'nsb',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
    },
    {
      label: 'NSB Management',
      route: '/nsb',
      roles: [UserRole.NSB_ADMIN, UserRole.NSB_USER, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT],
      section: 'nsb',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
    },
    {
      label: 'Stakeholder Registry',
      route: '/nsb/stakeholder-registry',
      roles: [UserRole.SUPER_ADMIN, UserRole.NSB_ADMIN, UserRole.NSB_USER],
      section: 'nsb',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
    },
    {
      label: 'Stakeholder List',
      route: '/nsb/stakeholder-registry-list',
      roles: [UserRole.SUPER_ADMIN, UserRole.NSB_ADMIN, UserRole.NSB_USER],
      section: 'nsb',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
    },
    {
      label: 'NSB Registration',
      route: '/nsb-registration/request',
      roles: [UserRole.NSB_ADMIN, UserRole.NSB_USER],
      section: 'nsb',
      icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
    },
    
    // Admin & Approvals
    {
      label: 'Approvals Console',
      route: '/approvals',
      roles: [UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT],
      section: 'admin',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      label: 'NSB Review',
      route: '/nsb-review',
      roles: [UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT],
      section: 'admin',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
    },
    { 
      label: 'User Management', 
      route: '/roles', 
      roles: [UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT],
      section: 'admin',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
    },
    
    // Reference Data (Super Admin & ARSO)
    {
      label: 'Countries',
      route: '/reference-data/countries',
      roles: [UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT],
      section: 'reference',
      icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      label: 'Regions',
      route: '/reference-data/regions',
      roles: [UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT],
      section: 'reference',
      icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      label: 'RECs',
      route: '/reference-data/recs',
      roles: [UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT],
      section: 'reference',
      icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    },
  ];

  getSectionTitle(section: string): string {
    const titles: Record<string, string> = {
      main: 'Main',
      operator: 'Operator Services',
      'mark-licenses': 'Mark Licenses',
      nsb: 'NSB Management',
      admin: 'Administration',
      reference: 'Reference Data',
    };
    return titles[section] || section;
  }

  getSectionIcon(section: string): string {
    const icons: Record<string, string> = {
      main: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      operator: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      'mark-licenses': 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      nsb: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      admin: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
      reference: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    };
    return icons[section] || '';
  }

  toggleSection(section: string): void {
    if (this.collapsedSections.has(section)) {
      this.collapsedSections.delete(section);
    } else {
      this.collapsedSections.add(section);
    }
  }

  isSectionCollapsed(section: string): boolean {
    return this.collapsedSections.has(section);
  }

  getSectionItems(section: string, user: User | null): NavItem[] {
    return this.navItems.filter(
      (item) => item.section === section && this.canShow(item, user),
    );
  }

  getVisibleSections(user: User | null): string[] {
    const sections = new Set<string>();
    this.navItems.forEach((item) => {
      if (this.canShow(item, user) && item.section) {
        sections.add(item.section);
      }
    });
    return Array.from(sections);
  }

  constructor(public authService: AuthService, public router: Router) {
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

  formatRolesList(roles: UserRole[]): string {
    if (!roles || roles.length === 0) return 'No roles';
    if (roles.length <= 2) {
      return roles.map(r => r.replace(/_/g, ' ')).join(', ');
    }
    return `${roles[0].replace(/_/g, ' ')} +${roles.length - 1}`;
  }

  logout(): void {
    this.authService.logout();
  }
}


