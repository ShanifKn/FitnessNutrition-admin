import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { BannersComponent } from './catalogue/banners/banners.component';
import { FaqComponent } from './settings/faq/faq.component';

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
        path: 'catalogue',
        loadChildren: () =>
          import('./catalogue/catalouge.routes').then((m) => m.catalogueRoutes),
      },
      {
        path: 'customers',
        loadComponent: () =>
          import('./customers/customers.component').then(
            (m) => m.CustomersComponent
          ),
        children: [
          {
            path: '', // Default route for customers
            loadComponent: () =>
              import(
                './customers/customers-list/customers-list.component'
              ).then((m) => m.CustomersListComponent),
          },
          {
            path: 'customer-details/:id', // Dynamic route for customer details
            loadComponent: () =>
              import(
                './customers/customer-detail/customer-detail.component'
              ).then((m) => m.CustomerDetailComponent),
          },
        ],
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.routes').then((m) => m.settingRoutes),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
