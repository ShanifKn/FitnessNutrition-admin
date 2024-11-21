import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OtpComponent } from '../otp/otp.component';
import { CommonModule } from '@angular/common';
import { CredentialsService } from '../../../shared/services/credentials.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, OtpComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private subscriptions: Subscription = new Subscription();

  loginForm!: FormGroup;
  isSubmitted = false;
  submitted = false;
  email!: string;

  constructor(

    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  isError(controlName: string, error: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!(
      control?.errors &&
      control.errors[error] &&
      (this.submitted || control.touched)
    );
  }

  onLogin() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const sub = this.authService
      .userLogin(this.loginForm.value)
      .subscribe(({ message }) => {
        this.messageService.add({ severity: 'success', summary: message });
        this.email = this.loginForm.value.email;
        this.isSubmitted = true;
      });

    this.subscriptions.add(sub);
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    this.subscriptions.unsubscribe();
  }
}
