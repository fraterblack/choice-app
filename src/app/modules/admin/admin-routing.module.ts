import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin/home',
    pathMatch: 'full'
  },
  // HOME
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomeModule)
  },
  // SETTINGS
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then(m => m.SettingsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
