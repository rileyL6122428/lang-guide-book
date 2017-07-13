import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page'
import { LoginComponent } from './components/login-page/login-page'

export const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
