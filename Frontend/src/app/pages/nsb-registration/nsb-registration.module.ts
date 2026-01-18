import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NsbRegistrationRequestComponent } from './nsb-registration-request.component';

const routes: Routes = [
  {
    path: 'request',
    component: NsbRegistrationRequestComponent,
  },
  {
    path: '',
    redirectTo: 'request',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [NsbRegistrationRequestComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule.forChild(routes)],
})
export class NsbRegistrationModule {}

