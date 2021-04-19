import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
    httpClient = TestBed.inject(HttpClient);

  });

  it('successful login should retrieve token', () => {
    service.login("admin", "password").subscribe(response =>
      expect(response.status).toEqual(200)
    );
  });
});
