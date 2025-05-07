import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  registerStudent(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { ...data, role: 'student' });
  }

  registerTutor(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { ...data, role: 'tutor' });
  }

  logout(): void {
    localStorage.clear();
  }

  setUserSession(email: string, role: string): void {
    localStorage.setItem('email', email);
    localStorage.setItem('role', role);
  }

  getUserEmail(): string | null {
    return localStorage.getItem('email');
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('email');
  }
}
