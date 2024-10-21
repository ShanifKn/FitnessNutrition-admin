// import { ChangeDetectorRef, Injectable } from '@angular/core';
// import { User } from '@app/@shared/interfaces/user.interface';
// import { environment } from '@env/environment';
// import { CookieOptions, CookieService } from 'ngx-cookie';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { Router } from '@angular/router';
// import { BehaviorSubject, Observable } from 'rxjs';

// const jwtPath = environment.cookieName;

// @Injectable({
//   providedIn: 'root',
// })
// export class CredentialsService {
//   // private _user: User | null = null;
//   helper = new JwtHelperService();

//   private user$: BehaviorSubject<User | null> =
//     new BehaviorSubject<User | null>(null);

//   constructor(private cookieService: CookieService, private router: Router) {
//     const savedCredentials = this.cookieService.get(jwtPath);

//     if (savedCredentials) this.setUser(savedCredentials);
//   }

//   setUser(jwt: string) {
//     const _user = this.helper.decodeToken(jwt);

//     this.user$.next(_user as User);

//     return _user;
//   }

//   isAuthenticated(): boolean {
//     return !!this.credentials;
//   }

//   get credentials(): Observable<User | null> {
//     return this.user$.asObservable();
//   }

//   setCredentials(jwt: string) {
//     const _user = this.setUser(jwt);

//     const expires = new Date((_user?.exp || 0) * 1000);

//     const cookieOptions = { expires } as CookieOptions;

//     this.cookieService.put(jwtPath, jwt, cookieOptions);
//   }

//   decodeToken(jwt: string) {
//     return this.helper.decodeToken(jwt);
//   }

//   logout() {
//     this.cookieService.remove(jwtPath);

//     this.user$.next(null);

//     this.router.navigate(['/home'], { replaceUrl: true });
//   }
// }
