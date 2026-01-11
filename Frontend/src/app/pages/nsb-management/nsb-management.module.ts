import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NsbManagementComponent } from './nsb-management.component';

const routes: Routes = [
  {
    path: '',
    component: NsbManagementComponent,
  },
];

@NgModule({
  declarations: [NsbManagementComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class NsbManagementModule {}

