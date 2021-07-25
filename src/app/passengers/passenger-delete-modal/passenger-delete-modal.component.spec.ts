import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EMPTY, of, scheduled } from 'rxjs';
import { Passenger } from 'src/app/entities/passenger';
import { PassengerService } from 'src/app/services/passenger.service';

import { PassengerDeleteModalComponent } from './passenger-delete-modal.component';

describe('PassengerDeleteModalComponent', () => {
    let component: PassengerDeleteModalComponent;
    let fixture: ComponentFixture<PassengerDeleteModalComponent>;
    let passengerServiceSpy: jasmine.SpyObj<PassengerService>;
    let activeModal: NgbActiveModal;

    beforeEach(async () => {
        passengerServiceSpy = jasmine.createSpyObj('PassengerService', [
            'delete'
        ]);

        await TestBed.configureTestingModule({
            declarations: [PassengerDeleteModalComponent],
            imports: [HttpClientTestingModule],
            providers: [
                NgbActiveModal,
                { provide: PassengerService, useValue: passengerServiceSpy }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PassengerDeleteModalComponent);
        component = fixture.componentInstance;

        activeModal = TestBed.inject(NgbActiveModal);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('#delete should close the modal passing the deleted passenger', () => {
        const passengerToDelete: Passenger = { id: 1 } as Passenger;
        passengerServiceSpy.delete
            .withArgs(passengerToDelete.id)
            .and.returnValue(of(null));
        component.selectedPassenger = passengerToDelete;
        fixture.detectChanges(); // #ngOnInit
        spyOn(activeModal, 'close');
        component.delete();

        expect(activeModal.close).toHaveBeenCalledWith(passengerToDelete);
    });
});
