import {
    HttpClient,
    HttpErrorResponse,
    HttpResponse
} from '@angular/common/http';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { defer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Airplane } from '../entities/airplane';
import { AirplaneService } from './airplane.service';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { LoginService } from './login.service';
import { MessageService } from './message.service';

describe('AirplaneService', () => {
  let httpTestingController: HttpTestingController;
  let airplaneService: AirplaneService;
  const airplanesPath: string = '/airplanes';
  const airplane: Airplane = { id: 1 } as Airplane;

    beforeEach(() => {
        TestBed.configureTestingModule({
            // Import the HttpClient mocking services
            imports: [HttpClientTestingModule],
            // Provide the service-under-test and its dependencies
            providers: [
                AirplaneService
                // MessageService,
                // HttpErrorHandlerService,
            ]
        });

        // Inject the http, test controller, and service-under-test
        // as they will be referenced by each test.
        // httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
        airplaneService = TestBed.inject(AirplaneService);
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(airplaneService).toBeTruthy();
    });

    describe('#getAirplanes', () => {
        let expectedAirplanes: Airplane[];

        beforeEach(() => {
            airplaneService = TestBed.inject(AirplaneService);
            expectedAirplanes = [{ id: 1 }, { id: 2 }] as Airplane[];
        });

        it('should return expected airplanes (called once)', () => {
            airplaneService
                .getAirplanes()
                .subscribe(
                    (airplanes: Airplane[]) =>
                        expect(airplanes).toEqual(
                            expectedAirplanes,
                            'should return expected airplanes'
                        ),
                    fail
                );

            // airplaneService should have made one request to GET airplanes from expected URL
          const request = httpTestingController.expectOne(
            environment.flightServiceUrl + airplanesPath
            );
            expect(request.request.method).toEqual('GET');

            // Respond with the mock airplanes
            request.flush(expectedAirplanes);
        });

        it('should be OK returning no airplanes', () => {
            airplaneService
                .getAirplanes()
                .subscribe(
                    (airplanes) =>
                        expect(airplanes.length).toEqual(
                            0,
                            'should have empty airplanes array'
                        ),
                    fail
                );

            const request = httpTestingController.expectOne(
              environment.flightServiceUrl + airplanesPath
            );
            request.flush([]); // Respond with no airplanes
        });

        // This service reports the error but finds a way to let the app keep going.
        it('should turn 404 into an empty airplanes result', () => {
            airplaneService
                .getAirplanes()
                .subscribe(
                    (airplanes) =>
                        expect(airplanes.length).toEqual(
                            0,
                            'should return empty airplanes array'
                        ),
                    fail
                );

            const request = httpTestingController.expectOne(
              environment.flightServiceUrl + airplanesPath
            );

            // respond with a 404 and the error message in the body
            const message = 'deliberate 404 error';
            request.flush(message, { status: 404, statusText: 'Not Found' });
        });

        it('should return expected airplanes (called multiple times)', () => {
            airplaneService.getAirplanes().subscribe();
            airplaneService.getAirplanes().subscribe();
            airplaneService
                .getAirplanes()
                .subscribe(
                    (airplanes) =>
                        expect(airplanes).toEqual(
                            expectedAirplanes,
                            'should return expected airplanes'
                        ),
                    fail
                );

            const requests = httpTestingController.match(
              environment.flightServiceUrl + airplanesPath
            );
            expect(requests.length).toEqual(3, 'calls to getAirplanes()');

            // Respond to each request with different mock airplane results
            requests[0].flush([]);
            requests[1].flush([{ id: 1, name: 'bob' }]);
            requests[2].flush(expectedAirplanes);
        });
    });

    describe('#updateAirplane', () => {
        // Expecting the query form of URL so should not 404 when id not found
        const makeUrl = (id: number) =>
          `${environment.flightServiceUrl}${airplanesPath}/?id=${id}`;

        it('should update a airplane and return it', () => {
            const updatingAirplane: Airplane = { id: 1 } as Airplane;

            airplaneService
                .updateAirplane(updatingAirplane)
                .subscribe(
                    (airplane: Airplane) =>
                        expect(airplane).toEqual(
                            updatingAirplane,
                            'should return the airplane'
                        ),
                    fail
                );

            // AirplaneService should have made one request to PUT airplane
            const testRequest = httpTestingController.expectOne(
              `${environment.flightServiceUrl + airplanesPath}/${updatingAirplane.id}`
            );
            expect(testRequest.request.method).toEqual('PUT');
            expect(testRequest.request.body).toEqual(updatingAirplane);

            // Expect server to return the airplane after PUT
            const expectedResponse = new HttpResponse({
                status: 200,
                statusText: 'OK',
                body: updatingAirplane
            });
            testRequest.event(expectedResponse);
        });

        // This service reports the error but finds a way to let the app keep going.
        it('should turn 404 error into return of the updating airplane', () => {
            const updatingAirplane: Airplane = {
                id: 1,
                firstClassSeatsMax: 0,
                businessClassSeatsMax: 0,
                economyClassSeatsMax: 0,
                model: 'Boeing 777'
            } as Airplane;

            airplaneService
                .updateAirplane(updatingAirplane)
                .subscribe(
                    (airplane: Airplane) =>
                        expect(airplane).toEqual(
                            updatingAirplane,
                            'should return the updating airplane'
                        ),
                    fail
                );

            const testRequest = httpTestingController.expectOne(
              `${environment.flightServiceUrl + airplanesPath}/${updatingAirplane.id}`
            );

            // respond with a 404 and the error message in the body
            const message = 'deliberate 404 error';
            testRequest.flush(message, {
                status: 404,
                statusText: 'Not Found'
            });
        });

        it('should turn network error into return of the updating airplane', () => {
            const updatingAirplane: Airplane = { id: 1 } as Airplane;
            airplaneService
                .updateAirplane(updatingAirplane)
                .subscribe(
                    (airplane: Airplane) =>
                        expect(airplane).toEqual(
                            updatingAirplane,
                            'should return the updating airplane'
                        ),
                    fail
                );

            const req = httpTestingController.expectOne(
              `${environment.flightServiceUrl + airplanesPath}/${updatingAirplane.id}`
            );

            // Create mock ErrorEvent, raised when something goes wrong at the network level.
            // Connection timeout, DNS error, offline, etc
            const emsg = 'simulated network error';
            const errorEvent = new ErrorEvent('Network Error', {
                message: emsg,
                // The rest of this is optional and not used.
                // Just showing that you could provide this too.
                filename: 'AirplaneService.ts',
                lineno: 42,
                colno: 21
            });

            // Respond with mock error
            req.error(errorEvent);
        });
    });

    describe('#getAirplaneById', () => {
        beforeEach(() => {
            airplaneService = TestBed.inject(AirplaneService);
        });

        it('should return expected airplane (called once)', () => {
            const id: number = 1;
            const expectedAirplane = { id } as Airplane;
            airplaneService
                .getAirplaneById(id)
                .subscribe(
                    (airplane: Airplane) =>
                        expect(airplane).toEqual(
                            expectedAirplane,
                            'should return expected airplane'
                        ),
                    fail
                );

            const testRequest = httpTestingController.expectOne(
              environment.flightServiceUrl + airplanesPath + '/' + id
            );
            expect(testRequest.request.method).toEqual('GET');

            testRequest.flush(expectedAirplane);
        });
    });

  it('#searchAirplanes', () => {
    airplaneService.searchAirplanes("word").subscribe((data) => {
      expect(data).toEqual([airplane]);
    });
    let mockRequest = httpTestingController.expectOne(
      environment.flightServiceUrl + airplanesPath + '/search?term=word'
    );
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    mockRequest.flush([airplane]);
  });

  it('#addAirplanes', () => {
    airplaneService.addAirplane(airplane).subscribe((data) => {
      expect(data).toEqual(airplane);
    });
    let mockRequest = httpTestingController.expectOne(environment.flightServiceUrl + airplanesPath);
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    mockRequest.flush(airplane);
  });

  it('#deleteAirplanes', () => {
    airplaneService.deleteAirplane(1).subscribe((data) => {
      expect(data).toEqual(airplane);
    });
    let mockRequest = httpTestingController.expectOne(environment.flightServiceUrl + airplanesPath + "/" + airplane.id);
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    mockRequest.flush(airplane);
  });
});

