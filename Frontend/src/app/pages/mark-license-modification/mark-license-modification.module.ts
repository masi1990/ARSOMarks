import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MarkLicenseModificationComponent } from './mark-license-modification.component';

const routes: Routes = [
  {
    path: 'new/:licenseId',
    component: MarkLicenseModificationComponent,
  },
  {
    path: ':id',
    component: MarkLicenseModificationComponent,
  },
];

@NgModule({
  declarations: [MarkLicenseModificationComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class MarkLicenseModificationModule {}

