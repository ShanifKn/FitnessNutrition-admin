import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';


import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers: HttpHeaders = this.getHeaders();

    if (!/^(http|https):/i.test(request.url)) {
      request = request.clone({
        url: environment.serverUrl + request.url,
        headers,
      });
    }
    return next.handle(request);
  }

  getHeaders() {
    const savedCredentials = this.cookieService.get(environment.cookieName);

    if (!savedCredentials)
      return new HttpHeaders({
        ...environment.serverHeaders,
      });

    return new HttpHeaders({
      ...environment.serverHeaders,
      'x-auth-token': savedCredentials,
    });
  }
}
