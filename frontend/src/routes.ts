import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page'

export const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
