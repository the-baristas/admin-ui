import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../entities/user';
import { LoginService } from './login.service';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  
  private serverUrl = environment.apiUrl + "/users";

  constructor(private http: HttpClient, private loginService: LoginService) { }

  public getAllUsers() {
    return this.http.get<User[]>(`${this.serverUrl}`, { headers: this.loginService.getHeadersWithToken() }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('Unable to retrieve user data')}
      )
    )
  }

  public getUserByUserId(userId: number): Observable<User> {
    return this.http.get<User>(`${this.serverUrl}/${userId}`, { headers: this.loginService.getHeadersWithToken() }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('Unable to retrieve user data')
      }
      )
    )
  }

  public getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.serverUrl}/email/${email}`, { headers: this.loginService.getHeadersWithToken() }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('Unable to retrieve user data')
      }
      )
    )
  }

  public createUser(user: User): Observable<void> {
    return this.http.post<void>(`${this.serverUrl}`, user, { headers: this.loginService.getHeadersWithToken() }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('Unable to create user')
      }
      )
    )
  }

  public updateUser(user: User, userId: number): Observable<void> {
    return this.http.put<void>(`${this.serverUrl}/${userId}`, user, { headers: this.loginService.getHeadersWithToken() }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('Unable to update user')
      }
      )
    )
  }

  public deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.serverUrl}/${userId}`, { headers: this.loginService.getHeadersWithToken() }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('Unable to delete user')
      }
      )
    )
  }
}