import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  OrderCount,
  Order,
} from '../../../../shared/interfaces/orders.interface';

const routes = {
  getCount: '/orders-count',
  getOrdersList: '/get-orders',
  getReturnList: '/get-returnOrders',
  getOrder: (_id: string) => `/order/${_id}`,
};

@Injectable()
export class OrdersService {
  httpClient = inject(HttpClient);

  constructor() {}

  getCount(): Observable<{ data: OrderCount }> {
    return this.httpClient.get<{ data: OrderCount }>(routes.getCount);
  }

  getOrders(): Observable<{ data: Order[] }> {
    return this.httpClient.get<{ data: order[] }>(routes.getOrdersList);
  }

  getReturnOrders(): Observable<{ data: Order[] }> {
    return this.httpClient.get<{ data: order[] }>(routes.getReturnList);
  }

  getOrder(_id: string): Observable<{ data: Order }> {
    return this.httpClient.get<{ data: order }>(routes.getOrdersList);
  }
}
