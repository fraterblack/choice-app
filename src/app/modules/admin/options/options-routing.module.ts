import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OptionsFormComponent } from './options-form/options-form.component';
import { OptionsGridComponent } from './options-grid/options-grid.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: OptionsGridComponent
      },
      {
        path: 'create',
        component: OptionsFormComponent
      },
      {
        path: 'update/:id',
        component: OptionsFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptionsRoutingModule { }
