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

export const passwordMatchValidator: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confermaPassword')?.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
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

  user = computed(() => this.userService.selectedUser());

  urlKeyword = '';
  errorMessage = '';

  userEffect = effect(() => {
    const computedUser = this.user();
    if (computedUser && !this.router.url.includes('create')) {
      this.customerReactive.patchValue(computedUser);
    }
  });

  customerReactive: FormGroup = this.fb.group(
    {
      id: this.fb.control(null),
      nome: this.fb.nonNullable.control('', [Validators.required]),
      cognome: this.fb.nonNullable.control('', [Validators.required]),
      username: this.fb.nonNullable.control('', [Validators.required]),
      dataDiNascita: this.fb.nonNullable.control('', [Validators.required]),
      password: this.fb.nonNullable.control('', [Validators.required]),
      confermaPassword: this.fb.nonNullable.control('', [Validators.required]),
    },
    {
      validators: passwordMatchValidator,
    }
  );

  ngOnInit(): void {
    this.urlKeyword = this.router.url.includes('create')
      ? 'create'
      : this.router.url.includes('update')
      ? 'update'
      : '';
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.userService.findUserById(id);
    }
    if(this.urlKeyword === 'update') {
      this.customerReactive.removeValidators(passwordMatchValidator);
      this.customerReactive.get('password')?.clearValidators();
      this.customerReactive.get('confermaPassword')?.clearValidators();
    }
  }

  handleFormRequest() {
    if (this.urlKeyword === 'create') {
      this.userService.addUser(this.customerReactive.value);
      this.router.navigate(['/customer']);
    } else if (this.urlKeyword === 'update') {
      this.userService.updateUser(this.customerReactive.value);
      this.router.navigate(['/customer']);
    }
  }

  // compareRole = (a: Tipologia, b: Tipologia): boolean => {
  //   return a && b ? a.id === b.id : a === b;
  // };
}
