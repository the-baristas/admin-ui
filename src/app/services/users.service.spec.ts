import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UsersService } from './users.service';
import { User } from '../entities/user';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Data } from '@angular/router';

describe('UsersService', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  let userData: any = {
    userId: 1,
    givenName: "First",
    familyName: "Last",
    username: "username2",
    email: "email@gmail.com",
    phone: "1112227878",
    role: "ROLE_USER",
    isActive: 1
  };




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


  describe('UsersService', () => {

    it('get all users returns mock user data', () => {
      service.getAllUsers().subscribe((data) => {
        expect(data).toEqual([userData])
      }
      )
    

    let mockRequest = httpTestingController.expectOne('http://localhost:8081/users');
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    mockRequest.flush([userData]);
    });
  });

  });
