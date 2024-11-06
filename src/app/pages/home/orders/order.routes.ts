import { Routes } from "@angular/router";
import { OrderDetailComponent } from "./order-detail/order-detail.component";
import { OrdersListComponent } from "./orders-list/orders-list.component";
import { OrdersComponent } from "./orders.component";

export const ordersRoutes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    children: [
      { path: '', component: OrdersListComponent },
      { path: 'detail/:id', component: OrderDetailComponent },
    ],
  },
];
