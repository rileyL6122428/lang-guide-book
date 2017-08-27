import 'zone.js';
import 'reflect-metadata';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router'

import { Http } from '@angular/http';

import { HttpModule } from '@angular/http';

import { LoginComponent } from './components/login-page/login-page';

import { HomePageComponent } from './components/home-page/home-page';

import { DashboardPageComponent } from './components/dashboard-page/dashboard-page';
import { TranslationsNotFoundMessage } from './components/dashboard-page/translations-not-found-message';

import { LGBAppComponent } from './lgb-app-component';

import { AuthenticationService } from './services/authentication.service';
import { CurrentUserStore } from './container/current-user-store';

import { TranslationService } from './services/translation.service';
import { TranslationStore } from './container/translation-store';

import { TranslationOverviewComponent } from './components/translation-overview-page/translation-overview-page';

import { routes } from './routing/routes';
import { AuthenticationHook } from './routing/auth-hook';

import { TranslatorHeader } from './components/authenticated-user/translator-header';

import { LoadingCircle } from './components/loading-images/loading-circle';

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
    DashboardPageComponent,
    TranslationsNotFoundMessage,
    TranslatorHeader,
    TranslationOverviewComponent,
    LoadingCircle
  ],

  entryComponents: [
    HomePageComponent,
    LoginComponent,
    DashboardPageComponent,
    TranslationOverviewComponent
  ],

  bootstrap:    [ LGBAppComponent ],
  providers: [
    AuthenticationHook,
    CurrentUserStore,
    AuthenticationService,
    TranslationStore,
    TranslationService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class LGBAppModule { }
