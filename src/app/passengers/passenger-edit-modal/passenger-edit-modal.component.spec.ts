import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { Passenger } from 'src/app/entities/passenger';
import { PassengerService } from 'src/app/services/passenger.service';
import { PassengerEditModalComponent } from './passenger-edit-modal.component';

describe('PassengerEditModalComponent', () => {
    let component: PassengerEditModalComponent;
    let fixture: ComponentFixture<PassengerEditModalComponent>;
    let passengerServiceSpy: jasmine.SpyObj<PassengerService>;
    let activeModal: NgbActiveModal;

    beforeEach(async () => {
        passengerServiceSpy = jasmine.createSpyObj('PassengerService', [
            'update'
        ]);

        await TestBed.configureTestingModule({
            declarations: [PassengerEditModalComponent],
            imports: [HttpClientTestingModule],
            providers: [
                NgbActiveModal,
                { provide: PassengerService, useValue: passengerServiceSpy },
                FormBuilder
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PassengerEditModalComponent);
        component = fixture.componentInstance;

        activeModal = TestBed.inject(NgbActiveModal);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should update form when Angular calls #ngOnInit', () => {
        const selectedPassenger: Passenger = {
            seatNumber: 1,
            checkInGroup: 1,
            address: '1 Main St City AK 12345'
        } as Passenger;
        component.selectedPassenger = selectedPassenger;
        fixture.detectChanges(); // #ngOnInit

        const formValue: { [key: string]: string | number } = {
            givenName: '',
            familyName: '',
            dateOfBirth: '',
            gender: '',
            seatClass: '',
            seatNumber: 1,
            checkInGroup: 1,
            streetAddress: '1 Main St',
            city: 'City',
            state: 'AK',
            zipCode: '12345'
        };
        expect(component.editingForm.value).toEqual(formValue);
    });

    it('#save should update selectPassenger and close modal passing the selected passenger', () => {
        const nativeElement: HTMLElement = fixture.nativeElement;
        const buttons: NodeListOf<HTMLButtonElement> | undefined = nativeElement
            .querySelector('.modal-footer')
            ?.querySelectorAll('button');
        const saveButton: HTMLButtonElement | undefined = buttons?.item(1);
        spyOn(component, 'save').and.callThrough();
        saveButton?.click();

        expect(component.save).toHaveBeenCalled();

        const selectedPassenger: Passenger = {
            address: '1 Main St City AK 12345'
        } as Passenger;
        component.selectedPassenger = selectedPassenger;
        fixture.detectChanges(); // #ngOnInit
        const updatedPassenger = Object.assign({}, selectedPassenger);
        passengerServiceSpy.update
            .withArgs(selectedPassenger)
            .and.returnValue(of(updatedPassenger));
        spyOn(activeModal, 'close');
        component.save();

        expect(activeModal.close).toHaveBeenCalledWith(updatedPassenger);
    });
});
