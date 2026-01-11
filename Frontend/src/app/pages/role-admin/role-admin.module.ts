import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RoleAdminComponent } from './role-admin.component';

const routes: Routes = [
  {
    path: '',
    component: RoleAdminComponent,
  },
];

@NgModule({
  declarations: [RoleAdminComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class RoleAdminModule {}

