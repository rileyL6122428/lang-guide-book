import 'zone.js';
import 'reflect-metadata';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import { routes } from './routes'

import { HomePageComponent } from './components/home-page/home-page'
import { LGBAppComponent } from './lgb-app-component'


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
  ],
  declarations: [ HomePageComponent, LGBAppComponent ],
  bootstrap:    [ LGBAppComponent ]
})
export class LGBAppModule { }
