import { Routes } from '@angular/router';

import { HomePageComponent } from '../components/home-page/home-page';
import { LoginComponent } from '../components/login-page/login-page';
import { DashboardPageComponent } from '../components/dashboard-page/dashboard-page';

import { UnAuthenticatedUserRoute } from './unauthenticated-user-route';
import { AuthenticatedUserRoute } from './authenticated-user-route';

import { Injectable } from '@angular/core';

@Injectable()
export class AppRoutes {

  private static routes: Object = {
    "home": new UnAuthenticatedUserRoute({ path: 'home', component: HomePageComponent }),
    "login": new UnAuthenticatedUserRoute({ path: 'login', component: LoginComponent }),
    "dashboard": new AuthenticatedUserRoute({ path: 'dashboard', component: DashboardPageComponent }),
    "no-path": { path: '', redirectTo: 'home', pathMatch: 'full' },
    "default": { path: '**', redirectTo: 'home' }
  };

  public requiresAuthentication(url: string): boolean {
    let path: string = url.substring(1);
    return AppRoutes.routes[path] instanceof AuthenticatedUserRoute;
  }

  public static getConfig(): Routes {
    let config = [];

    for(let path in AppRoutes.routes) {
      config.push(AppRoutes.routes[path]);
    }

    return config;
  }
}
