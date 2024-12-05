import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { InputOtpModule } from 'primeng/inputotp';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api';
import { CredentialsService } from '../../../shared/services/credentials.service';
import { ActivatedRoute, Router } from '@angular/router';

interface OtpData {
  email: string;
  otp: number;
}

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [InputOtpModule, ReactiveFormsModule, CommonModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss',
})
export class OtpComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();

  otpForm!: FormGroup;
  @Input() email!: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private credentialsService: CredentialsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Initialize the form with a control for OTP input
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required]], // OTP should have 6 digits
    });
  }

  get otpControl() {
    return this.otpForm.get('otp');
  }

  // Handle form submission
  onSubmit() {
    if (this.otpForm.invalid) {
      return;
    }

    const data: OtpData = {
      email: this.email,
      otp: this.otpForm.value.otp,
    };

    const sub = this.authService
      .verifyOtp(data)
      .subscribe(({ message, token }) => {
        this.messageService.add({ severity: 'success', summary: message });
        this.credentialsService.setCredentials(token);

        this.router.navigate(
          [this.route.snapshot.queryParams['redirect'] || '/'],
          {
            replaceUrl: true,
          }
        );
      });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
