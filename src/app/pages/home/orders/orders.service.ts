import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, OrderCount, ReturnRequest } from '../../../shared/interfaces/orders.interface';

const routes = {
  getCount: '/orders-count',
  getOrdersList: '/get-orders',

  getOrder: (_id: string) => `/order/${_id}`,
  update: '/order-update',
  orderStatus: (_id: string) => `/orderStatus/${_id}`,
  deliveryCharge: '/deliveryCharge',
  returnRequest: '/order/requests/return',
  requestAction: '/order/return/request',
  supportRequest: '/order/requests/support',
  supportResponse: '/order/response/support'

};

@Injectable()
export class OrdersService {
  httpClient = inject(HttpClient);

  constructor() { }

  getCount(): Observable<{ data: OrderCount }> {
    return this.httpClient.get<{ data: OrderCount }>(routes.getCount);
  }

  getOrders(): Observable<{ data: Order[] }> {
    return this.httpClient.get<{ data: Order[] }>(routes.getOrdersList);
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

  deliveryCharge(): Observable<{ data: number }> {
    return this.httpClient.get<{ data: number }>(routes.deliveryCharge);
  }
  addDeliveryCharge(deliveryCharge: number): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(routes.deliveryCharge, deliveryCharge);
  }

  getReturnRequest(): Observable<{ data: ReturnRequest[] }> {
    return this.httpClient.get<{ data: ReturnRequest[] }>(routes.returnRequest);
  }

  getSupportRequest(): Observable<{ data: ReturnRequest[] }> {
    return this.httpClient.get<{ data: ReturnRequest[] }>(routes.supportRequest);
  }

  rejectRequest(data: any): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(routes.requestAction, data);
  }

  sendSupport(data: any): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(routes.supportResponse, data);
  }
}
