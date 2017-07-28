import 'zone.js';
import 'reflect-metadata';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router'
import { routes } from './routes';

import { Http } from '@angular/http';

import { HttpModule } from '@angular/http';

import { LoginComponent } from './components/login-page/login-page';
import { HomePageComponent } from './components/home-page/home-page';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page';
import { LGBAppComponent } from './lgb-app-component';

import { LoginService } from './services/login.service';
import { CurrentUserStore } from './container/current-user-store';

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    HomePageComponent,
    LGBAppComponent,
    LoginComponent,
    DashboardPageComponent
  ],
  bootstrap:    [ LGBAppComponent ],
  providers: [
    CurrentUserStore,
    LoginService,
    { provide: LocationStrategy, useClass: HashLocationStrategy}
  ]
})
export class LGBAppModule { }
