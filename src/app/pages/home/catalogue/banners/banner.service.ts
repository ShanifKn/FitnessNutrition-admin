import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BannerData,
  Banners,
} from '../../../../shared/interfaces/data.interface';

const routes = {
  getBanners: '/banners',
  createBanner: '/create-banner',
  deleteBanner: (id: string) => `/banner/${id}`,
};

@Injectable()
export class BannerService {
  httpClient = inject(HttpClient);

  constructor() {}

  getBanners(): Observable<{ data: Banners }> {
    return this.httpClient.get<{ data: Banners }>(routes.getBanners);
  }

  createBanners(data: BannerData): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(routes.createBanner, data);
  }

  deleteBanner(bannerId: string): Observable<{ message: string }> {
    return this.httpClient.delete<{ message: string }>(routes.deleteBanner(bannerId))
  }
}
