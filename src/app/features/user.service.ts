import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utente } from '../model/utente';
import { take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl = environment.apiBaseUrl;
  private http = inject(HttpClient);

  private _selectedUser: WritableSignal<Utente | undefined> = signal<
    Utente | undefined
  >(undefined);
  readonly selectedUser = this._selectedUser.asReadonly();
  private _users: WritableSignal<Utente[]> = signal<Utente[]>([]);
  readonly users = this._users.asReadonly();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor() {
    this.getAllCustomerUsers();
  }

  getAllCustomerUsers() {
    this.http
      .get<Utente[]>(`${this.apiServerUrl}/api/utente/getCustomers`, this.httpOptions)
      .subscribe({
        next: (data) => this._users.set(data),
        error: (error) => {
          console.error('Errore caricamento utenti:', error);
          this._users.set([]);
        },
      });
  }


  findUserById(id: number) {
    this.http
      .get<Utente>(`${this.apiServerUrl}/api/utente/${id}`, this.httpOptions)
      .subscribe({
        next: (user) => this._selectedUser.set(user),
        error: (error) => {
          console.error('Errore caricamento utente per ID:', error);
          this._selectedUser.set(undefined);
        },
      });
  }

  addUser(newUser: Utente) {
    newUser.ruolo = '2';
    return this.http
      .post<Utente>(
        `${this.apiServerUrl}/api/utente`,
        newUser,
        this.httpOptions
      )
      .subscribe({
        next: (addedUser) => {
          this._users.set([...this._users(), addedUser]);
        },
        error: (error) => console.error('Errore aggiunta utente:', error),
      });
  }

  updateUser(updatedUser: Utente) {
    return this.http
      .put<Utente>(
        `${this.apiServerUrl}/api/utente`,
        updatedUser,
        this.httpOptions
      )
      .subscribe({
        next: (user) => {
          const updatedList = this._users().map((u) =>
            u.id === user.id ? user : u
          );
          this._users.set(updatedList);
        },
        error: (error) => console.error('Errore aggiornamento utente:', error),
      });
  }

  deleteUser(userId: number) {
    return this.http
      .delete<void>(
        `${this.apiServerUrl}/api/utente/${userId}`,
        this.httpOptions
      )
      .subscribe({
        next: () => {
          const filteredList = this._users().filter(
            (u) => u.id !== userId
          );
          this._users.set(filteredList);
        },
        error: (error) => console.error('Errore eliminazione utente:', error),
      });
  }
}
