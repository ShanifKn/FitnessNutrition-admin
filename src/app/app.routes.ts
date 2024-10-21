import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home-routing.module').then(
        (m) => m.HomeRoutingModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then(
      (m) => m.authRoutes
    )
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
