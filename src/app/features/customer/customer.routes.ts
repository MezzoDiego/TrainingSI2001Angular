import { Routes } from '@angular/router';
import { authGuard } from '../../core/auth/auth.guard';

export const customerRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./customer-list/customer-list.component').then(c => c.CustomerListComponent),
    canActivate: [authGuard],
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./customer-actions/customer-actions.component').then(c => c.CustomerActionsComponent),
    canActivate: [authGuard],
  },
  {
    path: 'update/:id',
    loadComponent: () =>
      import('./customer-actions/customer-actions.component').then(c => c.CustomerActionsComponent),
    canActivate: [authGuard],
  }
];
