import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Page } from '../entities/page';
import { Route } from '../entities/route';
import { RouteService } from '../services/routes.service';
import { Observable, of } from 'rxjs';

import { RouteListComponent } from './route-list.component';

describe('RouteListComponent', () => {
  let component: RouteListComponent;
  let fixture: ComponentFixture<RouteListComponent>;
  let debugElement: DebugElement;
  let element: Element;

  let routeServiceMock: jasmine.SpyObj<RouteService>;
  let formBuilder!: FormBuilder;

  let route: Route = {
    id: 1,
    originAirport: {
      iataId: "XXX",
      city: "X City",
      isActive: 1
    },
      destinationAirport: {
        iataId: "ZZZ",
      city: "Z city",
      isActive: 1
    },
    originId: "XXX",
    destinationId: "ZZZ",
    isActive: 1
  };
  let routesPage: Page<Route> = {
    content: [route],
    size: 2,
    totalPages: 1,
    number: 0,
    numberOfElements: 2,
    totalElements: 2,
    first: true,
    last: true,
    empty: false
  };

  beforeEach(async () => {
    routeServiceMock = jasmine.createSpyObj('RouteService', ['getRoutesPage', 'addRoute', 'deleteRoute',
      'updateRoute']);
    routeServiceMock.getRoutesPage.and.returnValue(of(routesPage));
    routeServiceMock.addRoute.and.returnValue(of(route));
    routeServiceMock.deleteRoute.and.returnValue(of(route));
    routeServiceMock.updateRoute.and.returnValue(of(route));

    await TestBed.configureTestingModule({
      declarations: [ RouteListComponent ],
      imports: [HttpClientTestingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
      providers: [
        { provide: RouteService, useValue: routeServiceMock },
        NgbModal
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
    element = debugElement.nativeElement;
  });

  it('should create', inject([RouteService], (flightService: RouteService) => {
    expect(component).toBeTruthy();
  }));

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
    expect(routeServiceMock.getRoutesPage).toHaveBeenCalled();
    spyOn(component, 'open').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#edit-button');
    button.click();
    expect(component.open).toHaveBeenCalled();
    expect(fixture.debugElement.nativeElement.querySelector("modal-body")).toBeDefined();
  });
});
