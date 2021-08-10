import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { Airplane } from '../../entities/airplane';
import { AirplaneService } from '../../services/airplane.service';
import { AirplaneDeleteModalComponent } from './airplane-delete-modal.component';

describe('AirplaneDeleteModalComponent', () => {
    let component: AirplaneDeleteModalComponent;
    let fixture: ComponentFixture<AirplaneDeleteModalComponent>;
    let airplaneServiceSpy: jasmine.SpyObj<AirplaneService>;
    let activeModal: NgbActiveModal;

    beforeEach(async () => {
        airplaneServiceSpy = jasmine.createSpyObj('AirplaneService', [
            'delete'
        ]);

        await TestBed.configureTestingModule({
            declarations: [AirplaneDeleteModalComponent],
            providers: [
                NgbActiveModal,
                { provide: AirplaneService, useValue: airplaneServiceSpy }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AirplaneDeleteModalComponent);
        component = fixture.componentInstance;

        activeModal = TestBed.inject(NgbActiveModal);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('#delete closes the active modal passing the deleted airplane', () => {
        const airplaneToDelete: Airplane = { id: 1 } as Airplane;
        airplaneServiceSpy.delete
            .withArgs(airplaneToDelete.id)
            .and.returnValue(of(undefined));
        component.selectedAirplane = airplaneToDelete;
        fixture.detectChanges(); // #ngOninit

        spyOn(activeModal, 'close');
        component.delete();
        expect(activeModal.close).toHaveBeenCalledWith(airplaneToDelete);
    });
});
