import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService, private router: Router, private location: Location) { }

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        request = request.clone({
            setHeaders: { Authorization: this.loginService.getToken() }
        });
      return next.handle(request)
        //handles logging the user out if the token has expired
        .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
            this.loginService.logout();
            this.loginService.setPreviousPage(this.location.path());
            this.router.navigate(['/login']);
          }
          return next.handle(request);
        })
      )
  }
}
