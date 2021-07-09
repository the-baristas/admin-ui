import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { XsrfInterceptor } from './xsrf.interceptor';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: XsrfInterceptor, multi: true }
];
