import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CbApplicationComponent } from './cb-application.component';

const routes: Routes = [
  {
    path: '',
    component: CbApplicationComponent,
  },
];

@NgModule({
  declarations: [CbApplicationComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class CbApplicationModule {}
