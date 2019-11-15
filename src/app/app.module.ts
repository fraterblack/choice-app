import { NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminNavMenuComponent } from './layouts/admin-nav-menu/admin-nav-menu.component';
import { AttendanceLayoutComponent } from './layouts/attendance-layout/attendance-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { FeaturedMessageLayoutComponent } from './layouts/featured-message-layout/featured-message-layout.component';
import { SharedModule } from './shared/shared.module';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'legacy'
};

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AttendanceLayoutComponent,
    AppComponent,
    AuthLayoutComponent,
    FeaturedMessageLayoutComponent,
    AdminNavMenuComponent
  ],
  imports: [
    // angular
    BrowserModule,

    // 3rd party
    BrowserAnimationsModule,

    // core & shared
    CoreModule,
    SharedModule,

    // app
    AppRoutingModule
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
