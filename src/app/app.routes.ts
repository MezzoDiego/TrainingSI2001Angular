import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'welcome',
    loadComponent: () =>
      import('./features/welcome/welcome.component').then(c => c.WelcomeComponent),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./core/auth/login/login.component').then(c => c.LoginComponent)
  },

  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', redirectTo: '/welcome', pathMatch: 'full' },
];
