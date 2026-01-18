import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { RoleGuard } from './modules/auth/guards/role.guard';
import { UserRole } from './shared/models/user.model';
import { AuthenticatedLayoutComponent } from './layouts/authenticated-layout/authenticated-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/consumer/consumer.module').then((m) => m.ConsumerModule),
      },
          {
            path: 'traceability',
            loadChildren: () => import('./pages/traceability/traceability.module').then((m) => m.TraceabilityModule),
          },
      {
        path: 'complaints',
        loadChildren: () =>
          import('./pages/public-complaint/public-complaint.module').then((m) => m.PublicComplaintModule),
      },
    ],
  },
  {
    path: 'portal',
    component: AuthenticatedLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'dashboards',
        canActivate: [RoleGuard],
        data: { roles: Object.values(UserRole) },
        loadChildren: () =>
          import('./pages/role-dashboards/role-dashboards.module').then((m) => m.RoleDashboardsModule),
      },
      {
        path: 'reports',
        canActivate: [RoleGuard],
        data: { roles: Object.values(UserRole) },
        loadChildren: () => import('./pages/role-reports/role-reports.module').then((m) => m.RoleReportsModule),
      },
      {
        path: 'shared-tools',
        canActivate: [RoleGuard],
        data: { roles: Object.values(UserRole) },
        loadChildren: () => import('./pages/shared-tools/shared-tools.module').then((m) => m.SharedToolsModule),
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
            path: 'stakeholder-registry',
            loadChildren: () => import('./pages/nsb-stakeholder-registry/nsb-stakeholder-registry.module').then((m) => m.NsbStakeholderRegistryModule),
          },
          {
            path: 'stakeholder-registry-list',
            loadChildren: () => import('./pages/stakeholder-registry-list/stakeholder-registry-list.module').then((m) => m.StakeholderRegistryListModule),
          },
          {
            path: 'communication',
            loadChildren: () => import('./pages/communication-history/communication-history.module').then((m) => m.CommunicationHistoryModule),
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
        path: 'operator',
        canActivate: [RoleGuard],
        data: { roles: [UserRole.OPERATOR, UserRole.NSB_ADMIN, UserRole.SUPER_ADMIN] },
        children: [
          {
            path: 'register',
            loadChildren: () =>
              import('./pages/operator-registration/operator-registration.module').then(
                (m) => m.OperatorRegistrationModule,
              ),
          },
        ],
      },
      {
        path: 'application-registration',
        canActivate: [RoleGuard],
        data: { roles: [UserRole.OPERATOR, UserRole.NSB_ADMIN, UserRole.SUPER_ADMIN] },
        loadChildren: () =>
          import('./pages/application-registration/application-registration.module').then(
            (m) => m.ApplicationRegistrationModule,
          ),
      },
      {
        path: 'application-registrations',
        canActivate: [RoleGuard],
        data: { roles: [UserRole.OPERATOR, UserRole.NSB_ADMIN, UserRole.SUPER_ADMIN] },
        loadChildren: () =>
          import('./pages/application-registration-list/application-registration-list.module').then(
            (m) => m.ApplicationRegistrationListModule,
          ),
      },
      {
        path: 'product-certification',
        canActivate: [RoleGuard],
        data: { roles: [UserRole.OPERATOR, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT] },
        children: [
          {
            path: 'apply',
            loadChildren: () =>
              import('./pages/product-certification/product-certification.module').then(
                (m) => m.ProductCertificationModule,
              ),
          },
          {
            path: 'audits',
            loadChildren: () =>
              import('./pages/certification-audits/certification-audits.module').then(
                (m) => m.CertificationAuditsModule,
              ),
          },
          {
            path: 'applications/:id',
            loadChildren: () =>
              import('./pages/product-certification/product-certification.module').then(
                (m) => m.ProductCertificationModule,
              ),
          },
        ],
      },
      {
        path: 'documents',
        canActivate: [RoleGuard],
        data: { roles: [UserRole.OPERATOR, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT] },
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./pages/document-upload/document-upload.module').then(
                (m) => m.DocumentUploadModule,
              ),
          },
          {
            path: 'application/:applicationId',
            loadChildren: () =>
              import('./pages/document-upload/document-upload.module').then(
                (m) => m.DocumentUploadModule,
              ),
          },
        ],
      },
      {
        path: 'mark-licenses',
        canActivate: [RoleGuard],
        data: { roles: [UserRole.NSB_ADMIN, UserRole.NSB_USER, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT] },
        children: [
          {
            path: 'apply',
            loadChildren: () =>
              import('./pages/mark-license-application/mark-license-application.module').then(
                (m) => m.MarkLicenseApplicationModule,
              ),
          },
          {
            path: 'agreements',
            loadChildren: () =>
              import('./pages/mark-license-agreement/mark-license-agreement.module').then(
                (m) => m.MarkLicenseAgreementModule,
              ),
          },
          {
            path: 'reports',
            loadChildren: () =>
              import('./pages/mark-usage-report/mark-usage-report.module').then(
                (m) => m.MarkUsageReportModule,
              ),
          },
          {
            path: 'modifications',
            loadChildren: () =>
              import('./pages/mark-license-modification/mark-license-modification.module').then(
                (m) => m.MarkLicenseModificationModule,
              ),
          },
          {
            path: 'dashboard',
            loadChildren: () =>
              import('./pages/mark-license-dashboard/mark-license-dashboard.module').then(
                (m) => m.MarkLicenseDashboardModule,
              ),
          },
          {
            path: 'misuse',
            loadChildren: () =>
              import('./pages/mark-misuse/mark-misuse.module').then((m) => m.MarkMisuseModule),
          },
        ],
      },
      {
        path: 'complaints',
        canActivate: [RoleGuard],
        data: {
          roles: [
            UserRole.SUPER_ADMIN,
            UserRole.ARSO_SECRETARIAT,
            UserRole.NSB_ADMIN,
            UserRole.NSB_USER,
            UserRole.CB_ADMIN,
            UserRole.CB_USER,
            UserRole.OPERATOR,
            UserRole.PUBLIC,
          ],
        },
        loadChildren: () => import('./pages/complaints/complaints.module').then((m) => m.ComplaintsModule),
      },
      {
        path: 'cb',
        canActivate: [RoleGuard],
        data: { roles: [UserRole.CB_ADMIN, UserRole.CB_USER, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT, UserRole.PUBLIC] },
        children: [
          {
            path: 'apply',
            loadChildren: () =>
              import('./pages/cb-application/cb-application.module').then((m) => m.CbApplicationModule),
          },
          {
            path: 'compliance',
            loadChildren: () =>
              import('./pages/cb-compliance/cb-compliance.module').then((m) => m.CbComplianceModule),
          },
          {
            path: 'applications',
            loadChildren: () =>
              import('./pages/cb-application-list/cb-application-list.module').then((m) => m.CbApplicationListModule),
          },
        ],
      },
      {
        path: '',
        redirectTo: 'dashboards',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

