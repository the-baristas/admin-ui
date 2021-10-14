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
        bookingServiceSpy = jasmine.createSpyObj('BookingService', [
            'findAll',
            'update'
        ]);

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

    it('#ngOnInit initializes foundBookings and totalElements', () => {
        const bookingsPage: Page<Booking> = {
            content: [{} as Booking],
            totalElements: 1
        } as Page<Booking>;
        bookingServiceSpy.findAll.and.returnValue(of(bookingsPage));
        fixture.detectChanges(); // ngOnInit

        expect(component.foundBookings.length).toBe(1);
        expect(component.foundBookings).toEqual(bookingsPage.content);
        expect(component.totalElements).toBe(1);
    });

    it('#toggleActive toggles active property of booking and calls BookingService#update', () => {
        const booking: Booking = { active: true } as Booking;
        bookingServiceSpy.update.and.returnValue(of(booking));
        component.toggleActive(booking);

        expect(booking.active).toBe(false);
        expect(bookingServiceSpy.update.calls.count()).toBe(1);
    });

    it('when New button is clicked, #openAddModal is called', () => {
        spyOn(component, 'openAddModal').and.callThrough();

        const nativeElement: HTMLElement = fixture.nativeElement;
        const button: HTMLButtonElement | null =
            nativeElement.querySelector('button');
        button?.click();

        expect(component.openAddModal).toHaveBeenCalledTimes(1);
    });
});
