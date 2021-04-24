import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { Data } from '@angular/router';
import { environment } from '../../environments/environment';

import { LoginService } from './login.service';

describe('LoginService', () => {

  let loginData = {username: "username", password: "password"};
  let mockToken: string = "Bearer mockjwttoken";
  let loginService: LoginService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClientTestingModule;
  let loginUrl = environment.apiUrl + '/login';

  let header: HttpHeaders = new HttpHeaders;
  header = header.set('Authorization', mockToken);
  let loginResponse = new HttpResponse({ body: '', headers: header });
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]

    });

    loginService = TestBed.inject(LoginService);
    httpTestingController = TestBed.get(HttpTestingController)
  });

  afterEach(() => {
    // Check that there are no outstanding requests
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(loginService).toBeTruthy();
  });

  it('successful login should return HttpResponse', () => {
    let response!: HttpResponse<any>;
    loginService.login(loginData.username, loginData.password).subscribe(data => {
      response = new HttpResponse({ body: '', headers: header });
    })
    let request = httpTestingController.expectOne({
      method: "POST",
      url: loginUrl
    });


    request.flush('');
    expect(response.headers.get('Authorization')).toEqual(mockToken);
  });

  it('unsuccessful login with 403', () => {
    let error!: string
    loginService.login(loginData.username, loginData.password).subscribe(null, e => {
      error = e;
    });

    let request = httpTestingController.expectOne(loginUrl);
    request.flush("Invalid login credentials", {
      status: 403,
      statusText: "Invalid username and/or password"
    });

    expect(error.indexOf("Invalid username and/or password") >= 0).toBeTruthy();
  });

  it('unsuccessful login with 400', () => {
    let error!: string
    loginService.login(loginData.username, loginData.password).subscribe(null, e => {
      error = e;
    });

    let request = httpTestingController.expectOne(loginUrl);
    request.flush("Invalid login credentials", {
      status: 400,
      statusText: "Invalid username and/or password"
    });

    expect(error.indexOf("Invalid username and/or password") >= 0).toBeTruthy();
  });

  it('unsuccessful login for any other reason should give message', () => {
    let error!: string
    loginService.login(loginData.username, loginData.password).subscribe(null, e => {
      error = e;
    });

    let request = httpTestingController.expectOne(loginUrl);
    request.flush("There was some sort of problem while trying to establish a connection. Please try again later.", {
      status: 500,
      statusText: "There was some sort of problem while trying to establish a connection. Please try again later."
    });

    expect(error.indexOf("There was some sort of problem while trying to establish a connection. Please try again later.") >= 0).toBeTruthy();
  });



  it('setSession should store token in local storage with key=utopia_token', () => {
    loginService.setSession(mockToken);
    expect(loginService.loggedIn()).toBeTruthy();
    expect(loginService.getToken()).toBe(mockToken);
    expect(localStorage.getItem('utopia_token')).toBe(mockToken);
  });

  it('logout should remove token from local storage', () => {
    loginService.logout();
    expect(loginService.loggedIn()).toBeFalsy();
    expect(loginService.getToken()).toBe('');
    expect(localStorage.getItem('utopia_token')).toBe(null);
  });




});
