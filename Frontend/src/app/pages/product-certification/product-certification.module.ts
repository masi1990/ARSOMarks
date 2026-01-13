import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProductCertificationComponent } from './product-certification.component';
import { RoleGuard } from '../../modules/auth/guards/role.guard';
import { UserRole } from '../../shared/models/user.model';

const routes: Routes = [
  {
    path: '',
    component: ProductCertificationComponent,
    canActivate: [RoleGuard],
    data: { roles: [UserRole.OPERATOR, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT] },
  },
  {
    path: ':id',
    component: ProductCertificationComponent,
    canActivate: [RoleGuard],
    data: { roles: [UserRole.OPERATOR, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT] },
  },
];

@NgModule({
  declarations: [ProductCertificationComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule.forChild(routes)],
})
export class ProductCertificationModule {}

