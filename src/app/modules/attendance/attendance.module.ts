import { NgModule } from '@angular/core';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { ChooseComponent } from './choose/choose.component';

@NgModule({
  imports: [
    AttendanceRoutingModule
  ],
  declarations: [
    ChooseComponent
  ]
})
export class AttendanceModule { }
