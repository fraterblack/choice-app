import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AttendanceLayoutComponent } from './layouts/attendance-layout/attendance-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { FeaturedMessageLayoutComponent } from './layouts/featured-message-layout/featured-message-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  // ATTENDANCE AREA - Activities
  {
    path: 'attendance',
    component: AttendanceLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/attendance/attendance.module').then(m => m.AttendanceModule)
      }
    ]
  },
  // ADMIN - Teacher Area
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/admin/admin.module').then(m => m.AdminModule)
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'error',
    component: FeaturedMessageLayoutComponent,
    loadChildren: () =>
      import('./modules/error/error.module').then(m => m.ErrorModule)
  },
  {
    path: '**',
    redirectTo: '/error/not-found',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
