import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegionListComponent } from './regions/region-list.component';
import { CountryListComponent } from './countries/country-list.component';
import { RecListComponent } from './recs/rec-list.component';

const routes: Routes = [
  { path: 'regions', component: RegionListComponent },
  { path: 'countries', component: CountryListComponent },
  { path: 'recs', component: RecListComponent },
  { path: '', redirectTo: 'regions', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferenceDataRoutingModule {}

