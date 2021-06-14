import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Page } from '../entities/page';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FlightService } from '../services/flights.service';
import { Observable, of } from 'rxjs';
import { RouteService } from '../services/routes.service';
import { AirplaneService } from '../services/airplane.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FlightComponent } from './flight-list.component';
import { DebugElement } from '@angular/core';
import { Flight } from '../entities/flight';

describe('FlightComponent', () => {
  let component: FlightComponent;
  let fixture: ComponentFixture<FlightComponent>;
  let debugElement: DebugElement;
  let element: Element;

  let flightServiceMock: jasmine.SpyObj<FlightService>;

  let formBuilder!: FormBuilder;

  let flight: Flight = {
    id: 1,
    route: {
      id: 1,
      originAirport: {
        iataId: "LAX",
        city: "LA",
        isActive: 1
      },
      destinationAirport: {
        iataId: "LAS",
        city: "Las",
        isActive: 1
      },
      isActive: 1
    },
    airplane: {
      id: 1,
      firstClassSeatsMax: 1,
      businessClassSeatsMax: 1,
      economyClassSeatsMax: 1,
      model: "model"
    },
    routeId: "1",
    airplaneId: "1",
    departureTime: "9999-01-01 00:00:00",
    arrivalTime: "9999-01-01 05:00:00",
    firstReserved: 1,
    firstPrice: 1,
    businessReserved: 1,
    businessPrice: 1,
    economyReserved: 1,
    economyPrice: 1,
    isActive: true
  }
  let flightsPage: Page<Flight> = {
    content: [flight],
    size: 1,
    totalPages: 1,
    number: 0,
    numberOfElements: 1,
    totalElements: 1,
    first: true,
    last: true,
    empty: false
  };

        beforeEach(waitForAsync (() => {
          flightServiceMock = jasmine.createSpyObj('FlightService', ['getFlightsPage', 'addFlight', 'deleteFlight',
                                                                      'updateFlight', 'getFlightByLocation']);
          flightServiceMock.getFlightsPage.and.returnValue(of(flightsPage));
          flightServiceMock.addFlight.and.returnValue(of(flight));
          flightServiceMock.deleteFlight.and.returnValue(of(flight));
          flightServiceMock.updateFlight.and.returnValue(of(flight));

          TestBed.configureTestingModule({
            declarations: [ FlightComponent],
            imports: [HttpClientTestingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
            providers: [
              { provide: FlightService, useValue: flightServiceMock },
              NgbModal
            ]
          })
          .compileComponents();
        }));

        beforeEach(() => {
          fixture = TestBed.createComponent(FlightComponent);
          component = fixture.componentInstance;
          fixture.detectChanges();
          debugElement = fixture.debugElement;
          element = debugElement.nativeElement;

          formBuilder = TestBed.inject(FormBuilder);
      });

      it('should create', inject([FlightService], (flightService: FlightService) => {
        expect(component).toBeTruthy();
    }));

    it('should have <button> with "Find Flights"', () => {
      const button = element.querySelector('button');
      expect(button?.innerText).toEqual('Find Flights');
  });

    it('should have <button> with "Create New"', () => {
      const button = element.querySelectorAll('button')[1];
      expect(button?.innerText).toEqual('Create New');
    });

  it('Create button should open modal', () => {
    spyOn(component, 'openTwo').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelectorAll('button')[1];
    button.click();
    expect(component.openTwo).toHaveBeenCalled();
    expect(fixture.debugElement.nativeElement.querySelector("modal-body")).toBeDefined();
  });

  it('Create button should open modal', () => {
    spyOn(component, 'openTwo').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelectorAll('button')[1];
    button.click();
    expect(component.openTwo).toHaveBeenCalled();
    expect(fixture.debugElement.nativeElement.querySelector("modal-body")).toBeDefined();
  });

  it('Edit button should open modal', () => {
    expect(flightServiceMock.getFlightsPage).toHaveBeenCalled();
    spyOn(component, 'open').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#edit-button');
    button.click();
    expect(component.open).toHaveBeenCalled();
    expect(fixture.debugElement.nativeElement.querySelector("modal-body")).toBeDefined();
  });

  xit('Delete button in edit modal', () => {
    expect(flightServiceMock.getFlightsPage).toHaveBeenCalled();
    spyOn(component, 'onDeleteFlight').and.callThrough();
    fixture.debugElement.nativeElement.querySelector('#edit-button').click();
    expect(fixture.debugElement.nativeElement.querySelector("modal-body")).toBeDefined();
    component.onDeleteFlight();
    expect(flightServiceMock.deleteFlight).toHaveBeenCalled();
  });

});
