import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedToolsComponent } from './shared-tools.component';
import { RoleGuard } from '../../modules/auth/guards/role.guard';
import { UserRole } from '../../shared/models/user.model';

const routes: Routes = [
  {
    path: '',
    component: SharedToolsComponent,
    canActivate: [RoleGuard],
    data: { roles: Object.values(UserRole) },
  },
];

@NgModule({
  declarations: [SharedToolsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SharedToolsModule {}
