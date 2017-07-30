import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page';
import { LoginComponent } from './components/login-page/login-page';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page';

import { AuthenticatedUserRoute } from './routing/authenticated-user-route';
import { UnAuthenticatedUserRoute } from './routing/unauthenticated-user-route';

export const routes: Routes = [
  new UnAuthenticatedUserRoute({ path: 'home', component: HomePageComponent }),
  new AuthenticatedUserRoute({ path: 'login', component: LoginComponent }),
  new AuthenticatedUserRoute({ path: 'dashboard', component: DashboardPageComponent }),
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
