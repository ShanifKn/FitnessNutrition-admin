import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../../../../shared/interfaces/product.interface';

const routes = {
  getCount: '/get-count',
  getProducts: '/get-products',
  getPendingProducts: '/get-pending',
  getDetails: (id: string) => `/product/${id}`,
  updatedProduct: '/updateProduct',
};

@Injectable()
export class ProductService {
  httpClient = inject(HttpClient);

  constructor() {}

  getCount(): Observable<{ data: string }> {
    return this.httpClient.get<{ data: string }>(routes.getCount);
  }

  getProduct(): Observable<{ data: Products[] }> {
    return this.httpClient.get<{ data: Products[] }>(routes.getProducts);
  }

  getPendingProduct(): Observable<{ data: Products[] }> {
    return this.httpClient.get<{ data: Products[] }>(routes.getPendingProducts);
  }

  getDetails(_id: string): Observable<{ data: Products }> {
    return this.httpClient.get<{ data: Products }>(routes.getDetails(_id));
  }

  updatePrdouct(data: any): Observable<{ data: Products }> {
    return this.httpClient.post<{ data: Products }>(
      routes.updatedProduct,
      data
    );
  }
}
