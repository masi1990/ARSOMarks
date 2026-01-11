import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NsbDashboardComponent } from './nsb-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: NsbDashboardComponent,
  },
];

@NgModule({
  declarations: [NsbDashboardComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NsbDashboardModule {}

