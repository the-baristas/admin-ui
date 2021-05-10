import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../entities/user';
import { LoginService } from './login.service';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Page } from '../entities/page';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private serverUrl = environment.apiUrl + '/users';

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
                    return throwError('Unable to retrieve user data');
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
                    return throwError('Unable to retrieve user data');
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
                    return throwError('Unable to retrieve user data');
                })
            );
    }

    public createUser(user: User): Observable<User> {
        return this.http
            .post<User>(`${this.serverUrl}`, user, {
                headers: this.loginService.getHeadersWithToken()
            })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 404) {
                        return throwError('One or more fields are invalid.');
                    } else if (error.status === 409) {
                        return throwError(
                            'Username, email, and/or phone number already exists.'
                        );
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
                headers: this.loginService.getHeadersWithToken()
            })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError('Unable to update user');
                })
            );
    }

    public deleteUser(userId: number): Observable<void> {
        return this.http
            .delete<void>(`${this.serverUrl}/${userId}`, {
                headers: this.loginService.getHeadersWithToken()
            })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError('Unable to delete user');
                })
            );
    }
}
