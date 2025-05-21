import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
 const authService = inject(AuthService);
  const router = inject(Router);
  const url = state.url;

  if (!authService.isLoggedIn()) {
    router.navigate(['login']);
    return false;
  }

  const user = authService.getUser();
  const ruolo = user?.ruolo;

  if (ruolo === 'Customer') {
    if (url.includes('vehicle')) {
      if (url.includes('create') || url.includes('update') || url.includes('types')) {
        router.navigate(['welcome']);
        return false;
      }
    }

    if (url.includes('customer') && !url.includes('update')) {
      router.navigate(['welcome']);
      return false;
    }

    if (url.includes('booking') && !url.includes('update') && /\/\d+$/.test(url)) {
      router.navigate(['welcome']);
      return false;
    }
  }

  if (ruolo === 'Super User' && url.includes('booking') && (url.includes('create') || url.includes('update'))) {
    router.navigate(['welcome']);
    return false;
  }

  return true;
};
