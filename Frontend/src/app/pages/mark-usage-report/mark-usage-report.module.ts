import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MarkUsageReportComponent } from './mark-usage-report.component';

const routes: Routes = [
  {
    path: 'new/:licenseId',
    component: MarkUsageReportComponent,
  },
  {
    path: ':id',
    component: MarkUsageReportComponent,
  },
];

@NgModule({
  declarations: [MarkUsageReportComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class MarkUsageReportModule {}

