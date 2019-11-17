import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ServicesGridComponent } from './services-grid/services-grid.component';
import { ServicesRoutingModule } from './services-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ServicesGridComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    SharedModule
  ]
})
export class ServicesModule { }
