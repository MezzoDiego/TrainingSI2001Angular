import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Utente } from '../../model/utente';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiServerUrl = environment.apiBaseUrl;
  private http = inject(HttpClient);
  private router = inject(Router);
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private user = signal<Utente | null>(null);
  readonly getUser = this.user.asReadonly();
  readonly isLoggedIn = computed(() => !!this.user()?.token);

  constructor() {
  const token = localStorage.getItem('jwt-token');
  const username = localStorage.getItem('username');

  if (token && username) {
    this.setUserLogged({ username, token });
  }
}

  login(loginForm: Utente): Observable<Utente> {
    return this.http
      .post<{ 'jwt-token': string }>(
        `${this.apiServerUrl}/api/auth/login`,
        JSON.stringify(loginForm),
        this.httpOptions
      )
      .pipe(
        map((res) => ({
          username: loginForm.username,
          token: res['jwt-token'],
        })),
        tap((user) => {
            localStorage.setItem('jwt-token', user.token);
            localStorage.setItem('username', user.username!);
          this.setUserLogged(user);
        })
      );
  }

  setUserLogged(user: Utente | null): void {
    if (!user) {
      this.user.set(null);
      return;
    }

    this.user.set(user);
    
    this.http
      .get<{ role: string }>(`${this.apiServerUrl}/api/utente/userInfo`)
      .pipe(
        map((res) => {
          user.ruolo = res.role;
          return user;
        }),
        tap((updatedUser) => {
          this.user.set(updatedUser);
        })
      )
      .subscribe();
  }

  getUserToken() {
    return this.user()?.token;
  }

  logout() {
    this.setUserLogged(null);
    localStorage.removeItem('jwt-token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
