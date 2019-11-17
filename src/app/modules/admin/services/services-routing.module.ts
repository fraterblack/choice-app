import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServicesGridComponent } from './services-grid/services-grid.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ServicesGridComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
