import { Routes } from '@angular/router';
import { authGuard } from '../../core/auth/auth.guard';

export const typeRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./vehicle-list/vehicle.component').then(c => c.VehicleComponent),
    canActivate: [authGuard],
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./vehicle-actions/vehicle-actions.component').then(c => c.VehicleActionsComponent),
    canActivate: [authGuard],
  },
  {
    path: 'update/:id',
    loadComponent: () =>
      import('./vehicle-actions/vehicle-actions.component').then(c => c.VehicleActionsComponent),
    canActivate: [authGuard],
  },
];
