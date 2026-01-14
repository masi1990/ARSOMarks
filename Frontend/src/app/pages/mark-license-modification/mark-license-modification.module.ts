import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MarkLicenseModificationComponent } from './mark-license-modification.component';
import { MarkLicenseModificationListComponent } from '../mark-license-modification-list/mark-license-modification-list.component';

const routes: Routes = [
  {
    path: '',
    component: MarkLicenseModificationListComponent,
  },
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
  declarations: [MarkLicenseModificationComponent, MarkLicenseModificationListComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule.forChild(routes)],
})
export class MarkLicenseModificationModule {}

