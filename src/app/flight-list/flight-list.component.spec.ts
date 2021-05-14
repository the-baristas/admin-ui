import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightComponent } from './flight-list.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs/internal/observable/of';
import { FlightService } from '../services/flights.service';


describe('FlightComponent', () => {
  let component: FlightComponent;
  let fixture: ComponentFixture<FlightComponent>;
  let flightServiceMock: any;

  let flightData: any = {
    id: 1,
    airplaneId: 14,
    departureTime: "2021-04-07T16:15:00.000+00:00",
    arrivalTime: "2021-04-07T17:33:00.000+00:00",
    firstReserved: 0,
    firstPrice: 300.0,
    businessReserved: 0,
    businessPrice: 250.53,
    economyReserved: 0,
    economyPrice: 200.4,
    isActive: 1,
    route: {
        id: 6,
        originId: "BOS",
        destinationId: "MSY",
        isActive: 1
        }
  }

  beforeEach(async () => {
    flightServiceMock = jasmine.createSpyObj('FlightService', ['getAllFlights']);
    flightServiceMock.getAllFlights.and.returnValue(of([flightData]));
    await TestBed.configureTestingModule({
      declarations: [ FlightComponent ],
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: FlightService, useValue: flightServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a "List of Flights"', () => {
    let compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('thead').textContent).toContain('List of Flights');
  });

  // FIXME: Property 'foundFlights' doesn't exist.
//   it('List of flights should contain mock flightData', () => {
//     expect(component.totalFlights).toEqual(1);
//     expect(component.foundFlights[0].id).toEqual(1);
//     expect(component.foundFlights[0].airplaneId).toBe(14);
//   });

  it('should be at least one "Add Flight" button', () => {
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#add-flight-button').textContent).toBe('Create New');
  });

  it('should be at least one "Edit" button', () => {
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#edit-button').textContent).toBe('Edit');
  });

  it('Should be at least one button because there is one mock flight', () => {
    let buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length >= 1).toBeTruthy();
  });

});
