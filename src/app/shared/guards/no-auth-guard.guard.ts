import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CredentialsService } from '../services/credentials.service';

export const noAuthGuardGuard: CanActivateFn = (route, state) => {
  const credentialsService = inject(CredentialsService);
  const router = inject(Router);

  if (!credentialsService.isAuthenticated()) {
    console.log('Unauthenticated user. Access allowed.');
    return true; // Allow unauthenticated users to access the route
  }

  console.log('Authenticated user. Redirecting to home...');
  router.navigate(['/']); // Redirect to home for authenticated users
  return false; // Block access to the route
};
