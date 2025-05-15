import {
  Component,
  computed,
  effect,
  inject,
  OnChanges,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyButtonComponent } from '../../shared/components/my-button/my-button.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { MyButtonConfig } from '../../shared/components/my-button/config/my-button-config';

@Component({
  selector: 'app-welcome',
  imports: [CommonModule, MyButtonComponent, RouterLink],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  authService = inject(AuthService);

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
  customerButtonConfig: MyButtonConfig = {
    customCssClass: 'btn btn-warning btn-lg active',
    text: 'Gestisci Clientela',
    icon: 'fa fa-users',
  };
}
