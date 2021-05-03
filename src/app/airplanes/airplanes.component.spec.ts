import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
    waitForAsync
} from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { defer, EMPTY, of } from 'rxjs';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { TestScheduler } from 'rxjs/testing';
import { AirplaneAddModalComponent } from '../airplane-add-modal/airplane-add-modal.component';
import { AirplaneEditModalComponent } from '../airplane-edit-modal/airplane-edit-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { Airplane } from '../entities/airplane';
import { AirplaneService } from '../services/airplane.service';
import { AirplanesComponent } from './airplanes.component';

fdescribe('AirplanesComponent', () => {
    let component: AirplanesComponent;
    let fixture: ComponentFixture<AirplanesComponent>;
    let airplaneServiceSpy: jasmine.SpyObj<AirplaneService>;

    beforeEach(async () => {
        airplaneServiceSpy = jasmine.createSpyObj('AirplaneService', [
            'getAirplanes',
            'deleteAirplane'
        ]);

        await TestBed.configureTestingModule({
            declarations: [AirplanesComponent],
            providers: [
                { provide: AirplaneService, useValue: airplaneServiceSpy },
                NgbModal
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AirplanesComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize foundAirplanes after Angular calls ngOnInit (synchronous)', () => {
        const airplanes: Airplane[] = [{} as Airplane, {} as Airplane];
        airplaneServiceSpy.getAirplanes.and.returnValue(of(airplanes)); // synchronous observable
        fixture.detectChanges(); // ngOnInit

        expect(component.foundAirplanes.length).toBe(2);
    });

    it('should initialize foundAirplanes after Angular calls ngOnInit (fakeAsync - synchronous)', fakeAsync(() => {
        const airplanes: Airplane[] = [{} as Airplane, {} as Airplane];
        airplaneServiceSpy.getAirplanes.and.returnValue(
            defer(() => Promise.resolve(airplanes)) // asynchronous observable
        );
        fixture.detectChanges(); // ngOnInit
        tick(); // flush the observable
        fixture.detectChanges(); // update view

        expect(component.foundAirplanes.length).toBe(2);
    }));

    it(
        'should initialize foundAirplanes after Angular calls ngOnInit (waitForAsync - asynchronous)',
        waitForAsync(() => {
            const airplanes: Airplane[] = [{} as Airplane, {} as Airplane];
            airplaneServiceSpy.getAirplanes.and.returnValue(
                defer(() => Promise.resolve(airplanes)) // asynchronous observable
            );
            fixture.detectChanges(); // ngOnInit

            fixture.whenStable().then(() => {
                // wait for asynchronous getAirplanes
                fixture.detectChanges(); // update view
                expect(component.foundAirplanes.length).toBe(2);
            });
        })
    );

    it('should initialize foundAirplanes after Angular calls ngOnInit (marbles - synchronous)', () => {
        const testScheduler: TestScheduler = new TestScheduler(
            (actual, expected) => {
                // asserting the two objects are equal - required
                // for TestScheduler assertions to work via your test framework
                // e.g. using chai.
                expect(actual).toEqual(expected);
            }
        );

        testScheduler.run((helpers: RunHelpers) => {
            const { cold, flush } = helpers;
            const airplanes: Airplane[] = [{} as Airplane, {} as Airplane];
            const a$ = cold('---x|', { x: airplanes });
            airplaneServiceSpy.getAirplanes.and.returnValue(a$);

            fixture.detectChanges(); // ngOnInit
            flush(); // flush the observables
            fixture.detectChanges(); // update view
            expect(component.foundAirplanes.length).toBe(2);
        });
    });

    it('should have <button> with "Create New"', () => {
        const airplanesElement: HTMLElement = fixture.nativeElement;
        const button = airplanesElement.querySelector('button');

        expect(button?.innerText).toEqual('Create New');
    });

    it('#openAddModal should open the add modal', () => {
        const ngbModal = TestBed.inject(NgbModal);
        spyOn(ngbModal, 'open').and.callThrough();
        component.openAddModal();

        expect(ngbModal.open).toHaveBeenCalledWith(AirplaneAddModalComponent, {
            centered: true
        });
    });

    it('should create 2 table rows when there are 2 Airplanes in foundAirplanes', () => {
        airplaneServiceSpy.getAirplanes.and.returnValue(EMPTY);
        component.foundAirplanes = [{} as Airplane, {} as Airplane];
        fixture.detectChanges();
        const airplanesElement: HTMLElement = fixture.nativeElement;
        const tableRows:
            | NodeListOf<HTMLTableRowElement>
            | undefined = airplanesElement
            .querySelector('table')
            ?.querySelector('tbody')
            ?.querySelectorAll('tr');

        expect(tableRows?.length).toBe(2);
    });

    it('#openEditModal should open the edit modal', () => {
        const ngbModal = TestBed.inject(NgbModal);
        spyOn(ngbModal, 'open').and.callThrough();
        component.openEditModal({} as Airplane);

        expect(ngbModal.open).toHaveBeenCalledWith(AirplaneEditModalComponent, {
            centered: true
        });
    });

    it('#openDeleteModel should open the delete modal', () => {
        const ngbModal = TestBed.inject(NgbModal);
        spyOn(ngbModal, 'open').and.callThrough();
        component.openDeleteModal({} as Airplane);

        expect(ngbModal.open).toHaveBeenCalledWith(DeleteModalComponent, {
            centered: true
        });
    });

    it('#delete should delete the correct airplane', () => {
        const airplane = { id: 1 } as Airplane;
        airplaneServiceSpy.deleteAirplane
            .withArgs(airplane.id)
            .and.returnValue(of(airplane));
        component.foundAirplanes = [airplane];
        component.delete(airplane);

        expect(
            fixture.componentInstance.foundAirplanes.includes(airplane)
        ).toBeFalse();
    });
});
