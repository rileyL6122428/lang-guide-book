import 'zone.js';
import 'reflect-metadata';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HelloWorldComponent }  from './test-component';

console.log("HELLO WORLD");

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
  ],
  declarations: [ HelloWorldComponent ],
  bootstrap:    [ HelloWorldComponent ]
})
export class AppModule { }
