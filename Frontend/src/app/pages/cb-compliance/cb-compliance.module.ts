import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CbComplianceComponent } from './cb-compliance.component';

const routes: Routes = [{ path: '', component: CbComplianceComponent }];

@NgModule({
  declarations: [CbComplianceComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class CbComplianceModule {}
