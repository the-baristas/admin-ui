import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Page } from '../entities/page';
import { User } from '../entities/user';
import { LoginService } from './login.service';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private serverUrl = environment.userServiceUrl + '/users';

    constructor(private http: HttpClient, private loginService: LoginService) {}

    public getAllUsers(page: number, size: number) {
        return this.http
            .get<Page<User>>(`${this.serverUrl}?page=${page}&size=${size}`, {
                headers: this.loginService.getHeadersWithToken()
            })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError('Unable to retrieve user data');
                })
            );
  }

  public findUsersBySearchTerm(searchTerm: string, page: number, size: number) {
    return this.http
      .get<Page<User>>(`${this.serverUrl}/search?term=${searchTerm}&page=${page}&size=${size}`, {
        headers: this.loginService.getHeadersWithToken()
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError('Unable to retrieve user data');
        })
      );
  }

    public getUserByUserId(userId: number): Observable<User> {
        return this.http
            .get<User>(`${this.serverUrl}/${userId}`, {
                headers: this.loginService.getHeadersWithToken()
            })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError('Unable to retrieve user data');
                })
            );
    }

    public getUserByEmail(email: string): Observable<User> {
        return this.http
            .get<User>(`${this.serverUrl}/email/${email}`, {
                headers: this.loginService.getHeadersWithToken()
            })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 404) {
                        return throwError(
                            'A user with this email does not exist'
                        );
                    } else if (error.status === 500) {
                        return throwError('Database error');
                    } else {
                        return throwError('Something went wrong');
                    }
                })
            );
    }

    public getUserByUsername(username: string): Observable<User> {
        return this.http
            .get<User>(`${this.serverUrl}/username/${username}`, {
                headers: this.loginService.getHeadersWithToken()
            })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 404) {
                        return throwError(
                            'A user with this username does not exist'
                        );
                    } else if (error.status === 500) {
                        return throwError('Database error');
                    } else {
                        return throwError('Something went wrong');
                    }
                })
            );
    }

    public getUserByPhoneNumber(phone: string): Observable<User> {
        return this.http
            .get<User>(`${this.serverUrl}/phone/${phone}`, {
                headers: this.loginService.getHeadersWithToken()
            })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 404) {
                        return throwError(
                            'A user with this phone number does not exist'
                        );
                    } else if (error.status === 500) {
                        return throwError('Database error');
                    } else {
                        return throwError('Something went wrong');
                    }
                })
            );
    }

    public createUser(user: User): Observable<User> {
        return this.http
            .post<User>(`${this.serverUrl}`, user, {
                headers: this.loginService.getHeadersWithToken(), withCredentials: true
            })
            .pipe(
              catchError((error: HttpErrorResponse) => {
                    if (error.status === 400) {
                        return throwError('One or more fields are invalid.');
                    } else if (error.status === 409) {
                        return throwError(error.error.message);
                    } else if (error.status === 500) {
                        return throwError('Database error');
                    } else {
                        return throwError('Something went wrong');
                    }
                })
            );
    }

  public updateUser(user: User, userId: number): Observable<void> {

        return this.http
            .put<void>(`${this.serverUrl}/${userId}`, user, {
                headers: this.loginService.getHeadersWithToken(), withCredentials: true
            })
            .pipe(
              catchError((error: HttpErrorResponse) => {
                    if (error.status === 400) {
                        return throwError('One or more fields are invalid.');
                    } else if (error.status === 404) {
                        return throwError('This user does not exist');
                    } else if (error.status === 409) {
                        return throwError(error.error.message);
                    } else if (error.status === 500) {
                        return throwError('Database error');
                    } else {
                        return throwError('Something went wrong');
                    }
                })
            );
    }

    public deleteUser(userId: number): Observable<void> {
        return this.http
            .delete<void>(`${this.serverUrl}/${userId}`, {
                headers: this.loginService.getHeadersWithToken(), withCredentials: true
            })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 404) {
                        return throwError('This user does not exist');
                    } else if (error.status === 500) {
                        return throwError('Database error');
                    } else {
                        return throwError('Something went wrong');
                    }
                })
            );
    }
}
