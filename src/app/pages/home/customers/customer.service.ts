import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../../shared/interfaces/data.interface';

const routes = {
  getCustomer: '/customers',
  getCustomerdetails: (id: string) => `/customer-details/${id}`,
};

@Injectable()
export class CustomerService {
  httpClient = inject(HttpClient);

  constructor() {}

  getCustomers(): Observable<{ data: Customer[] }> {
    return this.httpClient.get<{ data: Customer[] }>(routes.getCustomer);
  }

  getCustomerDetails(id: string): Observable<any> {
    return this.httpClient.get<any>(routes.getCustomerdetails(id));
  }
}
