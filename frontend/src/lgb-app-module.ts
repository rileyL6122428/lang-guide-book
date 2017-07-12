import 'zone.js';
import 'reflect-metadata';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router'
import { routes } from './routes'

import { HomePageComponent } from './components/home-page/home-page'
import { LGBAppComponent } from './lgb-app-component'

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    BrowserModule,
    FormsModule,
  ],
  declarations: [ HomePageComponent, LGBAppComponent ],
  bootstrap:    [ LGBAppComponent ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class LGBAppModule { }
