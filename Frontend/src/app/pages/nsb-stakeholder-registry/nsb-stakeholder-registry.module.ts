import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NsbStakeholderRegistryComponent } from './nsb-stakeholder-registry.component';

const routes: Routes = [
  {
    path: '',
    component: NsbStakeholderRegistryComponent,
  },
];

@NgModule({
  declarations: [NsbStakeholderRegistryComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class NsbStakeholderRegistryModule {}

