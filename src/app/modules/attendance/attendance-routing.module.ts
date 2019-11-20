import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChooseComponent } from './choose/choose.component';

const routes: Routes = [
  {
    path: ':tableId',
    component: ChooseComponent
  },
  {
    path: '**',
    redirectTo: '/error/not-found',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
