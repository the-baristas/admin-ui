import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../entities/user';
import { LoginService } from './login.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  
  private serverUrl = environment.apiUrl + "/users";  ;

  constructor(private http: HttpClient, private loginService: LoginService) { }

  public getAllUsers() {
    return this.http.get<User[]>(`${this.serverUrl}`, { headers: this.loginService.getHeadersWithToken()} );
  }

  public getUserByUserId(userId: number): Observable<User> {
    return this.http.get<User>(`${this.serverUrl}/${userId}`, { headers: this.loginService.getHeadersWithToken() } );
  }

  public getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.serverUrl}/email/${email}`, { headers: this.loginService.getHeadersWithToken() } );
  }

  public createUser(user: User): Observable<void> {
    return this.http.post<void>(`${this.serverUrl}`, user, { headers: this.loginService.getHeadersWithToken() } );
  }

  public updateUser(user: User, userId: number): Observable<void> {
    return this.http.put<void>(`${this.serverUrl}/${userId}`, user, { headers: this.loginService.getHeadersWithToken() } );
  }

  public deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.serverUrl}/${userId}`, { headers: this.loginService.getHeadersWithToken() } );
  }
}
