import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MarkLicenseApplicationComponent } from './mark-license-application.component';

const routes: Routes = [
  {
    path: '',
    component: MarkLicenseApplicationComponent,
  },
];

@NgModule({
  declarations: [MarkLicenseApplicationComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class MarkLicenseApplicationModule {}

