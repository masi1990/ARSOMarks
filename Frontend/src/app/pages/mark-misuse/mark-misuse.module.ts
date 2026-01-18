import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MarkMisuseComponent } from './mark-misuse.component';

const routes: Routes = [{ path: '', component: MarkMisuseComponent }];

@NgModule({
  declarations: [MarkMisuseComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class MarkMisuseModule {}
