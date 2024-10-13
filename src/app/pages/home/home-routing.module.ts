import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { BannersComponent } from './catalogue/banners/banners.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'banners',
        loadComponent: () =>
          import('./catalogue/banners/banners.component').then(
            (m) => m.BannersComponent
          ),
      },
      {
        path: 'customers',
        loadComponent: () =>
          import('./customers/customers.component').then(
            (m) => m.CustomersComponent
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
