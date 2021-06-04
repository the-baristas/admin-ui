import { TestBed } from '@angular/core/testing';
import { PassengerService } from './passenger.service';

describe('PassengerService', () => {
    let service: PassengerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PassengerService);
    });

    xit('should be created', () => {
        expect(service).toBeTruthy();
    });
});
