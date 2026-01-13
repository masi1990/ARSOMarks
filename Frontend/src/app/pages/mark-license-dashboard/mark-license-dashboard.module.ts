import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MarkLicenseDashboardComponent } from './mark-license-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: MarkLicenseDashboardComponent,
  },
];

@NgModule({
  declarations: [MarkLicenseDashboardComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class MarkLicenseDashboardModule {}

