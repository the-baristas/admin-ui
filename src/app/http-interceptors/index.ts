import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationInterceptor } from './authorization.interceptor';

export const httpInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthorizationInterceptor,
        multi: true
    }
];
