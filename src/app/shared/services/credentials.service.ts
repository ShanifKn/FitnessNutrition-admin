import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interface';
import { environment } from '../../../environments/environment';

interface CookieOptions {
  expires?: Date;
  path?: string;
  sameSite?: 'Lax' | 'Strict' | 'None';
  secure?: boolean;
}

const jwtPath = environment.cookieName;

@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  helper = new JwtHelperService();
  private user$: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // To detect platform
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const savedCredentials = this.getCookie(jwtPath);
      if (savedCredentials) this.setUser(savedCredentials);
    }
  }

  setUser(jwt: string) {
    const _user = this.helper.decodeToken(jwt);
    this.user$.next(_user as User);
    return _user;
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const jwt = this.getCookie(jwtPath);
      return !!jwt;
    }
    return false;
  }

  get credentials(): Observable<User | null> {
    return this.user$.asObservable();
  }

  setCredentials(jwt: string) {
    if (isPlatformBrowser(this.platformId)) {
      const _user = this.setUser(jwt);

      const expires = _user?.exp ? new Date(_user.exp * 1000) : undefined;

      const cookieOptions: CookieOptions = {
        expires,
        path: '/',
        sameSite: 'Lax',
        secure: location.protocol === 'https:',
      };

      this.setCookie(jwtPath, jwt, cookieOptions);
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      this.deleteCookie(jwtPath);
    }
    this.user$.next(null);
    this.router.navigate(['/auth/login'], { replaceUrl: true });
  }

  decodeToken(jwt: string) {
    return this.helper.decodeToken(jwt);
  }

  get currentUser(): User | null {
    return this.user$.value;
  }

  /** Cookie Utility Methods **/
  private setCookie(name: string, value: string, options: CookieOptions = {}) {
    if (!isPlatformBrowser(this.platformId)) return;

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(
      value
    )}`;
    if (options.expires) {
      cookieString += `; expires=${options.expires.toUTCString()}`;
    }
    if (options.path) {
      cookieString += `; path=${options.path}`;
    }
    if (options.sameSite) {
      cookieString += `; SameSite=${options.sameSite}`;
    }
    if (options.secure) {
      cookieString += `; Secure`;
    }

    document.cookie = cookieString;
  }

  getCookie(name: string): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    const match = document.cookie.match(
      new RegExp(`(?:^|; )${encodeURIComponent(name)}=([^;]*)`)
    );
    return match ? decodeURIComponent(match[1]) : null;
  }

  private deleteCookie(name: string, path: string = '/') {
    if (!isPlatformBrowser(this.platformId)) return;

    this.setCookie(name, '', { expires: new Date(0), path });
  }
}
