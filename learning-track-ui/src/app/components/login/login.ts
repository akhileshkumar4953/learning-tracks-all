import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  errorMessage = '';

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.loginForm = this.fb.group({

      email: ['', [Validators.required, Validators.email]],

      password: ['', Validators.required]

    });

  }

  login() {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;

    }

    this.authService.login(this.loginForm.value as any)
      .subscribe({

        next: (response) => {

          localStorage.setItem('token', response.token);

          this.router.navigate(['/dashboard']);

        },

        error: () => {

          this.errorMessage = 'Invalid Email or Password';

        }

      });

  }

}