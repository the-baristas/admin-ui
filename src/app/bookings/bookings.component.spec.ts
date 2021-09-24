import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Booking } from '../entities/booking';
import { Page } from '../entities/page';
import { BookingService } from '../services/booking.service';
import { BookingsComponent } from './bookings.component';

fdescribe('BookingsComponent', () => {
    let component: BookingsComponent;
    let fixture: ComponentFixture<BookingsComponent>;
    let bookingServiceSpy: jasmine.SpyObj<BookingService>;

    beforeEach(async () => {
        bookingServiceSpy = jasmine.createSpyObj('BookingService', ['findAll']);

        await TestBed.configureTestingModule({
            declarations: [BookingsComponent],
            imports: [HttpClientModule, RouterTestingModule],
            providers: [
                { provide: BookingService, useValue: bookingServiceSpy }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BookingsComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('#ngOnInit', () => {
        it('initializes foundBookings and totalElements', () => {
            const bookingsPage: Page<Booking> = {
                content: [{} as Booking],
                totalElements: 1
            } as Page<Booking>;
            bookingServiceSpy.findAll.and.returnValue(of(bookingsPage));
            fixture.detectChanges();

            expect(component.foundBookings.length).toBe(1);
            expect(component.foundBookings).toEqual(bookingsPage.content);
            expect(component.totalElements).toBe(1);
        });
    });

    describe('#toggleActive', () => {
        it('toggles active property of booking and ', () => {});
    });
});
