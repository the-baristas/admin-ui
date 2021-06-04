import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightCollapsibleRowComponent } from './flight-collapsible-row.component';

describe('FlightCollapsibleRowComponent', () => {
  let component: FlightCollapsibleRowComponent;
  let fixture: ComponentFixture<FlightCollapsibleRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightCollapsibleRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightCollapsibleRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
