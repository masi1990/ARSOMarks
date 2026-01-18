import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CertificationAuditsComponent } from './certification-audits.component';

const routes: Routes = [
  {
    path: '',
    component: CertificationAuditsComponent,
  },
];

@NgModule({
  declarations: [CertificationAuditsComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class CertificationAuditsModule {}
