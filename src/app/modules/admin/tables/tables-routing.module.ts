import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TablesFormComponent } from './table-form/tables-form.component';
import { TablesGridComponent } from './table-grid/tables-grid.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TablesGridComponent
      },
      {
        path: 'create',
        component: TablesFormComponent
      },
      {
        path: 'update/:id',
        component: TablesFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule { }
