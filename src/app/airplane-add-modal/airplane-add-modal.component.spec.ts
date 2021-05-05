import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { Airplane } from '../entities/airplane';
import { AirplaneService } from '../services/airplane.service';
import { AirplaneAddModalComponent } from './airplane-add-modal.component';

describe('AirplaneAddModalComponent', () => {
    let component: AirplaneAddModalComponent;
    let fixture: ComponentFixture<AirplaneAddModalComponent>;
    let airplaneServiceSpy: jasmine.SpyObj<AirplaneService>;
    let activeModal: NgbActiveModal;

    beforeEach(async () => {
        airplaneServiceSpy = jasmine.createSpyObj('AirplaneService', [
            'addAirplane',
            'getAirplanes'
        ]);

        await TestBed.configureTestingModule({
            declarations: [AirplaneAddModalComponent],
            providers: [
                NgbActiveModal,
                { provide: AirplaneService, useValue: airplaneServiceSpy }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AirplaneAddModalComponent);
        component = fixture.componentInstance;

        activeModal = TestBed.inject(NgbActiveModal);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call #add when the add button is clicked', () => {
        const nativeElement: HTMLElement = fixture.nativeElement;
        const buttons:
            | NodeListOf<HTMLButtonElement>
            | undefined = nativeElement
            .querySelector('.modal-footer')
            ?.querySelectorAll('button');
        const addButton: HTMLButtonElement | undefined = buttons?.item(1);

        spyOn(component, 'add');
        addButton?.click();
        expect(component.add).toHaveBeenCalled();
    });

    it('#add should close the active modal (synchronous observable)', () => {
        const airplane: Airplane = {
            firstClassSeatsMax: 1,
            businessClassSeatsMax: 1,
            economyClassSeatsMax: 1,
            model: 'a'
        } as Airplane;
        airplaneServiceSpy.addAirplane
            .withArgs(airplane)
            .and.returnValue(of(airplane));
        const airplanes: Airplane[] = [airplane];
        airplaneServiceSpy.getAirplanes.and.returnValue(of(airplanes));
        component.addingForm.setValue(airplane);
        spyOn(activeModal, 'close');

        component.add();
        expect(activeModal.close).toHaveBeenCalledWith(airplanes);
    });
});
