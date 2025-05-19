import { Routes } from '@angular/router';
import { authGuard } from '../../core/auth/auth.guard';

export const bookingRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./booking-list/booking-list.component').then(c => c.BookingListComponent),
    canActivate: [authGuard]
  },
    {
    path: ':id',
    loadComponent: () =>
      import('./booking-list/booking-list.component').then(c => c.BookingListComponent),
    canActivate: [authGuard]
  },
//   {
//     path: 'create',
//     loadComponent: () =>
//       import('./booking-actions/booking-actions.component').then(c => c.BookingActionsComponent),
//     canActivate: [authGuard],
//   },
//   {
//     path: 'update/:id',
//     loadComponent: () =>
//       import('./booking-actions/booking-actions.component').then(c => c.BookingActionsComponent),
//     canActivate: [authGuard],
//   }
];
