import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { Passenger } from 'src/app/entities/passenger';
import { BookingService } from 'src/app/services/booking.service';
import { PassengerService } from 'src/app/services/passenger.service';
import { PassengerAddModalComponent } from './passenger-add-modal.component';

describe('PassengerAddModalComponent', () => {
    let component: PassengerAddModalComponent;
    let fixture: ComponentFixture<PassengerAddModalComponent>;
    let passengerServiceSpy: jasmine.SpyObj<PassengerService>;
    let bookingServiceSpy: jasmine.SpyObj<BookingService>;
    let activeModal: NgbActiveModal;

    beforeEach(async () => {
        passengerServiceSpy = jasmine.createSpyObj('PassengerService', [
            'create'
        ]);
        bookingServiceSpy = jasmine.createSpyObj('BookingService', [
            'findByConfirmationCode'
        ]);

        await TestBed.configureTestingModule({
            declarations: [PassengerAddModalComponent],
            imports: [HttpClientModule],
            providers: [
                NgbActiveModal,
                { provide: PassengerService, useValue: passengerServiceSpy },
                { provide: BookingService, useValue: bookingServiceSpy },
                FormBuilder
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PassengerAddModalComponent);
        component = fixture.componentInstance;

        activeModal = TestBed.inject(NgbActiveModal);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call #create when the add button is clicked', () => {
        const nativeElement: HTMLElement = fixture.nativeElement;
        const buttons: NodeListOf<HTMLButtonElement> | undefined = nativeElement
            .querySelector('.modal-footer')
            ?.querySelectorAll('button');
        const addButton: HTMLButtonElement | undefined = buttons?.item(1);

        spyOn(component, 'add');
        addButton?.click();
        expect(component.add).toHaveBeenCalled();
    });

    it('#add should close the active modal (synchronous observable)', () => {
        const passengerToCreate: Passenger = {
            bookingConfirmationCode: '',
            originAirportCode: 'ABC',
            destinationAirportCode: 'BCD',
            airplaneModel: 'model',
            departureTime: '',
            arrivalTime: '',
            givenName: '',
            familyName: '',
            dateOfBirth: '',
            gender: '',
            address: '1 Main St Townsville AK 12345',
            seatClass: '',
            seatNumber: 1,
            checkInGroup: 1
        } as Passenger;
        const createdPassenger: Passenger = Object.assign(
            {},
            passengerToCreate
        );
        passengerServiceSpy.create
            .withArgs(passengerToCreate)
            .and.returnValue(of(createdPassenger));
        component.addingForm.patchValue({
            bookingForm: {
                flight: {
                    originAirportCode: 'ABC',
                    destinationAirportCode: 'BCD',
                    airplaneModel: 'model',
                    departureTime: '',
                    arrivalTime: ''
                }
            },
            givenName: '',
            familyName: '',
            dateOfBirth: '',
            gender: '',
            streetAddress: '1 Main St',
            city: 'Townsville',
            state: 'AK',
            zipCode: '12345',
            seatClass: '',
            seatNumber: 1,
            checkInGroup: 1
        });
        spyOn(activeModal, 'close');

        component.add();
        expect(activeModal.close).toHaveBeenCalledWith(createdPassenger);
    });
});
