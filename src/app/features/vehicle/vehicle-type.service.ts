import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tipologia } from '../../model/tipologia';

@Injectable({
  providedIn: 'root',
})
export class VehicleTypeService {
  private apiServerUrl = environment.apiBaseUrl;
  private http = inject(HttpClient);

  private _selectedType: WritableSignal<Tipologia | undefined> = signal<
    Tipologia | undefined
  >(undefined);
  readonly selectedType = this._selectedType.asReadonly();
  private _types: WritableSignal<Tipologia[]> = signal<Tipologia[]>([]);
  readonly types = this._types.asReadonly();

    private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor() {
    this.getAllTypes();
  }

    getAllTypes() {
      this.http
        .get<Tipologia[]>(`${this.apiServerUrl}/api/tipologia`, this.httpOptions)
        .subscribe({
          next: (data) => this._types.set(data),
          error: (error) => {
            console.error('Errore caricamento tipologie:', error);
            this._types.set([]);
          },
        });
    }

      findTypeById(id: number) {
        this.http
          .get<Tipologia>(
            `${this.apiServerUrl}/api/tipologia/${id}`,
            this.httpOptions
          )
          .subscribe({
            next: (type) => this._selectedType.set(type),
            error: (error) => {
              console.error('Errore caricamento tipologia per ID:', error);
              this._selectedType.set(undefined);
            },
          });
      }
}
