import { TestBed } from '@angular/core/testing';

import { BookingService } from './booking.service';

xdescribe('BookingService', () => {
  let service: BookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