xdescribe('AirplaneService (Angular CLI)', () => {
    let airplaneService: AirplaneService;
    let messageServiceSpy: jasmine.SpyObj<MessageService>;
    let httpErrorHandlerServiceSpy: jasmine.SpyObj<HttpErrorHandlerService>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                AirplaneService,
                { provide: MessageService, useValue: messageServiceSpy },
                {
                    provide: HttpErrorHandlerService,
                    useValue: httpErrorHandlerServiceSpy
                }
            ]
        });
        messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);
        messageServiceSpy = TestBed.inject(
            MessageService
        ) as jasmine.SpyObj<MessageService>;
        airplaneService = TestBed.inject(AirplaneService);
    });

    it('should be created', () => {
        expect(airplaneService).toBeTruthy();
    });
});

xdescribe('AirplaneService (with spies)', () => {
    let httpClientSpy: { get: jasmine.Spy };
    let messageServiceSpy: { add: jasmine.Spy };
    let loginServiceSpy: jasmine.SpyObj<LoginService>;
    let httpErrorHandlerServiceSpy: jasmine.SpyObj<HttpErrorHandlerService>;
    let airplaneService: AirplaneService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);
        airplaneService = new AirplaneService(
            httpClientSpy as any,
            messageServiceSpy as any,
            loginServiceSpy as any,
            httpErrorHandlerServiceSpy as any
        );
    });

    it('should return expected airplanes (HttpClient called once)', () => {
        const expectedAirplanes: Airplane[] = [{} as Airplane];
        httpClientSpy.get.and.returnValue(
            defer(() => Promise.resolve(expectedAirplanes))
        );

        airplaneService
            .getAirplanes()
            .subscribe(
                (airplanes) =>
                    expect(airplanes).toEqual(
                        expectedAirplanes,
                        'expected airplanes'
                    ),
                fail
            );
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });

    it('should return an error when the server returns a 404', () => {
        const errorResponse = new HttpErrorResponse({
            error: 'test 404 error',
            status: 404,
            statusText: 'Not Found'
        });

        httpClientSpy.get.and.returnValue(
            defer(() => Promise.reject(errorResponse))
        );

        airplaneService.getAirplanes().subscribe(
            (airplanes: Airplane[]) => fail('expected an error, not airplanes'),
            (error: HttpErrorResponse) =>
                expect(error.message).toContain('test 404 error')
        );
    });
});
