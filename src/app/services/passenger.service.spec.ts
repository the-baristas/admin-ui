import { HttpResponse } from '@angular/common/http';
import {
    HttpClientTestingModule,
    HttpTestingController,
    TestRequest
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { Page } from '../entities/page';
import { Passenger } from '../entities/passenger';
import { PassengerService } from './passenger.service';

describe('PassengerService', () => {
    let service: PassengerService;
    let httpTestingController: HttpTestingController;
    let apiUrl: string = environment.bookingServiceUrl + '/passengers';
    let passenger: Passenger = {
        id: 1,
        bookingId: 1,
        bookingConfirmationCode: 'code',
        bookingActive: true,
        layoverCount: 1,
        bookingTotalPrice: 100,
        flightId: 1,
        flightActive: true,
        departureTime: '01-01-9999 00:00:00',
        arrivalTime: '01-01-9999 05:00:00',
        routeId: 1,
        routeActive: true,
        originAirportCode: 'LAX',
        originAirportActive: true,
        originAirportCity: 'Los Angeles',
        destinationAirportCode: 'LAS',
        destinationAirportActive: true,
        destinationAirportCity: 'Las Vegas',
        discountType: 'none',
        discountRate: 1,
        givenName: 'First',
        familyName: 'Last',
        dateOfBirth: '01-01-2000',
        gender: 'nonbinary',
        address: 'address road',
        seatClass: 'economy',
        seatNumber: 1,
        checkInGroup: 1,
        username: 'username',
        airplaneModel: 'modelname'
    };
    let passengerPage: Page<Passenger> = {
        content: [passenger],
        size: 2,
        totalPages: 1,
        number: 0,
        totalElements: 2,
        numberOfElements: 2,
        first: true,
        last: true,
        empty: false
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PassengerService]
        });
        service = TestBed.inject(PassengerService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('get all passengers returns mock data', () => {
        service.findAll(0, 10).subscribe((data) => {
            expect(data).toEqual(passengerPage);
        });
        let mockRequest = httpTestingController.expectOne(
            apiUrl + '?index=0&size=10'
        );
        expect(mockRequest.cancelled).toBeFalsy();
        expect(mockRequest.request.responseType).toEqual('json');
        mockRequest.flush(passengerPage);
    });

    it('get passenger by id returns mock data', () => {
        service.findById(1).subscribe((data) => {
            expect(data).toEqual(passenger);
        });
        let mockRequest = httpTestingController.expectOne(apiUrl + '/1');
        expect(mockRequest.cancelled).toBeFalsy();
        expect(mockRequest.request.responseType).toEqual('json');
        mockRequest.flush(passenger);
    });

    it('create passenger', () => {
        service.create(passenger).subscribe((data) => {
            expect(data).toEqual(passenger);
        });
        let mockRequest = httpTestingController.expectOne(apiUrl);
        expect(mockRequest.cancelled).toBeFalsy();
        expect(mockRequest.request.responseType).toEqual('json');
        mockRequest.flush(passenger);
    });

    it('search passengers returns mock data', () => {
        service.search('name', 0, 10).subscribe((data) => {
            expect(data).toEqual(passengerPage);
        });
        let mockRequest = httpTestingController.expectOne(
            apiUrl + '/search?term=name&index=0&size=10'
        );
        expect(mockRequest.cancelled).toBeFalsy();
        expect(mockRequest.request.responseType).toEqual('json');
        mockRequest.flush(passengerPage);
    });

    it('search distinct passengers returns mock data', () => {
        service.searchDistinct('name', 0, 10).subscribe((data) => {
            expect(data).toEqual(passengerPage);
        });
        let mockRequest = httpTestingController.expectOne(
            apiUrl + '/distinct_search?term=name&index=0&size=10'
        );
        expect(mockRequest.cancelled).toBeFalsy();
        expect(mockRequest.request.responseType).toEqual('json');
        mockRequest.flush(passengerPage);
    });

    describe('#update', () => {
        it('should update a passenger and return it', () => {
            const id: number = 1;
            const targetPassenger: Passenger = { id } as Passenger;
            const updatedPassenger: Passenger = Object.assign(
                {},
                targetPassenger
            );

            service
                .update(targetPassenger)
                .subscribe(
                    (passenger: Passenger) =>
                        expect(passenger).toEqual(updatedPassenger),
                    fail
                );

            const url: string = `${apiUrl}/${id}`;
            const testRequest: TestRequest =
                httpTestingController.expectOne(url);
            expect(testRequest.request.method).toEqual('PUT');
            expect(testRequest.request.body).toEqual(updatedPassenger);

            const expectedResponse: HttpResponse<Passenger> = new HttpResponse({
                status: 200,
                statusText: 'OK',
                body: updatedPassenger
            });
            testRequest.event(expectedResponse);
        });
    });

    describe('#delete', () => {
        it('should not throw an error when #delete is successful', () => {
            const id: number = 1;
            service
                .delete(id)
                .subscribe((data: unknown) => expect(data).toEqual(null), fail);
            const url: string = `${apiUrl}/${id}`;
            const testRequest = httpTestingController.expectOne(url);

            testRequest.event(
                new HttpResponse<unknown>({
                    body: null,
                    status: 204,
                    statusText: 'No Content'
                })
            );
        });

        it('should not throw an error when #delete is unsuccessful', () => {
            const id: number = 1;
            const responseBody: unknown = {
                timestamp: '2021-07-25T03:52:02.134+00:00',
                status: 404,
                error: 'Not Found',
                message: 'Could not find passenger with id=1',
                path: '/passengers/1'
            };
            service
                .delete(id)
                .subscribe(
                    (data: unknown) => expect(data).toEqual(responseBody),
                    fail
                );
            const url: string = `${apiUrl}/${id}`;
            const testRequest = httpTestingController.expectOne(url);

            testRequest.event(
                new HttpResponse<unknown>({
                    body: responseBody,
                    status: 404,
                    statusText: 'Not Found'
                })
            );
        });
    });
});
