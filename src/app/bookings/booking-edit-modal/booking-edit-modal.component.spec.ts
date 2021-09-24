import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingFlight } from 'src/app/entities/booking-flight';
import { Passenger } from 'src/app/entities/passenger';
import { Booking } from '../../entities/booking';
import { BookingEditModalComponent } from './booking-edit-modal.component';

describe('BookingEditModalComponent', () => {
    let component: BookingEditModalComponent;
    let fixture: ComponentFixture<BookingEditModalComponent>;
    let b: Booking = { id: 0 } as Booking;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BookingEditModalComponent],
            providers: [NgbActiveModal, HttpClient, HttpHandler]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BookingEditModalComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // TODO: Complete.
    it('should update form when Angular calls #ngOnInit and update selectedBooking when form is edited', () => {
        const booking: Booking = {
            id: 0,
            active: true,
            confirmationCode: 'confirmation_code',
            layoverCount: 0,
            totalPrice: 1,
            passengers: [] as Passenger[],
            flights: [] as BookingFlight[],
            username: 'username',
            email: 'email@email.com',
            phone: '0123456789',
            stripeId: 'stripe_id',
            refunded: false
        } as Booking;
        component.selectedBooking = booking;
        fixture.detectChanges();
    });
});
