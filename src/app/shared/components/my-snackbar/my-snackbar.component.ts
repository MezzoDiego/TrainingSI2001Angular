import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarService } from './my-snackbar.service';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-my-snackbar',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './my-snackbar.component.html',
  styleUrl: './my-snackbar.component.css',
})
export class MySnackbarComponent {
  authService = inject(AuthService);
  snackbarService = inject(SnackbarService);
  data = this.snackbarService.data;

  visible = computed(() => this.data() !== null);
  message = computed(() => this.data()?.message ?? '');
  classes = computed(() => this.data()?.classes ?? ['bg-danger', 'text-white']);
}
