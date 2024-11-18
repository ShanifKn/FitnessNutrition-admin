import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OtpComponent } from '../otp/otp.component';
import { CommonModule } from '@angular/common';
import { CredentialsService } from '../../../shared/services/credentials.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, OtpComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isSubmitted = false;
  token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkR1bW15IFRva2VuIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36PO';

  constructor(
    private credentialsService: CredentialsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onLogin() {
    // this.isSubmitted = true;
    this.credentialsService.setCredentials(this.token);

    console.log("heelo");

    this.router.navigate([this.route.snapshot.queryParams['redirect'] || '/'], {
      replaceUrl: true,
    });
  }
}
