import { Injectable, signal } from '@angular/core';

export interface ToastData {
  message: string;
  classes?: string[];
  duration?: number;
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private _data = signal<ToastData | null>(null);
  readonly data = this._data.asReadonly();

  openSnackBar(message: string, panelClass: string[] = [], duration = 3000, visible: boolean) {
    this._data.set({ message, classes: panelClass, duration, visible });
    setTimeout(() => this._data.set(null), duration);
  }

  openErrorSnackBar(error: { message: string }) {
    this.openSnackBar(error.message, ['bg-danger', 'text-white'], 3000, true);
  }
}