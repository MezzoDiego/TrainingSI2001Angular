import {
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Veicolo } from '../../model/veicolo';
import { SnackbarService } from '../../shared/components/my-snackbar/my-snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiServerUrl = environment.apiBaseUrl;
  private http = inject(HttpClient);
  private snackbarService = inject(SnackbarService);

  private _selectedVehicle: WritableSignal<Veicolo | undefined> = signal<
    Veicolo | undefined
  >(undefined);
  readonly selectedVehicle = this._selectedVehicle.asReadonly();
  private _vehicles: WritableSignal<Veicolo[]> = signal<Veicolo[]>([]);
  readonly vehicles = this._vehicles.asReadonly();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor() {
    this.getAllVehicles();
  }

  getAllVehicles() {
    this.http
      .get<Veicolo[]>(`${this.apiServerUrl}/api/veicolo/listAll`, this.httpOptions)
      .subscribe({
        next: (data) => this._vehicles.set(data),
        error: (error) => {
          console.error('Errore caricamento veicoli:', error);
          this._vehicles.set([]);
        },
      });
  }


  findVehicleById(id: number) {
    this.http
      .get<Veicolo>(`${this.apiServerUrl}/api/veicolo/${id}`, this.httpOptions)
      .subscribe({
        next: (vehicle) => this._selectedVehicle.set(vehicle),
        error: (error) => {
          console.error('Errore caricamento veicolo per ID:', error);
          this._selectedVehicle.set(undefined);
        },
      });
  }

  addVehicle(newVehicle: Veicolo) {
    return this.http
      .post<Veicolo>(
        `${this.apiServerUrl}/api/veicolo`,
        newVehicle,
        this.httpOptions
      )
      .subscribe({
        next: (addedVehicle) => {
          this._vehicles.set([...this._vehicles(), addedVehicle]);
        },
        error: (error) => console.error('Errore aggiunta veicolo:', error),
        complete: () => this.snackbarService.openSnackBar('Operazione effettuata correttamente.', ['bg-success', 'bg-opacity-50', 'text-white'], 3000, true)
      });
  }

  updateVehicle(updatedVehicle: Veicolo) {
    return this.http
      .put<Veicolo>(
        `${this.apiServerUrl}/api/veicolo`,
        updatedVehicle,
        this.httpOptions
      )
      .subscribe({
        next: (vehicle) => {
          const updatedList = this._vehicles().map((v) =>
            v.id === vehicle.id ? vehicle : v
          );
          this._vehicles.set(updatedList);
        },
        error: (error) => console.error('Errore aggiornamento veicolo:', error),
        complete: () => this.snackbarService.openSnackBar('Operazione effettuata correttamente.', ['bg-success', 'bg-opacity-50', 'text-white'], 3000, true)
      });
  }

  deleteVehicle(vehicleId: number) {
    return this.http
      .delete<void>(
        `${this.apiServerUrl}/api/veicolo/${vehicleId}`,
        this.httpOptions
      )
      .subscribe({
        next: () => {
          const filteredList = this._vehicles().filter(
            (v) => v.id !== vehicleId
          );
          this._vehicles.set(filteredList);
        },
        error: (error) => console.error('Errore eliminazione veicolo:', error),
        complete: () => this.snackbarService.openSnackBar('Operazione effettuata correttamente.', ['bg-success', 'bg-opacity-50', 'text-white'], 3000, true)
      });
  }
}
