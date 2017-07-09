import 'zone.js';
import 'reflect-metadata';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HomePageComponent } from './components/home-page/home-page'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
  ],
  declarations: [ HomePageComponent ],
  bootstrap:    [ HomePageComponent ]
})
export class LanguageGuideBookApp { }
