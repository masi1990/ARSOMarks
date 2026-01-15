import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ConsumerComponent } from './consumer.component';

const routes: Routes = [
  {
    path: '',
    component: ConsumerComponent,
  },
];

@NgModule({
  declarations: [ConsumerComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule.forChild(routes)],
})
export class ConsumerModule {}

