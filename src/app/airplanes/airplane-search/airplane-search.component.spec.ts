import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Airplane } from '../../entities/airplane';
import { AirplaneService } from '../../services/airplane.service';

import { AirplaneSearchComponent } from './airplane-search.component';

describe('AirplaneSearchComponent', () => {
    let component: AirplaneSearchComponent;
    let fixture: ComponentFixture<AirplaneSearchComponent>;
    let airplaneServiceSpy: jasmine.SpyObj<AirplaneService>;

    beforeEach(async () => {
        airplaneServiceSpy = jasmine.createSpyObj('AirplaneService', [
            'getAirplanes',
            'searchAirplanes'
        ]);

        await TestBed.configureTestingModule({
            declarations: [AirplaneSearchComponent],
            providers: [
                { provide: AirplaneService, useValue: airplaneServiceSpy }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AirplaneSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('#onSuggestionClick should update the search box, update the selectedAirplane, initialize airplanes$, and emit searchResultsDisplay event', () => {
        const selectedAirplane: Airplane = { id: 0, model: 'a1' } as Airplane;
        const term: string = 'a';
        const airplanes: Airplane[] = [{} as Airplane];
        airplaneServiceSpy.searchAirplanes
            .withArgs(term)
            .and.returnValue(of(airplanes));
        component.search(term);
        const searchBox: HTMLInputElement = fixture.nativeElement.querySelector(
            'input'
        );
        component.onSuggestionClick(searchBox, selectedAirplane);

        expect(searchBox.value).toBe(selectedAirplane.model);
        expect(component.selectedAirplane.id).toBe(selectedAirplane.id);
        expect(component.selectedAirplane.model).toBe(selectedAirplane.model);
        component.airplanes$.subscribe(
            (value: Airplane[]) => expect(value).toEqual(airplanes),
            fail
        );
        component.searchResultsDisplay.subscribe(
            (value: Airplane[]) => expect(value).toEqual(airplanes),
            fail
        );
    });
});
