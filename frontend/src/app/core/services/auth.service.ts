import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = `${environment.apiBaseUrl}/auth`;
  constructor(private http: HttpClient) {}
  login(email: string, password: string) {
    return this.http.post<any>(`${this.base}/login`, { email, password }).pipe(
      tap(res => localStorage.setItem('token', res.token))
    );
  }
  register(data: any) {
    return this.http.post<any>(`${this.base}/register`, data).pipe(
      tap(res => localStorage.setItem('token', res.token))
    );
  }
  logout() { localStorage.removeItem('token'); }
}
