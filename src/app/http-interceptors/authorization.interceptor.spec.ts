import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthorizationInterceptor } from './authorization.interceptor';

describe('AuthorizationInterceptor', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthorizationInterceptor]
        })
    );

    it('should be created', () => {
        const interceptor: AuthorizationInterceptor = TestBed.inject(
            AuthorizationInterceptor
        );
        expect(interceptor).toBeTruthy();
    });
});
