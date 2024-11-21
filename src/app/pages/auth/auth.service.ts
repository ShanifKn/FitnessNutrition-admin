import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/interfaces/user.interface';

interface OtpData {
  email: string;
  otp: number;
}

const routes = {
  userLogin: '/login',
  verifyOtp: '/otp-verify',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(HttpClient);

  constructor() {}

  userLogin(data: User): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(routes.userLogin, data);
  }

  verifyOtp(data: OtpData): Observable<{ message: string; token: string }> {
    return this.httpClient.post<{ message: string; token: string }>(
      routes.verifyOtp,
      data
    );
  }
}
