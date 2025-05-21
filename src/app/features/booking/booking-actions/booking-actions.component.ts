import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Veicolo } from '../../../model/veicolo';
import { BookingService } from '../booking.service';
import { VehicleService } from '../../vehicle/vehicle.service';
import { Prenotazione } from '../../../model/prenotazione';
import { AuthService } from '../../../core/auth/auth.service';

export const intervalloPrenotazioneValido: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const dataInizio = new Date(group.get('dataInizio')?.value);
  const dataFine = new Date(group.get('dataFine')?.value);

  if (!dataInizio || !dataFine || isNaN(dataInizio.getTime()) || isNaN(dataFine.getTime())) {
    return null;
  }

  const differenzaMs = dataFine.getTime() - dataInizio.getTime();
  const unOraInMs = 60 * 60 * 1000;

  if (differenzaMs < unOraInMs) {
    return { intervalloNonValido: true };
  }

  return null;
};

@Component({
  selector: 'app-booking-actions',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  standalone: true,
  templateUrl: './booking-actions.component.html',
  styleUrl: './booking-actions.component.css'
})
export class BookingActionsComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  fb = inject(FormBuilder);
  bookingService = inject(BookingService);
  vehicleService = inject(VehicleService);
  authService = inject(AuthService);

  booking = computed(() => this.bookingService.selectedBooking());
  vehicle = computed(() => this.vehicleService.selectedVehicle());
  vehicles = computed(() => this.vehicleService.vehicles());

  minDataInizio = '';
  minDataFine = '';

  bookingEffect = effect(() => {
    const computedBooking = this.booking();
    if (computedBooking && !this.router.url.includes('create')) {
      this.bookingReactive.patchValue({
        ...computedBooking,
        veicolo: computedBooking.veicolo,
      });
    }
  });

  bookingReactive: FormGroup = this.fb.group({
    id: this.fb.control(null),
    dataInizio: this.fb.nonNullable.control('', [Validators.required]),
    dataFine: this.fb.nonNullable.control('', [Validators.required]),
    veicolo: this.fb.nonNullable.control('', [Validators.required]),
  }, {validators: intervalloPrenotazioneValido});

  urlKeyword = '';
  errorMessage = '';

  ngOnInit(): void {
    const now = new Date();
    const minDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    const maxDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    this.minDataInizio = this.formatDateTimeLocal(minDate);
    this.minDataFine = this.formatDateTimeLocal(maxDate);

    this.urlKeyword = this.router.url.includes('create')
      ? 'create'
      : this.router.url.includes('update')
      ? 'update'
      : '';
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.bookingService.findBookingById(id);
    }
  }

  handleFormRequest() {
    if (this.urlKeyword === 'create') {
      this.authService.getUserId().subscribe({
        next: (idUser) => {
          let booking: Prenotazione = this.bookingReactive.value;
          booking.utente = { id: Number(idUser) };

          this.bookingService.addBooking(booking);
        },
        error: (err) => console.error('Errore nel recupero utente:', err),
      });
    } else if (this.urlKeyword === 'update') {
      this.authService.getUserId().subscribe({
        next: (idUser) => {
          let booking: Prenotazione = this.bookingReactive.value;
          booking.utente = { id: Number(idUser) };

          this.bookingService.updateBooking(booking);
        },
        error: (err) => console.error('Errore nel recupero utente:', err),
      });
    }
  }

  compareVeicolo = (a: Veicolo, b: Veicolo): boolean => {
    return a && b ? a.id === b.id : a === b;
  };
  private formatDateTimeLocal(date: Date): string {
    const pad = (n: number) => (n < 10 ? '0' + n : n);
    const yyyy = date.getFullYear();
    const MM = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const hh = pad(date.getHours());
    const mm = pad(date.getMinutes());
    return `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
  }

    isUnchanged(): boolean {
    const current = this.bookingReactive.value;
    return (
      current.dataInizio === this.booking()?.dataInizio &&
      current.dataFine === this.booking()?.dataFine &&
      current.veicolo.id === this.booking()?.veicolo!.id
    );
  }
}
