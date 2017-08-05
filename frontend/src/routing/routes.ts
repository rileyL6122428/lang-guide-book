import { Routes } from '@angular/router';
import { AuthenticationHook } from './auth-hook';

import { HomePageComponent } from '../components/home-page/home-page';
import { LoginComponent } from '../components/login-page/login-page';
import { DashboardPageComponent } from '../components/dashboard-page/dashboard-page';

export const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardPageComponent, canActivate:[ AuthenticationHook ] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];