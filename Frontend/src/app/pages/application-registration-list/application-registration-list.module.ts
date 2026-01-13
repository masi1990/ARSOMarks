import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationRegistrationListComponent } from './application-registration-list.component';
import { RoleGuard } from '../../modules/auth/guards/role.guard';
import { UserRole } from '../../shared/models/user.model';

const routes: Routes = [
  {
    path: '',
    component: ApplicationRegistrationListComponent,
    canActivate: [RoleGuard],
    data: { roles: [UserRole.OPERATOR, UserRole.NSB_ADMIN, UserRole.SUPER_ADMIN] },
  },
];

@NgModule({
  declarations: [ApplicationRegistrationListComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ApplicationRegistrationListModule {}

