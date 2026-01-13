import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MarkLicenseAgreementComponent } from './mark-license-agreement.component';

const routes: Routes = [
  {
    path: ':id',
    component: MarkLicenseAgreementComponent,
  },
];

@NgModule({
  declarations: [MarkLicenseAgreementComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class MarkLicenseAgreementModule {}

