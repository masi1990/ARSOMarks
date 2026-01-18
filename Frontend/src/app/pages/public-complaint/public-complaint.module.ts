import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PublicComplaintComponent } from './public-complaint.component';

const routes: Routes = [{ path: '', component: PublicComplaintComponent }];

@NgModule({
  declarations: [PublicComplaintComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class PublicComplaintModule {}
