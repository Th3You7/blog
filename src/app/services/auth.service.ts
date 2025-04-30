import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(user: LoginRequest): Observable<AuthResponse> {
    return this.http
      .get<User[]>(`${this.apiUrl}/users?email=${user.email}`)
      .pipe(
        map((users) => {
          const foundUser = users[0];
          if (!foundUser || foundUser.password !== user.password) {
            throw new Error('Invalid email or password');
          }
          const foundUserObj: AuthResponse = {
            id: foundUser.id,
            email: foundUser.email,
            name: foundUser.name,
          };

          const str = JSON.stringify(foundUserObj);
          localStorage.setItem('user', str);
          return foundUserObj;
        }),
        catchError(this.handleError)
      );
  }

  register(user: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .get<User[]>(`${this.apiUrl}/users?email=${user.email}`)
      .pipe(
        switchMap((users) => {
          if (users.length > 0) {
            throw new Error('Email already exists');
          }
          return this.http.post<User>(`${this.apiUrl}/users`, user);
        }),
        map((user) => ({
          id: user.id,
          email: user.email,
          name: user.name,
        })),
        catchError(this.handleError)
      );
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  getUserId(): string {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr).id : '';
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  private handleError(error: any) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage =
        error.message ||
        `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
