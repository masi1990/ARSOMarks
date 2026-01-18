import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommunicationHistoryComponent } from './communication-history.component';

const routes: Routes = [
  {
    path: '',
    component: CommunicationHistoryComponent,
  },
];

@NgModule({
  declarations: [CommunicationHistoryComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class CommunicationHistoryModule {}

