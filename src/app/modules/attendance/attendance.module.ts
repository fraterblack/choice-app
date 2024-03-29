import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from './../../shared/material/material.module';
import { AttendanceRoutingModule } from './attendance-routing.module';
import { ChooseComponent } from './choose/choose.component';

@NgModule({
  imports: [
    AttendanceRoutingModule,
    CommonModule,
    MaterialModule
  ],
  declarations: [
    ChooseComponent
  ]
})
export class AttendanceModule { }
