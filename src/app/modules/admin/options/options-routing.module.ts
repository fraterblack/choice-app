import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OptionsFormComponent } from './options-form/options-form.component';
import { OptionsGridComponent } from './options-grid/options-grid.component';
import { OptionsNewFromSuggestionsComponent } from './options-new-from-suggestions/options-new-from-suggestions.component';


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
        path: 'create-from-suggestions',
        component: OptionsNewFromSuggestionsComponent
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
