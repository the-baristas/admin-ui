import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RouteService } from './routes.service';
import { Route } from '../entities/route';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Data } from '@angular/router';
import { environment } from '../../environments/environment';
import { Page } from '../entities/page';

describe('FlightsService', () => {
  let service: RouteService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let apiUrl = environment.flightServiceUrl + "/routes";
  let route: Route = {
    id: 1,
    originAirport: {
      iataId: "XXX",
      city: "X City",
      isActive: true
    },
    destinationAirport: {
      iataId: "ZZZ",
      city: "Z city",
      isActive: true
    },
    originId: "XXX",
    destinationId: "ZZZ",
    isActive: true
  };
  let routesPage: Page<Route> = {
    content: [route],
    size: 2,
    totalPages: 1,
    number: 0,
    numberOfElements: 2,
    totalElements: 2,
    first: true,
    last: true,
    empty: false
  };




  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RouteService,

      ]
    });
    service = TestBed.inject(RouteService);
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
      expect(data).toEqual([route])
    );

    const request = httpTestingController.expectOne('/data');
    expect(request.request.method).toEqual('GET');
    request.flush([route]);
  });


  it('get all routes returns mock route data', () => {
    service.getAllRoutes().subscribe((data) => {
      expect(data).toEqual([route])
    });
    let mockRequest = httpTestingController.expectOne(apiUrl);
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    mockRequest.flush([route]);
  });


  it('get routes page returns mock route page', () => {
    service.getRoutesPage(0, 10, true).subscribe((data) => {
      expect(data).toEqual(routesPage)
    });
    let mockRequest = httpTestingController.expectOne(apiUrl + "?pageNo=0&pageSize=10&sortBy=id&activeOnly=true");
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    mockRequest.flush(routesPage);
  });

  it('Get all routes failing should give error message', () => {
    let error!: string
    service.getAllRoutes().subscribe(null, e => {
      error = e;
    });

    let request = httpTestingController.expectOne(apiUrl);
    request.flush("Unable to retrieve route data", {
      status: 400,
      statusText: "Unable to retrieve route data"
    });

    expect(error.indexOf("Unable to retrieve route data") >= 0).toBeTruthy();
  });

  it('Test get route by id', () => {
    service.getRoute(route.id).subscribe((data) => {
      expect(data).toEqual(route);
    });
    let mockRequest = httpTestingController.expectOne(apiUrl + "/" + route.id);
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    mockRequest.flush(route);
  });

  it('Test create route', () => {
    service.addRoute(route).subscribe((data) => {
      expect(data).toEqual(route);
    });
    let mockRequest = httpTestingController.expectOne(apiUrl);
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    mockRequest.flush(route);
  });

  it('Test update route', () => {
    service.updateRoute(route).subscribe((data) => {
      expect(data).toEqual(route);
    });
    let mockRequest = httpTestingController.expectOne(apiUrl + "/" + route.id);
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    mockRequest.flush(route);
  });

  it('Test delete route', () => {
    service.deleteRoute(route.id).subscribe((data) => {
      expect(data).toEqual(route);
    });
    let mockRequest = httpTestingController.expectOne(apiUrl + "/" + route.id);
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    mockRequest.flush(route);
  });

});
