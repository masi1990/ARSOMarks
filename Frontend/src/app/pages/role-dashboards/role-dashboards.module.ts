import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RoleDashboardsComponent } from './role-dashboards.component';
import { RoleGuard } from '../../modules/auth/guards/role.guard';
import { UserRole } from '../../shared/models/user.model';

const routes: Routes = [
  {
    path: '',
    component: RoleDashboardsComponent,
    canActivate: [RoleGuard],
    data: { roles: Object.values(UserRole) },
  },
  {
    path: ':role',
    component: RoleDashboardsComponent,
    canActivate: [RoleGuard],
    data: { roles: Object.values(UserRole) },
  },
];

@NgModule({
  declarations: [RoleDashboardsComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class RoleDashboardsModule {}
