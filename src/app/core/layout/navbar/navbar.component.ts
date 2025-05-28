import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { MyButtonComponent } from '../../../shared/components/my-button/my-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, MyButtonComponent, RouterLink],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  toggleMenu = false;

ngOnInit() {
  this.authService.getUserId().subscribe(id => this.userId = id);
}
  authService = inject(AuthService);
  userId!: string;
  buttonConfig = {
    customCssClass: 'btn btn-primary text-black',
    text: 'Logout',
    icon: 'fa fa-sign-out',
  }
  logout() {
    this.authService.logout();
  }
}
