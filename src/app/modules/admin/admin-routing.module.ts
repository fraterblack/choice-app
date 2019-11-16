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
  // SERVICES
  {
    path: 'services',
    loadChildren: () =>
      import('./services/services.module').then(m => m.ServicesModule)
  },
  // OPTIONS
  {
    path: 'options',
    loadChildren: () =>
      import('./options/options.module').then(m => m.OptionsModule)
  },
  // TABLES
  {
    path: 'tables',
    loadChildren: () =>
      import('./tables/tables.module').then(m => m.TablesModule)
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
