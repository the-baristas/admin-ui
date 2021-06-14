import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BookingService } from '../services/booking.service';
import { UniqueBookingValidator } from './unique-booking-validator';

describe('UniqueBookingValidator', () => {
  let bookingService: BookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookingService]
    });

    bookingService = TestBed.inject(BookingService);
  });

   it('should create an instance', () => {
     expect(new UniqueBookingValidator(bookingService)).toBeTruthy();
   });


});
