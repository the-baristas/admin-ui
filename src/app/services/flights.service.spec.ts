import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FlightService } from './flights.service';
import { Flight } from '../entities/flight';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Data } from '@angular/router';
import { environment } from '../../environments/environment';
import { Page } from '../entities/page';

describe('FlightsService', () => {
  let service: FlightService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let apiUrl = environment.flightServiceUrl + "/flights";  
  let flight: Flight = {
    id: 1,
    route: {
      id: 1,
      originAirport: {
        iataId: "XXX",
        city: "X City",
        isActive: 1
      },
      destinationAirport: {
        iataId: "ZZZ",
        city: "Z City",
        isActive: 1
      },
      isActive: 1
    },
    airplane: {
      id: 1,
      firstClassSeatsMax: 1,
      businessClassSeatsMax: 1,
      economyClassSeatsMax: 1,
      model: "model"
    },
    routeId: "1",
    airplaneId: "12",
    departureTime: "2021-04-07T16:15:00.000+00:00",
    arrivalTime: "2021-04-07T17:33:00.000+00:00",
    firstReserved: 1,
    firstPrice: 1,
    businessReserved: 1,
    businessPrice: 1,
    economyReserved: 1,
    economyPrice: 1,
    isActive: true,
    departureGate: "A1",
    arrivalGate: "B1"
  }


  let flightsPage: Page<Flight> = {
    content: [flight],
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
      expect(data).toEqual([flight])
    );

    const request = httpTestingController.expectOne('/data');
    expect(request.request.method).toEqual('GET');
    request.flush([flight]);
  });


  it('get all flights returns mock flight data', () => {
    service.getAllFlights().subscribe((data) => {
      expect(data).toEqual([flight])
   });
    let mockRequest = httpTestingController.expectOne(apiUrl);
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    mockRequest.flush([flight]);
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

  it('get flights page returns mock flights page', () => {
    service.getFlightsPage(0, 10, true).subscribe((data) => {
      expect(data).toEqual(flightsPage)
    });
    let mockRequest = httpTestingController.expectOne(apiUrl + "?pageNo=0&pageSize=10&sortBy=id&activeOnly=true");
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    mockRequest.flush(flightsPage);
  });

  it('Test get flight by id', () => {
    service.getFlight(flight.id).subscribe((data) => {
      expect(data).toEqual(flight);
    });
    let mockRequest = httpTestingController.expectOne(apiUrl + "/" + flight.id);
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    mockRequest.flush(flight);
  });

  it('Test create flight', () => {
    service.addFlight(flight).subscribe((data) => {
      expect(data).toEqual(flight);
    });
    let mockRequest = httpTestingController.expectOne(apiUrl);
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    mockRequest.flush(flight);
  });

  it('Test update flight', () => {
    service.updateFlight(flight).subscribe((data) => {
      expect(data).toEqual(flight);
    });
    let mockRequest = httpTestingController.expectOne(apiUrl + "/" + flight.id);
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    mockRequest.flush(flight);
  });

  it('Test delete flight', () => {
    service.deleteFlight(flight.id).subscribe((data) => {
      expect(data).toEqual(flight);
    });
    let mockRequest = httpTestingController.expectOne(apiUrl + "/" + flight.id);
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    mockRequest.flush(flight);
  });

  });
