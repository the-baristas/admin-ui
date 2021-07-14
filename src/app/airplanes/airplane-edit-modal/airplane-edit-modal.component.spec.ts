import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { Airplane } from '../../entities/airplane';
import { AirplaneService } from '../../services/airplane.service';
import { AirplaneEditModalComponent } from './airplane-edit-modal.component';

describe('AirplaneEditModalComponent', () => {
    let component: AirplaneEditModalComponent;
    let fixture: ComponentFixture<AirplaneEditModalComponent>;
    let airplaneServiceSpy: jasmine.SpyObj<AirplaneService>;
    let activeModal: NgbActiveModal;

    beforeEach(async () => {
        airplaneServiceSpy = jasmine.createSpyObj('AirplaneService', [
            'update'
        ]);

        await TestBed.configureTestingModule({
            declarations: [AirplaneEditModalComponent],
            providers: [
                NgbActiveModal,
                { provide: AirplaneService, useValue: airplaneServiceSpy }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AirplaneEditModalComponent);
        component = fixture.componentInstance;

        activeModal = TestBed.inject(NgbActiveModal);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should update form when Angular calls #ngOnInit and update selectedAirplane when form is edited', () => {
        const airplane: Airplane = {
            firstClassSeatsMax: 1,
            businessClassSeatsMax: 1,
            economyClassSeatsMax: 1,
            model: 'a'
        } as Airplane;
        component.selectedAirplane = airplane;
        fixture.detectChanges(); // #ngOnInit
        expect(component.editingForm.value).toEqual(airplane);

        const newAirplane: Airplane = {
            firstClassSeatsMax: 2,
            businessClassSeatsMax: 2,
            economyClassSeatsMax: 2,
            model: 'b'
        } as Airplane;
        component.editingForm.setValue({
            firstClassSeatsMax: newAirplane.firstClassSeatsMax,
            businessClassSeatsMax: newAirplane.businessClassSeatsMax,
            economyClassSeatsMax: newAirplane.economyClassSeatsMax,
            model: newAirplane.model
        });
        expect(component.selectedAirplane).toEqual(newAirplane);
    });

    it('save button should call #save which should close the active modal passing the selected airplane', () => {
        const nativeElement: HTMLElement = fixture.nativeElement;
        const buttons: NodeListOf<HTMLButtonElement> | undefined = nativeElement
            .querySelector('.modal-footer')
            ?.querySelectorAll('button');
        const addButton: HTMLButtonElement | undefined = buttons?.item(1);
        spyOn(component, 'save').and.callThrough();

        addButton?.click();
        expect(component.save).toHaveBeenCalled();

        const selectedAirplane: Airplane = {
            firstClassSeatsMax: 1,
            businessClassSeatsMax: 1,
            economyClassSeatsMax: 1,
            model: 'a'
        } as Airplane;
        component.selectedAirplane = selectedAirplane;
        fixture.detectChanges();
        airplaneServiceSpy.update
            .withArgs(selectedAirplane)
            .and.returnValue(of(selectedAirplane));
        spyOn(activeModal, 'close');

        component.save();
        expect(activeModal.close).toHaveBeenCalledWith(selectedAirplane);
    });
});
