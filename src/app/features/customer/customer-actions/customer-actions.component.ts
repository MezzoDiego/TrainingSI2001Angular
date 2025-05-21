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
import { UserService } from '../../user.service';
import { AuthService } from '../../../core/auth/auth.service';

export const optionalPasswordValidator: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  const password = group.get('password')?.value?.trim();
  const confermaPassword = group.get('confermaPassword')?.value?.trim();

  const isOneFilled = password || confermaPassword;

  if (!isOneFilled) return null;

  const errors: any = {};

  if (!password) {
    errors.passwordRequired = true;
  }

  if (!confermaPassword) {
    errors.confermaPasswordRequired = true;
  }

  if (password && confermaPassword && password !== confermaPassword) {
    errors.passwordMismatch = true;
  }

  return Object.keys(errors).length ? errors : null;
};

@Component({
  selector: 'app-customer-actions',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  standalone: true,
  templateUrl: './customer-actions.component.html',
  styleUrl: './customer-actions.component.css',
})
export class CustomerActionsComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  fb = inject(FormBuilder);
  userService = inject(UserService);
  authService = inject(AuthService);

  user = computed(() => this.userService.selectedUser());

  urlKeyword = '';
  errorMessage = '';

  userEffect = effect(() => {
    const computedUser = this.user();
    if (computedUser && !this.router.url.includes('create')) {
      const patchData = { ...computedUser };
      delete patchData.password;

      this.customerReactive.patchValue(patchData);
    }
  });

  customerReactive: FormGroup = this.fb.group(
    {
      id: this.fb.control(null),
      nome: this.fb.nonNullable.control('', [Validators.required]),
      cognome: this.fb.nonNullable.control('', [Validators.required]),
      username: this.fb.nonNullable.control('', [Validators.required, Validators.maxLength(10)]),
      dataDiNascita: this.fb.nonNullable.control('', [Validators.required]),
      password: this.fb.nonNullable.control(''),
      confermaPassword: this.fb.nonNullable.control(''),
    },
    {
      validators: optionalPasswordValidator,
    }
  );

  ngOnInit(): void {
    this.urlKeyword = this.router.url.includes('create')
      ? 'create'
      : this.router.url.includes('update')
      ? 'update'
      : '';

    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.userService.findUserById(id);
    }

    if (
      this.urlKeyword === 'update' &&
      this.authService.getUser()?.ruolo === 'Customer'
    ) {
      this.customerReactive.setValidators(optionalPasswordValidator);
    } else if (this.urlKeyword === 'update') {
      this.customerReactive.clearValidators();
    }

    this.customerReactive.updateValueAndValidity();
  }

  handleFormRequest() {
    if (this.urlKeyword === 'create') {
      this.userService.addUser(this.customerReactive.value);
      this.router.navigate(['/customer']);
    } else if (this.urlKeyword === 'update') {
      this.userService.updateUser(this.customerReactive.value);
      if (this.authService.getUser()?.ruolo === 'Customer') {
        this.authService.logout();
      }
      this.authService.getUser()?.ruolo === 'Super User'
        ? this.router.navigate(['/customer'])
        : this.router.navigate(['/welcome']);
    }
  }

  isUnchanged(): boolean {
    const current = this.customerReactive.value;
    return (
      current.nome === this.user()?.nome &&
      current.cognome === this.user()?.cognome &&
      current.dataDiNascita === this.user()?.dataDiNascita &&
      current.username === this.user()?.username &&
      current.password === ''
    );
  }
}
