import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NsbProfileSetupComponent } from './nsb-profile-setup.component';

const routes: Routes = [
  {
    path: '',
    component: NsbProfileSetupComponent,
  },
];

@NgModule({
  declarations: [NsbProfileSetupComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class NsbProfileSetupModule {}

