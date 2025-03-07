import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, CustomerDataCount } from '../../../shared/interfaces/data.interface';

const routes = {
  getCustomer: '/customers',
  getCustomerdetails: (id: string) => `/customer-details/${id}`,
  getUserOder: (id: string) => `/admin/userOrders/${id}`,
  getUserOderCount: (id: string) => `/customers-detail/count/${id}`,
};

@Injectable()
export class CustomerService {
  httpClient = inject(HttpClient);

  constructor() { }

  getCustomers(): Observable<{ data: Customer[] }> {
    return this.httpClient.get<{ data: Customer[] }>(routes.getCustomer);
  }

  getCustomerDetails(id: string): Observable<any> {
    return this.httpClient.get<any>(routes.getCustomerdetails(id));
  }


  getOrders(_id: string): Observable<any> {
    return this.httpClient.get<any>(routes.getUserOder(_id));
  }


  getOrdersCounts(_id: string): Observable<{ data: CustomerDataCount }> {
    return this.httpClient.get<{ data: CustomerDataCount }>(routes.getUserOderCount(_id));
  }
}
