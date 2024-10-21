import { Route } from '@angular/router';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

export const customerRoutes: Route[] = [
  {
    path: '',
    component: CustomersListComponent,
  },
  {
    path: 'customer-details/:id',
    component: CustomerDetailComponent,
  },
];
