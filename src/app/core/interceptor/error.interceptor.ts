import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { SnackbarService } from '../../shared/components/my-snackbar/my-snackbar.service';

export interface ErroreResponse {
  message: string;
  status: number;
  url: string;
  error: any;
}

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const snackbarService = inject<SnackbarService>(SnackbarService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const status = error.status;
      let message = '';

      switch (status) {
        case 500:
          message = error.error?.message === 'Invalid Login Credentials' ? 'Credenziali errate' : error.error?.message;
          break;
      }

      const structuredError: ErroreResponse = {
        message,
        status,
        url: req.url,
        error
      };

      if(structuredError.message !== '')
      snackbarService.openErrorSnackBar(structuredError);

      return throwError(() => structuredError);
    })
  );
};
