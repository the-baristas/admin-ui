import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
    constructor(private loginService: LoginService) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        const token = this.loginService.getToken();
        request = request.clone({
            setHeaders: { Authorization: token }
        });
        return next.handle(request);
    }
}
