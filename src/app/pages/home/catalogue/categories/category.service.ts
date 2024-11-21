import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryData } from '../../../../shared/interfaces/category.interface';

const routes = {
  createCategory: '/create-category',
  getCategory: '/category',
  getDetails: (id: string) => `/category/${id}`,
  deleteCategory: (id: string) => `/category/${id}`,
  getFeatured: '/featured-category',
  getNonFeatured: '/non-category',
};

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  httpClient = inject(HttpClient);

  constructor() {}

  createCategory(data: any): Observable<{ data: CategoryData }> {
    return this.httpClient.post<{ data: CategoryData }>(
      routes.createCategory,
      data
    );
  }

  getData(): Observable<{ data: CategoryData[] }> {
    return this.httpClient.get<{ data: CategoryData[] }>(routes.getCategory);
  }

  getFeaturedCategory(): Observable<{ data: CategoryData[] }> {
    return this.httpClient.get<{ data: CategoryData[] }>(routes.getFeatured);
  }

  getNonFeaturedCategory(): Observable<{ data: CategoryData[] }> {
    return this.httpClient.get<{ data: CategoryData[] }>(routes.getNonFeatured);
  }

  getDetails(_id: string): Observable<{ data: CategoryData }> {
    return this.httpClient.get<{ data: CategoryData }>(routes.getDetails(_id));
  }

  deleteCategory(_id: string): Observable<{ message: string }> {
    return this.httpClient.delete<{ message: string }>(routes.deleteCategory(_id));
  }
}
