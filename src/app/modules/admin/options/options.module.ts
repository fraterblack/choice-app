import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { OptionsFormComponent } from './options-form/options-form.component';
import { OptionsGridComponent } from './options-grid/options-grid.component';
import { OptionsRoutingModule } from './options-routing.module';


@NgModule({
  declarations: [
    OptionsFormComponent,
    OptionsGridComponent,
  ],
  imports: [
    CommonModule,
    OptionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class OptionsModule { }
