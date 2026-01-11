import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ReferenceDataRoutingModule } from './reference-data-routing.module';
import { RegionListComponent } from './regions/region-list.component';
import { CountryListComponent } from './countries/country-list.component';
import { RecListComponent } from './recs/rec-list.component';

@NgModule({
  declarations: [RegionListComponent, CountryListComponent, RecListComponent],
  imports: [CommonModule, ReactiveFormsModule, ReferenceDataRoutingModule],
})
export class ReferenceDataModule {}

