import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NsbReviewComponent } from './nsb-review.component';

const routes: Routes = [
  {
    path: '',
    component: NsbReviewComponent,
  },
];

@NgModule({
  declarations: [NsbReviewComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class NsbReviewModule {}

