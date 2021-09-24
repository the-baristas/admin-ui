import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { Booking } from '../entities/booking';
import { Page } from '../entities/page';
import { BookingService } from './booking.service';

describe('BookingService', () => {
    let service: BookingService;
    let httpTestingController: HttpTestingController;
    let apiUrl: string = environment.bookingServiceUrl + '/bookings';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [BookingService]
        });

        service = TestBed.inject(BookingService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('receives booking page when #findAll is successful', () => {
        const bookingsPage: Page<Booking> = {
            content: [
                {
                    id: 1,
                    active: true,
                    confirmationCode: 'code',
                    layoverCount: 1,
                    totalPrice: 100,
                    passengers: [],
                    flights: [],
                    username: 'username',
                    email: 'email@email.em',
                    phone: '2223334444',
                    stripeId: 'stripe_id',
                    refunded: false
                }
            ] as Booking[]
        } as Page<Booking>;

        service.findAll(0, 10).subscribe((data: Page<Booking>) => {
            expect(data).toEqual(bookingsPage);
        });
        let mockRequest = httpTestingController.expectOne(apiUrl);
        expect(mockRequest.cancelled).toBeFalsy();
        expect(mockRequest.request.responseType).toEqual('json');
        mockRequest.flush(bookingsPage);
    });

    it('get booking by confirmation code returns mock data', () => {
        let booking: Booking = {
            id: 1,
            active: true,
            confirmationCode: 'code',
            layoverCount: 1,
            totalPrice: 100,
            passengers: [],
            flights: [],
            username: 'username',
            email: 'email@email.em',
            phone: '2223334444',
            stripeId: 'stripe_id',
            refunded: false
        };
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
        const bookingsPage: Page<Booking> = {
            content: [
                {
                    id: 1,
                    active: true,
                    confirmationCode: 'code',
                    layoverCount: 1,
                    totalPrice: 100,
                    passengers: [],
                    flights: [],
                    username: 'username',
                    email: 'email@email.em',
                    phone: '2223334444',
                    stripeId: 'stripe_id',
                    refunded: false
                }
            ] as Booking[]
        } as Page<Booking>;
        service
            .search('confirmation_code', 0, 10)
            .subscribe((data: Page<Booking>) => {
                expect(data).toEqual(bookingsPage);
            });
        let mockRequest = httpTestingController.expectOne(
            apiUrl + '/?confirmation_code=code'
        );
        expect(mockRequest.cancelled).toBeFalsy();
        expect(mockRequest.request.responseType).toEqual('json');
        mockRequest.flush(bookingsPage);
    });

    it('add booking', () => {
        let booking: Booking = {
            id: 1,
            active: true,
            confirmationCode: 'code',
            layoverCount: 1,
            totalPrice: 100,
            passengers: [],
            flights: [],
            username: 'username',
            email: 'email@email.em',
            phone: '2223334444',
            stripeId: 'stripe_id',
            refunded: false
        };
        service.addBooking(booking).subscribe((data) => {
            expect(data).toEqual(booking);
        });
        let mockRequest = httpTestingController.expectOne(apiUrl);
        expect(mockRequest.cancelled).toBeFalsy();
        expect(mockRequest.request.responseType).toEqual('json');
        mockRequest.flush(booking);
    });

    it('delete booking', () => {
        let booking: Booking = {
            id: 1,
            active: true,
            confirmationCode: 'code',
            layoverCount: 1,
            totalPrice: 100,
            passengers: [],
            flights: [],
            username: 'username',
            email: 'email@email.em',
            phone: '2223334444',
            stripeId: 'stripe_id',
            refunded: false
        };
        service.delete(0).subscribe((data) => {
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
        let booking: Booking = {
            id: 1,
            active: true,
            confirmationCode: 'code',
            layoverCount: 1,
            totalPrice: 100,
            passengers: [],
            flights: [],
            username: 'username',
            email: 'email@email.em',
            phone: '2223334444',
            stripeId: 'stripe_id',
            refunded: false
        };
        service.update(booking).subscribe((data) => {
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
