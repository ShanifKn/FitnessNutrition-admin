import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  NavigationEnd,
} from '@angular/router';
import { Logger } from '../logger.service';
import { User } from '../interfaces/user.interface';
import { CredentialsService } from '../services/credentials.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  private user: User | null = null;

  constructor(
    private router: Router,
    private credentialsService: CredentialsService
  ) {
    this.credentialsService.credentials.subscribe((user) => {
      this.user = user;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.credentialsService.isAuthenticated()) {
      return true; // Allow access
    }

    console.log('User is not authenticated. Redirecting to login...');
    this.router.navigate(['/auth/login'], {
      queryParams: { returnUrl: state.url }, // Save the URL the user was trying to access
    });
    return false; // Block access
  }
}
