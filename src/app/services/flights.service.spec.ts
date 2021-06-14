import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FlightService } from './flights.service';
import { Flight } from '../entities/flight';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Data } from '@angular/router';
import { environment } from '../../environments/environment';

describe('FlightsService', () => {
  let service: FlightService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let apiUrl = environment.flightServiceUrl + "/flights";  
  let flightData: any = [{
    id: 1,
    airplaneId: 14,
    departureTime: "2021-04-07T16:15:00.000+00:00",
    arrivalTime: "2021-04-07T17:33:00.000+00:00",
    firstReserved: 0,
    firstPrice: 300.0,
    businessReserved: 0,
    businessPrice: 250.53,
    economyReserved: 0,
    economyPrice: 200.4,
    isActive: 1,
    route: {
        id: 6,
        originId: "BOS",
        destinationId: "MSY",
        isActive: 1
        }
  }, {
    id: 2,
    airplaneId: 16,
    departureTime: "2021-04-07T16:15:00.000+00:00",
    arrivalTime: "2021-04-07T17:33:00.000+00:00",
    firstReserved: 0,
    firstPrice: 300.0,
    businessReserved: 0,
    businessPrice: 250.53,
    economyReserved: 0,
    economyPrice: 200.4,
    isActive: 1,
    route: {
        id: 6,
        originId: "BOS",
        destinationId: "MSY",
        isActive: 1
        }
  }]




  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FlightService,

      ]
    });
    service = TestBed.inject(FlightService);
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
      expect(data).toEqual(flightData)
    );

    const request = httpTestingController.expectOne('/data');
    expect(request.request.method).toEqual('GET');
    request.flush(flightData);
  });


  it('get all flights returns mock flight data', () => {
    service.getAllFlights().subscribe((data) => {
    expect(data).toEqual(flightData)
   });
    let mockRequest = httpTestingController.expectOne(apiUrl);
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    mockRequest.flush(flightData);
  });

  it('Get all flights failing should give error message', () => {
    let error!: string
    service.getAllFlights().subscribe(null, e => {
        error = e;
    });

    let request = httpTestingController.expectOne(apiUrl);
    request.flush("Unable to retrieve flight data", {
      status: 400,
      statusText: "Unable to retrieve flight data"
    });

    expect(error.indexOf("Unable to retrieve flight data") >= 0).toBeTruthy();
  });

  });
