import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NsbDashboardComponent } from './nsb-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: NsbDashboardComponent,
  },
];

@NgModule({
  declarations: [NsbDashboardComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class NsbDashboardModule {}

