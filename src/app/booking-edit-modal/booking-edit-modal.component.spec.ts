import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BookingEditModalComponent } from './booking-edit-modal.component';
import { Booking } from '../entities/booking';

describe('BookingEditModalComponent', () => {
  let component: BookingEditModalComponent;
  let fixture: ComponentFixture<BookingEditModalComponent>;
  let booking: Booking = {
    id: 0, active: true, confirmationCode: "code",
    layoverCount: 1, totalPrice: 100,
    passengers: [], flights: [],
    username: "username", email: "email@email.em", phone: "2223334444"
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingEditModalComponent],
      providers: [NgbActiveModal, HttpClient, HttpHandler]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingEditModalComponent);
    component = fixture.componentInstance;
    component.selectedBooking = booking;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
