import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UsersService } from './users.service';
import { User } from '../entities/user';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Data } from '@angular/router';
import { environment } from '../../environments/environment';

describe('UsersService', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let apiUrl = environment.apiUrl + "/users";  
  let userData: any = [{
    userId: 1,
    givenName: "First",
    familyName: "Last",
    username: "username2",
    email: "email@gmail.com",
    phone: "1112227878",
    role: "ROLE_USER",
    isActive: 1
  }, {
    userId: 2,
    givenName: "First",
    familyName: "Last",
    username: "username5",
    email: "email@yahoo.com",
    phone: "1114447878",
    role: "ROLE_USER",
    isActive: 1
  }]




  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UsersService,

      ]
    });
    service = TestBed.inject(UsersService);
    httpTestingController = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    // Check that there are no outstanding requests
    httpTestingController.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can test HttpClient.get', () => {
    httpClient.get<Data>("/data").subscribe(data =>
      expect(data).toEqual(userData)
    );

    const request = httpTestingController.expectOne('/data');
    expect(request.request.method).toEqual('GET');
    request.flush(userData);
  });


  it('get all users returns mock user data', () => {
    service.getAllUsers(0, 10).subscribe((data) => {
    expect(data).toEqual(userData)
   });
    let mockRequest = httpTestingController.expectOne(apiUrl);
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    mockRequest.flush(userData);
  });

  it('Get all users failing should give error message', () => {
    let error!: string
    service.getAllUsers(0, 10).subscribe(null, e => {
      error = e;
    });

    let request = httpTestingController.expectOne(apiUrl);
    request.flush("Unable to retrieve user data", {
      status: 400,
      statusText: "Unable to retrieve user data"
    });

    expect(error.indexOf("Unable to retrieve user data") >= 0).toBeTruthy();
  });

  });
