import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import jwt_decode, { JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private serverUrl = environment.apiUrl + '/login';

  private previousPage: string = '/home';

  constructor(private http: HttpClient) { }

  public login(username: string, password: string) {

    return this.http.post<any>(`${this.serverUrl}`, JSON.stringify({ username: username, password: password }), { observe: 'response' }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403 || error.status === 400)
          return throwError('Invalid username and/or password');
        else
          return throwError('There was some sort of problem while trying to establish a connection. Please try again later.');
      }
      )

    );

  }

  public getToken() {
    let token = localStorage.getItem('utopia_token');
    if (token == null) {
      return '';
    }
    return token;
  }

  public getHeadersWithToken() : HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders({'Authorization': this.getToken()});

    return headers
  }

  public isAdmin(token: string) {
    let decodedToken: any = jwt_decode<any>(token);
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

  public getPreviousPage(): string {
    return this.previousPage;
  }

}
