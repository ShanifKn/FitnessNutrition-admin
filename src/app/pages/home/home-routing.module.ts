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
        loadChildren: () =>
          import('./customers/customers.routes').then((m) => m.customerRoutes),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./orders/order.routes').then((m) => m.ordersRoutes),
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
