import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Driver } from '../../../shared/interfaces/driver.interface';

const routes = {
  getList: '/drivers',
  Create: '/create-driver',
  update: '/update-driver',
  details: (id: string) => `/driver/${id}`,
};

@Injectable()
export class DriverService {
  httpClient = inject(HttpClient);

  constructor() {}

  getList(): Observable<{ data: Driver[] }> {
    return this.httpClient.get<{ data: Driver[] }>(routes.getList);
  }

  create(data: any): Observable<{ data: Driver }> {
    return this.httpClient.post<{ data: Driver }>(routes.Create, data);
  }

  getDetails(_id: string): Observable<{ data: Driver }> {
    return this.httpClient.get<{ data: Driver }>(routes.details(_id));
  }

  update(data: any): Observable<{ data: Driver }> {
    return this.httpClient.post<{ data: Driver }>(routes.update, data);
  }
}
