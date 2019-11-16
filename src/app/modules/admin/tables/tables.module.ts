import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { TableFormComponent } from './table-form/table-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableGridComponent } from './table-grid/table-grid.component';


@NgModule({
  declarations: [
    TableFormComponent,
    TableGridComponent,
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
