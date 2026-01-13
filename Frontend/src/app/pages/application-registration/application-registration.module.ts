import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationRegistrationComponent } from './application-registration.component';
import { RoleGuard } from '../../modules/auth/guards/role.guard';
import { UserRole } from '../../shared/models/user.model';

const routes: Routes = [
  {
    path: '',
    component: ApplicationRegistrationComponent,
    canActivate: [RoleGuard],
    data: { roles: [UserRole.OPERATOR, UserRole.NSB_ADMIN, UserRole.SUPER_ADMIN] },
  },
];

@NgModule({
  declarations: [ApplicationRegistrationComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule.forChild(routes)],
})
export class ApplicationRegistrationModule {}

