import {
  ApplicationConfig,
  InjectionToken,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http'; // Add withInterceptorsFromDi
import { ApiPrefixInterceptor } from './shared/http/api-prefix.interceptor';
import { ErrorHandlerInterceptor } from './shared/http/error-handler.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { routes } from './app.routes';
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { FileUploadService } from './shared/services/file-upload.service';


export const COOKIE_OPTIONS = new InjectionToken('COOKIE_OPTIONS');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),

    // Provide HttpClient and include interceptors from DI
    provideHttpClient(
      withInterceptorsFromDi() // Ensure that interceptors from DI are applied
    ),

    // Provide class-based interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },

    // Provide services required by interceptors
    MessageService,
    FileUploadService
  ],
};
