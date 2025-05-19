import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { MyButtonConfig } from '../../shared/components/my-button/config/my-button-config';
import { MyButtonComponent } from '../../shared/components/my-button/my-button.component';

@Component({
  selector: 'app-welcome',
  imports: [CommonModule, MyButtonComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  authService = inject(AuthService);
  router = inject(Router);

  carsButtonConfig = computed<MyButtonConfig>(() => {
    const ruolo = this.authService.getUser()?.ruolo ?? '';
    return {
      customCssClass: 'btn btn-primary btn-lg active',
      text: ruolo.includes('Super User')
        ? 'Gestisci Parco Auto'
        : 'Visualizza Parco Auto',
      icon: 'fa fa-car',
    };
  });

  bookingButtonConfig = computed<MyButtonConfig>(() => {
    const ruolo = this.authService.getUser()?.ruolo ?? '';
    return {
      customCssClass: 'btn btn-secondary btn-lg active',
      text: ruolo.includes('Super User')
        ? 'Visualizza Prenotazioni Effettuate'
        : 'Le Mie Prenotazioni',
      icon: 'fa fa-calendar',
    };
  });

  customerButtonConfig = signal<MyButtonConfig>({
    customCssClass: 'btn btn-warning btn-lg active',
    text: 'Gestisci Clientela',
    icon: 'fa fa-users',
  });

  navigateTo(route: String) {
    this.router.navigate([route]);
  }
}
