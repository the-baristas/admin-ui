import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightService } from '../../services/flights.service';
import { of } from 'rxjs';
import { FlightEmailButtonComponent } from './flight-email-button.component';
import { Flight } from '../../entities/flight';

describe('FlightEmailButtonComponent', () => {
  let component: FlightEmailButtonComponent;
  let fixture: ComponentFixture<FlightEmailButtonComponent>;
  let flightServiceMock: jasmine.SpyObj<FlightService>;
  let debugElement: DebugElement;
  let element: Element;

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
    firstReserved: 0,
    firstPrice: 1,
    businessReserved: 0,
    businessPrice: 1,
    economyReserved: 0,
    economyPrice: 1,
    isActive: true,
    departureGate: "A1",
    arrivalGate: "B1"
  }

  beforeEach(async () => {
    flightServiceMock = jasmine.createSpyObj('FlightService', ['emailAllBookedUsers']);
    flightServiceMock.emailAllBookedUsers.and.returnValue(of(flight));

    await TestBed.configureTestingModule({
      declarations: [FlightEmailButtonComponent],
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [
        { provide: FlightService, useValue: flightServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightEmailButtonComponent);
    component = fixture.componentInstance;
    component.flight = flight;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('button should only be enabled when there are seats reserved', () => {
    component.flight.businessReserved = 0;
    component.setButtonDisabled();
    fixture.detectChanges();
    let button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('button');

    expect(button?.innerText).toContain('Email');
    expect(component.buttonDisabled).toBeTruthy();
    expect(button.disabled).toBeTruthy

    component.flight.businessReserved = 2;
    component.setButtonDisabled();
    fixture.detectChanges();

    expect(button.disabled).toBeFalsy();

  })

  it('clicking button should send email', () => {
    spyOn(component, 'onClickEmail').and.callThrough();
    component.flight.businessReserved = 2;
    component.setButtonDisabled();
    fixture.detectChanges();

    let button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(component.onClickEmail).toHaveBeenCalled();
    expect(flightServiceMock.emailAllBookedUsers).toHaveBeenCalled();
  })
});
