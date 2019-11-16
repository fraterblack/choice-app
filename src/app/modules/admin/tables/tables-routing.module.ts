import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableFormComponent } from './table-form/table-form.component';
import { TableGridComponent } from './table-grid/table-grid.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TableGridComponent
      },
      {
        path: 'create',
        component: TableFormComponent
      },
      {
        path: 'update/:id',
        component: TableFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule { }
