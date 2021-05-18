import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouteService } from '../services/routes.service';

import { RouteListComponent } from './route-list.component';

describe('RouteListComponent', () => {
  let component: RouteListComponent;
  let fixture: ComponentFixture<RouteListComponent>;
  let debugElement: DebugElement;
  let element: Element;

  let routeServiceMock: jasmine.SpyObj<RouteService>;
  let formBuilder!: FormBuilder;

  beforeEach(async () => {
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
    debugElement = fixture.debugElement;
    element = debugElement.nativeElement;
  });

  it('should create', inject([RouteService], (flightService: RouteService) => {
    expect(component).toBeTruthy();
  }));
});
