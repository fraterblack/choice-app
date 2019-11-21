import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DialogComponent } from './components/dialog/dialog.component';
import { GridComponent } from './components/grid/grid.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MaterialModule } from './material/material.module';
import { DynamicPipe } from './pipes/dynamic.pipe';

@NgModule({
  declarations: [
    NotificationsComponent,
    GridComponent,
    DynamicPipe,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    NotificationsComponent,
    GridComponent,
    DialogComponent,
    DynamicPipe
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class SharedModule {}
