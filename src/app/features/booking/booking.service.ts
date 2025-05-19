import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Prenotazione } from '../../model/prenotazione';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiServerUrl = environment.apiBaseUrl;
  private http = inject(HttpClient);

  private _selectedBooking: WritableSignal<Prenotazione | undefined> = signal<
    Prenotazione | undefined
  >(undefined);
  readonly selectedBooking = this._selectedBooking.asReadonly();
  private _bookings: WritableSignal<Prenotazione[]> = signal<Prenotazione[]>(
    []
  );
  readonly bookings = this._bookings.asReadonly();

  private _userBookings: WritableSignal<Prenotazione[]> = signal<
    Prenotazione[]
  >([]);
  readonly userBookings = this._userBookings.asReadonly();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor() {
    this.getAllBookings();
  }

  getAllBookings() {
    this.http
      .get<Prenotazione[]>(
        `${this.apiServerUrl}/api/prenotazione`,
        this.httpOptions
      )
      .subscribe({
        next: (data) => this._bookings.set(data),
        error: (error) => {
          console.error('Errore caricamento Prenotazioni:', error);
          this._bookings.set([]);
        },
      });
  }

  getAllBookingsByUser(idUser: number) {
    this.http
      .get<Prenotazione[]>(
        `${this.apiServerUrl}/api/prenotazione/estraiPrenotazioniUtente/${idUser}`,
        this.httpOptions
      )
      .subscribe({
        next: (data) => this._userBookings.set(data),
        error: (error) => {
          console.error('Errore caricamento Prenotazioni:', error);
          this._userBookings.set([]);
        },
      });
  }

  findBookingById(id: number) {
    this.http
      .get<Prenotazione>(
        `${this.apiServerUrl}/api/prenotazione/${id}`,
        this.httpOptions
      )
      .subscribe({
        next: (booking) => this._selectedBooking.set(booking),
        error: (error) => {
          console.error('Errore caricamento prenotazione per ID:', error);
          this._selectedBooking.set(undefined);
        },
      });
  }

  addBooking(newBooking: Prenotazione) {
    return this.http
      .post<Prenotazione>(
        `${this.apiServerUrl}/api/prenotazione`,
        newBooking,
        this.httpOptions
      )
      .subscribe({
        next: (addedBooking) => {
          this._bookings.set([...this._bookings(), addedBooking]);
        },
        error: (error) => console.error('Errore aggiunta prenotazione:', error),
      });
  }

  updateBooking(updatedBooking: Prenotazione) {
    return this.http
      .put<Prenotazione>(
        `${this.apiServerUrl}/api/prenotazione`,
        updatedBooking,
        this.httpOptions
      )
      .subscribe({
        next: (booking) => {
          const updatedList = this._bookings().map((b) =>
            b.id === booking.id ? booking : b
          );
          this._bookings.set(updatedList);
        },
        error: (error) =>
          console.error('Errore aggiornamento prenotazione:', error),
      });
  }

  deleteUser(bookingId: number) {
    return this.http
      .delete<void>(
        `${this.apiServerUrl}/api/prenotazione/${bookingId}`,
        this.httpOptions
      )
      .subscribe({
        next: () => {
          const filteredList = this._bookings().filter(
            (b) => b.id !== bookingId
          );
          this._bookings.set(filteredList);
        },
        error: (error) =>
          console.error('Errore eliminazione prenotazione:', error),
      });
  }

  handleBooking(bookingId: number, isApproved: boolean) {
    return this.http
      .put<Prenotazione>(
        `${this.apiServerUrl}/api/prenotazione/changeApproval/${bookingId}/${isApproved}`,
        null,
        this.httpOptions
      )
      .subscribe({
        next: (booking) => {
          const updatedList = this._bookings().map((b) =>
            b.id === bookingId ? booking : b
          );
          this._bookings.set(updatedList);
          const userBookings = this._userBookings();

          if (userBookings.some((b) => b.id === bookingId)) {
            const updatedUserBookings = userBookings.map((b) =>
              b.id === bookingId ? booking : b
            );
            this._userBookings.set(updatedUserBookings);
          }
        },
        error: (error) => console.error('Errore gestione prenotazione:', error),
      });
  }
}
