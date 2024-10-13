import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OtpComponent } from "../otp/otp.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, OtpComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isSubmitted = false;

  onLogin() {
    this.isSubmitted = true
  }

}
