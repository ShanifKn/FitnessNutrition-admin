import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ComboProduct,
  Products,
  Variant,
} from '../../../../shared/interfaces/product.interface';

const routes = {
  getCount: '/get-count',
  getProducts: '/get-products',
  getPendingProducts: '/get-pending',
  getDetails: (id: string) => `/product/${id}`,
  updatedProduct: '/updateProduct',
  getAllProduct: '/allProducts',
  createVariant: '/createVaraint',
  getVaraintDetails: (id: string) => `/variants/${id}`,
  getProductZoho: `/get-ZohoProducts`,
  comboProdcut: '/products/create-combo',
  getCombos: '/products/combos',
  getComboProducts: (id: string) => `/products/combos/${id}`

};

@Injectable()
export class ProductService {
  httpClient = inject(HttpClient);

  constructor() { }

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

  getProductZoho(): Observable<{ message: string }> {
    return this.httpClient.get<{ message: string }>(
      routes.getProductZoho
    );
  }


  CreateComboProduct(data: any): Observable<{ data: ComboProduct }> {
    return this.httpClient.post<{ data: ComboProduct }>(
      routes.comboProdcut,
      data
    );
  }


  getComboProducts(): Observable<{ data: ComboProduct[] }> {
    return this.httpClient.get<{ data: ComboProduct[] }>(
      routes.getCombos
    );
  }


  getComboProduct(_id: string): Observable<{ data: ComboProduct }> {
    return this.httpClient.get<{ data: ComboProduct }>(
      routes.getComboProducts(_id)
    );
  }
}
