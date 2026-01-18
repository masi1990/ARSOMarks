import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ComplaintsComponent } from './complaints.component';

const routes: Routes = [{ path: '', component: ComplaintsComponent }];

@NgModule({
  declarations: [ComplaintsComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class ComplaintsModule {}
