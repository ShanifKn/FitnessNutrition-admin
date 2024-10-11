import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { Logger } from '../logger.service';
import { MessageService } from 'primeng/api';
import {
  ErrorFields,
  AdminError,
  ValidationError,
} from '../interfaces/error.interface';

const log = new Logger('ErrorHandlerInterceptor');

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private messageService: MessageService // private credentialService: CredentialsService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(catchError((error) => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(
    response: HttpErrorResponse
  ): Observable<HttpEvent<any>> {
    console.log('Error caught in interceptor:', response);

    // Handle different status codes
    if (response.status === 404) {
      this.showToast({
        msg: 'Not Found',
        param: 'The requested resource could not be found.',
      });
    } else if (response.status === 401) {
      this.showToast({
        msg: 'Unauthorized',
        param: 'You are not authorized to access this resource.',
      });
    } else {
      // Handle general errors
      this.beforeErrorToast(response.error);
    }

    if (!environment.production) log.error('Request error', response);

    // Always rethrow the error so that it can be handled further if needed
    throw response;
  }

  private beforeErrorToast(error: AdminError | ValidationError) {
    if ((error as AdminError)?.message) {
      return this.showToast({
        param: (error as AdminError).message,
        msg: `ERROR CODE: ${(error as AdminError).errorCode || 500}`,
      });
    }

    if ((error as ValidationError)?.errors) {
      (error as ValidationError).errors.forEach((err) => this.showToast(err));
    }
  }

  private showToast(error: ErrorFields) {
    console.log('error fff ff fff fff ', error);

    this.messageService.add({
      severity: 'error',
      summary: error.msg,
      detail: error.param,
    });
  }
}
