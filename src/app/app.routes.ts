import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'welcome',
    loadComponent: () =>
      import('./features/welcome/welcome.component').then(
        (c) => c.WelcomeComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'vehicle',
    loadComponent: () =>
      import('./features/vehicle/vehicle-list/vehicle.component').then(
        (c) => c.VehicleComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'vehicle/create',
    loadComponent: () =>
      import(
        './features/vehicle/vehicle-actions/vehicle-actions.component'
      ).then((c) => c.VehicleActionsComponent),
    canActivate: [authGuard],
  },
    {
    path: 'vehicle/update/:id',
    loadComponent: () =>
      import(
        './features/vehicle/vehicle-actions/vehicle-actions.component'
      ).then((c) => c.VehicleActionsComponent),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./core/auth/login/login.component').then((c) => c.LoginComponent),
  },

  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', redirectTo: '/welcome', pathMatch: 'full' },
];
