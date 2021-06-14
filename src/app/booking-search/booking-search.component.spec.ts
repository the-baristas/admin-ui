import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Booking } from '../entities/booking';

import { BookingSearchComponent } from './booking-search.component';

describe('BookingSearchComponent', () => {
  let component: BookingSearchComponent;
  let fixture: ComponentFixture<BookingSearchComponent>;
  let booking: Booking = {
    id: 0, active: true, confirmationCode: "code",
    layoverCount: 1, totalPrice: 100,
    passengers: [], flights: [],
    username: "username", email: "email@email.em", phone: "2223334444"
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingSearchComponent],
      imports: [HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updateSearchBox', () => {
    let input: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#search-box');
    component.updateSearchBox(input, booking);
    expect(component.selectedBooking.id).toEqual(booking.id);
  });

});
