import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthenticationGuard } from './shared/guards/authentication.guard';
import { noAuthGuardGuard } from './shared/guards/no-auth-guard.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home-routing.module').then(
        (m) => m.HomeRoutingModule
      ),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((m) => m.authRoutes),
    canActivate: [noAuthGuardGuard],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
