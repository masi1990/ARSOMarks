import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DocumentUploadComponent } from './document-upload.component';
import { RoleGuard } from '../../modules/auth/guards/role.guard';
import { UserRole } from '../../shared/models/user.model';

const routes: Routes = [
  {
    path: '',
    component: DocumentUploadComponent,
    canActivate: [RoleGuard],
    data: { roles: [UserRole.OPERATOR, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT] },
  },
  {
    path: 'application/:applicationId',
    component: DocumentUploadComponent,
    canActivate: [RoleGuard],
    data: { roles: [UserRole.OPERATOR, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT] },
  },
];

@NgModule({
  declarations: [DocumentUploadComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule.forChild(routes)],
  providers: [],
})
export class DocumentUploadModule {}

