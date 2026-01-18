import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RoleReportsComponent } from './role-reports.component';
import { RoleGuard } from '../../modules/auth/guards/role.guard';
import { UserRole } from '../../shared/models/user.model';

const routes: Routes = [
  {
    path: '',
    component: RoleReportsComponent,
    canActivate: [RoleGuard],
    data: { roles: Object.values(UserRole) },
  },
  {
    path: ':role',
    component: RoleReportsComponent,
    canActivate: [RoleGuard],
    data: { roles: Object.values(UserRole) },
  },
];

@NgModule({
  declarations: [RoleReportsComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class RoleReportsModule {}
