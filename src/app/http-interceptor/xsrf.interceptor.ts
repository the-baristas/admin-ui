import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpXsrfTokenExtractor
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class XsrfInterceptor implements HttpInterceptor {
    constructor(private tokenExtractor: HttpXsrfTokenExtractor) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        const token = this.tokenExtractor.getToken();
        if (token !== null) {
            request = request.clone({
                setHeaders: { 'X-XSRF-TOKEN': token }
            });
        }
        return next.handle(request);
    }
}
