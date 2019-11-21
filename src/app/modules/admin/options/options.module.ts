import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { OptionsFormOnTheFlyComponent } from './options-form/options-form-on-the-fly.component';
import { OptionsFormComponent } from './options-form/options-form.component';
import { OptionsGridComponent } from './options-grid/options-grid.component';
import { OptionsNewFromSuggestionsComponent } from './options-new-from-suggestions/options-new-from-suggestions.component';
import { OptionsRoutingModule } from './options-routing.module';


@NgModule({
  declarations: [
    OptionsFormComponent,
    OptionsFormOnTheFlyComponent,
    OptionsGridComponent,
    OptionsNewFromSuggestionsComponent,
  ],
  imports: [
    CommonModule,
    OptionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  entryComponents: [
    OptionsFormOnTheFlyComponent
  ]
})
export class OptionsModule { }
