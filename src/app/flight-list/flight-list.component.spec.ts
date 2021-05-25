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

describe('FlightComponent', () => {
  let component: FlightComponent;
  let fixture: ComponentFixture<FlightComponent>;
  let debugElement: DebugElement;
  let element: Element;

  let flightServiceMock: jasmine.SpyObj<FlightService>;

  let formBuilder!: FormBuilder;


        beforeEach(waitForAsync (() => {
          flightServiceMock = jasmine.createSpyObj('FlightService', ['getFlightsPage']);

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

});