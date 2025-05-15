import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { MyButtonComponent } from '../../../shared/components/my-button/my-button.component';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, MyButtonComponent],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  authService = inject(AuthService);
  buttonConfig = {
    customCssClass: 'btn btn-primary',
    text: 'Logout',
    icon: 'fa fa-sign-out',
  }
  logout() {
    this.authService.logout();
  }
}
