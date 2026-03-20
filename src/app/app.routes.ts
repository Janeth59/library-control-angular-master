import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Catalogue } from './components/catalogue/catalogue';
import { Register } from './components/register/register';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Home },
  { path: 'catalogo', component: Catalogue },
  { path: 'registro', component: Register },
];