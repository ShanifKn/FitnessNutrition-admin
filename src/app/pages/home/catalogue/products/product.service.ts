import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Products,
  Variant,
} from '../../../../shared/interfaces/product.interface';

interface Response {
  totalProducts: number;
  product: Products[];
  totalPages: number;
}

const routes = {
  getCount: '/get-count',
  // getProducts: '/get-products',

  getProducts: (pageIndex: number, itemsPerPage: number) =>
    `/get-products?page=${pageIndex}&limit=${itemsPerPage}`,
  getPendingProducts: '/get-pending',
  getDetails: (id: string) => `/product/${id}`,
  updatedProduct: '/updateProduct',
  getAllProduct: '/get-products',
  createVariant: '/createVaraint',
  getVaraintDetails: (id: string) => `/variants/${id}`,
};

@Injectable()
export class ProductService {
  httpClient = inject(HttpClient);

  constructor() {}

  getCount(): Observable<{ data: string }> {
    return this.httpClient.get<{ data: string }>(routes.getCount);
  }

  getProduct(
    pageIndex: number,
    itemsPerPage: number
  ): Observable<{ data: Response }> {
    return this.httpClient.get<{ data: Response }>(
      routes.getProducts(pageIndex, itemsPerPage)
    );
  }

  getPendingProduct(): Observable<{ data: Products[] }> {
    return this.httpClient.get<{ data: Products[] }>(routes.getPendingProducts);
  }

  getDetails(_id: string): Observable<{ data: Products }> {
    return this.httpClient.get<{ data: Products }>(routes.getDetails(_id));
  }

  updatePrdouct(data: any): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(
      routes.updatedProduct,
      data
    );
  }

  getAllProduct(): Observable<{ data: Products[] }> {
    return this.httpClient.get<{ data: Products[] }>(routes.getAllProduct);
  }

  CreateVariantProduct(data: Variant): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(
      routes.createVariant,
      data
    );
  }

  getVariantDetails(_id: string): Observable<{ data: Variant }> {
    return this.httpClient.get<{ data: Variant }>(
      routes.getVaraintDetails(_id)
    );
  }
}
