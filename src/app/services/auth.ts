import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = 'http://ec2-13-233-198-26.ap-south-1.compute.amazonaws.com:8080/auth';

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post<any>(`${this.baseUrl}/login`, data).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.username); 
      })
    );
  }

  signup(data: any) {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');

    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);

      // 🔥 Check expiry
      const expiry = decoded.exp * 1000; // convert to ms

      if (Date.now() > expiry) {
        this.logout(); // auto logout
        return false;
      }

      return true;

    } catch (error) {
      console.error("Invalid token", error);
      this.logout();
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
  }
}