import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StakeholderRegistryListComponent } from './stakeholder-registry-list.component';

const routes: Routes = [
  {
    path: '',
    component: StakeholderRegistryListComponent,
  },
];

@NgModule({
  declarations: [StakeholderRegistryListComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class StakeholderRegistryListModule {}

