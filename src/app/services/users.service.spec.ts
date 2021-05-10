import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UsersService } from './users.service';
import { User } from '../entities/user';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Data } from '@angular/router';
import { environment } from '../../environments/environment';
import { Page } from '../entities/page';





describe('UsersService', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let apiUrl = environment.apiUrl + "/users";  
  let userData: User[] = [{
    userId: 1,
    givenName: "First",
    familyName: "Last",
    username: "username2",
    password: "pass",
    email: "email@gmail.com",
    phone: "1112227878",
    role: "ROLE_USER",
    active: true
  }, {
    userId: 2,
    givenName: "First",
    familyName: "Last",
    username: "username5",
    password: "pass",
    email: "email@yahoo.com",
    phone: "1114447878",
    role: "ROLE_USER",
    active: true
    }]

  let userPage: Page<User> = {
    content: userData,
    size: 2,
    totalPages: 1,
    number: 0,
    totalElements: 2,
    numberOfElements: 2,
    first: true,
    last: true,
    empty: false
  };

  let userAdmin: User = {
    userId: 3,
    givenName: "First",
    familyName: "Last",
    username: "admin",
    password: "pass",
    email: "email@smoothstack.com",
    phone: "1112221111",
    role: "ROLE_ADMIN",
    active: true
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


  it('get all users returns mock user data', () => {
    service.getAllUsers(0, 10).subscribe((data) => {
    expect(data).toEqual(userPage)
   });
    let mockRequest = httpTestingController.expectOne(apiUrl + "?page=0&size=10");
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    mockRequest.flush(userPage);
  });

  it('Get all users failing should give error message', () => {
    let error!: string
    service.getAllUsers(0, 10).subscribe(null, e => {
      error = e;
    });

    let request = httpTestingController.expectOne(apiUrl + "?page=0&size=10");
    request.flush("Unable to retrieve user data", {
      status: 400,
      statusText: "Unable to retrieve user data"
    });

    expect(error.indexOf("Unable to retrieve user data") >= 0).toBeTruthy();
  });

  it('get user by email returns mock user data', () => {
    service.getUserByEmail(userData[0].email).subscribe((data) => {
      expect(data).toEqual(userData[0])
    });
    let mockRequest = httpTestingController.expectOne(apiUrl + "/email/"+userData[0].email);
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    mockRequest.flush(userData[0]);
  });

  it('Get user by email 404 should give error message', () => {
    let error!: string
    service.getUserByEmail(userData[0].email).subscribe(null, e => {
      error = e;
    });

    let request = httpTestingController.expectOne(apiUrl + "/email/" + userData[0].email);
    request.flush("A user with this email does not exist", {
      status: 404,
      statusText: "A user with this email does not exist"
    });

    expect(error.indexOf("A user with this email does not exist") >= 0).toBeTruthy();
  });

  it('get user by username returns mock user data', () => {
    service.getUserByUsername(userData[0].username).subscribe((data) => {
      expect(data).toEqual(userData[0])
    });
    let mockRequest = httpTestingController.expectOne(apiUrl + "/username/" + userData[0].username);
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    mockRequest.flush(userData[0]);
  });

  it('Get user by username 404 should give error message', () => {
    let error!: string
    service.getUserByUsername(userData[0].username).subscribe(null, e => {
      error = e;
    });

    let request = httpTestingController.expectOne(apiUrl + "/username/" + userData[0].username);
    request.flush("A user with this username does not exist", {
      status: 404,
      statusText: "A user with this username does not exist"
    });

    expect(error.indexOf("A user with this username does not exist") >= 0).toBeTruthy();
  });

  it('get user by phone number returns mock user data', () => {
    service.getUserByPhoneNumber(userData[0].phone).subscribe((data) => {
      expect(data).toEqual(userData[0])
    });
    let mockRequest = httpTestingController.expectOne(apiUrl + "/phone/" + userData[0].phone);
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    mockRequest.flush(userData[0]);
  });

  it('Get user by phone number 404 should give error message', () => {
    let error!: string
    service.getUserByPhoneNumber(userData[0].phone).subscribe(null, e => {
      error = e;
    });

    let request = httpTestingController.expectOne(apiUrl + "/phone/" + userData[0].phone);
    request.flush("A user with this phone number does not exist", {
      status: 404,
      statusText: "A user with this phone number does not exist"
    });

    expect(error.indexOf("A user with this phone number does not exist") >= 0).toBeTruthy();
  });

  it('Test create user', () => {
    service.createUser(userAdmin).subscribe((data) => {
      expect(data).toEqual(userAdmin)
    });
    let mockRequest = httpTestingController.expectOne(apiUrl);
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    mockRequest.flush(userAdmin);
  });

  it('Create user 400 should give error message', () => {
    let error!: string
    service.createUser(userAdmin).subscribe(null, e => {
      error = e;
    });

    let request = httpTestingController.expectOne(apiUrl);
    request.flush("One or more fields are invalid.", {
      status: 400,
      statusText: "One or more fields are invalid."
    });

    expect(error.indexOf("One or more fields are invalid.") >= 0).toBeTruthy();
  });

  it('Create user 409 should give error message', () => {
    let error!: string
    service.createUser(userAdmin).subscribe(null, e => {
      error = e;
    });

    let request = httpTestingController.expectOne(apiUrl);
    request.flush("Username, email, and/or phone number already exists.", {
      status: 409,
      statusText: "Username, email, and/or phone number already exists."
    });

    expect(error.indexOf("Username, email, and/or phone number already exists.") >= 0).toBeTruthy();
  });

  it('Create user 500 should give error message', () => {
    let error!: string
    service.createUser(userAdmin).subscribe(null, e => {
      error = e;
    });

    let request = httpTestingController.expectOne(apiUrl);
    request.flush("Database error", {
      status: 500,
      statusText: "Database error"
    });

    expect(error.indexOf("Database error") >= 0).toBeTruthy();
  });

  it('Update user 400 should give error message', () => {
    let error!: string
    service.updateUser(userAdmin, userAdmin.userId).subscribe(null, e => {
      error = e;
    });

    let request = httpTestingController.expectOne(apiUrl + "/" + userAdmin.userId);
    request.flush("One or more fields are invalid.", {
      status: 400,
      statusText: "One or more fields are invalid."
    });

    expect(error.indexOf("One or more fields are invalid.") >= 0).toBeTruthy();
  });

  it('Update user 404 should give error message', () => {
    let error!: string
    service.updateUser(userAdmin, userAdmin.userId).subscribe(null, e => {
      error = e;
    });

    let request = httpTestingController.expectOne(apiUrl + "/" + userAdmin.userId);
    request.flush("This user does not exist", {
      status: 404,
      statusText: "This user does not exist"
    });

    expect(error.indexOf("This user does not exist") >= 0).toBeTruthy();
  });

  it('Update user 409 should give error message', () => {
    let error!: string
    service.updateUser(userAdmin, userAdmin.userId).subscribe(null, e => {
      error = e;
    });

    let request = httpTestingController.expectOne(apiUrl + "/" + userAdmin.userId);
    request.flush("Username, email, and/or phone number already exists.", {
      status: 409,
      statusText: "Username, email, and/or phone number already exists."
    });

    expect(error.indexOf("Username, email, and/or phone number already exists.") >= 0).toBeTruthy();
  });

  it('Update user 500 should give error message', () => {
    let error!: string
    service.updateUser(userAdmin, userAdmin.userId).subscribe(null, e => {
      error = e;
    });

    let request = httpTestingController.expectOne(apiUrl + "/" + userAdmin.userId);
    request.flush("Database error", {
      status: 500,
      statusText: "Database error"
    });

    expect(error.indexOf("Database error") >= 0).toBeTruthy();
  });

  it('Delete user 404 should give error message', () => {
    let error!: string
    service.deleteUser(userAdmin.userId).subscribe(null, e => {
      error = e;
    });

    let request = httpTestingController.expectOne(apiUrl + "/" + userAdmin.userId);
    request.flush("This user does not exist", {
      status: 404,
      statusText: "This user does not exist"
    });

    expect(error.indexOf("This user does not exist") >= 0).toBeTruthy();
  });

  it('Delete user 500 should give error message', () => {
    let error!: string
    service.deleteUser(userAdmin.userId).subscribe(null, e => {
      error = e;
    });

    let request = httpTestingController.expectOne(apiUrl + "/" + userAdmin.userId);
    request.flush("Database error", {
      status: 500,
      statusText: "Database error"
    });

    expect(error.indexOf("Database error") >= 0).toBeTruthy();
  });

  });

