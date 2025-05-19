// src/app/app.routes.ts
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
    loadChildren: () =>
      import('./features/vehicle/vehicle.routes').then((m) => m.vehicleRoutes),
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('./features/customer/customer.routes').then(
        (m) => m.customerRoutes
      ),
  },
     {
    path: 'booking',
    loadChildren: () =>
      import('./features/booking/booking.routes').then(m => m.bookingRoutes),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./core/auth/login/login.component').then((c) => c.LoginComponent),
  },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', redirectTo: '/welcome', pathMatch: 'full' },
];
