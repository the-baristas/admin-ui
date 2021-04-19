import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private serverUrl = 'http://localhost:8081/login';

  constructor(private http: HttpClient) { }

  public login(username: string, password: string) {

    let response = this.http.post<String>(`${this.serverUrl}`, JSON.stringify({ username: username, password: password }), { observe: 'response' });

    return response;
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

  public setSession(token: string) {
    localStorage.setItem('utopia_token', token);
  }

  public loggedIn() {
    return this.getToken() != '';
  }

  public logout() {
    localStorage.removeItem('utopia_token');
  }

}
