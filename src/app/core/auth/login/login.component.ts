import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  onClick(loginForm: NgForm): void {
    if (!loginForm.invalid) {
      this.authService
        .login(loginForm.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res) => {
          this.authService.setUserLogged(res);
          this.router.navigateByUrl('welcome');
        });
    }
  }
}
