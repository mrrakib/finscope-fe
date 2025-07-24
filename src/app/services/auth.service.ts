import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/account`;
  private tokenKey = 'authToken';
  private authStatus!: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.initAuthStatus();
  }

  private initAuthStatus(): void {
    if (typeof localStorage === 'undefined') return;
    const isAuth = this.checkTokenValidity();
    this.authStatus = new BehaviorSubject<boolean>(isAuth);

    if (!isAuth && this.getToken()) {
      this.logout();
    }
  }

  private checkTokenValidity(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const decodedToken = this.decodeToken();
    if (!decodedToken || !decodedToken.exp) return false;

    const expiryTime = decodedToken.exp * 1000;
    return expiryTime > Date.now();
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((res) => {
          if (res?.status_code === '200' && res?.data?.token) {
            localStorage.setItem(this.tokenKey, res.data.token);
            this.authStatus.next(true);
          } else if (res?.status_code === '206') {
            console.log('2FA required, token not saved yet.');
          } else {
            console.error('Unexpected login response', res);
          }
        }),
        catchError((err) => {
          console.error('Login failed', err);
          return throwError(() => err);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    if (this.authStatus) {
      this.authStatus.next(false);
    }
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return typeof localStorage !== 'undefined'
      ? localStorage.getItem(this.tokenKey)
      : null;
  }

  decodeToken(): any {
    const token = this.getToken();
    if (!token) return null;

    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) return null;

    try {
      const payload = atob(tokenParts[1]);
      return JSON.parse(payload);
    } catch (e) {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return this.authStatus?.value ?? false;
  }
}
