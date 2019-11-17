import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { TablesFormComponent } from './table-form/tables-form.component';
import { TablesGridComponent } from './table-grid/tables-grid.component';
import { TablesRoutingModule } from './tables-routing.module';


@NgModule({
  declarations: [
    TablesFormComponent,
    TablesGridComponent,
  ],
  imports: [
    CommonModule,
    TablesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class TablesModule { }
