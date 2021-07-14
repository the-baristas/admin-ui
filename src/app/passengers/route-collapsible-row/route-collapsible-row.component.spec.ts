import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Passenger } from '../../entities/passenger';

import { RouteCollapsibleRowComponent } from './route-collapsible-row.component';

describe('RouteCollapsibleRowComponent', () => {
  let component: RouteCollapsibleRowComponent;
  let fixture: ComponentFixture<RouteCollapsibleRowComponent>;
  let passenger: Passenger = {
    id: 1, bookingId: 1, bookingConfirmationCode: "code", bookingActive: true,
    layoverCount: 1, bookingTotalPrice: 100, flightId: 1, flightActive: true,
    departureTime: "01-01-9999 00:00:00", arrivalTime: "01-01-9999 05:00:00", routeId: 1, routeActive: true,
    originAirportCode: "LAX", originAirportActive: true, originAirportCity: "Los Angeles",
    destinationAirportCode: "LAS", destinationAirportActive: true, destinationAirportCity: "Las Vegas",
    discountType: "none", discountRate: 1, givenName: "First", familyName: "Last",
    dateOfBirth: "01-01-2000", gender: "nonbinary", address: "address road", seatClass: "economy",
    seatNumber: 1, checkInGroup: 1, username: "username", airplaneModel: "modelname"
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteCollapsibleRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteCollapsibleRowComponent);
    component = fixture.componentInstance;
    component.passenger = passenger;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
