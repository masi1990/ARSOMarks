import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ManageRolesComponent } from './manage-roles.component';
import { RoleGuard } from '../../../modules/auth/guards/role.guard';
import { UserRole } from '../../../shared/models/user.model';

const routes: Routes = [
  {
    path: '',
    component: ManageRolesComponent,
    canActivate: [RoleGuard],
    data: { roles: Object.values(UserRole) },
  },
];

@NgModule({
  declarations: [ManageRolesComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class ManageRolesModule {}
