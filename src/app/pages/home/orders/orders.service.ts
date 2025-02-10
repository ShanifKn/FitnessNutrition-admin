import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, OrderCount } from '../../../shared/interfaces/orders.interface';

const routes = {
  getCount: '/orders-count',
  getOrdersList: '/get-orders',
  getReturnList: '/get-returnOrders',
  getOrder: (_id: string) => `/order/${_id}`,
  update: '/order-update',
  orderStatus: (_id: string) => `/orderStatus/${_id}`,
};

@Injectable()
export class OrdersService {
  httpClient = inject(HttpClient);

  constructor() {}

  getCount(): Observable<{ data: OrderCount }> {
    return this.httpClient.get<{ data: OrderCount }>(routes.getCount);
  }

  getOrders(): Observable<{ data: Order[] }> {
    return this.httpClient.get<{ data: Order[] }>(routes.getOrdersList);
  }

  getReturnOrders(): Observable<{ data: Order[] }> {
    return this.httpClient.get<{ data: Order[] }>(routes.getReturnList);
  }

  getOrder(_id: string): Observable<{ data: Order }> {
    return this.httpClient.get<{ data: Order }>(routes.getOrder(_id));
  }

  updatOrder(data: any): Observable<{ data: any }> {
    return this.httpClient.post<{ data: any }>(routes.update, data);
  }

  orderStatus(_id: string): Observable<{ data: any }> {
    return this.httpClient.get<{ data: any }>(routes.orderStatus(_id));
  }
}
