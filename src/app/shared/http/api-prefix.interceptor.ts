import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CredentialsService } from '../services/credentials.service';

/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(private cookieService: CredentialsService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers: HttpHeaders = this.getHeaders();

    // If the request is a FormData (file upload), do not set the Content-Type header
    if (!(request.body instanceof FormData)) {
      // Add Content-Type for non-FormData requests
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json', // For JSON requests
        },
        headers,
      });
    }

    if (!/^(http|https):/i.test(request.url)) {
      request = request.clone({
        url: environment.serverUrl + request.url,
        headers,
      });
    }
    return next.handle(request);
  }

  getHeaders() {
    const savedCredentials = this.cookieService.getCookie(
      environment.cookieName
    );

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
