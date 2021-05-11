import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private serverUrl = environment.apiUrl + '/login';

    private previousPage: string = '/home';

    constructor(private http: HttpClient) {}

    public login(username: string, password: string) {
        return this.http
            .post<any>(
                `${this.serverUrl}`,
                JSON.stringify({ username: username, password: password }),
                { observe: 'response' }
            )
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 403 || error.status === 400)
                        return throwError('Invalid username and/or password');
                    else
                        return throwError(
                            'There was some sort of problem while trying to establish a connection. Please try again later.'
                        );
                })
            );
    }

    public getToken() {
        let token = localStorage.getItem('utopia_token');
        if (token == null) {
            return '';
        }
        return token;
    }

    public getHeadersWithToken(): HttpHeaders {
        let headers: HttpHeaders = new HttpHeaders({
            Authorization: this.getToken()
        });

        return headers;
    }

    public isAdmin(token: string) {
        let decodedToken: any = jwt_decode<any>(token);
        return this.hasAdminRole(decodedToken);
    }

    hasAdminRole(decodedToken: any) {
        let role: String = decodedToken.authorities[0].authority;
        return role.endsWith('ADMIN');
    }

    public setSession(token: string) {
        localStorage.setItem('utopia_token', token);
    }

    public loggedIn() {
        return this.getToken() != '';
    }

    public logout() {
        localStorage.removeItem('utopia_token');
    }

    public setPreviousPage(page: string) {
        this.previousPage = page;
    }

<<<<<<< HEAD
}
=======
    public getPreviousPage(): string {
        return this.previousPage;
    }
}
>>>>>>> e2e98dbef79e118ea4118cfbdc61ad30802c56d4
