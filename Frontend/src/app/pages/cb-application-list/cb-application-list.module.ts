import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CbApplicationListComponent } from './cb-application-list.component';

const routes: Routes = [
  {
    path: '',
    component: CbApplicationListComponent,
  },
];

@NgModule({
  declarations: [CbApplicationListComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CbApplicationListModule {}
