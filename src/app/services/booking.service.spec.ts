import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { Booking } from '../entities/booking';

import { BookingService } from './booking.service';

describe('BookingService', () => {
    let service: BookingService;
    let httpTestingController: HttpTestingController;
    let apiUrl: string = environment.bookingServiceUrl + '/bookings';
    let booking: Booking = {
        id: 0,
        active: true,
        confirmationCode: 'code',
        layoverCount: 1,
        totalPrice: 100,
        passengers: [],
        flights: [],
        username: 'username',
        email: 'email@email.em',
        phone: '2223334444'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [BookingService]
        });

        service = TestBed.inject(BookingService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('get bookings', () => {
        service.getBookings().subscribe((data) => {
            expect(data).toEqual([booking]);
        });
        let mockRequest = httpTestingController.expectOne(apiUrl);
        expect(mockRequest.cancelled).toBeFalsy();
        expect(mockRequest.request.responseType).toEqual('json');
        mockRequest.flush([booking]);
    });

    it('get booking by confirmation code returns mock data', () => {
        service.findByConfirmationCode('code').subscribe((data) => {
            expect(data).toEqual(booking);
        });
        let mockRequest = httpTestingController.expectOne(apiUrl + '/code');
        expect(mockRequest.cancelled).toBeFalsy();
        expect(mockRequest.request.responseType).toEqual('json');
        mockRequest.flush(booking);
    });

    it('check booking exists by confirmation code returns true for mock data', () => {
        service.existsByConfirmationCode('code').subscribe((data) => {
            expect(data).toEqual(true);
        });
        let mockRequest = httpTestingController.expectOne(apiUrl + '/code');
        expect(mockRequest.cancelled).toBeFalsy();
        expect(mockRequest.request.responseType).toEqual('json');
        mockRequest.flush(true);
    });

    it('search booking by confirmation code returns mock data', () => {
        service.searchBookings('code').subscribe((data) => {
            expect(data).toEqual([booking]);
        });
        let mockRequest = httpTestingController.expectOne(
            apiUrl + '/?confirmation_code=code'
        );
        expect(mockRequest.cancelled).toBeFalsy();
        expect(mockRequest.request.responseType).toEqual('json');
        mockRequest.flush([booking]);
    });

    it('add booking', () => {
        service.addBooking(booking).subscribe((data) => {
            expect(data).toEqual(booking);
        });
        let mockRequest = httpTestingController.expectOne(apiUrl);
        expect(mockRequest.cancelled).toBeFalsy();
        expect(mockRequest.request.responseType).toEqual('json');
        mockRequest.flush(booking);
    });

    it('delete booking', () => {
        service.deleteBooking(0).subscribe((data) => {
            expect(data).toEqual(booking);
        });
        let mockRequest = httpTestingController.expectOne(
            apiUrl + '/' + booking.id
        );
        expect(mockRequest.cancelled).toBeFalsy();
        expect(mockRequest.request.responseType).toEqual('json');
        mockRequest.flush(booking);
    });

    it('update booking', () => {
        service.updateBooking(booking).subscribe((data) => {
            expect(data).toEqual(booking);
        });
        let mockRequest = httpTestingController.expectOne(
            apiUrl + '/' + booking.id
        );
        expect(mockRequest.cancelled).toBeFalsy();
        expect(mockRequest.request.responseType).toEqual('json');
        mockRequest.flush(booking);
    });
});
