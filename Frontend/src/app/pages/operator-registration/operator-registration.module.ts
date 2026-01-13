import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { OperatorRegistrationComponent } from './operator-registration.component';
import { RoleGuard } from '../../modules/auth/guards/role.guard';
import { UserRole } from '../../shared/models/user.model';

const routes: Routes = [
  {
    path: '',
    component: OperatorRegistrationComponent,
    canActivate: [RoleGuard],
    data: { roles: [UserRole.OPERATOR, UserRole.NSB_ADMIN, UserRole.SUPER_ADMIN] },
  },
];

@NgModule({
  declarations: [OperatorRegistrationComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule.forChild(routes)],
})
export class OperatorRegistrationModule {}

