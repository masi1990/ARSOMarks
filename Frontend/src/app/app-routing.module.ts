import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { RoleGuard } from './modules/auth/guards/role.guard';
import { UserRole } from './shared/models/user.model';
import { AuthenticatedLayoutComponent } from './layouts/authenticated-layout/authenticated-layout.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: AuthenticatedLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'reference-data',
        canActivate: [RoleGuard],
        data: { roles: [UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT] },
        loadChildren: () =>
          import('./modules/reference-data/reference-data.module').then((m) => m.ReferenceDataModule),
      },
      {
        path: 'roles',
        canActivate: [RoleGuard],
        data: { roles: [UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT] },
        loadChildren: () => import('./pages/role-admin/role-admin.module').then((m) => m.RoleAdminModule),
      },
      {
        path: 'nsb',
        canActivate: [RoleGuard],
        data: { roles: [UserRole.NSB_ADMIN, UserRole.NSB_USER, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT] },
        children: [
          {
            path: 'dashboard',
            loadChildren: () => import('./pages/nsb-dashboard/nsb-dashboard.module').then((m) => m.NsbDashboardModule),
          },
          {
            path: 'profile-setup',
            loadChildren: () => import('./pages/nsb-profile-setup/nsb-profile-setup.module').then((m) => m.NsbProfileSetupModule),
          },
          {
            path: 'stakeholder-registry',
            loadChildren: () => import('./pages/nsb-stakeholder-registry/nsb-stakeholder-registry.module').then((m) => m.NsbStakeholderRegistryModule),
          },
          {
            path: '',
            loadChildren: () => import('./pages/nsb-management/nsb-management.module').then((m) => m.NsbManagementModule),
          },
        ],
      },
      {
        path: 'nsb-registration',
        canActivate: [RoleGuard],
        data: { roles: [UserRole.PUBLIC, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT, UserRole.NSB_ADMIN, UserRole.NSB_USER] },
        loadChildren: () => import('./pages/nsb-registration/nsb-registration.module').then((m) => m.NsbRegistrationModule),
      },
      {
        path: 'nsb-review',
        canActivate: [RoleGuard],
        data: { roles: [UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT] },
        loadChildren: () => import('./pages/nsb-review/nsb-review.module').then((m) => m.NsbReviewModule),
      },
      {
        path: 'approvals',
        canActivate: [RoleGuard],
        data: { roles: [UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT] },
        loadChildren: () => import('./pages/approvals/approvals.module').then((m) => m.ApprovalsModule),
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

