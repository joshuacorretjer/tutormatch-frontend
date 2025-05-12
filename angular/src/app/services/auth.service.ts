import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../environments/environment';  // Add this import

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.apiUrl}/api`;  // Use environment variable here

  constructor(private http: HttpClient) {}

  login(credentials: { username_or_email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  logout(): void {
    localStorage.clear();
  }

  setUserSession(token: string): void {
    try {
      const decoded: any = jwtDecode(token);
      const userId = decoded.sub;
      const role = decoded.account_type;
      const email = decoded.username || decoded.email;
      const name = decoded.name;

      localStorage.setItem('access_token', token);
      localStorage.setItem('user_id', userId);
      localStorage.setItem('role', role);
      localStorage.setItem('email', email);
      localStorage.setItem('name', name);
    } catch (err) {
      console.error('Invalid token format:', err);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getUserName(): string | null {
    return localStorage.getItem('name');
  }

  getUserEmail(): string | null {
    return localStorage.getItem('email');
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  getUserId(): string | null {
    return localStorage.getItem('user_id');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
